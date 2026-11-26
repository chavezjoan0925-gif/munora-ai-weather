import React from "react";
import { AlertTriangle, ExternalLink, ShieldAlert, Heart, SunMedium } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10 bg-slate-950/80 backdrop-blur-2xl py-10 px-4 sm:px-6 lg:px-8 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto">
        {/* Prominent Mandatory Disclaimer Callout */}
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <span className="font-black text-amber-300 uppercase tracking-wider block text-xs">
                Mandatory Advisory Protocol:
              </span>
              <p className="text-white text-xs sm:text-sm font-semibold">
                "Not an official forecast. Check PAGASA."
              </p>
            </div>
          </div>

          <a
            href="https://bagong.pagasa.dost.gov.ph"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 transition-colors flex items-center gap-1.5 shrink-0 text-xs shadow-md shadow-amber-500/20"
          >
            <span>Visit PAGASA Portal</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Informational Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 pb-8 border-b border-white/10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-amber-500 to-sky-400 flex items-center justify-center text-slate-950 font-bold text-xs">
                M
              </div>
              <span className="font-extrabold text-white text-sm">
                Munora AI Weather Advisory
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-md leading-relaxed">
              Philippine-tailored atmospheric monitoring and lifestyle intelligence platform.
              Combines localized heat index assessments, bento weather analytics, dynamic environmental skylines,
              and English daily lifestyle guidance for cities and municipalities across the archipelago.
            </p>
          </div>

          <div>
            <span className="font-bold text-white text-xs uppercase tracking-wider block mb-3">
              Official PH Agencies
            </span>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://bagong.pagasa.dost.gov.ph"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-300 transition-colors flex items-center gap-1"
                >
                  PAGASA DOST <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://ndrrmc.gov.ph"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-300 transition-colors flex items-center gap-1"
                >
                  NDRRMC Philippines <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://phivolcs.dost.gov.ph"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-300 transition-colors flex items-center gap-1"
                >
                  PHIVOLCS DOST <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://doh.gov.ph"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-300 transition-colors flex items-center gap-1"
                >
                  DOH Heat Health Guidelines <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <span className="font-bold text-white text-xs uppercase tracking-wider block mb-3">
              Safety Classifications
            </span>
            <ul className="space-y-1.5 text-xs">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>OK: Heat Index &lt; 33°C</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>Be careful: 33°C – 41°C</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500" />
                <span>Danger: 42°C+ (Cramps/Exhaustion)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-400" />
                <span>TCWS Signal & Heavy Rain Alerts</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            © {new Date().getFullYear()} Munora AI Weather Advisory. Independent Philippine weather dashboard.
          </div>
          <div className="flex items-center gap-1">
            Built for Philippine communities with <Heart className="w-3 h-3 text-rose-500 inline fill-rose-500" /> & local meteorological care.
          </div>
        </div>
      </div>
    </footer>
  );
}

