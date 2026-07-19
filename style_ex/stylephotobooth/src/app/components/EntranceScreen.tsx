import { motion } from 'motion/react';
import { useState, useEffect, useRef } from 'react';
import imgEntranceBackground from 'figma:asset/1b9e15de86cfc63ae43da4557ba3f61150c9f32a.png';

interface EntranceScreenProps {
  onStart: () => void;
}

interface TrailPoint {
  x: number;
  y: number;
  id: number;
}

export default function EntranceScreen({ onStart }: EntranceScreenProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [showCallToAction, setShowCallToAction] = useState(false);
  const [trails, setTrails] = useState<TrailPoint[]>([]);
  const trailIdRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize and play background music on mount
  useEffect(() => {
    // Create audio element for entrance music
    const audio = new Audio();
    // Using a Y2K/chill vibe background music
    // You can replace this URL with your own music file
    audio.src = 'https://assets.mixkit.co/active_storage/sfx/2997/2997-preview.mp3'; // Placeholder upbeat intro music
    audio.loop = true;
    audio.volume = 0.3; // Set to 30% volume
    audioRef.current = audio;

    // Play music with a slight delay for better UX
    const playMusic = async () => {
      try {
        await audio.play();
      } catch (error) {
        // Auto-play might be blocked, that's okay
        console.log('Music autoplay blocked, will play on user interaction');
      }
    };

    playMusic();

    // Cleanup: stop music when component unmounts
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  // Call-to-action appears 2 seconds after hovering starts
  useEffect(() => {
    if (isHovering && !showCallToAction) {
      const timer = setTimeout(() => {
        setShowCallToAction(true);
      }, 2000); // 2-second pause for atmosphere
      return () => clearTimeout(timer);
    }
  }, [isHovering, showCallToAction]);

  // Handle mouse move to create trail effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newPoint: TrailPoint = {
      x,
      y,
      id: trailIdRef.current++,
    };

    setTrails(prev => [...prev, newPoint]);

    // Remove trail point after animation
    setTimeout(() => {
      setTrails(prev => prev.filter(p => p.id !== newPoint.id));
    }, 2500);
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className="absolute inset-0 z-0"
      >
        <img 
          src={imgEntranceBackground}
          alt="DreamSnap Y2K Photo Booth"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </motion.div>

      {/* Trail Effects - Separate layer below everything */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {trails.map((point) => (
          <motion.div
            key={point.id}
            className="absolute pointer-events-none"
            style={{
              left: point.x - 40,
              top: point.y - 40,
              willChange: 'transform, opacity',
            }}
            initial={{ opacity: 1, scale: 0 }}
            animate={{ 
              opacity: 0, 
              scale: 4,
            }}
            transition={{ 
              duration: 2.5, 
              ease: 'easeOut' 
            }}
          >
            {/* Main bright core */}
            <div 
              className="w-20 h-20 rounded-full absolute pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(255,180,255,0.7) 20%, rgba(180,180,255,0.5) 40%, transparent 70%)',
                filter: 'blur(4px)',
              }}
            />
            {/* Outer glow layer */}
            <div 
              className="w-20 h-20 rounded-full absolute pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(255,200,255,0.6) 0%, rgba(200,150,255,0.4) 30%, rgba(150,200,255,0.2) 50%, transparent 80%)',
                filter: 'blur(16px)',
              }}
            />
            {/* Extra diffuse glow */}
            <div 
              className="w-20 h-20 rounded-full absolute pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(255,220,255,0.3) 20%, transparent 60%)',
                filter: 'blur(24px)',
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Interactive Area - Full Screen for mouse tracking */}
      <div
        ref={containerRef}
        className="absolute inset-0 z-20"
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onClick={showCallToAction ? onStart : undefined}
      />

      {/* Content Container - Centered in Booth - Highest z-index */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
        <div 
          className="flex flex-col items-center space-y-8 pointer-events-auto cursor-pointer"
          style={{ 
            isolation: 'isolate',
            marginTop: '120px', // Move down to center in the photobooth area
            marginLeft: '-80px' // Position in the curtain area
          }}
          onClick={showCallToAction ? onStart : undefined}
        >{/* Call to Action - "ENTER THE BOOTH" */}
          {showCallToAction && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="relative"
            >
              {/* Glow effect behind text */}
              <motion.div
                className="absolute inset-0 blur-xl opacity-60 pointer-events-none"
                animate={{ 
                  scale: [1, 1.1, 1],
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                style={{
                  background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,200,255,0.4) 50%, transparent 100%)',
                }}
              />

              {/* Main CTA text - Smaller size */}
              <motion.div
                className="relative flex items-center gap-3 text-2xl md:text-3xl text-white px-8 py-4"
                style={{ 
                  fontFamily: "'Orbitron', sans-serif",
                  fontWeight: 700,
                  textShadow: '0 0 40px rgba(255,255,255,0.9), 3px 3px 20px rgba(0,0,0,0.7)',
                  letterSpacing: '0.05em'
                }}
                animate={{ 
                  scale: [1, 1.05, 1],
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                whileHover={{ 
                  scale: 1.15,
                }}
              >
                {/* Arrow pointing toward photobooth (right) */}
                <motion.span
                  className="text-3xl md:text-4xl opacity-90"
                  animate={{ 
                    x: [0, -5, 0],
                  }}
                  transition={{ 
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                >
                  ←
                </motion.span>

                ENTER THE BOOTH
                
                {/* Sparkle decoration */}
                <motion.span
                  className="absolute -top-2 -right-2 text-2xl"
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.3, 1]
                  }}
                  transition={{ 
                    duration: 2.5,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                >
                  ✨
                </motion.span>
              </motion.div>


            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}