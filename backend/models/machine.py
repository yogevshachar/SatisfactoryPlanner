from typing import List, Dict

from pydantic import BaseModel

from models.base import GameEntityBase

class CostEntry(BaseModel):
    item: str
    amount: float

class BuildingSize(BaseModel):
    x: int
    y: int
    z: int

class Machine(GameEntityBase):
    cost: List[CostEntry]
    power_consumption: float
    max_clock_speed: float
    min_clock_speed: float
    allowed_recipes: List[str]
    building_size: BuildingSize
    category: str
    inputs: int
    outputs: int