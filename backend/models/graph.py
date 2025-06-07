from enum import Enum

from pydantic import BaseModel
from typing import Optional, List


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
    rate: Optional[float]=0
    item: Optional[str] = None
    machine: Optional[str] = None
    count: Optional[float] = None  # machine count or underclock factor

class Edge(BaseModel):
    source: str
    target: str
    label: Optional[str] = None  # flow rate, e.g. "30/min"
    rate: Optional[float] = None
    item: Optional[str] = None

