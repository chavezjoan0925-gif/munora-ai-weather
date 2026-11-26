import React from "react";
import { Flame, HeartPulse } from "lucide-react";

export default function HeatCheckCard({ data }) {
  const { heatIndexC, isFahrenheit, heatCheck } = data;
  const heatIndexDisplay = isFahrenheit
    ? Math.round((heatIndexC * 9) / 5 + 32)
    : heatIndexC;
  const unit = isFahrenheit ? "°F" : "°C";

  // Position percentage along the 25°C to 50°C scale for visual indicator
  const gaugePercent = Math.min(
    100,
    Math.max(0, ((heatIndexC - 24) / (48 - 24)) * 100)
  );

  return (
    <div className="glass-panel rounded-3xl p-3.5 sm:p-4 border border-white/15 relative overflow-hidden transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-1.5">
          <div
            className={`p-1 rounded-lg border ${
              heatCheck.level === "Danger"
                ? "bg-red-500/20 text-red-400 border-red-500/30"
                : heatCheck.level === "Be careful"
                ? "bg-amber-500/20 text-amber-400 border-amber-500/30"
                : "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
          </div>
          <h3 className="text-xs sm:text-sm font-bold text-white tracking-tight">
            PAGASA Heat Check
          </h3>
        </div>

        <div className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase border ${heatCheck.badgeColor}`}>
          {heatCheck.level}
        </div>
      </div>

      {/* Main Heat Metric & Status */}
      <div className="p-3 rounded-2xl bg-slate-900/60 border border-white/10 mb-3 flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Heat Index
          </span>
          <div className="flex items-baseline gap-1">
            <span
              className={`text-3xl font-black tracking-tight ${
                heatCheck.level === "Danger"
                  ? "text-red-400"
                  : heatCheck.level === "Be careful"
                  ? "text-amber-400"
                  : "text-emerald-400"
              }`}
            >
              {heatIndexDisplay}
            </span>
            <span className="text-sm font-light text-slate-400">{unit}</span>
          </div>
        </div>

        <div className="border-l border-white/10 pl-3 flex-1 min-w-0">
          <span className="text-[10px] font-bold text-slate-200 block truncate">
            {heatCheck.status}
          </span>
          <p className="text-[11px] text-slate-300 font-medium line-clamp-2 mt-0.5">
            {heatCheck.description}
          </p>
        </div>
      </div>

      {/* 3 Safety Level Multi-Segment Bar */}
      <div>
        <div className="flex items-center justify-between text-[10px] font-bold text-slate-300 mb-1">
          <span className="text-emerald-400">OK (&lt;33°C)</span>
          <span className="text-amber-400">Caution (33–41°C)</span>
          <span className="text-red-400">Danger (42°C+)</span>
        </div>

        <div className="relative w-full h-2 rounded-full bg-white/10 overflow-hidden flex">
          <div className="h-full bg-emerald-500 w-[35%]" />
          <div className="h-full bg-amber-500 w-[40%]" />
          <div className="h-full bg-red-600 w-[25%]" />
        </div>

        <div className="relative w-full h-4">
          <div
            className="absolute top-0 -translate-x-1/2 flex flex-col items-center transition-all duration-500"
            style={{ left: `${gaugePercent}%` }}
          >
            <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[5px] border-b-white" />
            <span className="text-[9px] font-black text-white bg-slate-950 px-1 rounded border border-white/20">
              {heatIndexC}°C
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
