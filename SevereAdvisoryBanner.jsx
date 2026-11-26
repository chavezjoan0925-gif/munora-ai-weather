import React, { useState } from "react";
import { AlertTriangle, ShieldAlert, ChevronDown, ChevronUp, ExternalLink, Wind } from "lucide-react";

export default function SevereAdvisoryBanner({ advisory, city }) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!advisory) return null;

  const isRed = advisory.level === "danger";

  return (
    <div
      className={`w-full rounded-2xl border transition-all duration-300 shadow-lg overflow-hidden ${
        isRed
          ? "bg-gradient-to-r from-red-950/80 via-red-900/60 to-red-950/80 border-red-500/40"
          : "bg-gradient-to-r from-amber-950/80 via-amber-900/60 to-amber-950/80 border-amber-500/40"
      }`}
    >
      <div className="p-3 sm:p-3.5 flex items-start justify-between gap-3">
        <div className="flex items-start gap-2.5 min-w-0">
          <div
            className={`p-1.5 rounded-lg border mt-0.5 shrink-0 ${
              isRed
                ? "bg-red-500/20 text-red-400 border-red-500/30"
                : "bg-amber-500/20 text-amber-400 border-amber-500/30"
            }`}
          >
            {advisory.type === "tcws" ? (
              <Wind className="w-4 h-4 animate-pulse" />
            ) : (
              <AlertTriangle className="w-4 h-4" />
            )}
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span
                className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.2 rounded-full border ${
                  isRed
                    ? "bg-red-500 text-white border-red-400"
                    : "bg-amber-500 text-slate-950 border-amber-300"
                }`}
              >
                {advisory.badge}
              </span>
              <span className="text-[10px] font-semibold text-slate-300 truncate">
                {city.name}
              </span>
            </div>
            <h4 className="text-xs sm:text-sm font-bold text-white tracking-tight truncate">
              {advisory.title}
            </h4>
            <p className="text-[11px] text-slate-300 line-clamp-2 mt-0.5">
              {advisory.details}
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1 rounded-lg bg-white/10 hover:bg-white/15 text-slate-300 shrink-0 mt-0.5"
          title={isExpanded ? "Collapse bulletin" : "Expand bulletin"}
        >
          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Collapsible Actionable Guidance Details */}
      {isExpanded && (
        <div className="px-3.5 pb-3.5 pt-1 border-t border-white/10 bg-black/25 text-xs text-slate-200">
          <div className="p-2 rounded-xl bg-white/5 border border-white/10 mb-2">
            <span className="font-bold text-amber-300 block text-[10px]">Precautionary Action:</span>
            <span className="text-[11px]">{advisory.actionText}</span>
          </div>

          <a
            href="https://bagong.pagasa.dost.gov.ph"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-1.5 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-1 shadow"
          >
            <span>View Full PAGASA Bulletin</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      )}
    </div>
  );
}
