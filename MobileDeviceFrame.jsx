import React from "react";
import { Smartphone, Monitor } from "lucide-react";

export default function MobileDeviceFrame({ children, isFrameMode, onToggleFrameMode }) {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start bg-slate-950 text-slate-100 py-0 sm:py-4 px-0 sm:px-4 relative overflow-x-hidden">
      {/* Top Floating Simulator Controls (Only visible on tablet & desktop) */}
      <div className="hidden sm:flex items-center justify-between gap-3 w-full max-w-[390px] mb-3 px-3.5 py-1.5 rounded-2xl bg-slate-900/80 border border-white/10 backdrop-blur-xl shadow-lg z-50">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-bold text-white tracking-tight">
            Munora AI App
          </span>
          <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 font-extrabold uppercase">
            Mobile v1
          </span>
        </div>

        <button
          onClick={onToggleFrameMode}
          className="flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-slate-200 border border-white/15 transition-all shadow-sm"
          title="Toggle between Smartphone Device Frame and Full Viewport View"
        >
          {isFrameMode ? (
            <>
              <Monitor className="w-3 h-3 text-cyan-400" />
              <span>Full View</span>
            </>
          ) : (
            <>
              <Smartphone className="w-3 h-3 text-amber-400" />
              <span>Phone Frame</span>
            </>
          )}
        </button>
      </div>

      {/* Main Container: Either Framed or Full Viewport */}
      {isFrameMode ? (
        <div className="relative w-full max-w-[390px] mx-auto transition-all duration-300">
          {/* Smartphone Hardware Chassis Bezel */}
          <div className="relative rounded-[48px] p-[8px] bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.12),inset_0_1px_1px_rgba(255,255,255,0.3)] border border-slate-700/60">
            {/* Left Hardware Buttons (Volume & Mute) */}
            <div className="absolute -left-[12px] top-24 w-[4px] h-8 bg-slate-700 rounded-l-md" />
            <div className="absolute -left-[12px] top-36 w-[4px] h-11 bg-slate-700 rounded-l-md" />
            <div className="absolute -left-[12px] top-50 w-[4px] h-11 bg-slate-700 rounded-l-md" />

            {/* Right Hardware Button (Power) */}
            <div className="absolute -right-[12px] top-32 w-[4px] h-14 bg-slate-700 rounded-r-md" />

            {/* Smartphone Inner Screen Glass */}
            <div className="relative rounded-[40px] overflow-hidden bg-slate-950 w-full h-[780px] max-h-[calc(100vh-4.5rem)] flex flex-col border border-white/10 shadow-inner">
              {children}
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-[420px] mx-auto min-h-screen flex flex-col bg-slate-950 shadow-2xl">
          {children}
        </div>
      )}
    </div>
  );
}
