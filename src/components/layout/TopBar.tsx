import React from 'react';
import { useAppStore } from '../../store/appStore';

const TopBar: React.FC = () => {
  const nodes = useAppStore((state) => state.nodes);
  const isSidebarOpen = useAppStore((state) => state.isSidebarOpen);
  const toggleSidebar = useAppStore((state) => state.toggleSidebar);

  const activeCount = nodes.filter(n => n.status === 'active').length;
  const issueCount = nodes.filter(n => n.status === 'warning' || n.status === 'error').length;

  return (
    <header className="flex h-14 w-full items-center justify-between border-b border-slate-800 bg-slate-900 px-6 z-30 shadow-md select-none">
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold text-sm tracking-wide shadow-inner">
          Ω
        </div>
        <div>
          <h1 className="text-sm font-bold text-slate-100 tracking-wide uppercase">App Graph Builder</h1>
          <p className="text-[10px] text-slate-500 font-mono">v2.1.0-beta</p>
        </div>
      </div>

      <div className="flex items-center gap-6 text-xs font-mono">
        <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-md border border-slate-800/60">
          <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
          <span className="text-slate-400">Cluster Health:</span>
          <span className="text-emerald-400 font-bold">{activeCount}/{nodes.length} OK</span>
          {issueCount > 0 && (
            <span className="text-rose-400 bg-rose-500/10 px-1 rounded font-bold">({issueCount} ALERTS)</span>
          )}
        </div>

        <button
          onClick={toggleSidebar}
          className={`px-3 py-1.5 rounded border transition-all duration-150 ${
            isSidebarOpen 
              ? 'bg-slate-800 border-slate-700 text-slate-200' 
              : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20'
          }`}
        >
          {isSidebarOpen ? 'Hide Controls' : 'Show Controls'}
        </button>
      </div>
    </header>
  );
};

export default TopBar;
