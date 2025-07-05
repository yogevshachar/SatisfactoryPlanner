from enum import Enum

from pydantic import BaseModel
from typing import Optional, Union


class NodeType(str, Enum):
    MACHINE = "machine"
    RESOURCE = "resource"
    SPLITTER = "splitter"
    MERGER = "merger"
    TARGET = "target"

class Node(BaseModel):
    id: str
    label: str
    type: NodeType
    rate: float
    item: str
    machine: str
    count: float  # machine count or underclock factor

class RawNode(BaseModel):
    id: str
    label: str
    item: str
    type: NodeType

GraphNode = Union[Node, RawNode]
    

class Edge(BaseModel):
    source: str
    target: str
    label: Optional[str] = None  # flow rate, e.g. "30/min"
    rate: Optional[float] = None
    item: Optional[str] = None

