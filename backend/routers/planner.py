from typing import Dict, List, Optional

from fastapi import APIRouter, Depends
from pydantic import BaseModel

from services.shard_allocator import ShardStrategy
from dal.base import ItemRepository, RecipeRepository, MachineRepository
from models.planner import FactoryGraph, DemandEntry, MachinePlanEntry
from models.machine import CostEntry
from services.factory_builder import FactoryPlanner, to_public_node
from utils.repositories import get_machine_repo, get_recipe_repo, get_item_repo

router = APIRouter()


class TargetItem(BaseModel):
    item: str
    rate: int


class PlannerRequest(BaseModel):
    targets: List[TargetItem]
    tier: Optional[int] = 8
    realistic: Optional[bool] = False
    powerShards: Optional[int] = 0
    shard_strategy: Optional[ShardStrategy] = ShardStrategy.MACHINE_MINIMIZING


@router.post("/demand", response_model=List[DemandEntry])
async def calculate_factory_demands(
    req: PlannerRequest,
    item_repo: ItemRepository = Depends(get_item_repo),
    recipe_repo: RecipeRepository = Depends(get_recipe_repo),
    machine_repo: MachineRepository = Depends(get_machine_repo),
):
    planner = FactoryPlanner(item_repo, recipe_repo, machine_repo)
    demand = await planner.planProduction(req.targets)
    return [{"item": item, "rate": round(rate, 2)} for item, rate in demand.items()]


@router.post("/machine_plan", response_model=List[MachinePlanEntry])
async def calculate_factory_machine(
    req: PlannerRequest,
    item_repo: ItemRepository = Depends(get_item_repo),
    recipe_repo: RecipeRepository = Depends(get_recipe_repo),
    machine_repo: MachineRepository = Depends(get_machine_repo),
):
    planner = FactoryPlanner(item_repo, recipe_repo, machine_repo)
    return await planner.compute_machine_plan(req.targets)


@router.post("/reuse", response_model=FactoryGraph)
async def plan_factory(
    req: PlannerRequest,
    item_repo: ItemRepository = Depends(get_item_repo),
    recipe_repo: RecipeRepository = Depends(get_recipe_repo),
    machine_repo: MachineRepository = Depends(get_machine_repo),
):
    planner = FactoryPlanner(item_repo, recipe_repo, machine_repo)
    demand = await planner.planProduction(req.targets)
    if req.realistic:
        machine_nodes = await planner.generate_detailed_machine_nodes(
            demand,
            req.powerShards or 0,
            req.shard_strategy or ShardStrategy.MACHINE_MINIMIZING,
        )
    else:
        machine_nodes = await planner.generate_simple_machine_nodes(demand)
    edges = await planner.connect_nodes(machine_nodes)
    public_nodes = [to_public_node(n) for n in machine_nodes]
    return FactoryGraph(nodes=public_nodes, edges=edges)


@router.post("/factory_cost", response_model=List[CostEntry])
async def calculate_factory_cost(
    req: PlannerRequest,
    item_repo: ItemRepository = Depends(get_item_repo),
    recipe_repo: RecipeRepository = Depends(get_recipe_repo),
    machine_repo: MachineRepository = Depends(get_machine_repo),
):
    planner = FactoryPlanner(item_repo, recipe_repo, machine_repo)
    cost_dict = await planner.compute_factory_cost(req.targets)
    return [
        CostEntry(item=item, quantity=round(cost, 2))
        for item, cost in cost_dict.items()
    ]


@router.post("/factory_source", response_model=List[CostEntry])
async def calculate_factory_source(
    req: PlannerRequest,
    item_repo: ItemRepository = Depends(get_item_repo),
    recipe_repo: RecipeRepository = Depends(get_recipe_repo),
    machine_repo: MachineRepository = Depends(get_machine_repo),
):
    planner = FactoryPlanner(item_repo, recipe_repo, machine_repo)
    return await planner.compute_factory_source(req.targets)
