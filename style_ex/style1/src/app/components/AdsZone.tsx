import { Zap, Star, Sparkles } from "lucide-react";

export function AdsZone() {
  const ads = [
    {
      title: "CURSO GRATIS",
      subtitle: "Edición de Video Pro",
      color: "from-[#FF00FF] to-[#8B00FF]",
      icon: "🎥",
      buttonText: "VER AHORA"
    },
    {
      title: "MÚSICA RETRO",
      subtitle: "1000+ Tracks Sin Copyright",
      color: "from-[#00CCFF] to-[#0066FF]",
      icon: "🎵",
      buttonText: "DESCARGAR"
    },
    {
      title: "PLANTILLAS 2000s",
      subtitle: "Pack Diseño Web Y2K",
      color: "from-[#CCFF00] to-[#00FF66]",
      icon: "✨",
      buttonText: "OBTENER"
    }
  ];

  return (
    <div 
      className="bg-gradient-to-br from-[#2A1A40] via-[#1A1A40] to-[#1A2A40] border-4 border-[#FF66CC] rounded-2xl p-6 relative overflow-hidden"
      style={{
        boxShadow: "6px 6px 0 #000, 0 0 30px rgba(255, 102, 204, 0.4)"
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Zap className="w-6 h-6 text-[#CCFF00] fill-[#CCFF00]" />
          <h3 
            className="text-white text-xl tracking-wider"
            style={{ 
              fontFamily: "Impact, sans-serif",
              textShadow: "2px 2px 0 #000"
            }}
          >
            ANUNCIOS
          </h3>
        </div>
        <div 
          className="sticker bg-[#FF00FF] text-white px-2 py-1 text-xs border-2 border-black rotate-6"
          style={{ fontFamily: "monospace", boxShadow: "2px 2px 0 #000" }}
        >
          HOT!
        </div>
      </div>

      {/* Ads List */}
      <div className="space-y-4">
        {ads.map((ad, index) => (
          <div 
            key={index}
            className="relative bg-black/40 border-3 rounded-lg p-4 hover:scale-105 transition-transform cursor-pointer"
            style={{
              borderColor: "#000",
              boxShadow: "3px 3px 0 #000"
            }}
          >
            <div 
              className={`absolute inset-0 bg-gradient-to-br ${ad.color} opacity-20 rounded-lg`}
            ></div>
            
            <div className="relative z-10">
              <div className="flex items-start gap-3">
                <div 
                  className={`w-12 h-12 flex items-center justify-center text-2xl border-2 border-black rounded-lg bg-gradient-to-br ${ad.color}`}
                  style={{ boxShadow: "2px 2px 0 #000" }}
                >
                  {ad.icon}
                </div>
                
                <div className="flex-1">
                  <h4 
                    className="text-white text-sm mb-1"
                    style={{ 
                      fontFamily: "Impact, sans-serif",
                      textShadow: "1px 1px 0 #000"
                    }}
                  >
                    {ad.title}
                  </h4>
                  <p className="text-gray-300 text-xs mb-2" style={{ fontFamily: "monospace" }}>
                    {ad.subtitle}
                  </p>
                  <button 
                    className={`glossy-button w-full bg-gradient-to-r ${ad.color} text-white px-3 py-1 border-2 border-black rounded text-xs hover:brightness-110 transition-all`}
                    style={{ 
                      fontFamily: "Impact, sans-serif",
                      boxShadow: "2px 2px 0 #000"
                    }}
                  >
                    {ad.buttonText}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-2 right-2 opacity-30">
        <Sparkles className="w-5 h-5 text-[#CCFF00] fill-[#CCFF00] animate-pulse" />
      </div>
      <div className="absolute bottom-2 left-2 opacity-30">
        <Star className="w-4 h-4 text-[#FF66CC] fill-[#FF66CC] animate-pulse" style={{ animationDelay: "0.5s" }} />
      </div>

      {/* Bottom Banner */}
      <div 
        className="mt-6 bg-gradient-to-r from-[#FF00FF] via-[#00CCFF] to-[#CCFF00] p-3 border-2 border-black rounded-lg text-center -rotate-1"
        style={{ boxShadow: "3px 3px 0 #000" }}
      >
        <p className="text-black text-xs" style={{ fontFamily: "Impact, sans-serif" }}>
          ¿QUIERES ANUNCIARTE AQUÍ? 📢
        </p>
      </div>
    </div>
  );
}
