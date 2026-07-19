import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Play, Heart, Eye } from "lucide-react";

interface VideoCardProps {
  image: string;
  title: string;
  views: string;
  likes: string;
  rotation: number;
  borderColor: string;
}

export function VideoCard({ image, title, views, likes, rotation, borderColor }: VideoCardProps) {
  return (
    <div 
      className="relative group cursor-pointer"
      style={{
        transform: `rotate(${rotation}deg)`,
        transition: "transform 0.3s ease"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = `rotate(0deg) scale(1.05)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = `rotate(${rotation}deg) scale(1)`;
      }}
    >
      {/* Card Container */}
      <div 
        className="bg-black border-4 rounded-lg overflow-hidden"
        style={{
          borderColor: borderColor,
          boxShadow: `4px 4px 0 ${borderColor}, 0 0 20px ${borderColor}80`
        }}
      >
        {/* Image */}
        <div className="relative aspect-video overflow-hidden">
          <ImageWithFallback 
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="absolute inset-0 flex items-center justify-center">
              <div 
                className="w-14 h-14 rounded-full bg-[#FF00FF] flex items-center justify-center"
                style={{
                  boxShadow: "0 0 20px rgba(255, 0, 255, 0.8)"
                }}
              >
                <Play className="w-7 h-7 text-white fill-white ml-1" />
              </div>
            </div>
          </div>

          {/* Scanlines */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{
              backgroundImage: "repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.15) 0px, rgba(0, 0, 0, 0.15) 1px, transparent 1px, transparent 3px)"
            }}
          ></div>
        </div>

        {/* Info */}
        <div className="p-3 bg-gradient-to-br from-gray-900 to-black">
          <h4 className="text-white text-sm mb-2 line-clamp-2" style={{ fontFamily: "monospace" }}>
            {title}
          </h4>
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1 text-[#00CCFF]">
              <Eye className="w-3 h-3" />
              <span>{views}</span>
            </div>
            <div className="flex items-center gap-1 text-[#FF66CC]">
              <Heart className="w-3 h-3" />
              <span>{likes}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Pixel Art Stickers (random) */}
      {Math.random() > 0.5 && (
        <div 
          className="absolute -top-2 -right-2 w-8 h-8 bg-[#CCFF00] border-2 border-black rotate-12"
          style={{
            clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
            boxShadow: "2px 2px 0 #000"
          }}
        />
      )}
    </div>
  );
}
