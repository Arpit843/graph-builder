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
export const useAppStore = create<GraphState & AppActions>((set) => ({
  nodes: [],
  edges: [],
  selectedNodeId: null,
  isSidebarOpen: true,
  isLoading: false,
  error: null,
  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),
  selectNode: (id) => set({ selectedNodeId: id }),
  updateNodePosition: (id, position) =>
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === id ? { ...node, position } : node
      ),
    })),
  updateNodeData: (id, updates) =>
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === id ? { ...node, ...updates } : node
      ),
    })),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
}));







