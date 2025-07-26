from collections import defaultdict
from enum import Enum
import math
from typing import List

from models.graph import InnerNode


class ShardStrategy(str, Enum):
    BELT_MINIMIZING = "belt_minimizing"
    MACHINE_MINIMIZING = "machine_minimizing"
    PRIORITY_BASED = "priority_based"
    EQUAL_SPREAD = "equal_spread"
    EFFICIENCY = "efficiency"
    MANUAL = "manual"


class ShardAllocator:
    def __init__(self, strategy: ShardStrategy):
        self.strategy = strategy

    def allocate(self, nodes: List[InnerNode], power_shards: int) -> List[InnerNode]:
        if self.strategy == ShardStrategy.BELT_MINIMIZING:
            return self._allocate_belt_minimizing(nodes, power_shards)
        elif self.strategy == ShardStrategy.MACHINE_MINIMIZING:
            return self._allocate_machine_minimizing(nodes, power_shards)
        elif self.strategy == ShardStrategy.PRIORITY_BASED:
            return self._allocate_priority_based(nodes, power_shards)
        elif self.strategy == ShardStrategy.EQUAL_SPREAD:
            return self._allocate_equal_spread(nodes, power_shards)
        elif self.strategy == ShardStrategy.EFFICIENCY:
            return self._allocate_efficiency(nodes, power_shards)
        elif self.strategy == ShardStrategy.MANUAL:
            return self._allocate_manual(nodes, power_shards)
        else:
            raise ValueError(f"Invalid strategy: {self.strategy}")

    def _allocate_belt_minimizing(
        self, nodes: List[InnerNode], power_shards: int
    ) -> List[InnerNode]:
        return nodes

    def _allocate_machine_minimizing(
        self, nodes: List[InnerNode], power_shards: int
    ) -> List[InnerNode]:

        nodes_by_output = defaultdict(list)
        partial_nodes = []
        for node in nodes:
            nodes_by_output[node.primary_output].append(node)
            if node.count < 1:
                partial_nodes.append(node)
        sorted_partial_nodes = sorted(partial_nodes, key=lambda x: x.count)
        for node in sorted_partial_nodes:
            if len(nodes_by_output[node.primary_output]) <= 1:
                continue
            shards_to_add = math.ceil(node.count / 0.5)
            if shards_to_add > power_shards:
                continue
            nodes_by_output[node.primary_output].sort(
                key=lambda x: x.count, reverse=True
            )
            nodes_by_output[node.primary_output][0] = merge_nodes(
                nodes_by_output[node.primary_output][0], node
            )
            nodes_by_output[node.primary_output].remove(node)
            power_shards -= shards_to_add

        result_nodes = []
        for group in nodes_by_output.values():
            result_nodes.extend(group)

        return result_nodes

    def _allocate_priority_based(
        self, nodes: List[InnerNode], power_shards: int
    ) -> List[InnerNode]:
        return nodes

    def _allocate_equal_spread(
        self, nodes: List[InnerNode], power_shards: int
    ) -> List[InnerNode]:
        return nodes

    def _allocate_efficiency(
        self, nodes: List[InnerNode], power_shards: int
    ) -> List[InnerNode]:
        return nodes

    def _allocate_manual(
        self, nodes: List[InnerNode], power_shards: int
    ) -> List[InnerNode]:
        return nodes


def merge_nodes(main_node: InnerNode, secondary_node: InnerNode) -> InnerNode:
    multiplier = (secondary_node.count + main_node.count) / main_node.count
    return InnerNode(
        id=main_node.id,
        type=main_node.type,
        inputs={k: v * multiplier for k, v in main_node.inputs.items()},
        outputs={k: v * multiplier for k, v in main_node.outputs.items()},
        primary_output=main_node.primary_output,
        machine=main_node.machine,
        count=main_node.count + secondary_node.count,
    )
