from fastapi import APIRouter, Depends

from dal.base import RecipeRepository
from utils.repositories import get_recipe_repo

router = APIRouter()


@router.get("/")
async def list_recipes(recipe_repo: RecipeRepository = Depends(get_recipe_repo)):
    return await recipe_repo.get_all_recipes()

@router.get("/{recipe_id}")
async def get_recipe(recipe_id: str,recipe_repo: RecipeRepository = Depends(get_recipe_repo)):
    return await recipe_repo.get_recipe_by_output(recipe_id)