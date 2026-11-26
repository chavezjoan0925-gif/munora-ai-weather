import React, { useState } from "react";
import { 
  Footprints, 
  Bus, 
  Activity, 
  HardHat, 
  Clock, 
  AlertTriangle, 
  CalendarCheck 
} from "lucide-react";

export default function ActivityPlannerCard({ data }) {
  const { activityPlanner } = data;
  const [selectedActivity, setSelectedActivity] = useState("Walking");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("Morning");

  const activities = [
    { name: "Walking", icon: Footprints, label: "Walking" },
    { name: "Commuting", icon: Bus, label: "Commute" },
    { name: "Exercise", icon: Activity, label: "Exercise" },
    { name: "Outdoor Work", icon: HardHat, label: "Work" }
  ];

  const timeSlots = ["Morning", "Midday", "Late Afternoon", "Evening"];

  const currentActivityData = activityPlanner[selectedActivity];
  const currentSlotData = currentActivityData.slots[selectedTimeSlot];

  return (
    <div className="glass-panel rounded-3xl p-3.5 sm:p-4 border border-white/15 relative overflow-hidden transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-1.5">
          <div className="p-1 rounded-lg bg-cyan-500/20 text-cyan-400">
            <CalendarCheck className="w-3.5 h-3.5" />
          </div>
          <h3 className="text-xs sm:text-sm font-bold text-white tracking-tight">
            Activity Planner
          </h3>
        </div>
        <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
          v1 Specs
        </span>
      </div>

      {/* 4 Activity Selector Buttons */}
      <div className="grid grid-cols-4 gap-1.5 mb-3">
        {activities.map((act) => {
          const Icon = act.icon;
          const isSelected = selectedActivity === act.name;
          return (
            <button
              key={act.name}
              onClick={() => setSelectedActivity(act.name)}
              className={`p-2 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all ${
                isSelected
                  ? "bg-amber-500/20 border-amber-500/50 text-amber-200 shadow"
                  : "bg-white/5 border-white/10 text-slate-400 hover:text-white"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-[10px] font-bold truncate">{act.label}</span>
            </button>
          );
        })}
      </div>

      {/* Mandatory Activity Rule Box (Official Specification) */}
      <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 mb-3 flex items-start gap-2">
        <AlertTriangle className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
        <div>
          <span className="text-[9px] font-black uppercase tracking-wider text-amber-300 block">
            Lifestyle Advice:
          </span>
          <p className="text-xs font-semibold text-white leading-snug">
            "{currentActivityData.ruleText}"
          </p>
        </div>
      </div>

      {/* Schedule Window Selector */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-1.5 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-cyan-400" /> Schedule Window:
          </span>
          <span>PST</span>
        </div>

        <div className="grid grid-cols-4 gap-1">
          {timeSlots.map((slot) => {
            const isSlotActive = selectedTimeSlot === slot;
            const shortLabel = slot === "Late Afternoon" ? "Afternoon" : slot;
            return (
              <button
                key={slot}
                onClick={() => setSelectedTimeSlot(slot)}
                className={`py-1 px-1 rounded-lg text-[10px] font-bold border transition-all truncate ${
                  isSlotActive
                    ? "bg-cyan-500/25 border-cyan-400/50 text-cyan-200 shadow"
                    : "bg-white/5 border-white/10 text-slate-300"
                }`}
              >
                {shortLabel}
              </button>
            );
          })}
        </div>
      </div>

      {/* Window Result Detail */}
      <div className="p-2.5 rounded-xl bg-slate-900/60 border border-white/10 backdrop-blur-md">
        <div className="flex items-center justify-between gap-1 mb-1 pb-1 border-b border-white/10">
          <span className="text-xs font-bold text-white">
            {selectedTimeSlot} ({currentSlotData.tempNote})
          </span>
          <span
            className={`px-2 py-0.2 rounded-full text-[10px] font-extrabold border ${currentSlotData.statusColor}`}
          >
            {currentSlotData.suitability}
          </span>
        </div>
        <p className="text-xs text-slate-300 font-medium leading-relaxed">
          {currentSlotData.summary}
        </p>
      </div>
    </div>
  );
}
