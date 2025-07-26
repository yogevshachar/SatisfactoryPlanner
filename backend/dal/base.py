from abc import ABC, abstractmethod
from typing import Optional
from models.items import Item
from models.recipe import Recipe
from models.machine import Machine


class ItemRepository(ABC):
    @abstractmethod
    async def get_item_by_id(self, item_id: str) -> Optional[Item]: ...

    @abstractmethod
    async def get_all_items(self) -> list[Item]: ...

    @abstractmethod
    async def is_source(self, item_id: str) -> bool: ...


class RecipeRepository(ABC):
    @abstractmethod
    async def get_recipe_by_output(self, item_id: str) -> Optional[Recipe]: ...

    @abstractmethod
    async def get_all_recipes(self) -> list[Recipe]: ...


class MachineRepository(ABC):
    @abstractmethod
    async def get_machine_by_id(self, machine_id: str) -> Optional[Machine]: ...

    @abstractmethod
    async def get_all_machines(self) -> list[Machine]: ...
