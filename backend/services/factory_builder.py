from collections import defaultdict
from typing import List

from dal.base import RecipeRepository, ItemRepository, MachineRepository
from models.graph import NodeType, Node, Edge
from models.planner import FactoryGraph


class FactoryPlanner:
    def __init__(self, item_repo: ItemRepository, recipe_repo: RecipeRepository, machine_repo: MachineRepository):
        self.item_repo = item_repo
        self.recipe_repo = recipe_repo
        self.machine_repo = machine_repo

    async def compute_total_demand(self, targets):
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
        demand = await self.compute_total_demand(targets)
        machine_plan = []

        for item, total_rate in demand.items():
            recipe = await self.recipe_repo.get_recipe_by_output(item)
            if not recipe:
                continue
            per_min_output = recipe.outputs[0].rate_per_min
            machines_needed = total_rate / per_min_output

            machine_plan.append({
                "item": item,
                "machine": recipe.machine,
                "count": round(machines_needed, 2),
                "rate": round(total_rate, 2)
            })

        return machine_plan

    async def build_simplify_graph(self, targets):
        demand = await self.compute_total_demand(targets)
        nodes = []
        edges = []
        id_counter = 0
        item_to_node = {}

        async def create_node(item: str) -> str:
            nonlocal id_counter
            node_id = f"node_{id_counter}"
            id_counter += 1
            item_to_node[item] = node_id

            recipe = await self.recipe_repo.get_recipe_by_output(item)
            if not recipe:
                return node_id
            primary_output = recipe.outputs[0]

            per_min_output = primary_output.rate_per_min
            count = demand[item] / per_min_output
            node = Node(
                id=node_id,
                label=f"{recipe.machine} ({item})\n{count:.2f}x",
                type=NodeType.MACHINE,
                item=item,
                rate=per_min_output * count,
                machine=recipe.machine,
                count=count
            )
            nodes.append(node)

            for ing in recipe.inputs:
                source_id = item_to_node.get(ing.item) or await create_node(ing.item)
                ing_rate = ing.rate_per_min
                edges.append(Edge(
                    source=source_id,
                    target=node_id,
                    label=f"{count * ing_rate:.2f}/min"
                ))

            return node_id

        for item in demand:
            if item not in item_to_node:
                await create_node(item)

        return FactoryGraph(nodes=nodes, edges=edges)

    @staticmethod
    def expend_nodes(nodes: List[Node]) -> List[Node]:
        expanded_nodes = []
        for node in nodes:
            if node.type != NodeType.MACHINE:
                expanded_nodes.append(node)
                continue
            recipe_rate = node.rate / node.count
            full_units = int(node.count)
            partial = node.count - full_units

            for i in range(full_units):
                new_id = f"{node.id}_unit_{i + 1}"
                new_node = Node(
                    **node.model_dump(exclude={'id', 'label', 'count', 'rate'}),
                    rate=recipe_rate,
                    id=new_id,
                    label=f"{node.machine} ({node.item}) #{i + 1}\n1.00x",
                    count=1.0
                )
                expanded_nodes.append(new_node)

            if partial > 0:
                new_id = f"{node.id}_unit_{full_units + 1}"
                new_node = Node(
                    **node.model_dump(exclude={'id', 'label', 'count', 'rate'}),
                    rate=recipe_rate * partial,
                    id=new_id,
                    label=f"{node.machine} ({node.item}) #{full_units + 1}\n{partial:.2f}x",
                    count=partial
                )
                expanded_nodes.append(new_node)
        return expanded_nodes

    async def build_realistic_graph(self, graph: FactoryGraph):

        expanded_edges = []
        supply_map = defaultdict(lambda: defaultdict(float))
        demand_map = defaultdict(lambda: defaultdict(float))

        # Step 1: Expand machine clusters into individual nodes
        expanded_nodes = self.expend_nodes(graph.nodes)

        # Step 2: Build supply and demand maps
        for node in expanded_nodes:
            if node.type != NodeType.MACHINE:
                continue

            recipe = await self.recipe_repo.get_recipe_by_output(node.item)
            if not recipe:
                continue

            supply_map[node.id][node.item] += node.rate

            for ing in recipe.inputs:
                required_rate = ing.rate_per_min * node.count
                demand_map[node.id][ing.item] += required_rate

        # Step 3: Match supply to demand per item
        items = set()
        for node_rates in supply_map.values():
            items.update(node_rates.keys())
        for node_rates in demand_map.values():
            items.update(node_rates.keys())

        for item in items:
            # Nodes that can produce the item
            producers = [(nid, supply_map[nid][item]) for nid in supply_map if item in supply_map[nid]]
            # Nodes that need the item
            consumers = [(nid, demand_map[nid][item]) for nid in demand_map if item in demand_map[nid]]

            for consumer_id, needed in consumers:
                for producer_idx in range(len(producers)):
                    producer_id, available = producers[producer_idx]

                    if needed <= 0:
                        break
                    if available <= 0:
                        continue

                    flow = min(needed, available)
                    if flow <= 0:
                        continue

                    expanded_edges.append(Edge(
                        source=producer_id,
                        target=consumer_id,
                        label=f"{flow:.2f}/min"
                    ))

                    # Update maps and producer tuple
                    supply_map[producer_id][item] -= flow
                    demand_map[consumer_id][item] -= flow
                    producers[producer_idx] = (producer_id, supply_map[producer_id][item])
                    needed -= flow

        return FactoryGraph(nodes=expanded_nodes, edges=expanded_edges)
