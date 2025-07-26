from enum import Enum

from pydantic import BaseModel
from typing import Dict, Optional, Union


class NodeType(str, Enum):
    MACHINE = "machine"
    RESOURCE = "resource"
    SPLITTER = "splitter"
    MERGER = "merger"
    TARGET = "target"


class InnerNode(BaseModel):
    id: str
    inputs: Dict[str, float]  # item -> rate
    outputs: Dict[str, float]  # item -> rate
    primary_output: str
    machine: str
    count: float  # machine count or underclock factor
    type: NodeType


class Node(BaseModel):
    id: str
    label: Optional[str] = None
    type: NodeType
    rate: float
    item: str
    machine: str
    count: float  # machine count or underclock factor


class Edge(BaseModel):
    source: str
    target: str
    label: Optional[str] = None  # flow rate, e.g. "30/min"
