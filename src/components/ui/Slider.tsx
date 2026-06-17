import React from 'react';

interface SliderProps {
  label: string;
  value: number;
  min?: number;
  max?: number;
  unit?: string;
  onChange: (value: number) => void;
}

const Slider: React.FC<SliderProps> = ({ label, value, min = 0, max = 100, unit = '%', onChange }) => {
  return (
    <div className="flex flex-col gap-1.5 w-full bg-slate-900/40 p-3 rounded-lg border border-slate-800/60">
      <div className="flex justify-between items-center text-xs text-slate-400 font-medium">
        <span>{label}</span>
        <span className="font-mono text-slate-200 bg-slate-800 px-1.5 py-0.5 rounded">{value}{unit}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/50"
      />
    </div>
  );
};

export default Slider;
