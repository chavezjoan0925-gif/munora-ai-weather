import React, { useState, useRef, useEffect } from "react";
import { 
  Sun, 
  CloudSun, 
  Search, 
  MapPin, 
  AlertTriangle, 
  Compass, 
  Clock, 
  ChevronDown, 
  SlidersHorizontal,
  Building2,
  Trees,
  Check,
  ExternalLink
} from "lucide-react";
import { PHILIPPINE_CITIES } from "../data/philippineCities";
import MuntinlupaHistoryDropdown from "./MuntinlupaHistoryDropdown";
import { barangayToCityFormat } from "../data/muntinlupaBarangays";

export default function HeaderNav({
  selectedCity,
  onSelectCity,
  isFahrenheit,
  onToggleUnit,
  phase,
  onChangePhase,
  environment,
  onToggleEnvironment,
  isAutoPhase,
  onToggleAutoPhase
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [islandFilter, setIslandFilter] = useState("All");
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter cities by search query and island group
  const filteredCities = PHILIPPINE_CITIES.filter((c) => {
    const matchesIsland = islandFilter === "All" || c.islandGroup === islandFilter;
    const query = searchQuery.toLowerCase().trim();
    const matchesQuery =
      c.name.toLowerCase().includes(query) ||
      c.province.toLowerCase().includes(query) ||
      c.region.toLowerCase().includes(query) ||
      (c.tag && c.tag.toLowerCase().includes(query));
    return matchesIsland && matchesQuery;
  });

  const popularPicks = ["muntinlupa", "manila", "baguio", "cebu", "davao", "tagaytay"];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-slate-950/75 border-b border-white/10 transition-all duration-300">
      {/* Mandatory Persistent Warning Alert Banner (Always Visible) */}
      <div className="w-full bg-gradient-to-r from-amber-600/25 via-amber-500/20 to-amber-600/25 border-b border-amber-500/30 px-4 py-1.5 text-xs text-amber-200 flex items-center justify-between shadow-sm">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-medium tracking-wide">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            <span className="font-bold text-amber-300 uppercase tracking-wider text-[11px]">Notice:</span>
            <span className="font-semibold text-white">Not an official forecast. Check PAGASA.</span>
            <span className="hidden md:inline text-amber-200/80 text-[11px]">
              — Verified for Philippine localized lifestyle planning and situational advisory.
            </span>
          </div>

          <a
            href="https://bagong.pagasa.dost.gov.ph"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[11px] font-semibold text-amber-300 hover:text-amber-100 hover:underline transition-colors shrink-0"
          >
            PAGASA Portal <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Brand & Interactive Badge */}
        <div className="flex items-center justify-between md:justify-start gap-3">
          <div className="flex items-center gap-3">
            <div className="relative group cursor-pointer" onClick={() => onToggleAutoPhase()}>
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-sky-400 p-[2px] shadow-lg shadow-amber-500/20 group-hover:shadow-amber-500/40 transition-all duration-300 transform group-hover:scale-105">
                <div className="w-full h-full bg-slate-950/85 backdrop-blur-md rounded-[14px] flex items-center justify-center">
                  {phase === "morning" ? (
                    <CloudSun className="w-6 h-6 text-amber-400 animate-pulse-subtle" />
                  ) : (
                    <Sun className="w-6 h-6 text-amber-500 animate-sun-spin" />
                  )}
                </div>
              </div>
              <span className="absolute -bottom-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border border-slate-950"></span>
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg md:text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-amber-200 bg-clip-text text-transparent">
                  Munora AI Weather Advisory
                </h1>
                <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-white/10 text-cyan-300 border border-cyan-400/30 uppercase tracking-widest hidden sm:inline-block">
                  PH v1.0
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="flex items-center gap-1 text-slate-300 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  {selectedCity.name}, {selectedCity.province}
                </span>
                <span>•</span>
                <span className="text-slate-400 text-[11px]">{selectedCity.elevation}</span>
              </div>
            </div>
          </div>

          {/* Metric Toggle on Mobile */}
          <div className="flex md:hidden items-center gap-1 p-1 bg-white/10 rounded-xl border border-white/10">
            <button
              onClick={() => onToggleUnit(false)}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                !isFahrenheit ? "bg-amber-500 text-slate-950 shadow" : "text-slate-400 hover:text-white"
              }`}
            >
              °C
            </button>
            <button
              onClick={() => onToggleUnit(true)}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                isFahrenheit ? "bg-amber-500 text-slate-950 shadow" : "text-slate-400 hover:text-white"
              }`}
            >
              °F
            </button>
          </div>
        </div>

        {/* Center: Comprehensive Philippine City Search Bar */}
        <div className="relative flex-1 max-w-md mx-auto md:mx-4 w-full" ref={dropdownRef}>
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onFocus={() => setIsDropdownOpen(true)}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsDropdownOpen(true);
              }}
              placeholder="Search Philippine city (e.g., Manila, Muntinlupa...)"
              className="w-full pl-10 pr-9 py-2 rounded-xl text-sm bg-slate-900/60 border border-white/15 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/70 backdrop-blur-md transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs font-bold"
              >
                ✕
              </button>
            )}
          </div>

          {/* City Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute left-0 right-0 mt-2 bg-slate-900/95 backdrop-blur-2xl border border-white/15 rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              {/* Muntinlupa City Barangays Recent Search History Dropdown Directly Below Search Bar */}
              <div className="p-2 border-b border-white/10 bg-slate-950/40">
                <MuntinlupaHistoryDropdown
                  onSelectBarangay={(b) => {
                    const c = barangayToCityFormat(b);
                    onSelectCity(c);
                    setIsDropdownOpen(false);
                    setSearchQuery("");
                  }}
                  onClose={() => setIsDropdownOpen(false)}
                />
              </div>

              {/* Island Filters */}
              <div className="p-2 border-b border-white/10 flex items-center gap-1.5 bg-slate-950/50 text-xs">
                <span className="text-slate-400 text-[11px] font-semibold px-2">Islands:</span>
                {["All", "Luzon", "Visayas", "Mindanao"].map((island) => (
                  <button
                    key={island}
                    onClick={() => setIslandFilter(island)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
                      islandFilter === island
                        ? "bg-amber-500 text-slate-950 font-bold shadow"
                        : "text-slate-300 hover:bg-white/10"
                    }`}
                  >
                    {island}
                  </button>
                ))}
              </div>

              {/* Quick Select Chips */}
              <div className="p-2.5 border-b border-white/5 bg-slate-950/20 flex flex-wrap gap-1.5 items-center">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold mr-1">Hubs:</span>
                {popularPicks.map((cityId) => {
                  const c = PHILIPPINE_CITIES.find((x) => x.id === cityId);
                  if (!c) return null;
                  const isCur = selectedCity.id === c.id;
                  return (
                    <button
                      key={c.id}
                      onClick={() => {
                        onSelectCity(c);
                        setIsDropdownOpen(false);
                        setSearchQuery("");
                      }}
                      className={`px-2 py-0.5 rounded-md text-xs transition-colors flex items-center gap-1 ${
                        isCur
                          ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                          : "bg-white/5 text-slate-300 hover:bg-white/15 border border-white/10"
                      }`}
                    >
                      <span>{c.name}</span>
                      {isCur && <Check className="w-3 h-3 text-amber-400" />}
                    </button>
                  );
                })}
              </div>

              {/* City List */}
              <div className="max-h-72 overflow-y-auto custom-scrollbar divide-y divide-white/5">
                {filteredCities.length > 0 ? (
                  filteredCities.map((city) => {
                    const isSelected = selectedCity.id === city.id;
                    return (
                      <button
                        key={city.id}
                        onClick={() => {
                          onSelectCity(city);
                          setIsDropdownOpen(false);
                          setSearchQuery("");
                        }}
                        className={`w-full text-left px-4 py-2.5 flex items-center justify-between transition-colors ${
                          isSelected
                            ? "bg-amber-500/15 text-amber-200"
                            : "hover:bg-white/10 text-slate-200"
                        }`}
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-sm">{city.name}</span>
                            <span className="text-[11px] px-1.5 py-0.5 rounded bg-white/10 text-slate-300">
                              {city.islandGroup}
                            </span>
                            {city.environment === "city" ? (
                              <Building2 className="w-3.5 h-3.5 text-cyan-400" title="City Skyline" />
                            ) : (
                              <Trees className="w-3.5 h-3.5 text-emerald-400" title="Countryside" />
                            )}
                          </div>
                          <div className="text-xs text-slate-400 mt-0.5 flex items-center gap-2">
                            <span>{city.province} • {city.region}</span>
                            <span>({city.elevation})</span>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="text-sm font-bold text-slate-100">{city.baseTemp}°C</span>
                          {city.rainfallAlert && (
                            <span className="block text-[10px] text-amber-400 font-medium">Alert</span>
                          )}
                          {city.tcwsAlert && (
                            <span className="block text-[10px] text-red-400 font-bold">TCWS</span>
                          )}
                        </div>
                      </button>
                    );
                  })
                ) : (
                  <div className="p-6 text-center text-slate-400 text-sm">
                    No Philippine city or municipality found matching "{searchQuery}".
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right Controls: Metric Toggle & Time/Theme Phase System */}
        <div className="flex items-center justify-between md:justify-end gap-3 flex-wrap">
          {/* Environment Scene Toggle Pill */}
          <div className="flex items-center p-1 bg-slate-900/60 rounded-xl border border-white/15 backdrop-blur-md">
            <button
              onClick={() => onToggleEnvironment("city")}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                environment === "city"
                  ? "bg-cyan-500/25 text-cyan-300 border border-cyan-400/40 shadow"
                  : "text-slate-400 hover:text-slate-200"
              }`}
              title="City Environment: Urban skyline silhouette (Metro Manila / Muntinlupa)"
            >
              <Building2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">City</span>
            </button>
            <button
              onClick={() => onToggleEnvironment("countryside")}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                environment === "countryside"
                  ? "bg-emerald-500/25 text-emerald-300 border border-emerald-400/40 shadow"
                  : "text-slate-400 hover:text-slate-200"
              }`}
              title="Countryside Environment: Rural mountain and palm tree landscape"
            >
              <Trees className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Rural</span>
            </button>
          </div>

          {/* 2-Phase Dynamic Time System (Morning / Afternoon) */}
          <div className="flex items-center p-1 bg-slate-900/60 rounded-xl border border-white/15 backdrop-blur-md">
            <button
              onClick={() => onChangePhase("morning")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                phase === "morning"
                  ? "bg-gradient-to-r from-cyan-500 to-sky-600 text-white shadow-md shadow-cyan-500/20"
                  : "text-slate-400 hover:text-slate-200"
              }`}
              title="Morning: Soft Gold & Cyan Dawn"
            >
              <CloudSun className="w-3.5 h-3.5 text-amber-300" />
              <span>Morning</span>
            </button>
            <button
              onClick={() => onChangePhase("afternoon")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                phase === "afternoon"
                  ? "bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 shadow-md shadow-amber-500/20"
                  : "text-slate-400 hover:text-slate-200"
              }`}
              title="Afternoon: Warm Golden Amber"
            >
              <Sun className="w-3.5 h-3.5" />
              <span>Afternoon</span>
            </button>
          </div>

          {/* Metric Toggle (Desktop) */}
          <div className="hidden md:flex items-center p-1 bg-slate-900/60 rounded-xl border border-white/15 backdrop-blur-md">
            <button
              onClick={() => onToggleUnit(false)}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                !isFahrenheit ? "bg-amber-500 text-slate-950 shadow" : "text-slate-400 hover:text-white"
              }`}
            >
              °C
            </button>
            <button
              onClick={() => onToggleUnit(true)}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                isFahrenheit ? "bg-amber-500 text-slate-950 shadow" : "text-slate-400 hover:text-white"
              }`}
            >
              °F
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

