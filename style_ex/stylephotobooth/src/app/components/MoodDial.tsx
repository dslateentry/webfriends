import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';

interface MoodDialProps {
  value: number; // 0-100
  onChange: (value: number) => void;
}

const MOODS = [
  { value: 0, label: 'Soft', angle: -135 },
  { value: 25, label: 'Warm', angle: -67.5 },
  { value: 50, label: 'Balanced', angle: 0 },
  { value: 75, label: 'Bold', angle: 67.5 },
  { value: 100, label: 'Dramatic', angle: 135 },
];

export default function MoodDial({ value, onChange }: MoodDialProps) {
  const [isDragging, setIsDragging] = useState(false);
  const dialRef = useRef<HTMLDivElement>(null);
  const angleRef = useRef(0);

  // Convert value (0-100) to angle (-135 to 135)
  const valueToAngle = (val: number) => {
    return -135 + (val / 100) * 270;
  };

  // Convert angle to value
  const angleToValue = (angle: number) => {
    let normalizedAngle = angle;
    if (normalizedAngle < -135) normalizedAngle = -135;
    if (normalizedAngle > 135) normalizedAngle = 135;
    return ((normalizedAngle + 135) / 270) * 100;
  };

  // Get current mood label
  const getCurrentMood = () => {
    if (value < 12.5) return 'Soft';
    if (value < 37.5) return 'Warm';
    if (value < 62.5) return 'Balanced';
    if (value < 87.5) return 'Bold';
    return 'Dramatic';
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    updateAngle(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    updateAngle(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const updateAngle = (clientX: number, clientY: number) => {
    if (!dialRef.current) return;

    const rect = dialRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = clientX - centerX;
    const deltaY = clientY - centerY;

    let angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
    
    // Constrain to -135 to 135 range
    if (angle < -135) angle = -135;
    if (angle > 135) angle = 135;

    angleRef.current = angle;
    const newValue = angleToValue(angle);
    onChange(Math.round(newValue));
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging]);

  const currentAngle = valueToAngle(value);
  const currentMood = getCurrentMood();

  return (
    <div className="flex flex-col items-center gap-4 py-6">
      {/* Title */}
      <div className="text-center">
        <h3 
          className="text-2xl text-gray-700 mb-1" 
          style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 700 }}
        >
          AI Mood Dial
        </h3>
        <p 
          className="text-sm text-gray-500"
          style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 600 }}
        >
          Adjust the vibe of your photos
        </p>
      </div>

      {/* Dial Container */}
      <div className="relative" ref={dialRef}>
        {/* Outer ring with tick marks */}
        <div className="relative w-48 h-48">
          {/* Background circle */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 shadow-inner" />
          
          {/* Tick marks */}
          <svg className="absolute inset-0 w-full h-full" style={{ transform: 'rotate(-90deg)' }}>
            {/* Arc track */}
            <circle
              cx="96"
              cy="96"
              r="85"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="8"
              strokeDasharray="400 400"
              strokeDashoffset="100"
            />
            
            {/* Active arc */}
            <motion.circle
              cx="96"
              cy="96"
              r="85"
              fill="none"
              stroke="url(#moodGradient)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray="400 400"
              strokeDashoffset={100 + (1 - value / 100) * 300}
              style={{ filter: 'drop-shadow(0 0 8px rgba(139, 92, 246, 0.5))' }}
            />
            
            {/* Gradient definition */}
            <defs>
              <linearGradient id="moodGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="50%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
          </svg>

          {/* Small tick marks */}
          {MOODS.map((mood, index) => {
            const angle = mood.angle;
            const radian = ((angle + 90) * Math.PI) / 180;
            const x = 96 + Math.cos(radian) * 75;
            const y = 96 + Math.sin(radian) * 75;
            
            return (
              <div
                key={index}
                className="absolute w-1 h-3 bg-gray-400 rounded-full"
                style={{
                  left: `${x}px`,
                  top: `${y}px`,
                  transform: `translate(-50%, -50%) rotate(${angle + 90}deg)`,
                }}
              />
            );
          })}

          {/* Center circle */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-white to-gray-50 shadow-lg flex items-center justify-center">
              {/* Current mood label */}
              <motion.div
                key={currentMood}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center"
              >
                <div 
                  className="text-3xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
                  style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 700 }}
                >
                  {currentMood}
                </div>
                <div 
                  className="text-xs text-gray-400 mt-1"
                  style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 600 }}
                >
                  {value}%
                </div>
              </motion.div>
            </div>
          </div>

          {/* Rotatable knob indicator */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            animate={{ rotate: currentAngle }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="absolute" style={{ top: '12px' }}>
              <div className="w-3 h-8 bg-gradient-to-b from-pink-500 to-purple-600 rounded-full shadow-lg" 
                   style={{ filter: 'drop-shadow(0 2px 8px rgba(236, 72, 153, 0.6))' }} 
              />
            </div>
          </motion.div>

          {/* Interactive overlay */}
          <div
            className="absolute inset-0 cursor-pointer"
            onMouseDown={handleMouseDown}
            style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
          />

          {/* Glow effect when dragging */}
          {isDragging && (
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)',
                filter: 'blur(20px)',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />
          )}
        </div>
      </div>

      {/* Mood labels */}
      <div className="flex items-center justify-between w-full max-w-xs px-4">
        <span 
          className="text-xs text-gray-400"
          style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 600 }}
        >
          Soft
        </span>
        <span 
          className="text-xs text-gray-600 font-bold"
          style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
          Balanced
        </span>
        <span 
          className="text-xs text-gray-400"
          style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 600 }}
        >
          Dramatic
        </span>
      </div>

      {/* Visual preview hint */}
      <motion.div
        className="text-center px-6 py-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl"
        animate={{
          boxShadow: isDragging 
            ? '0 4px 20px rgba(139, 92, 246, 0.3)' 
            : '0 2px 8px rgba(0, 0, 0, 0.05)',
        }}
      >
        <p 
          className="text-xs text-gray-600"
          style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 600 }}
        >
          {value < 25 && '✨ Gentle tones, soft shadows'}
          {value >= 25 && value < 50 && '🌅 Warm glow, cozy vibes'}
          {value >= 50 && value < 75 && '📷 True-to-life, natural look'}
          {value >= 75 && value < 90 && '💪 Punchy contrast, vivid colors'}
          {value >= 90 && '🎭 High drama, cinematic feel'}
        </p>
      </motion.div>
    </div>
  );
}