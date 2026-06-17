import { http, HttpResponse } from 'msw';

// 1. In-memory Mock Database
let mockNodes = [
  { id: '1', type: 'gateway', label: 'API Gateway', status: 'active', position: { x: 100, y: 250 } },
  { id: '2', type: 'frontend', label: 'Web Portal', status: 'active', position: { x: 300, y: 100 } },
  { id: '3', type: 'backend', label: 'Auth Service', status: 'warning', position: { x: 500, y: 150 } },
  { id: '4', type: 'backend', label: 'Core Engine', status: 'active', position: { x: 500, y: 350 } },
  { id: '5', type: 'database', label: 'User DB', status: 'active', position: { x: 750, y: 250 } }
];

let mockEdges = [
  { id: 'e1-2', sourceId: '1', targetId: '2', type: 'sync' },
  { id: 'e2-3', sourceId: '2', targetId: '3', type: 'sync' },
  { id: 'e2-4', sourceId: '2', targetId: '4', type: 'async' },
  { id: 'e3-5', sourceId: '3', targetId: '5', type: 'sync' },
  { id: 'e4-5', sourceId: '4', targetId: '5', type: 'sync' }
];

// 2. Request Interceptor Handlers
export const handlers = [
  // GET Request: Fetch entire graph data structure
  http.get('/api/graph-data', () => {
    return HttpResponse.json({
      nodes: mockNodes,
      edges: mockEdges
    });
  }),

  // POST Request: Simulate node position updates on the server persistence layer
  http.post('/api/nodes/update-position', async ({ request }) => {
    const requestBody = await request.json() as { id: string; position: { x: number; y: number } };
    const { id, position } = requestBody;

    mockNodes = mockNodes.map(node => 
      node.id === id ? { ...node, position } : node
    );

    return HttpResponse.json({ success: true, updatedNodeId: id });
  })
];
