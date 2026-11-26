import React from "react";
import { 
  AlertTriangle, 
  Wind, 
  CloudRain, 
  ShieldAlert, 
  PhoneCall, 
  ExternalLink,
  Info 
} from "lucide-react";

export default function MobileAlertsTab({ data }) {
  const { city, severeAdvisory } = data;

  const hotlines = [
    { name: "PAGASA Weather Division", number: "(02) 8284-0800" },
    { name: "NDRRMC Operations Center", number: "(02) 8911-5061" },
    { name: "National Emergency Hotline", number: "911" },
    { name: "Philippine Red Cross", number: "143 / (02) 8790-2300" }
  ];

  return (
    <div className="space-y-4 pb-6">
      {/* Current Location Alert Status */}
      {severeAdvisory ? (
        <div
          className={`p-4 rounded-3xl border ${
            severeAdvisory.level === "danger"
              ? "bg-red-950/40 border-red-500/40"
              : "bg-amber-950/40 border-amber-500/40"
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                severeAdvisory.level === "danger"
                  ? "bg-red-500 text-white"
                  : "bg-amber-500 text-slate-950 font-extrabold"
              }`}
            >
              {severeAdvisory.badge}
            </span>
            <span className="text-xs text-slate-300 font-bold">
              {city.name}, {city.province}
            </span>
          </div>

          <h3 className="text-base font-black text-white">{severeAdvisory.title}</h3>
          <p className="text-xs text-slate-200 mt-1 leading-relaxed">
            {severeAdvisory.details}
          </p>

          <div className="mt-3 p-3 rounded-2xl bg-black/30 border border-white/10 text-xs text-slate-300">
            <span className="font-bold text-amber-300 block mb-0.5">Recommended Action:</span>
            <span>{severeAdvisory.actionText}</span>
          </div>

          <a
            href="https://bagong.pagasa.dost.gov.ph"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 w-full py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow"
          >
            <span>Open Official PAGASA Bulletin</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      ) : (
        <div className="p-4 rounded-3xl bg-slate-900/60 border border-emerald-500/30 flex items-center gap-3">
          <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">No Active Storm Signal in {city.name}</h4>
            <p className="text-xs text-slate-400">No TCWS Signal #1–#5 raised currently over this area.</p>
          </div>
        </div>
      )}

      {/* Mandatory Disclaimer Box */}
      <div className="p-4 rounded-3xl bg-amber-500/10 border border-amber-500/30 text-xs">
        <div className="flex items-center gap-2 mb-1">
          <AlertTriangle className="w-4 h-4 text-amber-400" />
          <span className="font-black text-amber-300 uppercase tracking-wider">
            Mandatory Advisory Protocol
          </span>
        </div>
        <p className="text-slate-200 font-medium leading-relaxed">
          "Not an official forecast. Check PAGASA." Always refer to official PAGASA DOST storm warnings and local CDRRMO evacuation notices.
        </p>
      </div>

      {/* Philippine TCWS Guide Card */}
      <div className="p-4 rounded-3xl bg-slate-900/60 border border-white/10">
        <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-1.5">
          <Wind className="w-4 h-4 text-teal-400" />
          PAGASA TCWS Reference Guide
        </h4>
        <div className="space-y-2 text-xs">
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
            <span className="font-bold text-amber-400 block">Signal #1 (39–61 km/h)</span>
            <span className="text-slate-300">Minimal to minor threat to life and property. Intermittent rain.</span>
          </div>
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
            <span className="font-bold text-orange-400 block">Signal #2 (62–88 km/h)</span>
            <span className="text-slate-300">Minor to moderate threat. Travel by sea is hazardous.</span>
          </div>
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
            <span className="font-bold text-red-400 block">Signal #3 to #5 (89+ km/h)</span>
            <span className="text-slate-300">Moderate to catastrophic threat. Severe typhoon destruction risk.</span>
          </div>
        </div>
      </div>

      {/* Emergency Hotlines Card */}
      <div className="p-4 rounded-3xl bg-slate-900/60 border border-white/10">
        <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-1.5">
          <PhoneCall className="w-4 h-4 text-cyan-400" />
          Philippine Emergency Hotlines
        </h4>
        <div className="space-y-1.5 text-xs">
          {hotlines.map((hl, i) => (
            <div key={i} className="flex items-center justify-between p-2 rounded-xl bg-white/5">
              <span className="text-slate-300">{hl.name}</span>
              <span className="font-bold text-cyan-300">{hl.number}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

