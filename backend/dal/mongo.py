from models.machine import Machine
from dal.base import ItemRepository, RecipeRepository, MachineRepository
from models.items import Item
from models.recipe import Recipe


class MongoItemRepository(ItemRepository):
    def __init__(self, db):
        self.collection = db["items"]

    async def get_item_by_id(self, item_id: str):
        doc = await self.collection.find_one({"id": item_id})
        return Item(**doc) if doc else None

    async def get_all_items(self):
        cursor = self.collection.find()
        return [Item(**doc) async for doc in cursor]

    async def is_source(self, item_id: str):
        item = await self.get_item_by_id(item_id)
        return item.is_source if item else False


class MongoRecipeRepository(RecipeRepository):
    def __init__(self, db):
        self.collection = db["recipes"]

    async def get_recipe_by_output(self, item_id: str):
        doc = await self.collection.find_one({"id": item_id})
        return Recipe(**doc) if doc else None

    async def get_all_recipes(self):
        cursor = self.collection.find()
        return [Recipe(**doc) async for doc in cursor]


class MongoMachineRepository(MachineRepository):
    def __init__(self, db):
        self.collection = db["machines"]

    async def get_machine_by_id(self, machine_id: str):
        doc = await self.collection.find_one({"id": machine_id})
        return Machine(**doc) if doc else None

    async def get_all_machines(self):
        cursor = self.collection.find()
        return [Machine(**doc) async for doc in cursor]
