import React from 'react';

interface TabsProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="flex border-b border-slate-800 w-full bg-slate-900/20 px-2">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider border-b-2 transition-all duration-200 outline-none ${
            activeTab === tab
              ? 'border-emerald-500 text-emerald-400 bg-emerald-500/5'
              : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
