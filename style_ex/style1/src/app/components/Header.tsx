import { Sparkles, Star } from "lucide-react";

export function Header() {
  const navItems = [
    { text: "Inicio", color: "#FF66CC" },
    { text: "Categorías", color: "#CCFF00" },
    { text: "Top Videos", color: "#00CCFF" },
    { text: "Comunidad", color: "#FF66CC" },
    { text: "Subir Video", color: "#CCFF00" }
  ];

  return (
    <header 
      className="h-[100px] bg-[#1A1A40] border-b-[6px] border-[#FF00FF] flex items-center justify-between px-8 relative overflow-hidden"
      style={{
        boxShadow: "0 4px 20px rgba(255, 0, 255, 0.5)"
      }}
    >
      {/* Animated background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-2 left-10 w-2 h-2 bg-[#00CCFF] rounded-full animate-pulse"></div>
        <div className="absolute top-8 right-20 w-3 h-3 bg-[#CCFF00] rounded-full animate-pulse delay-100"></div>
        <div className="absolute bottom-4 left-40 w-2 h-2 bg-[#FF66CC] rounded-full animate-pulse delay-200"></div>
      </div>

      {/* Logo */}
      <div className="flex items-center gap-3 relative z-10">
        <Sparkles className="w-10 h-10 text-[#FF00FF]" />
        <h1 className="chrome-text text-4xl tracking-wider" style={{ fontFamily: "Impact, sans-serif" }}>
          VIDEOPORTAL
        </h1>
        <Star className="w-6 h-6 text-[#CCFF00] fill-[#CCFF00]" />
      </div>

      {/* Navigation */}
      <nav className="flex gap-2 relative z-10">
        {navItems.map((item, index) => (
          <button
            key={index}
            className="pixel-border px-4 py-2 relative overflow-hidden transition-all duration-200 hover:scale-105 hover:brightness-125"
            style={{
              backgroundColor: item.color,
              borderColor: "#000",
              boxShadow: `3px 3px 0 #000, 0 0 15px ${item.color}`,
              imageRendering: "pixelated",
              fontFamily: "monospace"
            }}
          >
            <span className="relative z-10 text-black" style={{ textShadow: "1px 1px 0 rgba(255,255,255,0.5)" }}>
              {item.text}
            </span>
          </button>
        ))}
      </nav>
    </header>
  );
}
