import React from "react";
import { 
  Droplets, 
  Wind, 
  Sun, 
  Gauge, 
  Eye, 
  CloudRain, 
  Compass 
} from "lucide-react";

export default function MetricsGrid({ data }) {
  const {
    humidity,
    windSpeed,
    windUnit,
    windDirection,
    uvIndex,
    uvCategory,
    pressureHpa,
    visibilityKm,
    precipProb
  } = data;

  return (
    <div className="grid grid-cols-2 gap-2.5 select-none">
      {/* 1. Humidity */}
      <div className="glass-card rounded-2xl p-3 flex flex-col justify-between">
        <div className="flex items-center justify-between text-slate-400 mb-1">
          <span className="text-[10px] font-bold uppercase tracking-wider">Humidity</span>
          <Droplets className="w-3.5 h-3.5 text-cyan-400" />
        </div>
        <div>
          <div className="text-xl font-black text-white">
            {humidity}<span className="text-sm font-light text-cyan-400">%</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-1 mt-1.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-cyan-500 to-blue-500 h-1 rounded-full"
              style={{ width: `${humidity}%` }}
            />
          </div>
        </div>
        <p className="text-[10px] text-slate-300 mt-1 truncate font-medium">
          {humidity > 80 ? "Heavy moisture (Muggy)" : "Tropical standard"}
        </p>
      </div>

      {/* 2. Wind Speed & Direction */}
      <div className="glass-card rounded-2xl p-3 flex flex-col justify-between">
        <div className="flex items-center justify-between text-slate-400 mb-1">
          <span className="text-[10px] font-bold uppercase tracking-wider">Wind</span>
          <Wind className="w-3.5 h-3.5 text-teal-400" />
        </div>
        <div>
          <div className="text-xl font-black text-white">
            {windSpeed} <span className="text-xs font-normal text-teal-300">{windUnit}</span>
          </div>
          <div className="flex items-center gap-1 text-[10px] text-teal-300 font-semibold mt-0.5 truncate">
            <Compass className="w-3 h-3 text-teal-400 shrink-0" />
            <span className="truncate">{windDirection}</span>
          </div>
        </div>
        <p className="text-[10px] text-slate-400 mt-1 truncate">
          {windSpeed > 25 ? "Fresh breeze" : "Light breeze"}
        </p>
      </div>

      {/* 3. UV Index */}
      <div className="glass-card rounded-2xl p-3 flex flex-col justify-between">
        <div className="flex items-center justify-between text-slate-400 mb-1">
          <span className="text-[10px] font-bold uppercase tracking-wider">UV Index</span>
          <Sun className="w-3.5 h-3.5 text-amber-400" />
        </div>
        <div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-black text-white">{uvIndex}</span>
            <span
              className={`text-[9px] font-extrabold px-1.5 py-0.2 rounded ${
                uvIndex >= 8
                  ? "bg-purple-500/20 text-purple-300"
                  : uvIndex >= 6
                  ? "bg-rose-500/20 text-rose-300"
                  : "bg-amber-500/20 text-amber-300"
              }`}
            >
              {uvCategory}
            </span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-1 mt-1.5 flex overflow-hidden">
            <div className="bg-emerald-400 h-full w-1/4" />
            <div className="bg-amber-400 h-full w-1/4" />
            <div className="bg-rose-500 h-full w-1/4" />
            <div className="bg-purple-600 h-full w-1/4" />
          </div>
        </div>
        <p className="text-[10px] text-slate-300 mt-1 truncate font-medium">
          {uvIndex >= 7 ? "SPF 50+ advised" : "Moderate sun care"}
        </p>
      </div>

      {/* 4. Pressure */}
      <div className="glass-card rounded-2xl p-3 flex flex-col justify-between">
        <div className="flex items-center justify-between text-slate-400 mb-1">
          <span className="text-[10px] font-bold uppercase tracking-wider">Pressure</span>
          <Gauge className="w-3.5 h-3.5 text-sky-400" />
        </div>
        <div>
          <div className="text-xl font-black text-white">
            {pressureHpa}
          </div>
          <span className="text-[10px] text-sky-300 font-semibold">hPa</span>
        </div>
        <p className="text-[10px] text-slate-400 mt-1 truncate">
          Normal atmosphere
        </p>
      </div>

      {/* 5. Visibility */}
      <div className="glass-card rounded-2xl p-3 flex flex-col justify-between">
        <div className="flex items-center justify-between text-slate-400 mb-1">
          <span className="text-[10px] font-bold uppercase tracking-wider">Visibility</span>
          <Eye className="w-3.5 h-3.5 text-emerald-400" />
        </div>
        <div>
          <div className="text-xl font-black text-white">
            {visibilityKm}
          </div>
          <span className="text-[10px] text-emerald-300 font-semibold">km distance</span>
        </div>
        <p className="text-[10px] text-slate-400 mt-1 truncate">
          {visibilityKm > 10 ? "Clear horizon" : "Haze / mist"}
        </p>
      </div>

      {/* 6. Precipitation Probability */}
      <div className="glass-card rounded-2xl p-3 flex flex-col justify-between">
        <div className="flex items-center justify-between text-slate-400 mb-1">
          <span className="text-[10px] font-bold uppercase tracking-wider">Rain Chance</span>
          <CloudRain className="w-3.5 h-3.5 text-blue-400" />
        </div>
        <div>
          <div className="text-xl font-black text-white">
            {precipProb}<span className="text-sm font-light text-blue-400">%</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-1 mt-1.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-400 to-indigo-500 h-1 rounded-full"
              style={{ width: `${precipProb}%` }}
            />
          </div>
        </div>
        <p className="text-[10px] text-slate-300 mt-1 truncate font-medium">
          {precipProb > 50 ? "Convective rain likely" : "Low rain risk"}
        </p>
      </div>
    </div>
  );
}
