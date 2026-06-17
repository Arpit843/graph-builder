import React from 'react';
import { useAppStore } from '../../store/appStore';
import { NodeType } from '../../types';

const LeftRail: React.FC = () => {
  const { nodes, selectedNodeId, selectNode } = useAppStore((state) => ({
    nodes: state.nodes,
    selectedNodeId: state.selectedNodeId,
    selectNode: state.selectNode
  }));

  const categories: NodeType[] = ['gateway', 'frontend', 'backend', 'database'];

  return (
    <aside className="w-64 h-full border-r border-slate-800 bg-slate-900/60 backdrop-blur-md flex flex-col overflow-hidden z-10 select-none">
      <div className="p-4 border-b border-slate-800/80 bg-slate-900/40">
        <h2 className="text-xs font-bold text-slate-400 tracking-wider uppercase">Infrastructure Inventory</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-4 custom-scrollbar">
        {categories.map(category => {
          const matchingNodes = nodes.filter(n => n.type === category);
          if (matchingNodes.length === 0) return null;

          return (
            <div key={category} className="flex flex-col gap-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-2 mb-1">
                {category}s ({matchingNodes.length})
              </span>
              {matchingNodes.map(node => (
                <button
                  key={node.id}
                  onClick={() => selectNode(node.id)}
                  className={`flex items-center justify-between w-full text-left px-3 py-2 rounded-md transition-all text-xs border ${
                    selectedNodeId === node.id
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 font-medium'
                      : 'border-transparent text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                  }`}
                >
                  <span className="truncate pr-2">{node.label}</span>
                  <span className={`h-1.5 w-1.5 rounded-full flex-shrink-0 ${
                    node.status === 'active' ? 'bg-emerald-500' :
                    node.status === 'warning' ? 'bg-amber-500' : 'bg-rose-500'
                  }`} />
                </button>
              ))}
            </div>
          );
        })}
      </div>
    </aside>
  );
};

export default LeftRail;
