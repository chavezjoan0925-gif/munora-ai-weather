import React, { useState } from "react";
import { 
  Pin, 
  Trash2, 
  X, 
  MapPin, 
  Clock, 
  Sparkles, 
  Sun, 
  CloudRain, 
  Flame, 
  Wind,
  CloudSun,
  RotateCcw
} from "lucide-react";
import { INITIAL_MUNTINLUPA_BARANGAYS } from "../data/muntinlupaBarangays";

export default function MuntinlupaHistoryDropdown({ onSelectBarangay, onClose }) {
  const [historyItems, setHistoryItems] = useState(INITIAL_MUNTINLUPA_BARANGAYS);

  const handleRemoveItem = (e, id) => {
    e.stopPropagation();
    setHistoryItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearHistory = (e) => {
    e.stopPropagation();
    setHistoryItems([]);
  };

  const handleResetHistory = (e) => {
    e.stopPropagation();
    setHistoryItems(INITIAL_MUNTINLUPA_BARANGAYS);
  };

  const getConditionIcon = (condition) => {
    if (condition.includes("Rain")) {
      return <CloudRain className="w-3.5 h-3.5 text-blue-400 shrink-0" />;
    } else if (condition.includes("Heat")) {
      return <Flame className="w-3.5 h-3.5 text-red-400 shrink-0" />;
    } else if (condition.includes("Breeze")) {
      return <Wind className="w-3.5 h-3.5 text-teal-400 shrink-0" />;
    } else if (condition.includes("Partly")) {
      return <CloudSun className="w-3.5 h-3.5 text-amber-300 shrink-0" />;
    }
    return <Sun className="w-3.5 h-3.5 text-amber-400 shrink-0" />;
  };

  return (
    <div className="w-full mt-2 rounded-2xl bg-slate-900/90 backdrop-blur-2xl border border-white/20 shadow-2xl overflow-hidden transition-all duration-300 animate-in fade-in slide-in-from-top-1">
      {/* Dropdown Header & Controls */}
      <div className="px-3.5 py-2.5 bg-gradient-to-r from-amber-500/15 via-white/5 to-cyan-500/15 border-b border-white/10 flex items-center justify-between gap-2">
        {/* Pinned History Badge */}
        <div className="flex items-center gap-1.5 min-w-0">
          <div className="p-1 rounded-md bg-amber-500/20 text-amber-300 border border-amber-400/30 shrink-0">
            <Pin className="w-3 h-3 rotate-45" />
          </div>
          <span className="text-[11px] font-black uppercase tracking-wider text-amber-200 truncate">
            Muntinlupa City Barangays
          </span>
          <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-white/10 text-cyan-300 font-bold hidden sm:inline-block">
            Microclimates
          </span>
        </div>

        {/* Clear / Reset Action Controls */}
        <div className="flex items-center gap-1.5 shrink-0">
          {historyItems.length > 0 ? (
            <button
              onClick={handleClearHistory}
              className="flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-bold text-slate-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
              title="Clear all recent search entries"
            >
              <Trash2 className="w-3 h-3" />
              <span>Clear History</span>
            </button>
          ) : (
            <button
              onClick={handleResetHistory}
              className="flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-bold text-amber-300 hover:bg-amber-500/10 transition-colors"
              title="Restore Muntinlupa barangay history"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Restore</span>
            </button>
          )}
        </div>
      </div>

      {/* Quick Helper Prompt */}
      <div className="px-3.5 py-1.5 bg-white/5 border-b border-white/5 flex items-center justify-between text-[10px] text-slate-300 font-medium">
        <span className="flex items-center gap-1 text-cyan-300">
          <Sparkles className="w-3 h-3" />
          Tap any barangay to switch microclimate advisory
        </span>
        <span className="text-slate-400 text-[9px] hidden sm:inline">
          {historyItems.length} locations
        </span>
      </div>

      {/* Barangay Search Items with Microclimate Data */}
      <div className="divide-y divide-white/5 max-h-60 overflow-y-auto custom-scrollbar">
        {historyItems.length > 0 ? (
          historyItems.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                onSelectBarangay(item);
                if (onClose) onClose();
              }}
              className="px-3.5 py-2.5 flex items-center justify-between gap-3 hover:bg-white/10 active:bg-amber-500/15 cursor-pointer transition-colors group"
            >
              {/* Left Details: Barangay Name & Subtitle */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-black text-white group-hover:text-amber-300 transition-colors truncate">
                    {item.name}
                  </span>
                  <span className="text-[10px] text-slate-400 truncate">
                    ({item.subtitle})
                  </span>
                </div>

                {/* Microclimate Data Pill: Temp • Condition (Time ago) */}
                <div className="flex items-center gap-1.5 mt-0.5 text-[11px] text-slate-300">
                  <div className="flex items-center gap-1">
                    {getConditionIcon(item.condition)}
                    <span className="font-bold text-white">{item.temp}°C</span>
                  </div>
                  <span className="text-slate-500">•</span>
                  <span
                    className={`font-semibold ${
                      item.condition.includes("Heat")
                        ? "text-red-400"
                        : item.condition.includes("Rain")
                        ? "text-blue-300"
                        : "text-emerald-300"
                    }`}
                  >
                    {item.condition}
                  </span>
                  <span className="text-slate-500">•</span>
                  <span className="text-[10px] text-slate-400 flex items-center gap-0.5">
                    <Clock className="w-2.5 h-2.5" />
                    {item.timeAgo}
                  </span>
                </div>
              </div>

              {/* Individual Remove Button (x) */}
              <button
                onClick={(e) => handleRemoveItem(e, item.id)}
                className="p-1 rounded-md text-slate-400 hover:text-red-400 hover:bg-white/10 transition-colors shrink-0"
                title={`Remove ${item.name} from history`}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))
        ) : (
          <div className="p-4 text-center text-xs text-slate-400">
            <p>Muntinlupa search history cleared.</p>
            <button
              onClick={handleResetHistory}
              className="mt-1 text-amber-300 font-bold hover:underline"
            >
              Restore Muntinlupa Barangays
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

