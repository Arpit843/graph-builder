import React, { useRef } from 'react';
import { ServiceNode } from '../../types';
import { useAppStore } from '../../store/appStore';

interface NodeProps {
  node: ServiceNode;
}

const ServiceNodeComponent: React.FC<NodeProps> = ({ node }) => {
  const { selectedNodeId, selectNode, updateNodePosition } = useAppStore((state) => ({
    selectedNodeId: state.selectedNodeId,
    selectNode: state.selectNode,
    updateNodePosition: state.updateNodePosition,
  }));

  const nodeRef = useRef<HTMLDivElement>(null);
  const dragStart = useRef({ x: 0, y: 0 });

  const isSelected = selectedNodeId === node.id;

  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid triggering canvas click handler
    selectNode(node.id);

    dragStart.current = {
      x: e.clientX - node.position.x,
      y: e.clientY - node.position.y,
    };

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const newX = moveEvent.clientX - dragStart.current.x;
      const newY = moveEvent.clientY - dragStart.current.y;
      updateNodePosition(node.id, { x: newX, y: newY });
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const statusBorderColor = {
    active: 'border-emerald-500/40 shadow-emerald-950/20',
    inactive: 'border-slate-700/60 shadow-transparent',
    warning: 'border-amber-500/40 shadow-amber-950/20',
    error: 'border-rose-500/40 shadow-rose-950/20',
  }[node.status];

  return (
    <div
      ref={nodeRef}
      onMouseDown={handleMouseDown}
      style={{
        transform: `translate3d(${node.position.x}px, ${node.position.y}px, 0px)`,
      }}
      className={`absolute pointer-events-auto w-40 min-h-[70px] bg-slate-900 border p-3 rounded-lg flex flex-col justify-between cursor-move shadow-md select-none transition-shadow ${statusBorderColor} ${
        isSelected ? 'ring-1 ring-emerald-400 border-emerald-400 shadow-lg' : 'hover:border-slate-600'
      }`}
    >
      <div className="flex flex-col">
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">{node.type}</span>
        <span className="text-xs font-semibold text-slate-200 truncate mt-0.5">{node.label}</span>
      </div>
      
      {node.metrics && (
        <div className="flex justify-between items-center text-[9px] font-mono text-slate-400 mt-2 border-t border-slate-800/60 pt-1.5">
          <span>CPU: {node.metrics.cpu}%</span>
          <span>{node.metrics.latency}ms</span>
        </div>
      )}
    </div>
  );
};

export default ServiceNodeComponent;
