export type Item = {
    id: string;
    name: string;
    type: string;
    stack_size: number;
    sink_value: number;
    unlocked_by_tier: number;
};

export type PlannerPayload = {
    targets: { item: string; rate: number }[];
    tier: number;
    realistic: boolean;
};

export type DemandEntry = {
    item: string;
    rate: number;
};
export type MachineNode = {
    id: string;
    label: string;
    type: "machine" | "splitter" | "merger";
    item: string;
    rate: number;
    machine: string;
    count: number;
};

export type ResourceNode = {
    id: string;
    label: string;
    type: "resource";
    item: string;
};

export type GraphNode = MachineNode | ResourceNode;

export type GraphEdge = {
    source: string;
    target: string;
    label?: string;
    rate?: number;
    item?: string;
};

export type FactoryGraph = {
    nodes: GraphNode[];
    edges: GraphEdge[];
};

export type PlannerTarget = {
    item: string;
    rate: number;
};
