import React, {useEffect} from "react";
import ReactFlow, {
    ReactFlowProvider,
    MiniMap,
    Controls,
    Background,
    type Node,
    type Edge,
    useNodesState,
    useEdgesState,
    MarkerType,
    BackgroundVariant
} from "reactflow";
import "reactflow/dist/style.css";
import {getLayoutedElements} from "../utils/layout.ts";
import type { FactoryGraph as GraphType } from "../types/factory.types";

type Props = {
    graphData: GraphType;
};

const FactoryGraph: React.FC<Props> = ({graphData}) => {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    useEffect(() => {
        const rawNodes: Node[] = graphData.nodes.map((node) => ({
            id: node.id,
            data: {label: node.label},
            position: {x: 0, y: 0},
            type: "default",
            style: {
                background: node.type === "machine" ? "#CFFAFE" : "#FDE68A",
                border: "1px solid #555",
                borderRadius: 8,
                padding: 10,
                fontSize: 12,
                width: 180,
            },
        }));

        const rawEdges: Edge[] = graphData.edges.map((edge) => ({
            id: `${edge.source}-${edge.target}`,
            source: edge.source,
            target: edge.target,
            label: edge.label,
            animated: true,
            markerEnd: {
                type: MarkerType.ArrowClosed,
                color: "#555",
            },
            labelBgPadding: [4, 2],
            labelBgStyle: {fill: "#fff", fillOpacity: 0.7},
        }));

        const {nodes: layoutedNodes, edges: layoutedEdges} = getLayoutedElements(
            rawNodes,
            rawEdges,
            "LR"
        );

        setNodes(layoutedNodes);
        setEdges(layoutedEdges);
    }, [graphData]);

    return (
        <div className="w-full h-[800px] border rounded">
            <ReactFlowProvider>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    fitView
                    panOnDrag
                    zoomOnScroll
                    draggable
                >
                    <MiniMap nodeStrokeWidth={3}/>
                    <Controls showInteractive/>
                    <Background variant={BackgroundVariant.Dots} gap={12} size={1}/>
                </ReactFlow>
            </ReactFlowProvider>
        </div>
    );
};

export default FactoryGraph;
