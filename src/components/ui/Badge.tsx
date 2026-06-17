import React from 'react';
import { NodeStatus } from '../../types';

interface BadgeProps {
  status: NodeStatus;
}

const Badge: React.FC<BadgeProps> = ({ status }) => {
  const styles: Record<NodeStatus, string> = {
    active: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    inactive: 'bg-slate-500/10 text-slate-400 border-slate-500/30',
    warning: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    error: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
  };

  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium uppercase tracking-wider backdrop-blur-sm ${styles[status]}`}>
      <span className={`mr-1.5 h-1.5 w-1.5 rounded-full current-color animate-pulse`} style={{ backgroundColor: 'currentColor' }} />
      {status}
    </span>
  );
};

export default Badge;
