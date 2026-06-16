export interface Position {
  x: number;
  y: number;
}

export type NodeStatus = 'active' | 'inactive' | 'warning' | 'error';
export type NodeType = 'frontend' | 'backend' | 'database' | 'gateway';
export type EdgeType = 'default' | 'async' | 'sync';

export interface ServiceNode {
  id: string;
  type: NodeType;
  label: string;
  status: NodeStatus;
  position: Position;
  metrics?: {
    cpu: number;
    memory: number;
    latency: number;
  };
}

export interface NodeEdge {
  id: string;
  sourceId: string;
  targetId: string;
  type?: EdgeType;
}

export interface GraphState {
  nodes: ServiceNode[];
  edges: NodeEdge[];
  selectedNodeId: string | null;
  isSidebarOpen: boolean;
  isLoading: boolean;
  error: string | null;
}
