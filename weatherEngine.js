/**
 * Weather Engine for Munora AI Weather Advisory
 * Provides strictly structured numerical data, heat index calculations,
 * time-of-day diurnal simulations, and English lifestyle advice generation.
 */

// Calculate Heat Index using Rothfusz regression (NOAA / PAGASA standard)
export function calculateHeatIndexCelsius(tempC, humidity) {
  if (tempC < 26) {
    return Math.round(tempC);
  }
  // Convert C to F for formula
  const T = (tempC * 9) / 5 + 32;
  const R = humidity;

  // Simple average first
  let hiF = 0.5 * (T + 61.0 + ((T - 68.0) * 1.2) + (R * 0.094));

  if (hiF >= 80) {
    hiF = -42.379 +
      2.04901523 * T +
      10.14333127 * R -
      0.22475541 * T * R -
      0.00683783 * T * T -
      0.05481717 * R * R +
      0.00122874 * T * T * R +
      0.00085282 * T * R * R -
      0.00000199 * T * T * R * R;

    if (R < 13 && T >= 80 && T <= 112) {
      const adj = ((13 - R) / 4) * Math.sqrt((17 - Math.abs(T - 95)) / 17);
      hiF -= adj;
    } else if (R > 85 && T >= 80 && T <= 87) {
      const adj = ((R - 85) / 10) * ((87 - T) / 5);
      hiF += adj;
    }
  }

  // Convert back to Celsius
  const hiC = (hiF - 32) * (5 / 9);
  return Math.round(hiC);
}

// Evaluate Heat Check Safety Category
export function getHeatCheckCategory(heatIndexC) {
  if (heatIndexC >= 42) {
    return {
      level: "Danger",
      status: "Extreme Danger / Heat Cramps & Exhaustion Risk",
      badgeColor: "bg-red-600/20 text-red-300 border-red-500/40",
      accentHex: "#CC0000",
      description: "Heat cramps and heat exhaustion are likely. Heat stroke is imminent with continued physical exposure.",
      precautions: [
        "Avoid unnecessary outdoor exertion between 11:00 AM and 3:30 PM",
        "Drink at least 2.5 to 3 liters of water or electrolyte fluid",
        "Seek air-conditioned or ventilated shaded rooms regularly",
        "Never leave children or pets inside parked vehicles"
      ]
    };
  } else if (heatIndexC >= 33) {
    return {
      level: "Be careful",
      status: "Caution / High Heat",
      badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/40",
      accentHex: "#D97706",
      description: "Fatigue is possible with prolonged outdoor exposure and activity. Continuing activity could lead to heat cramps.",
      precautions: [
        "Bring an umbrella or wide-brim hat for direct sunlight protection",
        "Sip water continuously throughout the day",
        "Take scheduled 10-minute rest breaks in shade when outdoors",
        "Wear breathable, lightweight, light-colored cotton clothing"
      ]
    };
  } else {
    return {
      level: "OK",
      status: "Comfortable / Normal",
      badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
      accentHex: "#059669",
      description: "Heat index is within normal comfortable limits. Minimal physiological heat stress expected under typical exposure.",
      precautions: [
        "Maintain routine daily hydration",
        "Great conditions for standard outdoor walks and routines",
        "Check local air circulation if working in enclosed indoor spaces"
      ]
    };
  }
}

