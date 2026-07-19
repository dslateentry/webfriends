import { motion } from 'motion/react';
import { Download, Share2, RotateCcw, Sparkles, Check, X, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';

interface FinalScreenProps {
  photoUrl: string;
  onRestart: () => void;
  onBack?: () => void;
}

export default function FinalScreen({ photoUrl, onRestart, onBack }: FinalScreenProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Initialize and play celebration music on mount
  useEffect(() => {
    // Create audio element for celebration music
    const audio = new Audio();
    // Y2K style celebration music - upbeat electronic/synth pop vibe
    // You can replace this URL with your own Y2K-style music file
    // Recommended Y2K vibes: electronic pop, synth sounds, bubblegum bass, PC Music style
    audio.src = 'https://assets.mixkit.co/active_storage/sfx/2018/2018-preview.mp3'; // Y2K-style electronic celebration
    audio.loop = false; // Play once for celebration
    audio.volume = 0.45; // Set to 45% volume for that perfect Y2K energy

    audioRef.current = audio;

    // Play music with a slight delay for celebration effect
    const playMusic = async () => {
      try {
        await audio.play();
      } catch (error) {
        // Auto-play might be blocked, that's okay
        console.log('Music autoplay blocked');
      }
    };

    // Delay to sync with photo reveal animation - Y2K sparkle moment! ✨
    setTimeout(() => {
      playMusic();
    }, 400);

    // Cleanup: stop music when component unmounts
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  const handleDownload = () => {
    setIsDownloading(true);
    
    // Create a download link
    const link = document.createElement('a');
    link.href = photoUrl;
    link.download = `photo-booth-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      setIsDownloading(false);
      toast.success('Photo downloaded successfully!');
    }, 1000);
  };

  const shareToTwitter = () => {
    // Download the image first  
    handleDownload();
    setTimeout(() => {
      // Open X.com for user to create a post
      window.open('https://x.com/compose/tweet', '_blank', 'width=550,height=420');
      toast.info('Photo downloaded! Attach it to your post on X.', {
        duration: 5000,
      });
      setShowShareMenu(false);
    }, 1000);
  };

  const shareToInstagram = () => {
    // Download the image first
    handleDownload();
    setTimeout(() => {
      // Open Instagram website for user to create a post
      window.open('https://www.instagram.com/', '_blank');
      toast.info('Photo downloaded! Upload the image on Instagram.', {
        duration: 5000,
      });
      setShowShareMenu(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-8 pb-16 overflow-x-hidden relative">
      {/* Back Button */}
      {onBack && (
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          onClick={onBack}
          className="fixed top-8 left-8 z-50 bg-white/90 hover:bg-white text-gray-700 rounded-full p-3 shadow-lg hover:shadow-xl transition-all hover:scale-105"
          title="Back"
        >
          <ArrowLeft className="w-6 h-6" />
        </motion.button>
      )}

      {/* Celebration Header */}
      <motion.div
        className="text-center mb-8 mt-8"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-6xl text-gray-700 mb-3 tracking-wide" style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 700 }}>
          Your Photo is Ready!
        </h2>
        <p className="text-xl text-gray-600" style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 600 }}>
          Looking great! Now save or share your creation
        </p>
      </motion.div>

      {/* Photo Preview */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mb-12 w-full flex items-center justify-center px-4 relative"
      >
        {/* Concentrated Sparkles Around Photo */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {[...Array(30)].map((_, i) => {
            const angle = (i / 30) * Math.PI * 2;
            const distance = 180 + Math.random() * 80;
            const x = 50 + Math.cos(angle) * (distance / 10);
            const y = 50 + Math.sin(angle) * (distance / 8);
            const size = 3 + Math.random() * 5;
            const delay = Math.random() * 2;
            const duration = 1 + Math.random() * 2;

            return (
              <motion.div
                key={`photo-sparkle-${i}`}
                className="absolute"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                }}
                transition={{
                  duration: duration,
                  delay: delay,
                  repeat: Infinity,
                  repeatDelay: Math.random() * 3,
                  ease: 'easeInOut',
                }}
              >
                <div
                  style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    background: 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,0.5) 50%, transparent 100%)',
                    borderRadius: '50%',
                    boxShadow: `0 0 ${size * 3}px ${size}px rgba(255,255,255,0.9)`,
                  }}
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Radial Shine Rays from Photo */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {[...Array(12)].map((_, i) => {
            const angle = (i / 12) * 360;
            
            return (
              <motion.div
                key={`ray-${i}`}
                className="absolute left-1/2 top-1/2"
                style={{
                  width: '200px',
                  height: '3px',
                  background: 'linear-gradient(90deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
                  transformOrigin: 'left center',
                  transform: `rotate(${angle}deg)`,
                  filter: 'blur(2px)',
                }}
                animate={{
                  opacity: [0.3, 0.7, 0.3],
                  scaleX: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 3,
                  delay: i * 0.1,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            );
          })}
        </motion.div>

        <motion.img
          src={photoUrl}
          alt="Final photo booth strip"
          style={{ 
            display: 'block',
            width: '100%',
            maxWidth: '320px',
            height: 'auto',
            position: 'relative',
            zIndex: 10,
            filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.3))',
          }}
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, type: 'spring' }}
        />
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mb-12"
        style={{ maxWidth: '800px' }}
      >
        <Button
          size="lg"
          onClick={handleDownload}
          disabled={isDownloading}
          className="bg-gray-800 text-white hover:bg-gray-700 shadow-lg py-6 rounded-full tracking-wider text-xl"
          style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 700 }}
        >
          {isDownloading ? (
            <>
              <Check className="w-5 h-5 mr-2" />
              Downloaded!
            </>
          ) : (
            <>
              <Download className="w-5 h-5 mr-2" />
              Download
            </>
          )}
        </Button>

        <Button
          size="lg"
          onClick={() => setShowShareMenu(!showShareMenu)}
          className="bg-gray-800 text-white hover:bg-gray-700 shadow-lg py-6 rounded-full tracking-wider text-xl"
          style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 700 }}
        >
          <Share2 className="w-5 h-5 mr-2" />
          Share
        </Button>

        <Button
          size="lg"
          onClick={onRestart}
          variant="outline"
          className="bg-white text-gray-700 border-gray-300 hover:bg-gray-50 shadow-lg py-6 rounded-full tracking-wider text-xl"
          style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 700 }}
        >
          <RotateCcw className="w-5 h-5 mr-2" />
          Start Over
        </Button>
      </motion.div>

      {/* Share Menu */}
      {showShareMenu && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setShowShareMenu(false)}
          />
          
          {/* Share Menu Modal */}
          <motion.div
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-3xl shadow-2xl z-50 p-8 max-w-md w-full mx-4"
            initial={{ opacity: 0, scale: 0.9, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.3, type: 'spring' }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-3xl text-gray-800" style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 700 }}>
                Share Your Photo
              </h3>
              <button
                onClick={() => setShowShareMenu(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-3">
              {/* Instagram */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={shareToInstagram}
                className="w-full flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-pink-500 to-orange-500 text-white shadow-lg hover:shadow-xl transition-all"
              >
                <div className="bg-white/20 p-3 rounded-xl">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </div>
                <div className="text-left flex-1">
                  <div className="text-lg font-bold" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                    Instagram
                  </div>
                </div>
              </motion.button>

              {/* Twitter/X */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={shareToTwitter}
                className="w-full flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg hover:shadow-xl transition-all"
              >
                <div className="bg-white/20 p-3 rounded-xl">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </div>
                <div className="text-left flex-1">
                  <div className="text-lg font-bold" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                    X (Twitter)
                  </div>
                  <div className="text-sm opacity-90" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                    Post with a caption
                  </div>
                </div>
              </motion.button>
            </div>
          </motion.div>
        </>
      )}

      {/* Colorful Confetti Ribbons 🎉 */}
      <motion.div
        className="fixed inset-0 pointer-events-none overflow-hidden z-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {[...Array(60)].map((_, i) => {
          const colors = [
            '#FF6B9D', // 粉红
            '#FFA07A', // 浅橙
            '#FFD700', // 金黄
            '#87CEEB', // 天蓝
            '#98FB98', // 浅绿
            '#DDA0DD', // 梅花紫
            '#F0E68C', // 卡其黄
            '#FFB6C1', // 浅粉
            '#B0E0E6', // 粉蓝
            '#FFE4B5', // 桃色
            '#E0BBE4', // 薰衣草
            '#FFDAB9', // 桃橙
            '#FF1493', // 深粉
            '#00CED1', // 深青
            '#FFA500', // 橙色
          ];
          
          const color = colors[i % colors.length];
          const width = 3 + Math.random() * 3; // 3-6px 宽（减小）
          const height = 10 + Math.random() * 10; // 10-20px 高（减小）
          const startX = Math.random() * 100;
          const swingAmount = (Math.random() - 0.5) * 50; // 摇摆幅度
          const rotations = 3 + Math.random() * 5; // 3-8 圈旋转
          const duration = 3 + Math.random() * 2.5; // 3-5.5秒
          const delay = i * 0.05; // 依次飘落
          const initialRotate = Math.random() * 360;

          return (
            <motion.div
              key={`confetti-${i}`}
              className="absolute"
              style={{
                left: `${startX}%`,
                width: `${width}px`,
                height: `${height}px`,
                transformStyle: 'preserve-3d',
              }}
              initial={{ 
                y: -50, 
                opacity: 0.95,
                rotateZ: initialRotate,
                rotateX: 0,
              }}
              animate={{
                y: '110vh',
                opacity: [0.95, 1, 0.9, 0.7, 0],
                rotateZ: initialRotate + rotations * 360,
                rotateX: [0, 180, 360, 540, 720],
                x: [0, swingAmount, -swingAmount * 0.8, swingAmount * 0.5, 0],
              }}
              transition={{
                duration: duration,
                delay: delay,
                ease: 'linear',
                repeat: Infinity,
                repeatDelay: Math.random() * 2,
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  background: `linear-gradient(180deg, ${color} 0%, ${color}ee 50%, ${color} 100%)`,
                  borderRadius: '1px',
                  boxShadow: `0 1px 3px rgba(0,0,0,0.2), inset 0 0.5px 0 rgba(255,255,255,0.3)`,
                }}
              />
            </motion.div>
          );
        })}
      </motion.div>

      {/* Additional Sparkle Confetti - smaller circular pieces */}
      <motion.div
        className="fixed inset-0 pointer-events-none overflow-hidden z-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {[...Array(35)].map((_, i) => {
          const colors = ['#FF1493', '#00BFFF', '#FFD700', '#FF69B4', '#7B68EE', '#32CD32', '#FF6347', '#FF8C00'];
          const color = colors[i % colors.length];
          const size = 3 + Math.random() * 3; // 3-6px（减小）
          const startX = Math.random() * 100;
          const duration = 2.5 + Math.random() * 2;
          const delay = 0.3 + i * 0.05;
          const swingAmount = (Math.random() - 0.5) * 40;

          return (
            <motion.div
              key={`mini-confetti-${i}`}
              className="absolute"
              style={{
                left: `${startX}%`,
                width: `${size}px`,
                height: `${size}px`,
              }}
              initial={{ 
                y: -20, 
                opacity: 1,
                rotate: 0,
              }}
              animate={{
                y: '110vh',
                opacity: [1, 0.9, 0.6, 0],
                rotate: 720 + Math.random() * 720,
                x: [0, swingAmount, -swingAmount * 0.7, 0],
              }}
              transition={{
                duration: duration,
                delay: delay,
                ease: 'easeIn',
                repeat: Infinity,
                repeatDelay: Math.random() * 2.5,
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  background: color,
                  borderRadius: '50%',
                  boxShadow: `0 0 ${size * 2}px ${color}aa`,
                }}
              />
            </motion.div>
          );
        })}
      </motion.div>

      {/* Twinkling White Stars ✨ */}
      <motion.div
        className="fixed inset-0 pointer-events-none overflow-hidden z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        {[...Array(40)].map((_, i) => {
          const size = 4 + Math.random() * 6; // 4-10px
          const x = Math.random() * 100;
          const y = Math.random() * 100;
          const delay = Math.random() * 3;
          const duration = 1 + Math.random() * 2;

          return (
            <motion.div
              key={`twinkle-star-${i}`}
              className="absolute"
              style={{
                left: `${x}%`,
                top: `${y}%`,
              }}
              initial={{ opacity: 0, scale: 0, rotate: 0 }}
              animate={{
                opacity: [0, 1, 0.8, 1, 0],
                scale: [0, 1, 0.9, 1, 0],
                rotate: [0, 45, 90, 135, 180],
              }}
              transition={{
                duration: duration,
                delay: delay,
                repeat: Infinity,
                repeatDelay: Math.random() * 2,
                ease: 'easeInOut',
              }}
            >
              {/* Four-point star */}
              <svg width={size * 2} height={size * 2} viewBox="0 0 20 20" fill="none">
                <path
                  d="M10 2 L11 9 L18 10 L11 11 L10 18 L9 11 L2 10 L9 9 Z"
                  fill="white"
                  stroke="white"
                  strokeWidth="0.5"
                />
              </svg>
              <div
                className="absolute inset-0"
                style={{
                  background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%)',
                  filter: 'blur(2px)',
                }}
              />
            </motion.div>
          );
        })}
      </motion.div>

      {/* Sparkly White Dots */}
      <motion.div
        className="fixed inset-0 pointer-events-none overflow-hidden z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
      >
        {[...Array(50)].map((_, i) => {
          const size = 2 + Math.random() * 4; // 2-6px
          const x = Math.random() * 100;
          const y = Math.random() * 100;
          const delay = Math.random() * 4;
          const duration = 0.8 + Math.random() * 1.5;

          return (
            <motion.div
              key={`sparkly-dot-${i}`}
              className="absolute rounded-full"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                width: `${size}px`,
                height: `${size}px`,
                background: 'white',
                boxShadow: `0 0 ${size * 3}px ${size}px rgba(255,255,255,0.9)`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0.5, 1, 0],
                scale: [0, 1.2, 0.8, 1.2, 0],
              }}
              transition={{
                duration: duration,
                delay: delay,
                repeat: Infinity,
                repeatDelay: Math.random() * 3,
                ease: 'easeInOut',
              }}
            />
          );
        })}
      </motion.div>
    </div>
  );
}