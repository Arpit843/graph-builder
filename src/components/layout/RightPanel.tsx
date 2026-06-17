import React from 'react';
import NodeInspector from '../inspector/NodeInspector';

const RightPanel: React.FC = () => {
  return (
    <aside className="w-80 h-full border-l border-slate-800 bg-slate-900 flex flex-col overflow-hidden z-10 shadow-2xl">
      <NodeInspector />
    </aside>
  );
};

export default RightPanel;
