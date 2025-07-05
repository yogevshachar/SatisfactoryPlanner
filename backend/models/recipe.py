from pydantic import BaseModel
from typing import List

from models.base import GameEntityBase


class IOEntry(BaseModel):
    item: str
    rate_per_min: float

class Recipe(GameEntityBase):
    inputs: List[IOEntry]
    outputs: List[IOEntry]
    machine: str
