from models.graph import FactoryGraph, Node, Edge, NodeType


def get_mock_graph() -> FactoryGraph:
    nodes = [
        Node(
            id="node_0",
            label="Assembler (Smart Plating)\\n1.00x",
            type=NodeType.MACHINE,
            item="smart_plating",
            machine="assembler",
            count=1.0
        ),
        Node(
            id="node_1",
            label="Assembler (Reinforced Iron Plate)\\n0.40x",
            type=NodeType.MACHINE,
            item="reinforced_iron_plate",
            machine="assembler",
            count=0.4
        ),
        Node(
            id="node_2",
            label="Iron Ore (Raw)",
            type=NodeType.RESOURCE,
            item="iron_ore"
        ),
        Node(
            id="node_3",
            label="Constructor (Iron Rod)\\n1.00x",
            type=NodeType.MACHINE,
            item="iron_rod",
            machine="constructor",
            count=1.0
        ),
        Node(
            id="node_4",
            label="Splitter (Iron Rod)",
            type=NodeType.SPLITTER,
            item="iron_rod"
        )
    ]

    edges = [
        Edge(source="node_2", target="node_3", label="60/min"),
        Edge(source="node_3", target="node_4", label="60/min"),
        Edge(source="node_4", target="node_0", label="30/min"),
        Edge(source="node_4", target="node_1", label="30/min")
    ]

    return FactoryGraph(nodes=nodes, edges=edges)
