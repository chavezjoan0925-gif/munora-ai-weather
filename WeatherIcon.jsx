import React from "react";
import { 
  Sun, 
  CloudSun, 
  CloudRain, 
  CloudLightning, 
  Cloud, 
  Moon, 
  CloudMoon, 
  Sunrise, 
  Sunset,
  Wind
} from "lucide-react";

export default function WeatherIcon({ name, className = "w-6 h-6", animated = true }) {
  switch (name) {
    case "sun":
      return (
        <Sun
          className={`${className} text-amber-400 ${
            animated ? "animate-sun-spin" : ""
          }`}
        />
      );
    case "cloud-sun":
      return (
        <CloudSun
          className={`${className} text-amber-300 ${
            animated ? "animate-cloud-drift" : ""
          }`}
        />
      );
    case "rain":
    case "rain-heavy":
      return (
        <div className="relative inline-block">
          <CloudRain
            className={`${className} text-cyan-400 ${
              animated ? "animate-pulse" : ""
            }`}
          />
        </div>
      );
    case "cloud-lightning":
      return (
        <CloudLightning
          className={`${className} text-yellow-400 ${
            animated ? "animate-bounce" : ""
          }`}
        />
      );
    case "moon":
      return <Moon className={`${className} text-indigo-300`} />;
    case "cloud-moon":
      return <CloudMoon className={`${className} text-indigo-200`} />;
    case "sunrise":
      return <Sunrise className={`${className} text-amber-400`} />;
    case "sunset":
      return <Sunset className={`${className} text-orange-400`} />;
    case "wind":
      return <Wind className={`${className} text-teal-300 animate-pulse`} />;
    default:
      return <Cloud className={`${className} text-slate-300`} />;
  }
}

