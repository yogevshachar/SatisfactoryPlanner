from typing import List, Optional

from fastapi import APIRouter, Depends
from pydantic import BaseModel

from dal.base import ItemRepository, RecipeRepository, MachineRepository
from models.planner import FactoryGraph, DemandEntry, MachinePlanEntry
from services.factory_builder import FactoryPlanner
from utils.repositories import get_machine_repo, get_recipe_repo, get_item_repo

router = APIRouter()


class TargetItem(BaseModel):
    item: str
    rate: int


class PlannerRequest(BaseModel):
    targets: List[TargetItem]
    tier: Optional[int] = 8
    realistic: Optional[bool] = False


@router.post("/demand", response_model=List[DemandEntry])
async def calculate_factory_demands(
        req: PlannerRequest,
        item_repo: ItemRepository = Depends(get_item_repo),
        recipe_repo: RecipeRepository = Depends(get_recipe_repo),
        machine_repo: MachineRepository = Depends(get_machine_repo),
):
    planner = FactoryPlanner(item_repo, recipe_repo, machine_repo)
    demand = await planner.compute_total_demand(req.targets)
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
    graph = await planner.build_simplify_graph(req.targets)
    if req.realistic:

        graph = await planner.build_realistic_graph(graph)
        print(graph)
    return graph
