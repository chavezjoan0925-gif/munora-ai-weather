import React from "react";

export default function DynamicBackground({ phase, environment, weatherState, heatLevel }) {
  const isMorning = phase === "morning";
  const isCity = environment === "city";

  // Dynamic Weather Glow Accent
  let weatherGlowColor = "rgba(59, 130, 246, 0.15)"; // default soft blue
  if (weatherState?.includes("Rain") || weatherState?.includes("Thunderstorm")) {
    weatherGlowColor = "rgba(79, 70, 229, 0.28)"; // #4F46E5 indigo rain
  } else if (heatLevel === "Danger") {
    weatherGlowColor = "rgba(204, 0, 0, 0.25)"; // #CC0000 extreme heat
  } else if (heatLevel === "Be careful") {
    weatherGlowColor = "rgba(245, 158, 11, 0.22)"; // amber caution
  }

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none transition-colors duration-1000 ease-in-out">
      {/* Dynamic Sky Gradient Layer */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${
          isMorning
            ? "bg-gradient-to-b from-[#06182e] via-[#0c2f4d] to-[#1e3a5f]"
            : "bg-gradient-to-b from-[#0b0f19] via-[#1c1829] to-[#2d1b22]"
        }`}
      />

      {/* Sun / Ambient Glow */}
      <div
        className={`absolute rounded-full filter blur-[100px] transition-all duration-1000 ease-out ${
          isMorning
            ? "top-12 left-1/4 w-[480px] h-[480px] bg-gradient-to-tr from-amber-400/25 via-cyan-400/20 to-sky-500/10"
            : "top-20 right-1/4 w-[540px] h-[540px] bg-gradient-to-tr from-amber-500/30 via-orange-500/25 to-rose-600/15"
        }`}
      />

      {/* Dynamic Weather Tint Filter Overlay */}
      <div
        className="absolute inset-0 transition-colors duration-1000"
        style={{
          background: `radial-gradient(circle at 50% 30%, ${weatherGlowColor} 0%, transparent 70%)`
        }}
      />

      {/* Fine Mesh Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: "32px 32px"
        }}
      />

      {/* Background Silhouette Container (Bottom anchored) */}
      <div className="absolute bottom-0 left-0 right-0 h-[450px] w-full overflow-hidden flex items-end">
        {/* City Environment: Metro Manila & Muntinlupa Silhouette */}
        <div
          className={`absolute bottom-0 w-full transition-all duration-1000 transform ${
            isCity
              ? "opacity-40 translate-y-0"
              : "opacity-0 translate-y-12 pointer-events-none"
          }`}
        >
          <svg
            viewBox="0 0 1600 450"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto max-h-[380px] object-cover object-bottom"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="cityBackGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={isMorning ? "#1e3a5f" : "#451a28"} stopOpacity="0.4" />
                <stop offset="100%" stopColor="#030712" stopOpacity="0.95" />
              </linearGradient>
              <linearGradient id="cityFrontGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={isMorning ? "#0e2439" : "#24101a"} stopOpacity="0.8" />
                <stop offset="100%" stopColor="#030712" stopOpacity="1" />
              </linearGradient>
            </defs>

            {/* Back Layer: Distant Metro Manila Skylines & High-Rises */}
            <g fill="url(#cityBackGrad)">
              <rect x="60" y="160" width="48" height="290" rx="3" />
              <rect x="80" y="120" width="5" height="40" />
              <rect x="130" y="210" width="60" height="240" rx="2" />
              <rect x="210" y="140" width="70" height="310" rx="3" />
              <rect x="240" y="100" width="8" height="40" />
              <rect x="300" y="180" width="55" height="270" rx="2" />
              <rect x="380" y="230" width="85" height="220" rx="4" />
              
              {/* Muntinlupa & Alabang Mid-Range Towers */}
              <rect x="490" y="170" width="50" height="280" rx="3" />
              <polygon points="560,450 560,190 595,150 630,190 630,450" />
              <rect x="650" y="220" width="70" height="230" rx="2" />
              <rect x="740" y="130" width="65" height="320" rx="3" />
              <line x1="772" y1="90" x2="772" y2="130" stroke="#f59e0b" strokeWidth="2" opacity="0.6" />

              {/* Central Business High-Rises */}
              <rect x="830" y="150" width="80" height="300" rx="3" />
              <rect x="930" y="110" width="75" height="340" rx="3" />
              <polygon points="930,110 967,70 1005,110" />
              <line x1="967" y1="40" x2="967" y2="70" stroke="#38bdf8" strokeWidth="2" opacity="0.6" />

              <rect x="1030" y="190" width="60" height="260" rx="2" />
              <rect x="1110" y="160" width="70" height="290" rx="3" />
              <rect x="1200" y="210" width="80" height="240" rx="3" />
              <rect x="1300" y="140" width="75" height="310" rx="3" />
              <line x1="1337" y1="100" x2="1337" y2="140" stroke="#f59e0b" strokeWidth="2" opacity="0.6" />
              <rect x="1400" y="200" width="60" height="250" rx="2" />
              <rect x="1480" y="175" width="80" height="275" rx="3" />
            </g>

            {/* Front Layer: Bridge Towers, Skyway Pillars & Closer Commercial Cityscape */}
            <g fill="url(#cityFrontGrad)">
              <rect x="10" y="270" width="90" height="180" rx="4" />
              <rect x="120" y="240" width="65" height="210" rx="3" />
              <rect x="200" y="220" width="80" height="230" rx="3" />
              <rect x="300" y="260" width="65" height="190" rx="2" />
              <rect x="390" y="200" width="75" height="250" rx="3" />
              
              {/* Cable-stayed Pylon structure */}
              <polygon points="500,450 515,180 535,180 550,450" />
              <line x1="525" y1="190" x2="440" y2="350" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
              <line x1="525" y1="210" x2="460" y2="350" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
              <line x1="525" y1="190" x2="610" y2="350" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
              <line x1="525" y1="210" x2="590" y2="350" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />

              <rect x="580" y="250" width="90" height="200" rx="4" />
              <rect x="690" y="230" width="85" height="220" rx="3" />
              <rect x="800" y="210" width="100" height="240" rx="3" />
              <rect x="920" y="235" width="90" height="215" rx="3" />
              <rect x="1030" y="260" width="75" height="190" rx="2" />
              <rect x="1130" y="225" width="90" height="225" rx="3" />
              <rect x="1240" y="245" width="80" height="205" rx="3" />
              <rect x="1340" y="220" width="95" height="230" rx="3" />
              <rect x="1460" y="250" width="130" height="200" rx="4" />
            </g>

            {/* Subtle Glowing Window Dots */}
            <g fill={isMorning ? "#67e8f9" : "#fef08a"} opacity="0.45">
              <circle cx="230" cy="250" r="1.5" />
              <circle cx="250" cy="270" r="1.5" />
              <circle cx="230" cy="290" r="1.5" />
              <circle cx="410" cy="240" r="1.5" />
              <circle cx="430" cy="260" r="1.5" />
              <circle cx="720" cy="260" r="1.5" />
              <circle cx="830" cy="240" r="1.5" />
              <circle cx="860" cy="280" r="1.5" />
              <circle cx="950" cy="260" r="1.5" />
              <circle cx="970" cy="300" r="1.5" />
              <circle cx="1160" cy="250" r="1.5" />
              <circle cx="1370" cy="250" r="1.5" />
            </g>
          </svg>
        </div>

        {/* Countryside Environment: Rural Philippine Mountains, Terraces & Coconut Palms */}
        <div
          className={`absolute bottom-0 w-full transition-all duration-1000 transform ${
            !isCity
              ? "opacity-45 translate-y-0"
              : "opacity-0 translate-y-12 pointer-events-none"
          }`}
        >
          <svg
            viewBox="0 0 1600 450"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto max-h-[380px] object-cover object-bottom"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="mountGradBack" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={isMorning ? "#1e40af" : "#581c87"} stopOpacity="0.45" />
                <stop offset="100%" stopColor="#030712" stopOpacity="0.9" />
              </linearGradient>
              <linearGradient id="mountGradMid" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={isMorning ? "#047857" : "#7c2d12"} stopOpacity="0.65" />
                <stop offset="100%" stopColor="#030712" stopOpacity="0.95" />
              </linearGradient>
              <linearGradient id="mountGradFront" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={isMorning ? "#064e3b" : "#451a03"} stopOpacity="0.9" />
                <stop offset="100%" stopColor="#030712" stopOpacity="1" />
              </linearGradient>
            </defs>

            {/* Back Layer: Symmetrical Majestic Volcano Cone (Mt. Mayon / Mt. Makiling) */}
            <path
              d="M350,450 L750,110 Q780,95 810,110 L1210,450 Z"
              fill="url(#mountGradBack)"
            />
            {/* Mountain Ridge Left & Right */}
            <path
              d="M-50,450 L120,240 Q220,180 340,260 L450,450 Z"
              fill="url(#mountGradBack)"
              opacity="0.6"
            />
            <path
              d="M1100,450 L1280,210 Q1420,170 1650,290 L1650,450 Z"
              fill="url(#mountGradBack)"
              opacity="0.6"
            />

            {/* Mid Layer: Rolling Hills & Rice Terraces contours */}
            <path
              d="M0,320 Q200,240 450,300 T900,280 T1350,310 T1600,290 L1600,450 L0,450 Z"
              fill="url(#mountGradMid)"
            />
            <path
              d="M-40,360 Q250,310 550,350 T1100,340 T1650,360 L1650,450 L-40,450 Z"
              fill="url(#mountGradMid)"
              opacity="0.75"
            />

            {/* Foreground: Native Philippine Coconut Palm Trees & Coastal/Lakeside Flora */}
            <g fill="url(#mountGradFront)">
              {/* Palm Tree 1 (Left) */}
              <path d="M120,450 Q135,330 115,220 Q118,220 123,450 Z" />
              {/* Palm Fronds 1 */}
              <path d="M115,220 Q70,190 30,225 Q75,205 115,220 Z" />
              <path d="M115,220 Q75,160 50,150 Q90,175 115,220 Z" />
              <path d="M115,220 Q120,140 145,135 Q135,175 115,220 Z" />
              <path d="M115,220 Q160,165 190,180 Q150,195 115,220 Z" />
              <path d="M115,220 Q170,220 200,245 Q155,230 115,220 Z" />

              {/* Palm Tree 2 (Taller Left-Mid) */}
              <path d="M180,450 Q205,300 185,170 Q189,170 193,450 Z" />
              <path d="M185,170 Q130,140 85,170 Q135,150 185,170 Z" />
              <path d="M185,170 Q145,100 115,95 Q155,120 185,170 Z" />
              <path d="M185,170 Q190,85 220,80 Q210,125 185,170 Z" />
              <path d="M185,170 Q240,110 275,130 Q225,145 185,170 Z" />
              <path d="M185,170 Q250,170 280,205 Q230,185 185,170 Z" />

              {/* Traditional Bahay Kubo (Nipa Hut silhouette) */}
              <polygon points="340,380 380,335 420,380" />
              <rect x="350" y="380" width="60" height="30" />
              <line x1="360" y1="410" x2="360" y2="435" stroke="currentColor" strokeWidth="3" />
              <line x1="400" y1="410" x2="400" y2="435" stroke="currentColor" strokeWidth="3" />

              {/* Palm Tree 3 (Right) */}
              <path d="M1420,450 Q1400,320 1425,190 Q1429,190 1433,450 Z" />
              <path d="M1425,190 Q1375,160 1340,195 Q1385,175 1425,190 Z" />
              <path d="M1425,190 Q1390,125 1360,120 Q1400,145 1425,190 Z" />
              <path d="M1425,190 Q1430,105 1460,100 Q1450,145 1425,190 Z" />
              <path d="M1425,190 Q1480,130 1515,150 Q1465,165 1425,190 Z" />
              <path d="M1425,190 Q1490,190 1520,225 Q1470,205 1425,190 Z" />

              {/* Ground contour & foliage */}
              <path d="M0,410 Q400,390 800,415 T1600,405 L1600,450 L0,450 Z" />
            </g>
          </svg>
        </div>
      </div>

      {/* Atmospheric Mist / Vignette Bottom Fade */}
      <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent pointer-events-none" />
    </div>
  );
}

