import React, { useState } from 'react';
import { useAppStore } from '../../store/appStore';
import Badge from '../ui/Badge';
import Slider from '../ui/Slider';
import Tabs from '../ui/Tabs';
import { NodeStatus } from '../../types';

const NodeInspector: React.FC = () => {
  const { nodes, selectedNodeId, updateNodeData } = useAppStore((state) => ({
    nodes: state.nodes,
    selectedNodeId: state.selectedNodeId,
    updateNodeData: state.updateNodeData
  }));

  const [activeTab, setActiveTab] = useState('Configuration');

  const node = nodes.find((n) => n.id === selectedNodeId);
  if (!node) return null;

  const statuses: NodeStatus[] = ['active', 'warning', 'error', 'inactive'];

  return (
    <div className="h-full w-full flex flex-col overflow-hidden bg-slate-900">
      <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/40">
        <div className="truncate pr-2">
          <h3 className="text-sm font-bold text-slate-200 truncate">{node.label}</h3>
          <span className="text-[10px] font-mono text-slate-500 uppercase">{node.type} // ID: {node.id}</span>
        </div>
        <Badge status={node.status} />
      </div>

      <Tabs 
        tabs={['Configuration', 'Telemetry']} 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
      />

      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar flex flex-col gap-5">
        {activeTab === 'Configuration' ? (
          <>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Modify Identity</label>
              <input
                type="text"
                value={node.label}
                onChange={(e) => updateNodeData(node.id, { label: e.target.value })}
                className="w-full bg-slate-950 text-xs text-slate-200 px-3 py-2 rounded-md border border-slate-800 focus:border-emerald-500/50 focus:outline-none transition-colors"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Lifecycle Override</label>
              <div className="grid grid-cols-2 gap-2">
                {statuses.map((status) => (
                  <button
                    key={status}
                    onClick={() => updateNodeData(node.id, { status })}
                    className={`px-2 py-1.5 rounded-md border text-[10px] uppercase font-mono tracking-wide transition-all ${
                      node.status === status
                        ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400 font-bold'
                        : 'bg-slate-950 border-slate-800 text-slate-500 hover:border-slate-700 hover:text-slate-300'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col gap-4">
            <Slider
              label="Simulated CPU Latency Stress"
              value={node.metrics?.cpu ?? 0}
              onChange={(val) => updateNodeData(node.id, { metrics: { ...node.metrics!, cpu: val } })}
            />
            <Slider
              label="Allocated RAM Profile Heap"
              value={node.metrics?.memory ?? 0}
              onChange={(val) => updateNodeData(node.id, { metrics: { ...node.metrics!, memory: val } })}
            />
            <Slider
              label="Network Wire Wire Delay"
              value={node.metrics?.latency ?? 0}
              min={0}
              max={1000}
              unit="ms"
              onChange={(val) => updateNodeData(node.id, { metrics: { ...node.metrics!, latency: val } })}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default NodeInspector;
