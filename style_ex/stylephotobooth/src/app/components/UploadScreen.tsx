import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import svgPaths from '../../imports/svg-uc8f8u125z';
import imgBackground from 'figma:asset/aeeb52841d7ad4fc94c74c18e722924c7fe1fc34.png';
import imgCameraIcon from 'figma:asset/106f0980e625c30478108966255d76cdb8bb472b.png';
import imgUploadIcon from 'figma:asset/fc155c8d3c1ddcd0a30a25aa2a22d81fc9381c69.png';
import StarSticker from '../../imports/Frame14-193-299';
import Y2KButterfly from '../../imports/Y2KButterfly';
import FlowerSmileySticker from '../../imports/Frame29-193-454';

interface UploadScreenProps {
  onImageUpload: (imageUrl: string) => void;
  onMultipleImagesUpload?: (imageUrls: string[]) => void;
  onBack?: () => void;
}

export default function UploadScreen({ onImageUpload, onMultipleImagesUpload, onBack }: UploadScreenProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [capturedPhotos, setCapturedPhotos] = useState<string[]>([]);
  const [isCapturing, setIsCapturing] = useState(false);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Cleanup camera on unmount
  useEffect(() => {
    return () => {
      if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [cameraStream]);

  const startCamera = async () => {
    setShowCamera(true);
    setCapturedPhotos([]);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 1920 },
          height: { ideal: 1080 },
          facingMode: 'user'
        } 
      });
      setCameraStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Unable to access camera. Please check permissions.');
      setShowCamera(false);
    }
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
    setShowCamera(false);
    setCountdown(null);
    setIsCapturing(false);
  };

  const capturePhoto = (): string | null => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0);
        return canvas.toDataURL('image/png');
      }
    }
    return null;
  };

  const startCountdownAndCapture = async () => {
    setIsCapturing(true);
    
    // Countdown: 3, 2, 1
    for (let i = 3; i > 0; i--) {
      setCountdown(i);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    setCountdown(null);
    
    // Capture 4 photos in sequence
    const photos: string[] = [];
    for (let i = 0; i < 4; i++) {
      const photo = capturePhoto();
      if (photo) {
        photos.push(photo);
        setCapturedPhotos(prev => [...prev, photo]);
        
        // Flash effect
        const flashDiv = document.getElementById('camera-flash');
        if (flashDiv) {
          flashDiv.style.opacity = '1';
          setTimeout(() => {
            flashDiv.style.opacity = '0';
          }, 200);
        }
        
        // Wait 3000ms before next capture (except for the last one) - 3 seconds for more time to pose
        if (i < 3) {
          await new Promise(resolve => setTimeout(resolve, 3000));
        }
      }
    }
    
    setIsCapturing(false);
    
    // Close camera and proceed with captured photos
    setTimeout(() => {
      stopCamera();
      if (photos.length === 4 && onMultipleImagesUpload) {
        onMultipleImagesUpload(photos);
      } else if (photos.length > 0) {
        onImageUpload(photos[0]);
      }
    }, 1000);
  };

  const handleFileSelect = async (files: FileList) => {
    const imageFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length === 0) return;
    
    const imageUrls: string[] = [];
    
    for (const file of imageFiles.slice(0, 4)) {
      const reader = new FileReader();
      const imageUrl = await new Promise<string>((resolve) => {
        reader.onload = (e) => {
          resolve(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      });
      imageUrls.push(imageUrl);
    }
    
    if (imageUrls.length > 1 && onMultipleImagesUpload) {
      onMultipleImagesUpload(imageUrls);
    } else if (imageUrls.length === 1) {
      onImageUpload(imageUrls[0]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileSelect(e.target.files);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img 
          src={imgBackground}
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>

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

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-8">
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            
            {/* Left: Take a Photo */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center"
            >
              {/* Title */}
              <h2 
                className="text-[48px] font-bold text-center mb-8 tracking-[1.5px]"
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  color: '#364153'
                }}
              >
                Take a Photo
              </h2>

              {/* Card */}
              <div 
                className="w-full max-w-[672px] rounded-[24px] border-4 border-white shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] p-12 flex flex-col items-center"
                style={{
                  background: 'linear-gradient(118.282deg, rgba(191, 176, 251, 0.6) 17.288%, rgba(251, 172, 212, 0.6) 108.23%)'
                }}
              >
                {/* Icon */}
                <div className="w-[160px] h-[160px] mb-6">
                  <img 
                    src={imgCameraIcon} 
                    alt="Camera"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Description */}
                <p 
                  className="text-[24px] font-bold text-center text-white leading-[32px] mb-8"
                  style={{
                    fontFamily: "'Orbitron', sans-serif"
                  }}
                >
                  Count 3, 2 ,1 and smile!
                </p>

                {/* Button */}
                <button
                  onClick={startCamera}
                  className="bg-[#1e2939] rounded-full px-12 py-3 shadow-[0px_10px_15px_0px_rgba(0,0,0,0.1),0px_4px_6px_0px_rgba(0,0,0,0.1)] hover:scale-105 active:scale-95 transition-all"
                >
                  <span 
                    className="text-[20px] font-bold text-white tracking-[1px] leading-[28px]"
                    style={{
                      fontFamily: "'Orbitron', sans-serif"
                    }}
                  >
                    Start !
                  </span>
                </button>
              </div>
            </motion.div>

            {/* Right: Upload Your Photo */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-col items-center"
            >
              {/* Title */}
              <h2 
                className="text-[48px] font-bold text-center mb-8 tracking-[1.5px] whitespace-nowrap"
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  color: '#364153'
                }}
              >
                Upload Your Photo
              </h2>

              {/* Card with Drag & Drop */}
              <div 
                className={`w-full max-w-[672px] rounded-[24px] border-4 border-white shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] p-12 flex flex-col items-center cursor-pointer transition-all ${
                  isDragging ? 'scale-105 ring-4 ring-purple-400' : ''
                }`}
                style={{
                  background: 'linear-gradient(117.293deg, rgba(154, 223, 248, 0.7) 0%, rgba(192, 176, 247, 0.7) 105.89%)'
                }}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={handleUploadClick}
              >
                {/* Icon */}
                <div className="w-[160px] h-[160px] mb-6">
                  <img 
                    src={imgUploadIcon} 
                    alt="Upload"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Description */}
                <p 
                  className="text-[24px] font-bold text-center text-white leading-[32px] mb-8"
                  style={{
                    fontFamily: "'Orbitron', sans-serif"
                  }}
                >
                  Drag & Drop Your Photo
                </p>

                {/* Button */}
                <div
                  className="bg-[#1e2939] rounded-full px-8 py-3 shadow-[0px_10px_15px_0px_rgba(0,0,0,0.1),0px_4px_6px_0px_rgba(0,0,0,0.1)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleUploadClick();
                  }}
                >
                  {/* Icon */}
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 20 20">
                    <path d={svgPaths.p3053b100} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                    <path d={svgPaths.p320a7e80} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                    <path d="M10 2.5V12.5" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                  </svg>
                  <span 
                    className="text-[20px] font-bold text-white tracking-[1px] leading-[28px]"
                    style={{
                      fontFamily: "'Orbitron', sans-serif"
                    }}
                  >
                    Choose File
                  </span>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileInputChange}
        className="hidden"
      />

      {/* Camera Modal */}
      <AnimatePresence>
        {showCamera && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #E8DCFF 0%, #f6d0ef 35%, #DFD5FF 50%, #c0e2e8 75%, #E0D8FF 100%)'
            }}
          >
            {/* Floating Stickers Background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {/* Star Sticker 1 - Top Left */}
              <motion.div
                className="absolute w-16 h-16"
                style={{ left: '12%', top: '15%' }}
                animate={{
                  y: [0, -20, 0],
                  scale: [1, 1.15, 1],
                  rotate: [0, 10, 0],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <StarSticker />
              </motion.div>

              {/* Star Sticker 2 - Top Right */}
              <motion.div
                className="absolute w-16 h-16"
                style={{ right: '12%', top: '15%' }}
                animate={{
                  y: [0, -20, 0],
                  scale: [1, 1.15, 1],
                  rotate: [0, -10, 0],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.3
                }}
              >
                <StarSticker />
              </motion.div>

              {/* Butterfly Sticker 1 - Left Middle */}
              <motion.div
                className="absolute w-24 h-24"
                style={{ left: '8%', top: '48%' }}
                animate={{
                  x: [-8, 8, -8],
                  y: [0, -15, 0],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.4
                }}
              >
                <Y2KButterfly />
              </motion.div>

              {/* Butterfly Sticker 2 - Right Middle */}
              <motion.div
                className="absolute w-24 h-24"
                style={{ right: '8%', top: '48%' }}
                animate={{
                  x: [-8, 8, -8],
                  y: [0, -15, 0],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              >
                <Y2KButterfly />
              </motion.div>

              {/* Star Sticker 3 - Bottom Left */}
              <motion.div
                className="absolute w-18 h-18"
                style={{ left: '15%', bottom: '15%' }}
                animate={{
                  y: [0, -22, 0],
                  scale: [1, 1.2, 1],
                  rotate: [0, 15, 0],
                }}
                transition={{
                  duration: 2.7,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.6
                }}
              >
                <StarSticker />
              </motion.div>

              {/* Star Sticker 4 - Bottom Right */}
              <motion.div
                className="absolute w-18 h-18"
                style={{ right: '15%', bottom: '15%' }}
                animate={{
                  y: [0, -22, 0],
                  scale: [1, 1.2, 1],
                  rotate: [0, -15, 0],
                }}
                transition={{
                  duration: 2.7,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.9
                }}
              >
                <StarSticker />
              </motion.div>
            </div>

            {/* White Glowing Dots Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {/* Large white glowing orbs */}
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={`white-orb-${i}`}
                  className="absolute rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    width: `${8 + Math.random() * 12}px`,
                    height: `${8 + Math.random() * 12}px`,
                    background: 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.5) 40%, transparent 100%)',
                    boxShadow: '0 0 15px rgba(255,255,255,0.8), 0 0 25px rgba(255,255,255,0.5)',
                  }}
                  animate={{
                    opacity: [0.4, 1, 0.4],
                    scale: [1, 1.3, 1],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                    ease: "easeInOut"
                  }}
                />
              ))}

              {/* Small sparkle white dots */}
              {[...Array(50)].map((_, i) => (
                <motion.div
                  key={`white-sparkle-${i}`}
                  className="absolute rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    width: `${2 + Math.random() * 4}px`,
                    height: `${2 + Math.random() * 4}px`,
                    background: 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,0.9) 30%, transparent 100%)',
                    boxShadow: '0 0 8px rgba(255,255,255,1), 0 0 15px rgba(255,255,255,0.7)',
                  }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1.8, 0],
                  }}
                  transition={{
                    duration: 1.2 + Math.random() * 1.5,
                    repeat: Infinity,
                    delay: Math.random() * 3,
                  }}
                />
              ))}

              {/* Medium white glowing particles */}
              {[...Array(25)].map((_, i) => (
                <motion.div
                  key={`white-particle-${i}`}
                  className="absolute rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    width: `${4 + Math.random() * 6}px`,
                    height: `${4 + Math.random() * 6}px`,
                    background: 'radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.6) 50%, transparent 100%)',
                    boxShadow: '0 0 10px rgba(255,255,255,0.9), 0 0 20px rgba(255,255,255,0.6)',
                  }}
                  animate={{
                    opacity: [0.3, 0.9, 0.3],
                    y: [0, -30 - Math.random() * 30, -60 - Math.random() * 40],
                    scale: [1, 1.2, 0.8],
                  }}
                  transition={{
                    duration: 4 + Math.random() * 3,
                    repeat: Infinity,
                    delay: Math.random() * 4,
                    ease: "easeOut"
                  }}
                />
              ))}
            </div>

            {/* Photo Booth Machine */}
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="relative max-w-2xl w-full"
            >
              {/* Machine outer shell */}
              <div 
                className="relative rounded-[40px] p-8 shadow-2xl"
                style={{
                  background: 'linear-gradient(135deg, #f5e6ff 0%, #e8d5ff 25%, #d4c5f9 50%, #c5b9f5 75%, #b8a8f0 100%)',
                  boxShadow: '0 30px 60px rgba(139, 92, 246, 0.4), inset 0 2px 4px rgba(255,255,255,0.8), inset 0 -2px 4px rgba(139, 92, 246, 0.3)'
                }}
              >
                {/* Inner frame */}
                <div 
                  className="relative rounded-[32px] p-6"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(232,213,255,0.6) 100%)',
                    boxShadow: 'inset 0 2px 8px rgba(139, 92, 246, 0.2)'
                  }}
                >
                  {/* Title Banner */}
                  <div className="relative mb-6">
                    <div 
                      className="rounded-full py-4 px-8 text-center relative overflow-hidden"
                      style={{
                        background: 'linear-gradient(90deg, rgba(168, 85, 247, 0.3) 0%, rgba(236, 72, 153, 0.4) 50%, rgba(168, 85, 247, 0.3) 100%)',
                        boxShadow: '0 4px 20px rgba(168, 85, 247, 0.3), inset 0 2px 4px rgba(255,255,255,0.5)'
                      }}
                    >
                      {/* Sparkle decorations */}
                      <div className="absolute top-2 left-8 text-yellow-300 text-xl animate-pulse">✨</div>
                      <div className="absolute top-2 right-8 text-yellow-300 text-xl animate-pulse" style={{ animationDelay: '0.5s' }}>✨</div>
                      
                      <h2
                        className="text-4xl font-bold tracking-wider relative z-10"
                        style={{
                          fontFamily: "'Orbitron', sans-serif",
                          background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 50%, #8b5cf6 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                          textShadow: '0 2px 10px rgba(168, 85, 247, 0.3)',
                          filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.8))'
                        }}
                      >
                        DREAMSNAP
                      </h2>
                    </div>
                  </div>

                  {/* Video screen with curtains effect */}
                  <div className="relative mb-6">
                    {/* Screen frame */}
                    <div 
                      className="relative rounded-3xl overflow-hidden"
                      style={{
                        background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.4) 0%, rgba(236, 72, 153, 0.4) 100%)',
                        padding: '6px',
                        boxShadow: '0 0 30px rgba(168, 85, 247, 0.5), inset 0 2px 4px rgba(255,255,255,0.4)'
                      }}
                    >
                      <div className="relative rounded-3xl overflow-hidden aspect-video">
                        {/* Video */}
                        <video
                          ref={videoRef}
                          autoPlay
                          playsInline
                          muted
                          className="w-full h-full object-cover"
                        />
                        
                        {/* Curtain overlay (subtle) */}
                        <div className="absolute inset-0 pointer-events-none">
                          {/* Left curtain */}
                          <div 
                            className="absolute left-0 top-0 bottom-0 w-12 opacity-20"
                            style={{
                              background: 'linear-gradient(90deg, rgba(255,255,255,0.8) 0%, transparent 100%)'
                            }}
                          />
                          {/* Right curtain */}
                          <div 
                            className="absolute right-0 top-0 bottom-0 w-12 opacity-20"
                            style={{
                              background: 'linear-gradient(-90deg, rgba(255,255,255,0.8) 0%, transparent 100%)'
                            }}
                          />
                        </div>
                      
                        {/* Flash effect */}
                        <div
                          id="camera-flash"
                          className="absolute inset-0 bg-white pointer-events-none transition-opacity duration-200"
                          style={{ opacity: 0 }}
                        />

                        {/* Countdown overlay */}
                        {countdown !== null && (
                          <motion.div
                            key={countdown}
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 1.5, opacity: 0 }}
                            className="absolute inset-0 flex items-center justify-center"
                            style={{
                              background: 'radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, rgba(0,0,0,0.6) 100%)'
                            }}
                          >
                            <div 
                              className="text-white text-[180px] font-bold"
                              style={{
                                fontFamily: "'Orbitron', sans-serif",
                                textShadow: '0 0 40px rgba(255,255,255,0.9), 0 0 80px rgba(168, 85, 247, 0.8), 0 0 120px rgba(236, 72, 153, 0.6)'
                              }}
                            >
                              {countdown}
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </div>

                    {/* Decorative dots below screen */}
                    <div className="flex justify-center gap-2 mt-3">
                      {['#fef08a', '#fbcfe8', '#a5f3fc', '#d8b4fe', '#fca5a5', '#86efac'].map((color, i) => (
                        <motion.div
                          key={i}
                          className="w-3 h-3 rounded-full"
                          style={{ 
                            backgroundColor: color,
                            boxShadow: `0 0 8px ${color}`
                          }}
                          animate={{
                            scale: [1, 1.2, 1],
                          }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            delay: i * 0.1,
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Control Panel */}
                  <div className="flex items-center justify-between gap-4">
                    {/* Left Info Panel */}
                    <div className="flex flex-col gap-2">
                      <div 
                        className="px-4 py-2 rounded-xl text-center border-2"
                        style={{
                          background: 'rgba(168, 85, 247, 0.2)',
                          borderColor: 'rgba(168, 85, 247, 0.4)',
                          boxShadow: 'inset 0 2px 4px rgba(168, 85, 247, 0.1)'
                        }}
                      >
                        <div 
                          className="text-sm font-bold"
                          style={{
                            fontFamily: "'Orbitron', sans-serif",
                            color: '#8b5cf6'
                          }}
                        >
                          $0 =
                        </div>
                        <div 
                          className="text-xs font-semibold mt-1"
                          style={{
                            fontFamily: "'Orbitron', sans-serif",
                            color: '#a855f7'
                          }}
                        >
                          4 PICS
                        </div>
                      </div>
                      
                      <div 
                        className="px-4 py-2 rounded-xl text-center border-2"
                        style={{
                          background: 'rgba(236, 72, 153, 0.2)',
                          borderColor: 'rgba(236, 72, 153, 0.4)',
                          boxShadow: 'inset 0 2px 4px rgba(236, 72, 153, 0.1)'
                        }}
                      >
                        <div 
                          className="text-xs font-bold"
                          style={{
                            fontFamily: "'Orbitron', sans-serif",
                            color: '#ec4899'
                          }}
                        >
                          {capturedPhotos.length}/4
                        </div>
                      </div>
                    </div>

                    {/* Center Capture Button */}
                    {!isCapturing ? (
                      <motion.button
                        onClick={startCountdownAndCapture}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative w-32 h-32 rounded-full flex items-center justify-center"
                        style={{
                          background: 'linear-gradient(135deg, #EDCEE8 0%, #f5e0f0 50%, #EDCEE8 100%)',
                          boxShadow: '0 8px 30px rgba(237, 206, 232, 0.6), inset 0 -4px 8px rgba(0,0,0,0.15), inset 0 4px 8px rgba(255,255,255,0.6)'
                        }}
                      >
                        {/* Inner button */}
                        <div 
                          className="w-28 h-28 rounded-full flex items-center justify-center"
                          style={{
                            background: 'linear-gradient(180deg, #fef3f9 0%, #EDCEE8 100%)',
                            boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.6)'
                          }}
                        >
                          <span 
                            className="text-xl font-bold"
                            style={{
                              fontFamily: "'Orbitron', sans-serif",
                              color: '#a855f7',
                              textShadow: '0 2px 4px rgba(168, 85, 247, 0.3)'
                            }}
                          >
                            START
                          </span>
                        </div>
                      </motion.button>
                    ) : (
                      <div className="w-32 h-32 flex items-center justify-center">
                        <motion.div
                          animate={{
                            rotate: 360,
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear"
                          }}
                          className="w-20 h-20 rounded-full border-4 border-pink-300 border-t-transparent"
                        />
                      </div>
                    )}

                    {/* Right Info Panel */}
                    <div className="flex flex-col gap-2 items-center">
                      {/* Cancel button */}
                      <motion.button
                        onClick={stopCamera}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-20 px-3 py-2 rounded-2xl border-2 text-center"
                        style={{
                          background: 'rgba(255, 204, 221, 0.4)',
                          borderColor: 'rgba(236, 72, 153, 0.5)',
                          boxShadow: '0 4px 12px rgba(236, 72, 153, 0.3), inset 0 1px 2px rgba(255,255,255,0.5)'
                        }}
                      >
                        <div 
                          className="text-xs font-bold text-pink-600"
                          style={{
                            fontFamily: "'Orbitron', sans-serif"
                          }}
                        >
                          CANCEL
                        </div>
                      </motion.button>
                      
                      {/* Photo output slot with emerging photos */}
                      <div 
                        className="w-20 h-20 rounded-2xl border-3 flex flex-col justify-end p-2 relative overflow-visible"
                        style={{
                          background: 'linear-gradient(180deg, #d8c5f5 0%, #c5b5e8 30%, #b8a8e0 100%)',
                          borderColor: 'rgba(139, 92, 246, 0.5)',
                          boxShadow: 'inset 0 4px 12px rgba(0,0,0,0.3), inset 0 -2px 4px rgba(255,255,255,0.2)'
                        }}
                      >
                        {/* Emerging photo strip - positioned outside and below the slot */}
                        {capturedPhotos.length > 0 && (
                          <motion.div
                            initial={{ y: -180 }}
                            animate={{ y: 0 }}
                            transition={{
                              duration: 2,
                              ease: "easeOut"
                            }}
                            className="absolute left-1/2 -translate-x-1/2 top-full mt-1 w-12 bg-white rounded-lg shadow-2xl overflow-hidden z-50"
                            style={{
                              border: '2px solid rgba(168, 85, 247, 0.3)',
                            }}
                          >
                            {/* Photo strip - vertical layout */}
                            <div className="flex flex-col">
                              {capturedPhotos.map((photo, index) => (
                                <motion.div
                                  key={index}
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ delay: index * 0.5, duration: 0.3 }}
                                  className="relative w-full aspect-square border-b border-gray-200 last:border-b-0"
                                >
                                  <img src={photo} alt={`${index + 1}`} className="w-full h-full object-cover" />
                                  {/* Photo number badge */}
                                  <div 
                                    className="absolute top-0.5 right-0.5 w-3 h-3 rounded-full flex items-center justify-center text-[6px] font-bold text-white"
                                    style={{
                                      background: 'linear-gradient(135deg, #a855f7, #ec4899)',
                                      boxShadow: '0 1px 3px rgba(0,0,0,0.3)'
                                    }}
                                  >
                                    {index + 1}
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        )}

                        {/* Inner dark slot opening */}
                        <div 
                          className="w-full h-10 rounded-lg relative overflow-hidden"
                          style={{
                            background: 'linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.3) 100%)',
                            boxShadow: 'inset 0 3px 8px rgba(0,0,0,0.6)'
                          }}
                        >
                          {/* Horizontal slot lines */}
                          <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 pb-1 px-1">
                            <div className="h-[1.5px] bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full" />
                            <div className="h-[1.5px] bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full" />
                            <div className="h-[1.5px] bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Status text */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-center mt-4"
                  >
                    {isCapturing ? (
                      <div 
                        className="text-sm font-semibold flex items-center justify-center gap-2"
                        style={{
                          fontFamily: "'Orbitron', sans-serif",
                          color: '#8b5cf6',
                          textShadow: '0 0 10px rgba(139, 92, 246, 0.5)'
                        }}
                      >
                        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                        Capturing photos...
                      </div>
                    ) : capturedPhotos.length === 0 ? (
                      <p 
                        className="text-sm"
                        style={{
                          fontFamily: "'Orbitron', sans-serif",
                          color: '#a855f7'
                        }}
                      >
                        Curtain closed. Lights on. 4 shots incoming 📸✨
                      </p>
                    ) : (
                      <p 
                        className="text-sm font-semibold"
                        style={{
                          fontFamily: "'Orbitron', sans-serif",
                          color: '#ec4899'
                        }}
                      >
                        {capturedPhotos.length} photo{capturedPhotos.length > 1 ? 's' : ''} captured! ✨
                      </p>
                    )}
                  </motion.div>
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hidden canvas for photo capture */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}