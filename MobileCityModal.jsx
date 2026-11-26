import React, { useState } from "react";
import { 
  Search, 
  X, 
  MapPin, 
  Check, 
  Building2, 
  Trees, 
  Compass 
} from "lucide-react";
import { PHILIPPINE_CITIES } from "../../data/philippineCities";
import MuntinlupaHistoryDropdown from "../MuntinlupaHistoryDropdown";
import { barangayToCityFormat } from "../../data/muntinlupaBarangays";

export default function MobileCityModal({ isOpen, onClose, selectedCity, onSelectCity }) {
  const [query, setQuery] = useState("");
  const [island, setIsland] = useState("All");

  if (!isOpen) return null;

  const popularPicks = ["muntinlupa", "manila", "baguio", "cebu", "davao", "tagaytay"];

  const filteredCities = PHILIPPINE_CITIES.filter((c) => {
    const matchesIsland = island === "All" || c.islandGroup === island;
    const q = query.toLowerCase().trim();
    const matchesQ =
      c.name.toLowerCase().includes(q) ||
      c.province.toLowerCase().includes(q) ||
      c.region.toLowerCase().includes(q);
    return matchesIsland && matchesQ;
  });

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      {/* Backdrop tap to close */}
      <div className="flex-1" onClick={onClose} />

      {/* Bottom Sheet Card */}
      <div className="w-full max-h-[88vh] bg-slate-900 border-t border-white/15 rounded-t-3xl flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-bottom duration-300">
        {/* Drag handle */}
        <div className="w-full flex justify-center pt-3 pb-1 cursor-pointer" onClick={onClose}>
          <div className="w-12 h-1.5 bg-white/20 rounded-full" />
        </div>

        {/* Title bar */}
        <div className="px-4 py-2.5 flex items-center justify-between border-b border-white/10">
          <div>
            <h3 className="text-sm sm:text-base font-black text-white">Philippine Cities & Hubs</h3>
            <p className="text-[11px] text-slate-400">Select city or Muntinlupa barangay for localized advisory</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search input & Recent History Dropdown Container */}
        <div className="p-3.5 border-b border-white/10 bg-slate-950/40">
          {/* Search Input Bar */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Manila, Muntinlupa, Cebu, Davao..."
              className="w-full pl-10 pr-9 py-2.5 rounded-2xl bg-slate-950 border border-white/15 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
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
              onClose();
            }}
            onClose={onClose}
          />

          {/* Island Filter Pills */}
          <div className="flex items-center gap-1.5 mt-3 overflow-x-auto no-scrollbar">
            {["All", "Luzon", "Visayas", "Mindanao"].map((isl) => (
              <button
                key={isl}
                onClick={() => setIsland(isl)}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  island === isl
                    ? "bg-amber-500 text-slate-950 shadow"
                    : "bg-white/5 text-slate-300 border border-white/10"
                }`}
              >
                {isl}
              </button>
            ))}
          </div>

          {/* Hub Quick Chips */}
          <div className="flex items-center gap-1.5 mt-2 overflow-x-auto no-scrollbar">
            <span className="text-[10px] uppercase font-bold text-slate-400 shrink-0">Hubs:</span>
            {popularPicks.map((id) => {
              const c = PHILIPPINE_CITIES.find((x) => x.id === id);
              if (!c) return null;
              const isSelected = selectedCity.id === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => {
                    onSelectCity(c);
                    onClose();
                  }}
                  className={`px-2.5 py-0.5 rounded-lg text-xs font-medium shrink-0 flex items-center gap-1 ${
                    isSelected
                      ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                      : "bg-white/5 text-slate-300 border border-white/10"
                  }`}
                >
                  <span>{c.name}</span>
                  {isSelected && <Check className="w-3 h-3 text-amber-400" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* City Scroll List */}
        <div className="flex-1 overflow-y-auto divide-y divide-white/5 custom-scrollbar px-2 py-1 max-h-56">
          {filteredCities.length > 0 ? (
            filteredCities.map((city) => {
              const isCurrent = selectedCity.id === city.id;
              return (
                <button
                  key={city.id}
                  onClick={() => {
                    onSelectCity(city);
                    onClose();
                  }}
                  className={`w-full p-3 text-left rounded-2xl flex items-center justify-between transition-colors ${
                    isCurrent ? "bg-amber-500/15 text-amber-200" : "hover:bg-white/5 text-slate-200"
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-white">{city.name}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-slate-300">
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
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-base font-extrabold text-white">{city.baseTemp}°C</span>
                    {city.rainfallAlert && (
                      <span className="block text-[10px] font-bold text-amber-400">Rain Alert</span>
                    )}
                    {city.tcwsAlert && (
                      <span className="block text-[10px] font-extrabold text-red-400">TCWS</span>
                    )}
                  </div>
                </button>
              );
            })
          ) : (
            <div className="p-8 text-center text-slate-400 text-sm">
              No matching Philippine city found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
