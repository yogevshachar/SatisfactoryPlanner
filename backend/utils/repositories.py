from fastapi import Request

from dal.base import MachineRepository, RecipeRepository, ItemRepository


def get_item_repo(request: Request) -> ItemRepository:
    return request.app.state.item_repo


def get_recipe_repo(request: Request) -> RecipeRepository:
    return request.app.state.recipe_repo


def get_machine_repo(request: Request) -> MachineRepository:
    return request.app.state.machine_repo