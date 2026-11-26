import React from "react";
import { Calendar, Droplets } from "lucide-react";
import WeatherIcon from "./WeatherIcon";

export default function DailyForecastCard({ dailyData, isFahrenheit }) {
  const unit = isFahrenheit ? "°F" : "°C";

  // Find min and max temp across the week for relative bar scale
  const allLows = dailyData.map((d) => (isFahrenheit ? d.lowF : d.lowC));
  const allHighs = dailyData.map((d) => (isFahrenheit ? d.highF : d.highC));
  const minWeek = Math.min(...allLows);
  const maxWeek = Math.max(...allHighs);
  const spread = Math.max(1, maxWeek - minWeek);

  return (
    <div className="glass-panel rounded-3xl p-3.5 sm:p-4 border border-white/15 relative overflow-hidden transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 mb-2 pb-1.5 border-b border-white/10">
        <div className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-cyan-400" />
          <h3 className="text-xs sm:text-sm font-bold text-white tracking-tight">
            7-Day Forecast
          </h3>
        </div>

        <span className="text-[10px] font-semibold text-slate-400 px-2 py-0.5 rounded-full bg-white/5 border border-white/10">
          {minWeek}° – {maxWeek}{unit}
        </span>
      </div>

      {/* Compact Day List */}
      <div className="divide-y divide-white/5">
        {dailyData.map((item, idx) => {
          const high = isFahrenheit ? item.highF : item.highC;
          const low = isFahrenheit ? item.lowF : item.lowC;
          const isToday = idx === 0;

          // Bar offset calculation
          const leftPercent = ((low - minWeek) / spread) * 100;
          const widthPercent = Math.max(14, ((high - low) / spread) * 100);

          return (
            <div
              key={idx}
              className={`py-2 px-1 flex items-center justify-between gap-2 transition-colors ${
                isToday ? "bg-white/5 rounded-xl" : ""
              }`}
            >
              {/* Day Label */}
              <div className="w-12 sm:w-14 shrink-0">
                <span
                  className={`text-xs ${
                    isToday ? "font-black text-amber-300" : "font-bold text-white"
                  }`}
                >
                  {isToday ? "Today" : item.day.slice(0, 3)}
                </span>
              </div>

              {/* Weather Icon & Rain */}
              <div className="flex items-center gap-1.5 w-14 shrink-0">
                <WeatherIcon name={item.icon} className="w-4 h-4" animated={false} />
                {item.rainChance > 30 ? (
                  <span className="text-[10px] text-blue-400 font-bold">
                    {item.rainChance}%
                  </span>
                ) : (
                  <span className="text-[10px] text-slate-500 font-normal">--</span>
                )}
              </div>

              {/* Apple Weather Style Temp Bar (Low - Visual Gradient Bar - High) */}
              <div className="flex items-center gap-2 flex-1 max-w-[170px] sm:max-w-xs">
                <span className="text-xs font-semibold text-slate-400 w-6 text-right shrink-0">
                  {low}°
                </span>

                <div className="flex-1 h-1.5 bg-white/10 rounded-full relative overflow-hidden">
                  <div
                    className="absolute top-0 bottom-0 rounded-full bg-gradient-to-r from-cyan-400 via-amber-400 to-rose-500"
                    style={{
                      left: `${leftPercent}%`,
                      width: `${widthPercent}%`
                    }}
                  />
                </div>

                <span className="text-xs font-black text-white w-6 shrink-0">
                  {high}°
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
