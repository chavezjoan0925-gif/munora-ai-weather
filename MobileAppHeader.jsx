import React from "react";
import { 
  MapPin, 
  ChevronDown, 
  Sun, 
  CloudSun, 
  Building2, 
  Trees, 
  ExternalLink,
  AlertTriangle
} from "lucide-react";

export default function MobileAppHeader({
  selectedCity,
  onOpenCityModal,
  isFahrenheit,
  onToggleUnit,
  phase,
  onChangePhase,
  environment,
  onToggleEnvironment
}) {
  return (
    <div className="sticky top-0 z-40 w-full backdrop-blur-xl bg-slate-950/80 border-b border-white/10 transition-all">
      {/* Mandatory Disclaimer Badge (Always Visible on Mobile Screen) */}
      <div className="bg-gradient-to-r from-amber-600/30 via-amber-500/20 to-amber-600/30 border-b border-amber-500/30 px-3 py-1 flex items-center justify-between text-[11px] text-amber-200">
        <div className="flex items-center gap-1.5 font-medium truncate">
          <span className="flex h-1.5 w-1.5 relative shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-500"></span>
          </span>
          <span className="font-extrabold text-amber-300">Notice:</span>
          <span className="font-semibold text-white truncate">Not an official forecast. Check PAGASA.</span>
        </div>
        <a
          href="https://bagong.pagasa.dost.gov.ph"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] font-bold text-amber-300 hover:text-white shrink-0 ml-2 flex items-center gap-0.5"
        >
          PAGASA <ExternalLink className="w-2.5 h-2.5" />
        </a>
      </div>

      {/* Main Mobile App Bar */}
      <div className="px-4 py-2.5 flex items-center justify-between gap-2">
        {/* Left: Brand Badge & City Trigger */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-sky-400 p-[1.5px] shadow-md shadow-amber-500/20 shrink-0">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              {phase === "morning" ? (
                <CloudSun className="w-5 h-5 text-amber-400" />
              ) : (
                <Sun className="w-5 h-5 text-amber-500 animate-sun-spin" />
              )}
            </div>
          </div>

          {/* Clickable City Selector */}
          <button
            onClick={onOpenCityModal}
            className="text-left group flex items-center gap-1 truncate max-w-[170px] sm:max-w-[200px]"
          >
            <div className="truncate">
              <div className="flex items-center gap-1">
                <span className="text-sm font-black text-white group-hover:text-amber-300 transition-colors truncate">
                  {selectedCity.name}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-amber-400 shrink-0 group-hover:translate-y-0.5 transition-transform" />
              </div>
              <span className="text-[10px] text-slate-400 block truncate">
                {selectedCity.province} • {selectedCity.islandGroup}
              </span>
            </div>
          </button>
        </div>

        {/* Right: Quick Mobile App Controls */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Environment Scene Toggle */}
          <button
            onClick={() => onToggleEnvironment(environment === "city" ? "countryside" : "city")}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/15 border border-white/10 text-slate-300 transition-colors"
            title={environment === "city" ? "Switch to Rural Landscape" : "Switch to City Skyline"}
          >
            {environment === "city" ? (
              <Building2 className="w-3.5 h-3.5 text-cyan-300" />
            ) : (
              <Trees className="w-3.5 h-3.5 text-emerald-300" />
            )}
          </button>

          {/* 2-Phase Time Toggle */}
          <button
            onClick={() => onChangePhase(phase === "morning" ? "afternoon" : "morning")}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/15 border border-white/10 text-slate-300 transition-colors"
            title={phase === "morning" ? "Switch to Afternoon Amber" : "Switch to Morning Dawn"}
          >
            {phase === "morning" ? (
              <CloudSun className="w-3.5 h-3.5 text-amber-300" />
            ) : (
              <Sun className="w-3.5 h-3.5 text-amber-400" />
            )}
          </button>

          {/* Metric Toggle */}
          <button
            onClick={() => onToggleUnit(!isFahrenheit)}
            className="px-2 py-1 rounded-lg bg-white/10 hover:bg-white/15 border border-white/10 text-xs font-black text-amber-300"
          >
            {isFahrenheit ? "°F" : "°C"}
          </button>
        </div>
      </div>
    </div>
  );
}

