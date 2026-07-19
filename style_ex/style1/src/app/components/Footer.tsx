import { Heart, Star } from "lucide-react";

export function Footer() {
  const links = ["FAQ", "Contacto", "Comunidad", "Términos", "Privacidad"];

  return (
    <footer className="bg-gradient-to-r from-[#1A1A40] via-[#2A1A40] to-[#1A1A40] border-t-4 border-[#FF00FF] py-6 px-8">
      <div className="max-w-7xl mx-auto">
        {/* Links */}
        <div className="flex items-center justify-center gap-6 mb-4">
          {links.map((link, index) => (
            <span key={index}>
              <a 
                href="#" 
                className="text-white hover:text-[#CCFF00] transition-colors text-sm"
                style={{ fontFamily: "monospace" }}
              >
                {link}
              </a>
              {index < links.length - 1 && (
                <span className="text-[#FF00FF] mx-2">|</span>
              )}
            </span>
          ))}
        </div>

        {/* Copyright */}
        <div className="text-center text-white/70 text-xs mb-3" style={{ fontFamily: "monospace" }}>
          © 2025 VIDEOPORTAL - Hecho con <Heart className="inline w-3 h-3 text-[#FF66CC] fill-[#FF66CC] mx-1" /> y nostalgia Y2K
        </div>

        {/* Decorative Stars */}
        <div className="flex justify-center gap-2">
          <Star className="w-4 h-4 text-[#CCFF00] fill-[#CCFF00] animate-pulse" />
          <Star className="w-3 h-3 text-[#00CCFF] fill-[#00CCFF] animate-pulse" style={{ animationDelay: "0.3s" }} />
          <Star className="w-4 h-4 text-[#FF66CC] fill-[#FF66CC] animate-pulse" style={{ animationDelay: "0.6s" }} />
        </div>
      </div>
    </footer>
  );
}
