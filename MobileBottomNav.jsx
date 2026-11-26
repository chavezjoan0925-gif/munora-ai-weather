import React from "react";
import { 
  CloudSun, 
  Flame, 
  Footprints, 
  MapPin, 
  AlertTriangle 
} from "lucide-react";

export default function MobileBottomNav({ activeTab, onSelectTab, hasActiveAdvisory }) {
  const tabs = [
    { id: "forecast", label: "Forecast", icon: CloudSun },
    { id: "heat", label: "Heat Check", icon: Flame },
    { id: "planner", label: "Planner", icon: Footprints },
    { id: "cities", label: "Cities", icon: MapPin },
    { id: "alerts", label: "Alerts", icon: AlertTriangle, hasBadge: hasActiveAdvisory },
  ];

  return (
    <div className="sticky bottom-0 z-40 w-full backdrop-blur-2xl bg-slate-950/90 border-t border-white/10 select-none pb-safe">
      <div className="grid grid-cols-5 px-2 pt-2 pb-1 items-center">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`flex flex-col items-center justify-center py-1 relative transition-all duration-200 ${
                isActive ? "text-amber-400 scale-105" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? "stroke-[2.5]" : "stroke-[1.75]"}`} />
                {tab.hasBadge && (
                  <span className="absolute -top-1 -right-1 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                  </span>
                )}
              </div>
              <span className={`text-[10px] mt-1 font-semibold ${isActive ? "font-bold text-amber-300" : ""}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* iOS Home Indicator Bar */}
      <div className="flex justify-center pb-2 pt-1">
        <div className="w-32 h-1 bg-white/20 rounded-full" />
      </div>
    </div>
  );
}

