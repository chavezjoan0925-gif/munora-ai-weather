import React, { useState, useRef, useEffect } from "react";
import { 
  Bot, 
  Sparkles, 
  Send, 
  ExternalLink, 
  AlertTriangle, 
  Zap, 
  Umbrella, 
  ShieldCheck, 
  Shirt, 
  Activity, 
  Car, 
  RotateCcw,
  User
} from "lucide-react";

export default function WeatherChatbotAssistant({ selectedCity, weatherData }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "user",
      text: "Should I wash my car today in Ayala Alabang or will it rain?",
      timestamp: "Just now"
    },
    {
      id: 2,
      sender: "ai",
      text: "Good day! While current morning conditions in Ayala Alabang are 30°C with fair sunshine, local Habagat convective rain chances jump sharply to 65% between 3:00 PM and 5:00 PM along the southern Muntinlupa ridge. Road spray and localized street puddles are very likely by late afternoon. I recommend holding off on a full car wash until Wednesday, when drier high-pressure conditions move in.",
      pills: [
        { icon: Zap, label: "65% Rain Risk at 3PM", color: "bg-blue-500/20 text-blue-300 border-blue-400/40" },
        { icon: Umbrella, label: "Carry Folding Umbrella", color: "bg-cyan-500/20 text-cyan-300 border-cyan-400/40" },
        { icon: ShieldCheck, label: "Verified PAGASA Check Advised", color: "bg-amber-500/20 text-amber-300 border-amber-400/40" }
      ],
      timestamp: "Just now"
    }
  ]);

  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatBottomRef = useRef(null);

  // Suggested Quick Prompts
  const suggestedPrompts = [
    {
      label: "👕 Safe to hang laundry outside?",
      query: "Is it safe to hang my laundry outside today?",
      response: "Morning hours until 1:30 PM are safe for outdoor laundry with UV Index 7 assisting rapid drying. However, be sure to pull garments in before 2:30 PM, as afternoon convective cloud build-up and 60% shower probability will increase moisture.",
      pills: [
        { icon: Zap, label: "Dry by 1:30 PM", color: "bg-emerald-500/20 text-emerald-300 border-emerald-400/40" },
        { icon: Umbrella, label: "Pull In Before 2:30 PM", color: "bg-amber-500/20 text-amber-300 border-amber-400/40" },
        { icon: ShieldCheck, label: "Verified PAGASA Check Advised", color: "bg-cyan-500/20 text-cyan-300 border-cyan-400/40" }
      ]
    },
    {
      label: "🏃 Best jogging window today?",
      query: "What is the best jogging window today?",
      response: "Your optimal jogging window is early morning (6:00 AM – 7:45 AM) at 27°C with mild air currents, or late evening after 6:30 PM when surface heat radiates away. Avoid outdoor running between 11:00 AM and 3:00 PM due to caution-level heat index.",
      pills: [
        { icon: Activity, label: "6:00–7:45 AM Optimal", color: "bg-emerald-500/20 text-emerald-300 border-emerald-400/40" },
        { icon: Zap, label: "Avoid 11AM–3PM Heat", color: "bg-red-500/20 text-red-300 border-red-400/40" },
        { icon: ShieldCheck, label: "Verified PAGASA Check Advised", color: "bg-amber-500/20 text-amber-300 border-amber-400/40" }
      ]
    },
    {
      label: "🚗 Flooding risk in Munti?",
      query: "What is the flooding risk in Muntinlupa today?",
      response: "Low-lying sections along National Road near Tunasan and lakeside drainage points near Laguna de Bay may encounter brief gutter-deep water during peak 3 PM–5 PM downpours. High-elevation corridors in Alabang, Filinvest, and Ayala Alabang remain clear.",
      pills: [
        { icon: Car, label: "Gutter Water in Tunasan Lowlands", color: "bg-amber-500/20 text-amber-300 border-amber-400/40" },
        { icon: Zap, label: "Alabang Ridges Flood-Free", color: "bg-emerald-500/20 text-emerald-300 border-emerald-400/40" },
        { icon: ShieldCheck, label: "Verified PAGASA Check Advised", color: "bg-cyan-500/20 text-cyan-300 border-cyan-400/40" }
      ]
    }
  ];

  const handleSendQuery = (textToSend) => {
    const q = textToSend || inputValue;
    if (!q.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: "user",
      text: q,
      timestamp: "Just now"
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    // Look for matching pre-defined answer or synthesize dynamic response
    setTimeout(() => {
      let matchedPrompt = suggestedPrompts.find((p) =>
        p.query.toLowerCase().includes(q.toLowerCase()) || q.toLowerCase().includes(p.label.toLowerCase().slice(2))
      );

      let replyText = "";
      let replyPills = [];

      if (matchedPrompt) {
        replyText = matchedPrompt.response;
        replyPills = matchedPrompt.pills;
      } else {
        replyText = `Based on current observation for ${selectedCity.name} (${weatherData.currentTemp}°C, ${weatherData.conditionText}, Heat Index ${weatherData.heatIndexC}°C): Expect ${
          weatherData.precipProb > 50 ? "passing afternoon thunderstorms" : "predominantly warm conditions"
        }. Keep light apparel ready and recheck localized radar for sudden cloud bursts.`;
        replyPills = [
          { icon: Zap, label: `${weatherData.precipProb}% Rain Probability`, color: "bg-blue-500/20 text-blue-300 border-blue-400/40" },
          { icon: Umbrella, label: weatherData.precipProb > 40 ? "Umbrella Needed" : "Sun Shield Recommended", color: "bg-cyan-500/20 text-cyan-300 border-cyan-400/40" },
          { icon: ShieldCheck, label: "Verified PAGASA Check Advised", color: "bg-amber-500/20 text-amber-300 border-amber-400/40" }
        ];
      }

      const aiMsg = {
        id: Date.now() + 1,
        sender: "ai",
        text: replyText,
        pills: replyPills,
        timestamp: "Just now"
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 600);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 1,
        sender: "user",
        text: "Should I wash my car today in Ayala Alabang or will it rain?",
        timestamp: "Just now"
      },
      {
        id: 2,
        sender: "ai",
        text: "Good day! While current morning conditions in Ayala Alabang are 30°C with fair sunshine, local Habagat convective rain chances jump sharply to 65% between 3:00 PM and 5:00 PM along the southern Muntinlupa ridge. Road spray and localized street puddles are very likely by late afternoon. I recommend holding off on a full car wash until Wednesday, when drier high-pressure conditions move in.",
        pills: [
          { icon: Zap, label: "65% Rain Risk at 3PM", color: "bg-blue-500/20 text-blue-300 border-blue-400/40" },
          { icon: Umbrella, label: "Carry Folding Umbrella", color: "bg-cyan-500/20 text-cyan-300 border-cyan-400/40" },
          { icon: ShieldCheck, label: "Verified PAGASA Check Advised", color: "bg-amber-500/20 text-amber-300 border-amber-400/40" }
        ],
        timestamp: "Just now"
      }
    ]);
  };

  return (
    <div className="glass-panel rounded-3xl p-3.5 sm:p-5 border border-teal-500/30 bg-slate-900/75 backdrop-blur-2xl shadow-xl relative overflow-hidden transition-all duration-300">
      {/* Decorative ambient corner glow */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-teal-500/10 rounded-full filter blur-2xl pointer-events-none" />

      {/* 1. Interactive Glassmorphic Header */}
      <div className="flex items-center justify-between gap-3 mb-3 pb-2.5 border-b border-white/10 relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-teal-500 to-cyan-400 p-[1.5px] shadow-md shadow-teal-500/20 shrink-0">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Bot className="w-4 h-4 text-teal-300" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-black text-white tracking-tight">
                Ask Munora AI
              </h3>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5 font-medium">
              Instant conversational microclimate advice & monsoon tracking
            </p>
          </div>
        </div>

        <button
          onClick={handleResetChat}
          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          title="Reset simulated conversation"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 2. Conversational Advisory Exchange */}
      <div className="space-y-3 mb-3 max-h-72 overflow-y-auto custom-scrollbar pr-1 relative z-10">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${
              msg.sender === "user" ? "items-end" : "items-start"
            } space-y-1.5`}
          >
            {/* Sender Label */}
            <div className="flex items-center gap-1 text-[10px] text-slate-400 font-semibold px-1">
              {msg.sender === "user" ? (
                <>
                  <span>You</span>
                  <User className="w-2.5 h-2.5 text-amber-400" />
                </>
              ) : (
                <>
                  <Bot className="w-2.5 h-2.5 text-teal-400" />
                  <span className="text-teal-300 font-bold">Munora AI</span>
                </>
              )}
            </div>

            {/* Bubble */}
            <div
              className={`p-3 rounded-2xl max-w-[92%] sm:max-w-[88%] text-xs leading-relaxed font-medium transition-all ${
                msg.sender === "user"
                  ? "bg-amber-500/20 text-amber-100 border border-amber-500/30 rounded-tr-none shadow-sm"
                  : "bg-slate-900/90 text-slate-200 border border-white/15 rounded-tl-none shadow-md backdrop-blur-md"
              }`}
            >
              <p>{msg.text}</p>

              {/* Actionable Decision Pills if AI response */}
              {msg.pills && msg.pills.length > 0 && (
                <div className="mt-2.5 pt-2 border-t border-white/10 flex flex-wrap gap-1.5">
                  {msg.pills.map((pill, idx) => {
                    const PillIcon = pill.icon;
                    return (
                      <span
                        key={idx}
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${pill.color} transition-all`}
                      >
                        <PillIcon className="w-3 h-3" />
                        <span>{pill.label}</span>
                      </span>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 p-2.5 rounded-2xl bg-slate-900/60 border border-white/10 text-xs text-teal-300 max-w-[200px]">
            <Sparkles className="w-3.5 h-3.5 animate-spin" />
            <span className="animate-pulse text-[11px] font-semibold">
              Analyzing radar data...
            </span>
          </div>
        )}
        <div ref={chatBottomRef} />
      </div>

      {/* 3. Contextual Suggested Quick Prompts */}
      <div className="mb-3 relative z-10">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5 px-0.5">
          Suggested Inquiries:
        </span>
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {suggestedPrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSendQuery(p.query)}
              className="flex-shrink-0 px-2.5 py-1 rounded-xl text-[11px] font-semibold bg-white/5 hover:bg-teal-500/15 text-slate-300 hover:text-teal-200 border border-white/10 hover:border-teal-400/30 transition-all text-left"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Integrated AI Prompter Input Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendQuery();
        }}
        className="relative flex items-center z-10"
      >
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ask about weather, typhoons, travel & apparel..."
          className="w-full pl-3.5 pr-11 py-2.5 rounded-2xl bg-slate-950/90 border border-white/15 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/50 backdrop-blur-md shadow-inner"
        />

        <button
          type="submit"
          disabled={!inputValue.trim()}
          className={`absolute right-1.5 p-1.5 rounded-xl transition-all ${
            inputValue.trim()
              ? "bg-teal-500 hover:bg-teal-400 text-slate-950 shadow-md shadow-teal-500/25"
              : "bg-white/10 text-slate-500 cursor-not-allowed"
          }`}
          title="Send query to Munora AI"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>

      {/* Subtle Footer Disclaimer Preservation */}
      <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400 px-1 pt-1 border-t border-white/5">
        <span className="flex items-center gap-1 text-amber-300/80 font-medium">
          <AlertTriangle className="w-3 h-3 text-amber-400" />
          DOST-PAGASA official data verified
        </span>
        <a
          href="https://bagong.pagasa.dost.gov.ph"
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-400 hover:text-amber-300 hover:underline flex items-center gap-0.5 font-medium"
        >
          PAGASA Bulletin <ExternalLink className="w-2.5 h-2.5" />
        </a>
      </div>
    </div>
  );
}

