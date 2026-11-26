import React, { useState } from "react";
import { Search, MapPin, Building2, Trees, Check } from "lucide-react";
import { PHILIPPINE_CITIES } from "../../data/philippineCities";
import MuntinlupaHistoryDropdown from "../MuntinlupaHistoryDropdown";
import { barangayToCityFormat } from "../../data/muntinlupaBarangays";

export default function MobileCitiesTab({ selectedCity, onSelectCity, onNavigateToForecast }) {
  const [search, setSearch] = useState("");
  const [island, setIsland] = useState("All");

  const filtered = PHILIPPINE_CITIES.filter((c) => {
    const matchesIsland = island === "All" || c.islandGroup === island;
    const q = search.toLowerCase().trim();
    return (
      matchesIsland &&
      (c.name.toLowerCase().includes(q) ||
        c.province.toLowerCase().includes(q) ||
        c.region.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-4 pb-6">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search 50+ Philippine cities..."
          className="w-full pl-10 pr-9 py-2.5 rounded-2xl bg-slate-900/80 border border-white/15 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold"
          >
            ✕
          </button>
        )}
      </div>

      {/* Muntinlupa City Barangays Recent Search History Dropdown Directly Below Search Bar */}
      <MuntinlupaHistoryDropdown
        onSelectBarangay={(barangay) => {
          const cityFormat = barangayToCityFormat(barangay);
          onSelectCity(cityFormat);
          onNavigateToForecast();
        }}
      />

      {/* Island Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        {["All", "Luzon", "Visayas", "Mindanao"].map((isl) => (
          <button
            key={isl}
            onClick={() => setIsland(isl)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              island === isl
                ? "bg-amber-500 text-slate-950 shadow"
                : "bg-slate-900/60 text-slate-300 border border-white/10"
            }`}
          >
            {isl}
          </button>
        ))}
      </div>

      {/* Cities List */}
      <div className="space-y-2">
        {filtered.map((city) => {
          const isSelected = selectedCity.id === city.id;

          return (
            <button
              key={city.id}
              onClick={() => {
                onSelectCity(city);
                onNavigateToForecast();
              }}
              className={`w-full p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between ${
                isSelected
                  ? "bg-amber-500/15 border-amber-500/50 shadow-md shadow-amber-500/10"
                  : "bg-slate-900/60 border-white/10 hover:bg-white/10"
              }`}
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-extrabold text-white">{city.name}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-slate-300">
                    {city.islandGroup}
                  </span>
                  {city.environment === "city" ? (
                    <Building2 className="w-3.5 h-3.5 text-cyan-400" />
                  ) : (
                    <Trees className="w-3.5 h-3.5 text-emerald-400" />
                  )}
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  {city.province} • {city.region} • {city.elevation}
                </p>
                {city.tag && (
                  <span className="text-[10px] text-amber-300/80 font-medium mt-0.5 block">
                    ★ {city.tag}
                  </span>
                )}
              </div>

              <div className="text-right shrink-0">
                <span className="text-xl font-black text-white">{city.baseTemp}°C</span>
                {isSelected ? (
                  <span className="flex items-center justify-end gap-1 text-[11px] font-bold text-amber-400 mt-0.5">
                    <Check className="w-3 h-3" /> Active
                  </span>
                ) : (
                  <span className="text-[11px] text-slate-400 mt-0.5 block">{city.typicalCondition}</span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
