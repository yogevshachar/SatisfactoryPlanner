from pydantic import BaseModel
from typing import List

from models.base import GameEntityBase


class IOEntry(BaseModel):
    item: str
    amount: float

class Recipe(GameEntityBase):
    inputs: List[IOEntry]
    outputs: List[IOEntry]
    duration: float
    machine: str
