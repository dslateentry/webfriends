import { Download, Sparkles } from "lucide-react";

export function AdBanner() {
  return (
    <div 
      className="relative bg-gradient-to-br from-[#8B00FF] via-[#FF00FF] to-[#CCFF00] p-6 rounded-2xl border-4 border-black overflow-hidden"
      style={{
        boxShadow: "6px 6px 0 #000, 0 0 30px rgba(255, 0, 255, 0.6)"
      }}
    >
      {/* Animated Stars */}
      <div className="absolute top-2 right-2 animate-spin" style={{ animationDuration: "3s" }}>
        <Sparkles className="w-6 h-6 text-yellow-300 fill-yellow-300" />
      </div>
      <div className="absolute bottom-4 left-4 animate-spin" style={{ animationDuration: "4s" }}>
        <Sparkles className="w-5 h-5 text-cyan-300 fill-cyan-300" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center space-y-4">
        <div 
          className="inline-block bg-[#CCFF00] px-3 py-1 rotate-2 border-2 border-black"
          style={{ boxShadow: "3px 3px 0 #000" }}
        >
          <span className="text-black tracking-wider" style={{ fontFamily: "Impact, sans-serif" }}>
            ¡OFERTA ESPECIAL!
          </span>
        </div>

        <h3 
          className="text-white text-2xl tracking-wide"
          style={{ 
            fontFamily: "Impact, sans-serif",
            textShadow: "3px 3px 0 #000"
          }}
        >
          ¡Descarga el pack de<br />filtros retro YA!
        </h3>

        <button 
          className="glossy-button w-full bg-gradient-to-br from-[#CCFF00] to-[#00FF66] text-black px-6 py-4 border-4 border-black hover:scale-105 transition-transform flex items-center justify-center gap-2"
          style={{
            boxShadow: "5px 5px 0 #000, 0 0 20px rgba(204, 255, 0, 0.6)",
            fontFamily: "Impact, sans-serif"
          }}
        >
          <Download className="w-6 h-6" />
          <span className="text-xl tracking-wider">DESCARGAR AHORA</span>
        </button>

        <p className="text-white text-xs opacity-80">
          *Totalmente gratis - ¡Por tiempo limitado!
        </p>
      </div>

      {/* Decorative Elements */}
      <div 
        className="absolute -top-2 -left-2 w-12 h-12 bg-[#00CCFF] rounded-full opacity-50 blur-xl"
      ></div>
      <div 
        className="absolute -bottom-2 -right-2 w-16 h-16 bg-[#FF66CC] rounded-full opacity-50 blur-xl"
      ></div>
    </div>
  );
}