// Generate complete structured weather data for a selected city and phase
export function getCityWeatherData(city, phase = "afternoon", isFahrenheit = false) {
  const isMorning = phase === "morning";
  
  // Diurnal variation
  const tempModifier = isMorning ? -2 : 1;
  const currentTempC = Math.round(city.baseTemp + tempModifier);
  const humidityModifier = isMorning ? 6 : -4;
  const humidity = Math.min(95, Math.max(55, city.baseHumidity + humidityModifier));
  
  const heatIndexC = calculateHeatIndexCelsius(currentTempC, humidity);
  const heatCheck = getHeatCheckCategory(heatIndexC);

  // High and low for the day
  const highTempC = city.baseTemp + 2;
  const lowTempC = city.baseTemp - (city.elevation.includes("Mountain") ? 6 : 4);

  // Precipitation probability based on city and time
  let precipProb = 30;
  if (city.rainfallAlert || city.typicalCondition.includes("Rain") || city.typicalCondition.includes("Shower")) {
    precipProb = isMorning ? 65 : 85;
  } else if (city.typicalCondition.includes("Sunny") || city.typicalCondition.includes("Dry")) {
    precipProb = 15;
  } else {
    precipProb = isMorning ? 25 : 45; // typical afternoon convective rain in tropical PH
  }

  // Wind speed & direction
  const windSpeedKmh = city.elevation.includes("Bluffs") || city.elevation.includes("Highlands")
    ? (isMorning ? 24 : 32)
    : (isMorning ? 12 : 18);
  const windDirection = isMorning ? "ENE (Amihan breeze)" : "SW (Habagat inflow)";

  // UV index
  const uvIndex = isMorning ? 4 : (city.typicalCondition.includes("Sunny") ? 10 : 7);
  const uvCategory = uvIndex >= 8 ? "Very High" : uvIndex >= 6 ? "High" : uvIndex >= 3 ? "Moderate" : "Low";

  // Pressure & visibility
  const pressureHpa = city.elevation.includes("Mountain") ? 852 : 1011;
  const visibilityKm = city.typicalCondition.includes("Fog") ? 5.2 : (precipProb > 70 ? 8.5 : 12.0);

  // Condition title
  let conditionText = city.typicalCondition;
  if (isMorning && !conditionText.includes("Rain")) {
    conditionText = "Soft Dawn Sunlight";
  } else if (!isMorning && precipProb > 60) {
    conditionText = "Scattered Afternoon Thunderstorms";
  }

  // Active severe weather advisory
  let severeAdvisory = null;
  if (city.tcwsAlert) {
    severeAdvisory = {
      type: "tcws",
      level: "danger",
      badge: "PAGASA TCWS ALERT",
      title: city.tcwsAlert,
      details: "PAGASA Tropical Cyclone Wind Signal is currently in effect over parts of this province. High winds and elevated seas possible. Secure loose outdoor fixtures and avoid sea travel.",
      actionText: "Verify latest tracking bulletin directly on PAGASA weather radar."
    };
  } else if (city.rainfallAlert) {
    severeAdvisory = {
      type: "rainfall",
      level: city.rainfallAlert.includes("Red") ? "danger" : "warning",
      badge: "HEAVY RAINFALL WARNING",
      title: city.rainfallAlert,
      details: "Monsoon rains and localized convective thunderstorm bands are producing heavy precipitation. Be vigilant against urban street flooding and hillside slope runoffs.",
      actionText: "Check local CDRRMO and PAGASA regional radar updates."
    };
  } else if (heatIndexC >= 42) {
    severeAdvisory = {
      type: "heat",
      level: "danger",
      badge: "EXTREME HEAT INDEX ADVISORY",
      title: `Danger Level Heat Index (${heatIndexC}°C / ${(heatIndexC * 9/5 + 32).toFixed(0)}°F)`,
      details: "Surface temperatures and high tropical humidity are driving heat index into dangerous territory. High risk of heat exhaustion, heat cramps, and dehydration.",
      actionText: "Check PAGASA 2-day Heat Index Forecast and stay hydrated."
    };
  }

  // Synthesize English Daily Advice (2-3 Sentences)
  let adviceForToday = "";
  if (precipProb >= 65) {
    adviceForToday = `Bring an umbrella and keep your water-resistant bag ready as intermittent rain showers are likely during the day. Commuters should monitor low-lying roads for localized flooding and plan extra transit time. Stay hydrated and carry drinking water even when skies appear overcast.`;
  } else if (heatIndexC >= 42) {
    adviceForToday = `Bring an umbrella for sun protection and drink plenty of water throughout the entire day. Avoid prolonged direct sun exposure between 11:00 AM and 3:00 PM as the heat index enters danger levels. Wear loose, light-colored cotton clothing to help your body manage thermal stress.`;
  } else if (heatIndexC >= 34) {
    adviceForToday = `Bring an umbrella and drink a lot of water throughout the day. Warm afternoon temperatures and high humidity will make it feel noticeably hotter than the thermometer reads. Pace your outdoor activities and take refreshing breaks under shaded areas.`;
  } else {
    adviceForToday = `Pleasant and comfortable conditions are expected across the area today with refreshing breezes. Keep a water bottle on hand and carry a compact umbrella for sudden passing tropical clouds. A favorable day for walking and everyday commutes across the city.`;
  }

  // 24-Hour Forecast array
  const hours = [
    { label: "12 AM", time: "00:00", tempOffset: -4, rain: 20, icon: "moon" },
    { label: "2 AM", time: "02:00", tempOffset: -5, rain: 20, icon: "moon" },
    { label: "4 AM", time: "04:00", tempOffset: -5, rain: 25, icon: "cloud-moon" },
    { label: "6 AM", time: "06:00", tempOffset: -3, rain: 25, icon: "sunrise" },
    { label: "8 AM", time: "08:00", tempOffset: -1, rain: 30, icon: "sun" },
    { label: "10 AM", time: "10:00", tempOffset: 1, rain: 35, icon: "sun" },
    { label: "12 PM", time: "12:00", tempOffset: 2, rain: precipProb, icon: precipProb > 60 ? "rain" : "sun" },
    { label: "2 PM", time: "14:00", tempOffset: 3, rain: precipProb + 5, icon: precipProb > 50 ? "rain-heavy" : "cloud-sun" },
    { label: "4 PM", time: "16:00", tempOffset: 2, rain: precipProb, icon: precipProb > 50 ? "cloud-lightning" : "cloud-sun" },
    { label: "6 PM", time: "18:00", tempOffset: 0, rain: 40, icon: "sunset" },
    { label: "8 PM", time: "20:00", tempOffset: -2, rain: 30, icon: "cloud-moon" },
    { label: "10 PM", time: "22:00", tempOffset: -3, rain: 25, icon: "moon" },
  ];

  const hourlyForecast = hours.map(h => {
    const hourTempC = city.baseTemp + h.tempOffset;
    return {
      label: h.label,
      time: h.time,
      tempC: hourTempC,
      tempF: Math.round((hourTempC * 9) / 5 + 32),
      rainChance: Math.min(100, Math.max(5, h.rain)),
      icon: h.icon
    };
  });

  // 7-Day Forecast
  const daysOfWeek = ["Today", "Friday", "Saturday", "Sunday", "Monday", "Tuesday", "Wednesday"];
  const dailyForecast = daysOfWeek.map((day, idx) => {
    const variance = (idx % 3 === 0 ? 0 : idx % 2 === 0 ? 1 : -1);
    const dayHighC = highTempC + variance;
    const dayLowC = lowTempC + variance;
    const rainChance = Math.min(95, Math.max(10, precipProb + (idx * 5 % 30) - 10));
    
    let cond = "Partly Cloudy";
    let icon = "cloud-sun";
    if (rainChance > 70) {
      cond = "Thunderstorms";
      icon = "cloud-lightning";
    } else if (rainChance > 45) {
      cond = "Scattered Showers";
      icon = "rain";
    } else if (dayHighC >= 34) {
      cond = "Sunny & Humid";
      icon = "sun";
    }

    return {
      day,
      date: `Nov ${13 + idx}`,
      condition: cond,
      icon,
      highC: dayHighC,
      highF: Math.round((dayHighC * 9) / 5 + 32),
      lowC: dayLowC,
      lowF: Math.round((dayLowC * 9) / 5 + 32),
      rainChance
    };
  });

  // Activity Planner Data
  const activityPlanner = {
    Walking: {
      ruleText: "Bring water and sun protection and recheck conditions before leaving.",
      icon: "footprints",
      slots: {
        Morning: {
          suitability: "Recommended",
          statusColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
          tempNote: `${isMorning ? currentTempC : currentTempC - 2}°C`,
          summary: "Mild early morning solar radiation and lighter humidity. Optimal window for outdoor strolls."
        },
        Midday: {
          suitability: heatIndexC >= 42 ? "Not Recommended" : "Caution",
          statusColor: heatIndexC >= 42 ? "text-red-400 bg-red-500/10 border-red-500/30" : "text-amber-400 bg-amber-500/10 border-amber-500/30",
          tempNote: `${highTempC}°C (Heat Index ~${heatIndexC}°C)`,
          summary: "Peak sunshine and thermal discomfort. Keep umbrella ready as sun-shield and limit brisk walking."
        },
        "Late Afternoon": {
          suitability: precipProb > 60 ? "Caution" : "Recommended",
          statusColor: precipProb > 60 ? "text-amber-400 bg-amber-500/10 border-amber-500/30" : "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
          tempNote: `${city.baseTemp}°C`,
          summary: precipProb > 60 ? "Watch out for passing convective downpours. Sturdy walking footwear advised." : "Cooling sun angle; comfortable for errands."
        },
        Evening: {
          suitability: "Recommended",
          statusColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
          tempNote: `${lowTempC + 2}°C`,
          summary: "Pleasant evening temperatures with gentle nocturnal air currents."
        }
      }
    },
    Commuting: {
      ruleText: "Recheck your route and local advisories before leaving; live traffic is not monitored.",
      icon: "bus",
      slots: {
        Morning: {
          suitability: "Caution",
          statusColor: "text-amber-400 bg-amber-500/10 border-amber-500/30",
          tempNote: `${city.baseTemp - 1}°C`,
          summary: "Rush hour transit flow with moderate air moisture. Allow 15-20 minutes cushion time."
        },
        Midday: {
          suitability: "Recommended",
          statusColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
          tempNote: `${highTempC}°C`,
          summary: "Steadier mid-day transport operations. Ensure you carry cold hydration while waiting at jeepney/bus stops."
        },
        "Late Afternoon": {
          suitability: precipProb > 60 ? "High Risk" : "Caution",
          statusColor: precipProb > 60 ? "text-red-400 bg-red-500/10 border-red-500/30" : "text-amber-400 bg-amber-500/10 border-amber-500/30",
          tempNote: `${city.baseTemp}°C`,
          summary: precipProb > 60 ? "Monsoon downpour may trigger gutter-deep water in flood-prone intersections. Verify route advisories." : "Peak commuter volume; check transit terminals."
        },
        Evening: {
          suitability: "Recommended",
          statusColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
          tempNote: `${lowTempC + 2}°C`,
          summary: "Cooler outdoor wait times at transit hubs."
        }
      }
    },
    Exercise: {
      ruleText: "Bring water and pace your activity and Recheck conditions before starting.",
      icon: "activity",
      slots: {
        Morning: {
          suitability: "Recommended",
          statusColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
          tempNote: `${currentTempC - 2}°C`,
          summary: "Best time of the day for running, calisthenics, or cycling with the lowest thermal load."
        },
        Midday: {
          suitability: "Not Recommended",
          statusColor: "text-red-400 bg-red-500/10 border-red-500/30",
          tempNote: `Heat Index ${heatIndexC}°C`,
          summary: "High danger of heat exhaustion and rapid cardiovascular strain. Transfer workouts to indoor gym."
        },
        "Late Afternoon": {
          suitability: precipProb > 50 ? "Caution" : "Recommended",
          statusColor: precipProb > 50 ? "text-amber-400 bg-amber-500/10 border-amber-500/30" : "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
          tempNote: `${city.baseTemp}°C`,
          summary: "Moderating temperatures; verify sky for lightning before beginning outdoor trail runs."
        },
        Evening: {
          suitability: "Recommended",
          statusColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
          tempNote: `${lowTempC + 2}°C`,
          summary: "Optimal window for evening jogging, brisk walking, or court sports."
        }
      }
    },
    "Outdoor Work": {
      ruleText: "Keep drinking water and shade available and plan breaks during outdoor work.",
      icon: "hard-hat",
      slots: {
        Morning: {
          suitability: "Recommended",
          statusColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
          tempNote: `${currentTempC - 2}°C`,
          summary: "Productive working window. Front-load heavy manual lifting and exterior construction."
        },
        Midday: {
          suitability: heatIndexC >= 42 ? "High Risk" : "Caution",
          statusColor: heatIndexC >= 42 ? "text-red-400 bg-red-500/10 border-red-500/30" : "text-amber-400 bg-amber-500/10 border-amber-500/30",
          tempNote: `Heat Index ${heatIndexC}°C`,
          summary: "Mandatory shaded rest intervals and regular rehydration required under DOLE occupational heat guidelines."
        },
        "Late Afternoon": {
          suitability: precipProb > 60 ? "Caution" : "Recommended",
          statusColor: precipProb > 60 ? "text-amber-400 bg-amber-500/10 border-amber-500/30" : "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
          tempNote: `${city.baseTemp}°C`,
          summary: "Solar intensity tapers. Have tarpaulins or covers on standby for sudden squalls."
        },
        Evening: {
          suitability: "Recommended",
          statusColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
          tempNote: `${lowTempC + 2}°C`,
          summary: "Favorable conditions for exterior maintenance and logistics."
        }
      }
    }
  };

  return {
    city,
    phase,
    isFahrenheit,
    currentTemp: isFahrenheit ? Math.round((currentTempC * 9) / 5 + 32) : currentTempC,
    feelsLike: isFahrenheit ? Math.round((heatIndexC * 9) / 5 + 32) : heatIndexC,
    highTemp: isFahrenheit ? Math.round((highTempC * 9) / 5 + 32) : highTempC,
    lowTemp: isFahrenheit ? Math.round((lowTempC * 9) / 5 + 32) : lowTempC,
    tempUnit: isFahrenheit ? "°F" : "°C",
    conditionText,
    humidity,
    windSpeed: isFahrenheit ? Math.round(windSpeedKmh * 0.621371) : windSpeedKmh,
    windUnit: isFahrenheit ? "mph" : "km/h",
    windDirection,
    uvIndex,
    uvCategory,
    pressureHpa,
    visibilityKm,
    precipProb,
    heatIndexC,
    heatCheck,
    severeAdvisory,
    adviceForToday,
    hourlyForecast,
    dailyForecast,
    activityPlanner,
    updatedAt: "2:39 PM PST (Philippine Standard Time)"
  };
}

