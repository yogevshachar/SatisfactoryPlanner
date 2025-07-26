import { useEffect } from "react";
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
  BackgroundVariant,
} from "reactflow";
import "reactflow/dist/style.css";
import { getLayoutedElements } from "../utils/layout.ts";
import { useGraphQuery } from "../hooks/usePlanner";

const FactoryGraph = () => {
  const graphQuery = useGraphQuery();
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const isLoading = graphQuery.isPending;
  const error = graphQuery.error;

  useEffect(() => {
    if (!graphQuery.data) return;
    const rawNodes: Node[] = graphQuery.data?.nodes.map((node) => ({
      id: node.id,
      data: { label: node.label },
      position: { x: 0, y: 0 },
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

    const rawEdges: Edge[] = graphQuery.data.edges.map((edge) => ({
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
      labelBgStyle: { fill: "#fff", fillOpacity: 0.7 },
    }));
    if (isLoading) return;
    if (error) return;

    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      rawNodes,
      rawEdges,
      "LR"
    );

    setNodes(layoutedNodes);
    setEdges(layoutedEdges);
  }, [graphQuery.data]);

  return (
    <div className="w-full h-full border rounded">
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
          <MiniMap nodeStrokeWidth={3} />
          <Controls showInteractive />
          <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
};

export default FactoryGraph;
