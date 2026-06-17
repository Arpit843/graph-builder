import React from 'react';
import { useAppData } from './hooks/useAppData';
import { useAppStore } from './store/appStore';
import TopBar from './components/layout/TopBar';
import LeftRail from './components/layout/LeftRail';
import RightPanel from './components/layout/RightPanel';
import AppCanvas from './components/canvas/AppCanvas';

function App() {
  // Trigger automated background API data synchronization on mount
  useAppData();
  
  const isSidebarOpen = useAppStore((state) => state.isSidebarOpen);
  const isLoading = useAppStore((state) => state.isLoading);
  const error = useAppStore((state) => state.error);

  if (error) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-slate-900 text-red-400">
        <div className="text-center p-6 border border-red-500/30 rounded-lg bg-red-500/10">
          <h1 className="text-xl font-bold mb-2">System Error</h1>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-slate-950 text-slate-100 font-sans">
      <TopBar />
      
      <div className="flex h-full w-full overflow-hidden relative">
        <LeftRail />
        
        <main className="flex-1 h-full w-full relative bg-slate-900/50">
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-950/40 backdrop-blur-sm z-50">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent"></div>
            </div>
          ) : null}
          <AppCanvas />
        </main>

        {isSidebarOpen && <RightPanel />}
      </div>
    </div>
  );
}

export default App;
