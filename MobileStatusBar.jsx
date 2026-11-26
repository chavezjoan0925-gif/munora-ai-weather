import React, { useState, useEffect } from "react";
import { Wifi, BatteryMedium, Signal } from "lucide-react";

export default function MobileStatusBar() {
  const [timeStr, setTimeStr] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, "0");
      setTimeStr(`${hours % 12 || 12}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full pt-3 px-6 pb-1 flex items-center justify-between text-xs text-white/90 font-semibold select-none z-50">
      {/* Time */}
      <span className="tracking-tight font-bold">{timeStr || "5:44"}</span>

      {/* Dynamic Island / Camera Notch */}
      <div className="w-24 h-5 bg-black rounded-full border border-white/10 flex items-center justify-center gap-1.5 shadow-inner px-2">
        <span className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-white/20" />
        <span className="w-1.5 h-1.5 rounded-full bg-blue-500/80 animate-pulse" />
      </div>

      {/* Right Icons: Signal, WiFi, Battery */}
      <div className="flex items-center gap-1.5 text-white/90">
        <Signal className="w-3.5 h-3.5" />
        <Wifi className="w-3.5 h-3.5" />
        <div className="flex items-center gap-0.5">
          <span className="text-[10px] font-bold">94%</span>
          <BatteryMedium className="w-4 h-4 text-emerald-400" />
        </div>
      </div>
    </div>
  );
}

