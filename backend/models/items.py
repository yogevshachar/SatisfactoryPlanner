from typing import Optional
from models.base import GameEntityBase
from enum import Enum


class ItemType(str, Enum):
    SOLID = "solid"
    LIQUID = "liquid"
    GAS = "gas"


class Item(GameEntityBase):
    name: str
    type: ItemType
    stack_size: int
    sink_value: int
    unlocked_by_tier: int
    is_source: Optional[bool] = None
