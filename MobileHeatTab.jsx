import React, { useState } from "react";
import { 
  Flame, 
  HeartPulse, 
  Droplets, 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle,
  Info,
  GlassWater
} from "lucide-react";

export default function MobileHeatTab({ data }) {
  const { heatIndexC, isFahrenheit, heatCheck, city } = data;
  const [glassesDrank, setGlassesDrank] = useState(4);
  const targetGlasses = heatCheck.level === "Danger" ? 10 : 8;

  const heatIndexDisplay = isFahrenheit
    ? Math.round((heatIndexC * 9) / 5 + 32)
    : heatIndexC;
  const unit = isFahrenheit ? "°F" : "°C";

  const gaugePercent = Math.min(
    100,
    Math.max(0, ((heatIndexC - 24) / (48 - 24)) * 100)
  );

  return (
    <div className="space-y-4 pb-6">
      {/* City & Safety Level Banner */}
      <div
        className={`p-4 rounded-3xl border backdrop-blur-xl ${
          heatCheck.level === "Danger"
            ? "bg-red-950/40 border-red-500/40"
            : heatCheck.level === "Be careful"
            ? "bg-amber-950/40 border-amber-500/40"
            : "bg-emerald-950/40 border-emerald-500/40"
        }`}
      >
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-xs font-bold text-slate-300">
            {city.name} Heat Status
          </span>
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-black uppercase border ${heatCheck.badgeColor}`}>
            {heatCheck.level}
          </span>
        </div>

        <div className="flex items-baseline gap-2">
          <span
            className={`text-6xl font-black tracking-tight ${
              heatCheck.level === "Danger"
                ? "text-red-400"
                : heatCheck.level === "Be careful"
                ? "text-amber-400"
                : "text-emerald-400"
            }`}
          >
            {heatIndexDisplay}
          </span>
          <span className="text-2xl font-light text-slate-400">{unit}</span>
          <span className="text-xs text-slate-400 ml-auto">PAGASA Heat Index</span>
        </div>

        <p className="text-xs text-slate-200 mt-2 font-medium">
          {heatCheck.status} — {heatCheck.description}
        </p>
      </div>

      {/* Safety Gauge Multi-Segment Bar */}
      <div className="p-4 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-md">
        <div className="flex items-center justify-between text-[11px] font-bold text-slate-300 mb-1.5">
          <span className="text-emerald-400">OK (&lt;33°C)</span>
          <span className="text-amber-400">Be careful (33°C–41°C)</span>
          <span className="text-red-400">Danger (42°C+)</span>
        </div>

        <div className="relative w-full h-3 rounded-full bg-white/10 overflow-hidden flex">
          <div className="h-full bg-emerald-500 w-[35%]" />
          <div className="h-full bg-amber-500 w-[40%]" />
          <div className="h-full bg-red-600 w-[25%]" />
        </div>

        {/* Needle */}
        <div className="relative w-full h-5">
          <div
            className="absolute top-0 -translate-x-1/2 flex flex-col items-center transition-all duration-500"
            style={{ left: `${gaugePercent}%` }}
          >
            <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-b-[6px] border-b-white" />
            <span className="text-[10px] font-black text-white bg-slate-950 px-1.5 py-0.5 rounded border border-white/20 mt-0.5">
              {heatIndexC}°C
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Mobile Water Tracker */}
      <div className="p-4 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-md">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-blue-500/20 text-blue-400">
              <Droplets className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Daily Hydration Log</h4>
              <p className="text-[11px] text-slate-400">Target: {targetGlasses} glasses (250ml each)</p>
            </div>
          </div>
          <span className="text-xs font-black text-blue-300">
            {glassesDrank} / {targetGlasses}
          </span>
        </div>

        <div className="flex items-center justify-between gap-1 mb-3">
          {Array.from({ length: targetGlasses }).map((_, i) => (
            <button
              key={i}
              onClick={() => setGlassesDrank(i + 1)}
              className={`flex-1 h-9 rounded-xl border flex items-center justify-center transition-all ${
                i < glassesDrank
                  ? "bg-blue-500 text-white border-blue-400 shadow-md shadow-blue-500/20"
                  : "bg-white/5 text-slate-500 border-white/10"
              }`}
            >
              <Droplets className="w-3.5 h-3.5" />
            </button>
          ))}
        </div>

        <p className="text-[11px] text-slate-300">
          💡 Drink water regularly even before feeling thirsty under Philippine tropical humidity.
        </p>
      </div>

      {/* Safety Measures Checklist */}
      <div className="p-4 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-md">
        <h4 className="text-sm font-bold text-white mb-2.5 flex items-center gap-2">
          <HeartPulse className="w-4 h-4 text-amber-400" />
          Health & Safety Directives
        </h4>
        <div className="space-y-2">
          {heatCheck.precautions.map((prec, i) => (
            <div key={i} className="flex items-start gap-2 p-2 rounded-xl bg-white/5 text-xs text-slate-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{prec}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

