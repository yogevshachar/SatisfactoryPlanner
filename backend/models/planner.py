from typing import List

from pydantic import BaseModel

from models.graph import Node, Edge


class DemandEntry(BaseModel):
    item: str
    rate: float


class FactoryGraph(BaseModel):
    nodes: List[Node]
    edges: List[Edge]


class MachinePlanEntry(BaseModel):
    item: str
    machine: str
    count: float
    rate: float
