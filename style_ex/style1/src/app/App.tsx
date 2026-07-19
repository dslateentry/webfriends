import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { VideoCard } from "./components/VideoCard";
import { CommentsSection } from "./components/CommentsSection";
import { AdsZone } from "./components/AdsZone";
import { Footer } from "./components/Footer";
import { Disc, Sparkles } from "lucide-react";

export default function App() {
  const videos = [
    {
      image: "https://images.unsplash.com/photo-1735216259891-cdb1d862af52?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMGFydGlzdGljJTIwdmlkZW98ZW58MXx8fHwxNzYwOTUzMTg4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "Arte Digital Experimental - Tutorial Completo",
      views: "12.5K",
      likes: "2.1K",
      rotation: -2,
      borderColor: "#FF66CC"
    },
    {
      image: "https://images.unsplash.com/photo-1626972309141-bee9f36a0499?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZW9uJTIwbGlnaHRzJTIwY2l0eXxlbnwxfHx8fDE3NjA5MzU5MTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "Luces Neón - Aesthetic Urbano",
      views: "8.7K",
      likes: "1.4K",
      rotation: 3,
      borderColor: "#00CCFF"
    },
    {
      image: "https://images.unsplash.com/photo-1637239990694-ba96d4b80acc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXRybyUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzYwOTUzMTg4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "Tecnología Retro - Especial Y2K",
      views: "15.2K",
      likes: "3.8K",
      rotation: -1,
      borderColor: "#CCFF00"
    },
    {
      image: "https://images.unsplash.com/photo-1699568542323-ff98aca8ea6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMGFic3RyYWN0JTIwYXJ0fGVufDF8fHx8MTc2MDk0MzE3OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "Abstracto Colorido - Motion Graphics",
      views: "9.3K",
      likes: "1.9K",
      rotation: 2,
      borderColor: "#FF00FF"
    },
    {
      image: "https://images.unsplash.com/photo-1738667289162-9e55132e18a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGNvbmNlcnQlMjBzdGFnZXxlbnwxfHx8fDE3NjA4ODY3NzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "Concierto en Vivo - Mejores Momentos",
      views: "20.1K",
      likes: "5.2K",
      rotation: -3,
      borderColor: "#00FF66"
    },
    {
      image: "https://images.unsplash.com/photo-1644072709945-0dff3723aaf2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwYXJ0JTIwZGVzaWdufGVufDF8fHx8MTc2MDk1MzE4OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "Diseño Digital Futurista - Speedart",
      views: "11.8K",
      likes: "2.7K",
      rotation: 1,
      borderColor: "#FF66CC"
    }
  ];

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{
        background: "radial-gradient(ellipse at center, #FF66CC 0%, #00CCFF 50%, #CCFF00 100%)"
      }}
    >
      {/* Noise Texture Overlay */}
      <div className="noise-texture absolute inset-0 pointer-events-none"></div>

      {/* Animated Decorative Elements */}
      <div className="absolute top-20 left-10 w-16 h-16 opacity-30 animate-spin" style={{ animationDuration: "20s" }}>
        <Disc className="w-full h-full text-[#FF00FF]" />
      </div>
      <div className="absolute bottom-40 right-20 w-20 h-20 opacity-20 animate-spin" style={{ animationDuration: "15s" }}>
        <Sparkles className="w-full h-full text-[#CCFF00] fill-[#CCFF00]" />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <Header />

        {/* Content Container */}
        <div className="max-w-[1440px] mx-auto px-8 py-12">
          <div className="grid grid-cols-12 gap-8">
            {/* Main Content Area */}
            <div className="col-span-8">
              {/* Hero Section */}
              <Hero />

              {/* Videos Grid */}
              <div className="mt-16">
                <div 
                  className="inline-block bg-gradient-to-r from-[#FF00FF] to-[#00CCFF] px-6 py-3 mb-8 border-4 border-black -rotate-1"
                  style={{ 
                    boxShadow: "6px 6px 0 #000",
                    fontFamily: "Impact, sans-serif"
                  }}
                >
                  <h3 className="text-white text-2xl tracking-wider">
                    VIDEOS POPULARES ✨
                  </h3>
                </div>

                <div className="grid grid-cols-3 gap-8">
                  {videos.map((video, index) => (
                    <VideoCard 
                      key={index}
                      image={video.image}
                      title={video.title}
                      views={video.views}
                      likes={video.likes}
                      rotation={video.rotation}
                      borderColor={video.borderColor}
                    />
                  ))}
                </div>

                {/* Decorative Stickers */}
                <div 
                  className="sticker mt-12 inline-block bg-[#CCFF00] px-4 py-2 border-4 border-black rotate-3"
                  style={{ boxShadow: "4px 4px 0 #000" }}
                >
                  <div className="flex items-center gap-2">
                    <Disc className="w-6 h-6 text-black" />
                    <span className="text-black" style={{ fontFamily: "Impact, sans-serif" }}>
                      ¡MÁS DE 10,000 VIDEOS!
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="col-span-4 space-y-8">
              <div className="sticky top-8 space-y-8">
                {/* Comments Section */}
                <CommentsSection />

                {/* Ads Zone */}
                <AdsZone />

                {/* Extra Decorations */}
                <div className="space-y-4">
                  {/* Pixel Heart */}
                  <div 
                    className="bg-black border-4 border-[#FF66CC] p-4 rounded-lg"
                    style={{ boxShadow: "4px 4px 0 #FF66CC" }}
                  >
                    <div className="text-center">
                      <div 
                        className="inline-block w-12 h-12 bg-[#FF66CC] mb-2"
                        style={{
                          clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
                          imageRendering: "pixelated"
                        }}
                      ></div>
                      <p className="text-white text-sm" style={{ fontFamily: "monospace" }}>
                        ¡Dale like a tus favoritos!
                      </p>
                    </div>
                  </div>

                  {/* Mini Banner */}
                  <div 
                    className="bg-gradient-to-br from-[#00CCFF] to-[#0066FF] p-4 border-4 border-black rounded-lg"
                    style={{ boxShadow: "4px 4px 0 #000" }}
                  >
                    <p className="text-white text-center text-sm" style={{ fontFamily: "Impact, sans-serif" }}>
                      ¡Únete a nuestra comunidad!
                    </p>
                    <button 
                      className="w-full mt-3 bg-[#CCFF00] text-black py-2 border-2 border-black hover:scale-105 transition-transform"
                      style={{ fontFamily: "monospace" }}
                    >
                      REGISTRARSE
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>

      {/* Floating Pixel Elements */}
      <div 
        className="absolute top-[200px] left-[5%] w-4 h-4 bg-[#FF66CC] border-2 border-black animate-bounce"
        style={{ imageRendering: "pixelated" }}
      ></div>
      <div 
        className="absolute top-[400px] right-[8%] w-6 h-6 bg-[#CCFF00] border-2 border-black animate-bounce"
        style={{ imageRendering: "pixelated", animationDelay: "0.5s" }}
      ></div>
      <div 
        className="absolute bottom-[300px] left-[15%] w-5 h-5 bg-[#00CCFF] border-2 border-black animate-bounce"
        style={{ imageRendering: "pixelated", animationDelay: "1s" }}
      ></div>
    </div>
  );
}
