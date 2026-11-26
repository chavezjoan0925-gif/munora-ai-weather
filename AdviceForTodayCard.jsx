import React from "react";
import { Sparkles, Umbrella, Droplets, Sun, AlertCircle } from "lucide-react";

export default function AdviceForTodayCard({ data }) {
  const { adviceForToday, heatIndexC, precipProb, uvIndex } = data;

  return (
    <div className="glass-panel rounded-3xl p-3.5 sm:p-4 border border-amber-500/30 relative overflow-hidden transition-all duration-300">
      {/* Decorative ambient corner glow */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-amber-500/10 rounded-full filter blur-xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between gap-2 mb-2.5">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          </div>
          <h3 className="text-xs sm:text-sm font-bold text-white tracking-tight flex items-center gap-1.5">
            Advice for Today
            <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30">
              AI Daily
            </span>
          </h3>
        </div>
      </div>

      {/* 2-3 Sentences of Clear English Lifestyle Guidance */}
      <div className="p-3 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-md mb-2.5">
        <p className="text-xs sm:text-sm text-slate-100 font-medium leading-relaxed">
          "{adviceForToday}"
        </p>
      </div>

      {/* Actionable Quick Essentials 2x2 Grid */}
      <div className="grid grid-cols-2 gap-2">
        <div className="p-2 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2">
          <div className="p-1 rounded-lg bg-blue-500/20 text-blue-400 shrink-0">
            <Umbrella className="w-3.5 h-3.5" />
          </div>
          <div className="min-w-0">
            <span className="text-[9px] uppercase font-bold text-slate-400 block truncate">Umbrella</span>
            <span className="text-xs font-bold text-white truncate block">
              {precipProb > 40 ? "Mandatory" : "Sun Shield"}
            </span>
          </div>
        </div>

        <div className="p-2 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2">
          <div className="p-1 rounded-lg bg-cyan-500/20 text-cyan-400 shrink-0">
            <Droplets className="w-3.5 h-3.5" />
          </div>
          <div className="min-w-0">
            <span className="text-[9px] uppercase font-bold text-slate-400 block truncate">Hydration</span>
            <span className="text-xs font-bold text-white truncate block">
              {heatIndexC >= 42 ? "3L+ Fluid" : "Regular"}
            </span>
          </div>
        </div>

        <div className="p-2 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2">
          <div className="p-1 rounded-lg bg-amber-500/20 text-amber-400 shrink-0">
            <Sun className="w-3.5 h-3.5" />
          </div>
          <div className="min-w-0">
            <span className="text-[9px] uppercase font-bold text-slate-400 block truncate">Sun Care</span>
            <span className="text-xs font-bold text-white truncate block">
              {uvIndex >= 7 ? "SPF 50+ & Shade" : "Normal"}
            </span>
          </div>
        </div>

        <div className="p-2 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2">
          <div className="p-1 rounded-lg bg-emerald-500/20 text-emerald-400 shrink-0">
            <AlertCircle className="w-3.5 h-3.5" />
          </div>
          <div className="min-w-0">
            <span className="text-[9px] uppercase font-bold text-slate-400 block truncate">PAGASA Status</span>
            <span className="text-xs font-bold text-emerald-300 truncate block">
              Monitored
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
