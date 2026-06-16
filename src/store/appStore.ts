interface AppActions {
  setNodes: (nodes: ServiceNode[]) => void;
  setEdges: (edges: NodeEdge[]) => void;
  selectNode: (id: string | null) => void;
  updateNodePosition: (id: string, position: Position) => void;
  updateNodeData: (id: string, updates: Partial<ServiceNode>) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  toggleSidebar: () => void;
}
