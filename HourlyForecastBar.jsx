import React, { useRef } from "react";
import { Clock, ChevronLeft, ChevronRight, Droplets } from "lucide-react";
import WeatherIcon from "./WeatherIcon";

export default function HourlyForecastBar({ hourlyData, isFahrenheit }) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -200 : 200;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="glass-panel rounded-3xl p-3.5 sm:p-4 border border-white/15 relative overflow-hidden transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 mb-2.5">
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-amber-400" />
          <h3 className="text-xs sm:text-sm font-bold text-white tracking-tight">
            24-Hour Forecast
          </h3>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => scroll("left")}
            className="p-1 rounded-lg bg-white/5 hover:bg-white/15 text-slate-300 transition-colors"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="p-1 rounded-lg bg-white/5 hover:bg-white/15 text-slate-300 transition-colors"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Horizontal Scroll Bar */}
      <div
        ref={scrollRef}
        className="flex items-center gap-2 overflow-x-auto pb-1 pt-0.5 custom-scrollbar scroll-smooth"
      >
        {hourlyData.map((hour, idx) => {
          const temp = isFahrenheit ? hour.tempF : hour.tempC;
          const isNow = idx === 0;

          return (
            <div
              key={idx}
              className={`flex-shrink-0 w-16 sm:w-18 p-2 rounded-2xl border flex flex-col items-center justify-between transition-all duration-200 ${
                isNow
                  ? "bg-amber-500/20 border-amber-500/50 shadow-md shadow-amber-500/10"
                  : "bg-slate-900/50 border-white/10 hover:bg-white/10"
              }`}
            >
              {/* Hour Label */}
              <span
                className={`text-[11px] font-bold ${
                  isNow ? "text-amber-300 font-black" : "text-slate-300"
                }`}
              >
                {isNow ? "Now" : hour.label}
              </span>

              {/* Weather Icon */}
              <div className="my-1.5">
                <WeatherIcon name={hour.icon} className="w-5 h-5" animated={false} />
              </div>

              {/* Temperature */}
              <div className="text-sm font-black text-white">
                {temp}°
              </div>

              {/* Rain Chance Bar */}
              <div className="w-full mt-1.5 flex flex-col items-center gap-0.5">
                <div className="w-full bg-white/10 rounded-full h-1 overflow-hidden">
                  <div
                    className="bg-blue-400 h-1 rounded-full transition-all"
                    style={{ width: `${hour.rainChance}%` }}
                  />
                </div>
                <div className="flex items-center gap-0.5 text-[9px] text-blue-300 font-semibold">
                  <Droplets className="w-2 h-2" />
                  <span>{hour.rainChance}%</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
