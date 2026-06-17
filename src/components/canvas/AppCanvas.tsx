import React, { useRef } from 'react';
import { useAppStore } from '../../store/appStore';
import ServiceNodeComponent from './ServiceNode';

const AppCanvas: React.FC = () => {
  const { nodes, edges, selectNode } = useAppStore((state) => ({
    nodes: state.nodes,
    edges: state.edges,
    selectNode: state.selectNode,
  }));

  const canvasRef = useRef<HTMLDivElement>(null);

  const handleCanvasClick = (e: React.MouseEvent) => {
    // If clicking directly on the canvas background, deselect any active node
    if (e.target === canvasRef.current || e.target === canvasRef.current?.firstChild) {
      selectNode(null);
    }
  };

  return (
    <div
      ref={canvasRef}
      onClick={handleCanvasClick}
      className="w-full h-full relative overflow-hidden bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] bg-slate-950 cursor-grab active:cursor-grabbing select-none"
    >
      {/* SVG Layer for Drawing Connection Lines */}
      <svg className="absolute inset-0 pointer-events-none w-full h-full z-0">
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="20" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#475569" />
          </marker>
        </defs>
        {edges.map((edge) => {
          const sourceNode = nodes.find((n) => n.id === edge.sourceId);
          const targetNode = nodes.find((n) => n.id === edge.targetId);

          if (!sourceNode || !targetNode) return null;

          // Vector calculation from center points of the nodes (assuming 160x70 approx dimensions)
          const x1 = sourceNode.position.x + 80;
          const y1 = sourceNode.position.y + 35;
          const x2 = targetNode.position.x + 80;
          const y2 = targetNode.position.y + 35;

          return (
            <g key={edge.id}>
              <line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={edge.type === 'async' ? '#334155' : '#475569'}
                strokeWidth="2"
                strokeDasharray={edge.type === 'async' ? '5 5' : '0'}
                className="transition-all duration-150"
                markerEnd="url(#arrow)"
              />
            </g>
          );
        })}
      </svg>

      {/* Interactive Layer for Nodes */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {nodes.map((node) => (
          <ServiceNodeComponent key={node.id} node={node} />
        ))}
      </div>
    </div>
  );
};

export default AppCanvas;
