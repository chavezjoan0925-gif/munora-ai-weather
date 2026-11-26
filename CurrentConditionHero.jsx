import React from "react";
import { 
  ArrowUp, 
  ArrowDown, 
  MapPin, 
  Building2, 
  Trees, 
  Clock 
} from "lucide-react";
import WeatherIcon from "./WeatherIcon";

export default function CurrentConditionHero({ data }) {
  const {
    city,
    currentTemp,
    feelsLike,
    highTemp,
    lowTemp,
    tempUnit,
    conditionText,
    heatCheck,
    phase,
    precipProb,
    updatedAt
  } = data;

  // Determine hero weather icon
  let heroIcon = "sun";
  if (conditionText.includes("Thunderstorm") || conditionText.includes("Lightning")) {
    heroIcon = "cloud-lightning";
  } else if (conditionText.includes("Rain") || conditionText.includes("Shower")) {
    heroIcon = "rain";
  } else if (conditionText.includes("Cloud") || conditionText.includes("Overcast")) {
    heroIcon = "cloud-sun";
  } else if (phase === "morning") {
    heroIcon = "sunrise";
  }

  // Dynamic glow border based on heat or rain
  let borderGlow = "border-white/15";
  let bgGradient = "from-slate-900/70 via-slate-900/50 to-slate-950/80";
  if (heatCheck.level === "Danger") {
    borderGlow = "border-red-500/40 shadow-red-950/40";
    bgGradient = "from-red-950/40 via-slate-900/60 to-slate-950/80";
  } else if (precipProb > 65) {
    borderGlow = "border-indigo-500/40 shadow-indigo-950/40";
    bgGradient = "from-indigo-950/40 via-slate-900/60 to-slate-950/80";
  } else if (phase === "morning") {
    borderGlow = "border-cyan-500/30";
    bgGradient = "from-cyan-950/30 via-slate-900/60 to-slate-950/80";
  } else {
    borderGlow = "border-amber-500/30";
    bgGradient = "from-amber-950/30 via-slate-900/60 to-slate-950/80";
  }

  return (
    <div
      className={`relative w-full rounded-3xl p-4 sm:p-5 backdrop-blur-2xl bg-gradient-to-br ${bgGradient} border ${borderGlow} shadow-xl transition-all duration-300 overflow-hidden select-none`}
    >
      {/* Dynamic Ambient Spotlight */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-white/5 to-transparent rounded-full filter blur-xl pointer-events-none" />

      {/* Top Location Bar */}
      <div className="flex items-center justify-between gap-2 mb-3 relative z-10">
        <div className="flex items-center gap-1.5 min-w-0">
          <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
          <h2 className="text-base sm:text-lg font-black text-white tracking-tight truncate">
            {city.name}
          </h2>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-slate-300 font-bold shrink-0">
            {city.islandGroup}
          </span>
        </div>

        <div className="flex items-center gap-1 text-[10px] text-slate-400 font-medium shrink-0">
          <Clock className="w-3 h-3 text-amber-400" />
          <span>{updatedAt.split(" ")[0]} {updatedAt.split(" ")[1]}</span>
        </div>
      </div>

      {/* Center: Large Temp + Floating Animated Icon */}
      <div className="flex items-center justify-between gap-4 my-1 relative z-10">
        <div>
          <div className="flex items-baseline">
            <span className="text-6xl sm:text-7xl font-extralight tracking-tighter text-white">
              {currentTemp}
            </span>
            <span className="text-2xl sm:text-3xl font-light text-amber-400/90 ml-1">
              {tempUnit}
            </span>
          </div>
          <p className="text-sm font-bold text-slate-100 tracking-tight mt-0.5">
            {conditionText}
          </p>
        </div>

        {/* Animated Weather Icon Graphic */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center p-2 shrink-0 shadow-inner">
          <WeatherIcon name={heroIcon} className="w-11 h-11 sm:w-14 sm:h-14" animated={true} />
        </div>
      </div>

      {/* Bottom Pills Row: High/Low, Feels Like, Heat Check */}
      <div className="mt-3 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 relative z-10 text-xs">
        <div className="flex items-center gap-2 text-slate-300 font-semibold">
          <span className="flex items-center text-rose-400">
            <ArrowUp className="w-3 h-3 mr-0.5" /> {highTemp}°
          </span>
          <span className="text-slate-500">•</span>
          <span className="flex items-center text-cyan-400">
            <ArrowDown className="w-3 h-3 mr-0.5" /> {lowTemp}°
          </span>
          <span className="text-slate-500">•</span>
          <span className="text-slate-300 text-[11px]">
            Feels {feelsLike}°
          </span>
        </div>

        {/* Heat Check Badge */}
        <span
          className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full border ${heatCheck.badgeColor}`}
        >
          Heat: {heatCheck.level}
        </span>
      </div>
    </div>
  );
}
