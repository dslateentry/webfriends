import { MessageSquare, Heart, Reply, Star } from "lucide-react";
import { useState } from "react";

interface Comment {
  id: number;
  username: string;
  avatar: string;
  text: string;
  likes: number;
  time: string;
  color: string;
}

export function CommentsSection() {
  const [comments] = useState<Comment[]>([
    {
      id: 1,
      username: "xXCoolKid2000Xx",
      avatar: "💜",
      text: "¡Este video es INCREÍBLE! Me encanta la estética retro 🌟",
      likes: 24,
      time: "hace 2h",
      color: "#FF66CC"
    },
    {
      id: 2,
      username: "NeonDreamer",
      avatar: "⭐",
      text: "Totalmente Y2K vibes!!! Esto me trae tantos recuerdos",
      likes: 15,
      time: "hace 5h",
      color: "#00CCFF"
    },
    {
      id: 3,
      username: "PixelArtist99",
      avatar: "💎",
      text: "Los efectos están brutales, necesito el tutorial YA!",
      likes: 31,
      time: "hace 1 día",
      color: "#CCFF00"
    },
    {
      id: 4,
      username: "RetroFan",
      avatar: "🌈",
      text: "Alguien más se acuerda de cuando las páginas web eran así? Good times",
      likes: 42,
      time: "hace 2 días",
      color: "#FF00FF"
    }
  ]);

  return (
    <div 
      className="bg-gradient-to-br from-[#1A1A40] via-[#2A1A3A] to-[#1A1A40] border-4 border-[#00CCFF] rounded-2xl p-6 relative overflow-hidden"
      style={{
        boxShadow: "6px 6px 0 #000, 0 0 30px rgba(0, 204, 255, 0.4)"
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <MessageSquare className="w-7 h-7 text-[#00CCFF]" />
        <h3 
          className="text-white text-2xl tracking-wider"
          style={{ 
            fontFamily: "Impact, sans-serif",
            textShadow: "3px 3px 0 #000"
          }}
        >
          COMENTARIOS
        </h3>
        <div 
          className="bg-[#FF00FF] text-white px-3 py-1 rounded-full border-2 border-black text-sm"
          style={{ fontFamily: "monospace" }}
        >
          {comments.length}
        </div>
      </div>

      {/* Add Comment */}
      <div className="mb-6">
        <div 
          className="bg-black/50 border-3 border-[#FF66CC] rounded-lg p-4"
          style={{ boxShadow: "0 0 15px rgba(255, 102, 204, 0.3)" }}
        >
          <textarea 
            placeholder="Escribe tu comentario aquí... ✨"
            className="w-full bg-transparent text-white placeholder-gray-400 outline-none resize-none"
            style={{ fontFamily: "monospace" }}
            rows={3}
          />
          <div className="flex items-center justify-between mt-3">
            <div className="flex gap-2">
              <Star className="w-5 h-5 text-[#CCFF00] cursor-pointer hover:fill-[#CCFF00] transition-all" />
              <Heart className="w-5 h-5 text-[#FF66CC] cursor-pointer hover:fill-[#FF66CC] transition-all" />
            </div>
            <button 
              className="glossy-button bg-gradient-to-r from-[#FF00FF] to-[#FF66CC] text-white px-6 py-2 border-3 border-black rounded-lg hover:scale-105 transition-transform"
              style={{
                fontFamily: "Impact, sans-serif",
                boxShadow: "3px 3px 0 #000"
              }}
            >
              PUBLICAR
            </button>
          </div>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
        {comments.map((comment) => (
          <div 
            key={comment.id}
            className="bg-black/40 border-2 rounded-lg p-4 hover:bg-black/60 transition-colors"
            style={{ 
              borderColor: comment.color,
              boxShadow: `0 0 10px ${comment.color}40`
            }}
          >
            {/* User Info */}
            <div className="flex items-start gap-3 mb-2">
              <div 
                className="w-10 h-10 flex items-center justify-center text-xl border-2 border-black rounded-full"
                style={{ 
                  backgroundColor: comment.color,
                  boxShadow: `0 0 15px ${comment.color}`
                }}
              >
                {comment.avatar}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span 
                    className="tracking-wide"
                    style={{ 
                      fontFamily: "monospace",
                      color: comment.color,
                      textShadow: `0 0 10px ${comment.color}`
                    }}
                  >
                    {comment.username}
                  </span>
                  <span className="text-gray-500 text-xs" style={{ fontFamily: "monospace" }}>
                    {comment.time}
                  </span>
                </div>
                <p className="text-white text-sm leading-relaxed" style={{ fontFamily: "monospace" }}>
                  {comment.text}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 mt-3 ml-13">
              <button className="flex items-center gap-1 text-[#FF66CC] hover:text-[#FF00FF] transition-colors text-xs">
                <Heart className="w-4 h-4" />
                <span style={{ fontFamily: "monospace" }}>{comment.likes}</span>
              </button>
              <button className="flex items-center gap-1 text-[#00CCFF] hover:text-[#CCFF00] transition-colors text-xs">
                <Reply className="w-4 h-4" />
                <span style={{ fontFamily: "monospace" }}>Responder</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Decorative Stars */}
      <div className="absolute top-4 right-4 opacity-30">
        <Star className="w-6 h-6 text-[#CCFF00] fill-[#CCFF00] animate-pulse" />
      </div>
      <div className="absolute bottom-4 left-4 opacity-30">
        <Star className="w-5 h-5 text-[#FF66CC] fill-[#FF66CC] animate-pulse" style={{ animationDelay: "0.5s" }} />
      </div>
    </div>
  );
}
