import { Play, Zap } from "lucide-react";

export function Hero() {
  return (
    <div className="relative">
      {/* Retro TV Frame */}
      <div 
        className="relative bg-gradient-to-br from-gray-700 via-gray-600 to-gray-800 p-8 rounded-3xl"
        style={{
          boxShadow: "8px 8px 0 #000, 0 0 40px rgba(255, 0, 255, 0.4), inset 0 4px 8px rgba(255, 255, 255, 0.2)"
        }}
      >
        {/* TV Controls */}
        <div className="absolute top-4 right-4 flex gap-2 z-20">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-400 to-red-600 border-2 border-black"></div>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 border-2 border-black"></div>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-green-600 border-2 border-black"></div>
        </div>

        {/* Screen */}
        <div className="relative aspect-video bg-black rounded-lg overflow-hidden border-4 border-gray-900">
          {/* Chroma Key Green Screen */}
          <div 
            className="w-full h-full"
            style={{
              backgroundColor: "#00FF00",
              background: "linear-gradient(135deg, #00FF00 0%, #00DD00 50%, #00FF00 100%)"
            }}
          >
            {/* Grid pattern for chroma key */}
            <div 
              className="w-full h-full opacity-10"
              style={{
                backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 19px, #000 19px, #000 20px), repeating-linear-gradient(90deg, transparent, transparent 19px, #000 19px, #000 20px)"
              }}
            ></div>
          </div>
          
          {/* Glitch Overlay */}
          <div className="glitch-overlay absolute inset-0"></div>
          
          {/* Scanlines */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: "repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.15) 0px, rgba(0, 0, 0, 0.15) 2px, transparent 2px, transparent 4px)"
            }}
          ></div>

          {/* Chroma Key Label */}
          <div className="absolute top-4 left-4 bg-black/80 px-3 py-1 border-2 border-[#00FF00] rounded z-10">
            <span className="text-[#00FF00] text-xs" style={{ fontFamily: "monospace" }}>
              🎬 CHROMA KEY
            </span>
          </div>

          {/* Play Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <button 
              className="glossy-button w-24 h-24 rounded-full bg-gradient-to-br from-[#FF00FF] to-[#FF66CC] flex items-center justify-center hover:scale-110 transition-transform"
              style={{
                boxShadow: "0 0 30px rgba(255, 0, 255, 0.8)"
              }}
            >
              <Play className="w-12 h-12 text-white fill-white ml-2" />
            </button>
          </div>
        </div>
      </div>

      {/* Stickers */}
      <div 
        className="sticker absolute -top-4 -right-4 bg-gradient-to-br from-[#CCFF00] to-[#00FF66] px-4 py-2 rotate-12 border-4 border-black z-30"
        style={{
          boxShadow: "4px 4px 0 #000"
        }}
      >
        <div className="flex items-center gap-1">
          <Zap className="w-5 h-5 fill-black text-black" />
          <span className="text-black tracking-wider" style={{ fontFamily: "Impact, sans-serif" }}>HOT!</span>
        </div>
      </div>

      <div 
        className="sticker absolute -bottom-6 -left-6 bg-gradient-to-br from-[#FF66CC] to-[#FF00FF] px-4 py-2 -rotate-6 border-4 border-black z-30"
        style={{
          boxShadow: "4px 4px 0 #000",
          animationDelay: "1s"
        }}
      >
        <span className="text-white tracking-wider" style={{ fontFamily: "Impact, sans-serif" }}>NEW!</span>
      </div>

      {/* Main Text */}
      <div className="mt-8 text-center">
        <h2 
          className="gradient-text text-6xl tracking-tight"
          style={{ 
            fontFamily: "Impact, sans-serif",
            textShadow: "6px 6px 0 #000"
          }}
        >
          EXPLORA EL UNIVERSO CREATIVO
        </h2>
      </div>
    </div>
  );
}
