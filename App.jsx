import React, { useState, useMemo } from "react";
import { PHILIPPINE_CITIES } from "./data/philippineCities";
import { getCityWeatherData } from "./data/weatherEngine";
import DynamicBackground from "./components/DynamicBackground";
import MobileStatusBar from "./components/mobile/MobileStatusBar";
import MobileAppHeader from "./components/mobile/MobileAppHeader";
import MobileBottomNav from "./components/mobile/MobileBottomNav";
import MobileCityModal from "./components/mobile/MobileCityModal";
import MobileHeatTab from "./components/mobile/MobileHeatTab";
import MobileAlertsTab from "./components/mobile/MobileAlertsTab";
import MobileCitiesTab from "./components/mobile/MobileCitiesTab";
import MobileDeviceFrame from "./components/mobile/MobileDeviceFrame";

// Main Weather & Bento Components
import CurrentConditionHero from "./components/CurrentConditionHero";
import MetricsGrid from "./components/MetricsGrid";
import AdviceForTodayCard from "./components/AdviceForTodayCard";
import HeatCheckCard from "./components/HeatCheckCard";
import ActivityPlannerCard from "./components/ActivityPlannerCard";
import HourlyForecastBar from "./components/HourlyForecastBar";
import DailyForecastCard from "./components/DailyForecastCard";
import SevereAdvisoryBanner from "./components/SevereAdvisoryBanner";
import WeatherChatbotAssistant from "./components/WeatherChatbotAssistant";

export default function App() {
  // Start with Muntinlupa City (highlighted in prompt)
  const defaultCity =
    PHILIPPINE_CITIES.find((c) => c.id === "muntinlupa") || PHILIPPINE_CITIES[0];
  const [selectedCity, setSelectedCity] = useState(defaultCity);
  const [isFahrenheit, setIsFahrenheit] = useState(false); // Default °C for Philippines

  // 2-Phase Dynamic Time System: "morning" vs "afternoon"
  const detectInitialPhase = () => {
    const hour = new Date().getHours();
    return hour >= 5 && hour < 12 ? "morning" : "afternoon";
  };
  const [phase, setPhase] = useState(detectInitialPhase());

  // Context-Aware Background Environment: "city" vs "countryside"
  const [environment, setEnvironment] = useState(defaultCity.environment);

  // Mobile App Navigation Tab State: "forecast" | "heat" | "planner" | "cities" | "alerts"
  const [activeTab, setActiveTab] = useState("forecast");

  // Mobile City Bottom Sheet Modal
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);

  // Device Frame View on Desktop (true: phone frame preview, false: full viewport)
  const [isFrameMode, setIsFrameMode] = useState(true);

  // Sync environment when city changes
  const handleSelectCity = (city) => {
    setSelectedCity(city);
    setEnvironment(city.environment);
  };

  // Structured weather data hook
  const weatherData = useMemo(() => {
    return getCityWeatherData(selectedCity, phase, isFahrenheit);
  }, [selectedCity, phase, isFahrenheit]);

  return (
    <MobileDeviceFrame
      isFrameMode={isFrameMode}
      onToggleFrameMode={() => setIsFrameMode(!isFrameMode)}
    >
      {/* Dynamic Ambient Background Scene */}
      <DynamicBackground
        phase={phase}
        environment={environment}
        weatherState={weatherData.conditionText}
        heatLevel={weatherData.heatCheck.level}
      />

      {/* Mobile Smartphone Status Bar */}
      <MobileStatusBar />

      {/* Mobile App Header Bar with Mandatory Disclaimer */}
      <MobileAppHeader
        selectedCity={selectedCity}
        onOpenCityModal={() => setIsCityModalOpen(true)}
        isFahrenheit={isFahrenheit}
        onToggleUnit={setIsFahrenheit}
        phase={phase}
        onChangePhase={setPhase}
        environment={environment}
        onToggleEnvironment={setEnvironment}
      />

      {/* Main Scrollable Mobile App Body */}
      <div className="flex-1 overflow-y-auto custom-scrollbar px-3.5 py-3 space-y-4">
        {/* TAB 1: FORECAST (Default Mobile Weather Overview) */}
        {activeTab === "forecast" && (
          <>
            {/* Severe Weather Alert Banner if Active */}
            {weatherData.severeAdvisory && (
              <SevereAdvisoryBanner
                advisory={weatherData.severeAdvisory}
                city={selectedCity}
              />
            )}

            {/* Current Conditions Hero Card */}
            <CurrentConditionHero data={weatherData} />

            {/* Practical Advice for Today (2–3 Sentences) */}
            <AdviceForTodayCard data={weatherData} />

            {/* 24-Hour Hourly Forecast Bar */}
            <HourlyForecastBar
              hourlyData={weatherData.hourlyForecast}
              isFahrenheit={isFahrenheit}
            />

            {/* 7-Day Daily Forecast Card */}
            <DailyForecastCard
              dailyData={weatherData.dailyForecast}
              isFahrenheit={isFahrenheit}
            />

            {/* 6 Metrics Grid Cards */}
            <MetricsGrid data={weatherData} />

            {/* Quick Teaser for Heat Check & Activity Planner */}
            <div className="pt-2">
              <HeatCheckCard data={weatherData} />
            </div>

            <div className="pt-2">
              <ActivityPlannerCard data={weatherData} />
            </div>

            {/* Munora AI Weather Chatbot Assistant Card */}
            <div className="pt-2">
              <WeatherChatbotAssistant
                selectedCity={selectedCity}
                weatherData={weatherData}
              />
            </div>
          </>
        )}

        {/* TAB 2: HEAT CHECK (Dedicated Mobile Heat Safety Screen) */}
        {activeTab === "heat" && <MobileHeatTab data={weatherData} />}

        {/* TAB 3: PLANNER (Interactive Activity Planner & Synoptic Chatbot) */}
        {activeTab === "planner" && (
          <div className="space-y-4">
            <ActivityPlannerCard data={weatherData} />
            <WeatherChatbotAssistant
              selectedCity={selectedCity}
              weatherData={weatherData}
            />
          </div>
        )}

        {/* TAB 4: CITIES (Philippine City Explorer) */}
        {activeTab === "cities" && (
          <MobileCitiesTab
            selectedCity={selectedCity}
            onSelectCity={handleSelectCity}
            onNavigateToForecast={() => setActiveTab("forecast")}
          />
        )}

        {/* TAB 5: ALERTS (PAGASA Bulletins & Emergency Hotline) */}
        {activeTab === "alerts" && <MobileAlertsTab data={weatherData} />}
      </div>

      {/* Mobile Native Bottom Navigation Dock */}
      <MobileBottomNav
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        hasActiveAdvisory={Boolean(weatherData.severeAdvisory)}
      />

      {/* City Bottom Sheet Modal */}
      <MobileCityModal
        isOpen={isCityModalOpen}
        onClose={() => setIsCityModalOpen(false)}
        selectedCity={selectedCity}
        onSelectCity={handleSelectCity}
      />
    </MobileDeviceFrame>
  );
}
