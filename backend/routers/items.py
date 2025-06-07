from fastapi import APIRouter, Depends

from dal.base import ItemRepository
from utils.repositories import get_item_repo

router = APIRouter(tags=["Items"])


@router.get("/")
async def list_items(item_repo: ItemRepository = Depends(get_item_repo)):
    return await item_repo.get_all_items()


@router.get("/{item_id}")
async def get_item(item_id: str, item_repo: ItemRepository = Depends(get_item_repo)):
    return await item_repo.get_item_by_id(item_id)
