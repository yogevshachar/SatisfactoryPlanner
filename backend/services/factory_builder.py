from collections import defaultdict
from typing import List

from services.shard_allocator import ShardAllocator, ShardStrategy
from dal.base import RecipeRepository, ItemRepository, MachineRepository
from models.graph import InnerNode, NodeType, Node, Edge
from models.machine import CostEntry


class FactoryPlanner:
    def __init__(
        self,
        item_repo: ItemRepository,
        recipe_repo: RecipeRepository,
        machine_repo: MachineRepository,
    ):
        self.item_repo = item_repo
        self.recipe_repo = recipe_repo
        self.machine_repo = machine_repo

    async def planProduction(self, targets):
        demand = defaultdict(float)

        async def add_demand(item, rate):
            demand[item] += rate
            recipe = await self.recipe_repo.get_recipe_by_output(item)
            if not recipe:
                return
            recipe_rate = recipe.outputs[0].rate_per_min
            multiplier = rate / recipe_rate
            for ing in recipe.inputs:
                ing_rate = round(ing.rate_per_min * multiplier, 2)
                await add_demand(ing.item, ing_rate)

        for t in targets:
            await add_demand(t.item, t.rate)

        return dict(demand)

    async def compute_machine_plan(self, targets):
        demand = await self.planProduction(targets)
        machine_plan = []

        for item, total_rate in demand.items():
            recipe = await self.recipe_repo.get_recipe_by_output(item)
            if not recipe:
                continue
            per_min_output = recipe.outputs[0].rate_per_min
            machines_needed = total_rate / per_min_output

            machine_plan.append(
                {
                    "item": item,
                    "machine": recipe.machine,
                    "count": round(machines_needed, 2),
                    "rate": round(total_rate, 2),
                }
            )

        return machine_plan

    async def generate_detailed_machine_nodes(
        self,
        demand,
        power_shards: int = 0,
        shard_strategy: ShardStrategy = ShardStrategy.MACHINE_MINIMIZING,
    ) -> List[InnerNode]:
        shard_allocator = ShardAllocator(shard_strategy)
        machine_nodes = []
        for item, rate in demand.items():
            recipe = await self.recipe_repo.get_recipe_by_output(item)
            if not recipe:
                continue
            number_of_machines = rate / recipe.outputs[0].rate_per_min
            for i in range(int(number_of_machines)):
                machine_node = InnerNode(
                    id=f"{recipe.machine}_{item}_{i}",
                    type=NodeType.MACHINE,
                    inputs={ing.item: ing.rate_per_min for ing in recipe.inputs},
                    outputs={out.item: out.rate_per_min for out in recipe.outputs},
                    primary_output=recipe.outputs[0].item,
                    machine=recipe.machine,
                    count=1.0,
                )
                machine_nodes.append(machine_node)
            multiplier = number_of_machines % 1
            if multiplier != 0:
                inputs = {
                    ing.item: ing.rate_per_min * multiplier for ing in recipe.inputs
                }
                outputs = {
                    out.item: out.rate_per_min * multiplier for out in recipe.outputs
                }
                machine_node = InnerNode(
                    id=f"{recipe.machine}_{item}_{number_of_machines}",
                    type=NodeType.MACHINE,
                    inputs=inputs,
                    outputs=outputs,
                    primary_output=recipe.outputs[0].item,
                    machine=recipe.machine,
                    count=multiplier,
                )
                machine_nodes.append(machine_node)

        return shard_allocator.allocate(machine_nodes, power_shards)

    async def generate_simple_machine_nodes(self, demand) -> List[InnerNode]:
        machine_nodes = []
        for item, rate in demand.items():
            recipe = await self.recipe_repo.get_recipe_by_output(item)
            if not recipe:
                continue
            number_of_machines = rate / recipe.outputs[0].rate_per_min
            inputs = {
                ing.item: ing.rate_per_min * number_of_machines for ing in recipe.inputs
            }
            outputs = {
                out.item: out.rate_per_min * number_of_machines
                for out in recipe.outputs
            }
            machine_nodes.append(
                InnerNode(
                    id=f"{recipe.machine}_{item}",
                    type=NodeType.MACHINE,
                    inputs=inputs,
                    outputs=outputs,
                    primary_output=recipe.outputs[0].item,
                    machine=recipe.machine,
                    count=number_of_machines,
                )
            )
        return machine_nodes

    async def connect_nodes(self, nodes: List[InnerNode]) -> List[Edge]:
        usage = defaultdict(float)
        edges = []
        for node in nodes:
            if node.type != NodeType.MACHINE:
                continue

            for ing, rate in node.inputs.items():
                matching_nodes = [n for n in nodes if ing in n.outputs.keys()]
                if not matching_nodes:
                    continue
                for n in matching_nodes:
                    if usage[n.id] == n.outputs[ing]:
                        continue
                    edge_rate = min(rate, n.outputs[ing] - usage[n.id])
                    rate -= edge_rate
                    usage[n.id] += edge_rate
                    edges.append(
                        Edge(
                            source=n.id,
                            target=node.id,
                            label=f"{ing}: {edge_rate:.2f}/min",
                        )
                    )
                    if rate == 0:
                        break
        return edges

    async def compute_factory_cost(self, targets):
        cost = defaultdict(float)
        machine_plan = await self.compute_machine_plan(targets)
        for machine_plan_entry in machine_plan:
            machine = await self.machine_repo.get_machine_by_id(
                machine_plan_entry["machine"]
            )
            if not machine:
                continue
            for item in machine.cost:
                cost[item.item] += round(item.quantity * machine_plan_entry["count"], 2)
        return cost

    async def compute_factory_source(self, targets):
        demand = await self.planProduction(targets)
        return [
            CostEntry(item=item, quantity=round(rate, 2))
            for item, rate in demand.items()
            if await self.item_repo.is_source(item)
        ]


def to_public_node(internal: InnerNode) -> Node:
    return Node(
        id=internal.id,
        label=f"{internal.machine} ({internal.primary_output})\n{internal.count:.2f}x",
        type=internal.type,
        rate=internal.outputs[internal.primary_output],
        item=internal.primary_output,
        machine=internal.machine,
        count=internal.count,
    )
