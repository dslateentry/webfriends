import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import html2canvas from 'html2canvas';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Palette, Grid3x3, Sticker, Pencil, Sparkles, Eraser, Undo, Check, PartyPopper, ArrowLeft, X, ChevronLeft, ChevronRight } from 'lucide-react';

// AI Icon Component
const AIIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" fill="url(#aiGrad1)" />
    <path d="M12 6L12.8 9.2L16 10L12.8 10.8L12 14L11.2 10.8L8 10L11.2 9.2L12 6Z" fill="url(#aiGrad2)" />
    <circle cx="12" cy="10" r="1.5" fill="white" opacity="0.8"/>
    <defs>
      <linearGradient id="aiGrad1" x1="4" y1="2" x2="20" y2="18" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#a855f7"/>
        <stop offset="50%" stopColor="#ec4899"/>
        <stop offset="100%" stopColor="#f97316"/>
      </linearGradient>
      <linearGradient id="aiGrad2" x1="8" y1="6" x2="16" y2="14" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#fbbf24"/>
        <stop offset="100%" stopColor="#f59e0b"/>
      </linearGradient>
    </defs>
  </svg>
);

import imgClassic from 'figma:asset/25fddf74bb4d1abf454d9eee7766694b43375f47.png';
import imgLunarNewYear from 'figma:asset/3df03c39ac6ace7d6587fbca2f873a1b20484ad7.png';
import imgHalloween from 'figma:asset/f40dc91f127c1f90646f99cb85c8a0b45f7d9e29.png';
import imgValentinesDay from 'figma:asset/a6e6d3ea26db06810277333870a97ba4011336d7.png';
import imgGraduation from 'figma:asset/8fce8ef535ce683658d2fbca277523d92ca40428.png';
import imgY2K1 from 'figma:asset/422e28fd5b6b52c1ce585f66b2119e4e56a1236f.png';
import imgY2K2 from 'figma:asset/176aa2d0a50b059cdf5e51cf70e8d2c6f3f1fd10.png';
import imgY2K3 from 'figma:asset/8c9a0aac46a758e8d953144108780dee86623b0f.png';
import imgY2K4 from 'figma:asset/dd1ed642e411c556aa4a871387728e4f054c6947.png';
import imgY2K5 from 'figma:asset/0139a6c586b6b7441f6d37a06a73c9d3c9f2cfe2.png';
import GlowSticker from '../../imports/Frame9';
import FlowerSticker from '../../imports/Frame11';
import FunSticker from '../../imports/Frame8';
import HeartSticker from '../../imports/Frame7';
import MultiHeartSticker from '../../imports/Frame10';
import StarSticker from '../../imports/Frame14';
import DreamBigSticker from '../../imports/Frame12';
import FlowerSmileySticker from '../../imports/Frame29';
import ButterflySticker from '../../imports/Frame26';
import LayeredHeartSticker from '../../imports/Frame27';
import BeYouSticker from '../../imports/Frame28';
import StarsDecoSticker from '../../imports/Frame24';
import FlameHeartSticker from '../../imports/2';
import CutieSticker from '../../imports/1';
import PixelHeartSticker from '../../imports/3';
import AlienSticker from '../../imports/6';
import CollarSticker from '../../imports/4';
import FootprintSticker from '../../imports/5';
import ToothSticker from '../../imports/Frame32';
import RingsSticker from '../../imports/Frame31';
import FlameSticker from '../../imports/Frame30';
import StarRingSticker from '../../imports/Frame34';
import PlusCrossSticker from '../../imports/Frame35';
import LightningSticker from '../../imports/Frame33';
import GlobeSticker from '../../imports/Frame40';
import DancePartySticker from '../../imports/Frame41';
import The2000sBackSticker from '../../imports/Frame39';
import FlowerBlobSticker from '../../imports/Frame38';
import BabyBadgeSticker from '../../imports/Frame36';
import StarburstSticker from '../../imports/Frame37';
import PuddingSticker from '../../imports/Frame61';
import JarDessert1Sticker from '../../imports/Frame54';
import JarDessert2Sticker from '../../imports/Frame56';
import HatSticker from '../../imports/Frame62';
import Donut1Sticker from '../../imports/Frame66';
import Donut2Sticker from '../../imports/Frame65';
import MilkBox1Sticker from '../../imports/Frame58';
import MilkBox2Sticker from '../../imports/Frame59';
import IceCreamSticker from '../../imports/Frame64';

// Import PNG assets for gradient stickers (Frame42-50)
import imgFrame42 from 'figma:asset/4f9b868133f6b24c5c7dd8232409b44023880661.png';
import imgFrame43 from 'figma:asset/c6262ef718d0c0ebbfab9be58ea8a6e785931109.png';
import imgFrame44 from 'figma:asset/3ddc80e54d1e1aa5e41bc1c19ca5f04e59ff4f29.png';
import imgFrame45 from 'figma:asset/ae0f7f4c81b4b1bb82f94e9bb94c49fa4a8a959f.png';
import imgFrame46 from 'figma:asset/95c6ef1fc74a53e2d5c2c4aae0b49e5a0b5e2c8d.png';
import imgFrame47 from 'figma:asset/5fc662ebb2bbb3e31bb04bf2354a1c7e17dd1ac9.png';
import imgFrame48 from 'figma:asset/bc04e38bce0d62e663b90af1ed93a5b83dd13d3d.png';
import imgFrame49 from 'figma:asset/b91e5e6865cb1faa1e5cfbb3e3e7d93cd43bd72e.png';
import imgFrame50 from 'figma:asset/d7ae8c79ac0c20e67d1d34a9ae1b62e2c2db2a27.png';

interface CustomizationScreenProps {
  imageUrl: string;
  imageUrls?: string[];
  onFinalize: (photoUrl: string) => void;
  onBack?: () => void;
}

const COLORS = [
  // First row: Basic + Warm colors
  '#ffffff', '#000000', '#9e9e9e', '#e63946', '#ff8500', '#ffd600',
  // Second row: Cool colors + Purple
  '#00c853', '#00b8d4', '#2962ff', '#9c27b0', '#5e35b1', '#ff4081',
  // Third row: Soft Y2K colors
  '#ff6b9d', '#795548', '#b388ff', '#80d8ff', '#ff80ab', '#a7ffeb'
];

// PNG sticker mapping for canvas rendering (Frame42-50)
const PNG_STICKER_MAP: Record<string, string> = {
  'rounded-square': imgFrame42,
  'butterfly-gradient': imgFrame43,
  'eye-shape': imgFrame44,
  'oval-gradient': imgFrame45,
  'pentagon-star': imgFrame46,
  'diamond-star': imgFrame47,
  'gradient-arrow': imgFrame48,
  'hexagon-gradient': imgFrame49,
  'starburst-circle': imgFrame50,
};

// ── Pattern SVG icons ──────────────────────────────────────────
const PatternNoneIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect x="4" y="4" width="24" height="24" rx="4" stroke="currentColor" strokeWidth="2"/>
    <line x1="9" y1="9" x2="23" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);
const PatternDotsIcon = () => (
  <svg viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <circle cx="8" cy="8" r="2.5"/><circle cx="16" cy="8" r="2.5"/><circle cx="24" cy="8" r="2.5"/>
    <circle cx="8" cy="16" r="2.5"/><circle cx="16" cy="16" r="2.5"/><circle cx="24" cy="16" r="2.5"/>
    <circle cx="8" cy="24" r="2.5"/><circle cx="16" cy="24" r="2.5"/><circle cx="24" cy="24" r="2.5"/>
  </svg>
);
const PatternStripesIcon = () => (
  <svg viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect x="4" y="5" width="24" height="4" rx="2"/>
    <rect x="4" y="14" width="24" height="4" rx="2"/>
    <rect x="4" y="23" width="24" height="4" rx="2"/>
  </svg>
);
const PatternGridIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect x="4" y="4" width="24" height="24" rx="3" stroke="currentColor" strokeWidth="1.5"/>
    <line x1="12" y1="4" x2="12" y2="28" stroke="currentColor" strokeWidth="1.5"/>
    <line x1="20" y1="4" x2="20" y2="28" stroke="currentColor" strokeWidth="1.5"/>
    <line x1="4" y1="12" x2="28" y2="12" stroke="currentColor" strokeWidth="1.5"/>
    <line x1="4" y1="20" x2="28" y2="20" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);
const PatternHeartsIcon = () => (
  <svg viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path d="M9 6C7.3 6 6 7.3 6 9c0 2.8 3.5 5.5 3.5 5.5S13 11.8 13 9c0-1.7-1.3-3-4-3z" opacity="0.8"/>
    <path d="M23 6c-2.7 0-4 1.3-4 3 0 2.8 3.5 5.5 3.5 5.5S26 11.8 26 9c0-1.7-1.3-3-3-3z" opacity="0.8"/>
    <path d="M16 18c-2.7 0-4 1.3-4 3 0 2.8 3.5 5.5 3.5 5.5S19.5 23.8 19.5 21c0-1.7-1.2-3-3.5-3z"/>
  </svg>
);
const PatternCheckerboardIcon = () => (
  <svg viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect x="4" y="4" width="8" height="8"/><rect x="20" y="4" width="8" height="8"/>
    <rect x="12" y="12" width="8" height="8"/>
    <rect x="4" y="20" width="8" height="8"/><rect x="20" y="20" width="8" height="8"/>
  </svg>
);
const PatternDiagonalIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <line x1="2" y1="26" x2="26" y2="2" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    <line x1="9" y1="30" x2="30" y2="9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    <line x1="-4" y1="22" x2="22" y2="-4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
);
const PatternStarsIcon = () => (
  <svg viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path d="M16 4l2.2 6.8H25l-5.6 4.1 2.1 6.8L16 17.6l-5.5 4.1 2.1-6.8L7 10.8h6.8L16 4z"/>
  </svg>
);
const PatternCirclesIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <circle cx="10" cy="10" r="5.5" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="22" cy="10" r="5.5" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="10" cy="22" r="5.5" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="22" cy="22" r="5.5" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);
const PatternZigzagIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <polyline points="4,11 10,5 16,11 22,5 28,11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <polyline points="4,20 10,14 16,20 22,14 28,20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <polyline points="4,29 10,23 16,29 22,23 28,29" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const PatternTrianglesIcon = () => (
  <svg viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <polygon points="8,22 14,10 20,22" opacity="0.9"/>
    <polygon points="18,22 24,10 30,22" opacity="0.6"/>
    <polygon points="2,22 8,10 14,22" opacity="0.5"/>
  </svg>
);
const PatternWavesIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path d="M4 9 Q8 5 12 9 Q16 13 20 9 Q24 5 28 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M4 17 Q8 13 12 17 Q16 21 20 17 Q24 13 28 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M4 25 Q8 21 12 25 Q16 29 20 25 Q24 21 28 25" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);
const PatternConfettiIcon = () => (
  <svg viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect x="5" y="7" width="5" height="5" rx="1" transform="rotate(20 5 7)" opacity="0.9"/>
    <rect x="17" y="4" width="4" height="4" rx="1" transform="rotate(-15 17 4)" opacity="0.7"/>
    <circle cx="10" cy="21" r="2.5" opacity="0.8"/>
    <circle cx="24" cy="17" r="2" opacity="0.6"/>
    <rect x="21" y="23" width="5" height="5" rx="1" transform="rotate(30 21 23)" opacity="0.9"/>
    <rect x="7" y="26" width="4" height="4" rx="1" transform="rotate(-20 7 26)" opacity="0.7"/>
    <circle cx="27" cy="7" r="1.5" opacity="0.5"/>
  </svg>
);
const PatternBubblesIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <circle cx="10" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" opacity="0.8"/>
    <circle cx="22" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" opacity="0.6"/>
    <circle cx="8" cy="22" r="3.5" stroke="currentColor" strokeWidth="1.5" opacity="0.9"/>
    <circle cx="24" cy="24" r="4.5" stroke="currentColor" strokeWidth="1.5" opacity="0.7"/>
    <circle cx="16" cy="18" r="2.5" stroke="currentColor" strokeWidth="1.5" opacity="0.5"/>
  </svg>
);
const PatternHexagonIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path d="M10 5L14 3L18 5L18 9L14 11L10 9Z" stroke="currentColor" strokeWidth="1.5" fill="currentColor" opacity="0.3"/>
    <path d="M18 9L22 7L26 9L26 13L22 15L18 13Z" stroke="currentColor" strokeWidth="1.5" fill="currentColor" opacity="0.3"/>
    <path d="M4 13L8 11L12 13L12 17L8 19L4 17Z" stroke="currentColor" strokeWidth="1.5" fill="currentColor" opacity="0.3"/>
    <path d="M12 17L16 15L20 17L20 21L16 23L12 21Z" stroke="currentColor" strokeWidth="1.5" fill="currentColor" opacity="0.3"/>
    <path d="M20 21L24 19L28 21L28 25L24 27L20 25Z" stroke="currentColor" strokeWidth="1.5" fill="currentColor" opacity="0.3"/>
  </svg>
);
const PatternCrossIcon = () => (
  <svg viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path d="M9 7h2v6h-2zm-2 2h2v2H7z" opacity="0.7"/>
    <path d="M21 7h2v6h-2zm-2 2h2v2h-2z" opacity="0.8"/>
    <path d="M15 15h2v6h-2zm-2 2h2v2h-2z" opacity="0.9"/>
    <path d="M9 21h2v6h-2zm-2 2h2v2H7z" opacity="0.6"/>
    <path d="M21 21h2v6h-2zm-2 2h2v2h-2z" opacity="0.7"/>
  </svg>
);
const PatternDiamondsIcon = () => (
  <svg viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path d="M10 4l4 4-4 4-4-4z" opacity="0.7"/>
    <path d="M22 4l4 4-4 4-4-4z" opacity="0.6"/>
    <path d="M16 10l4 4-4 4-4-4z" opacity="0.8"/>
    <path d="M10 16l4 4-4 4-4-4z" opacity="0.5"/>
    <path d="M22 16l4 4-4 4-4-4z" opacity="0.7"/>
    <path d="M16 22l4 4-4 4-4-4z" opacity="0.6"/>
  </svg>
);
const PatternPolkadotIcon = () => (
  <svg viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <circle cx="8" cy="8" r="3" opacity="0.8"/>
    <circle cx="20" cy="8" r="3" opacity="0.7"/>
    <circle cx="14" cy="16" r="3.5" opacity="0.9"/>
    <circle cx="8" cy="24" r="3" opacity="0.6"/>
    <circle cx="24" cy="20" r="2.5" opacity="0.5"/>
    <circle cx="24" cy="8" r="2" opacity="0.4"/>
  </svg>
);

// ── Brush SVG icons ────────────────────────────────────────────
const BrushMarkerIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path d="M5 20 Q10 14 16 17 Q22 20 27 13" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const BrushCalligraphyIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path d="M5 26 Q13 17 22 11 Q25 8 27 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    <path d="M7 28 Q15 19 24 13 Q27 10 27 9" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/>
  </svg>
);
const BrushNeonIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path d="M5 18 Q13 10 27 14" stroke="currentColor" strokeWidth="8" strokeLinecap="round" opacity="0.12"/>
    <path d="M5 18 Q13 10 27 14" stroke="currentColor" strokeWidth="4" strokeLinecap="round" opacity="0.4"/>
    <path d="M5 18 Q13 10 27 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);
const BrushCrayonIcon = () => (
  <svg viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path d="M5 23 L8 11 L13 13 L10 25 Z" opacity="0.55"/>
    <path d="M11 21 L14 9 L19 11 L16 23 Z" opacity="0.85"/>
    <path d="M17 23 L20 11 L25 13 L22 25 Z" opacity="0.45"/>
  </svg>
);
const BrushWatercolorIcon = () => (
  <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <ellipse cx="16" cy="17" rx="13" ry="9" fill="currentColor" opacity="0.1"/>
    <ellipse cx="14" cy="16" rx="10" ry="7" fill="currentColor" opacity="0.15"/>
    <ellipse cx="17" cy="16" rx="8" ry="5" fill="currentColor" opacity="0.25"/>
    <ellipse cx="16" cy="15" rx="5" ry="3" fill="currentColor" opacity="0.4"/>
  </svg>
);
const BrushPixelIcon = () => (
  <svg viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect x="4" y="16" width="4" height="4"/>
    <rect x="8" y="12" width="4" height="4"/>
    <rect x="12" y="10" width="4" height="4"/>
    <rect x="16" y="12" width="4" height="4"/>
    <rect x="20" y="14" width="4" height="4"/>
    <rect x="24" y="10" width="4" height="4"/>
  </svg>
);
const BrushGlitterIcon = () => (
  <svg viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <circle cx="16" cy="16" r="2.5"/>
    <circle cx="8" cy="9" r="1.8"/><circle cx="24" cy="9" r="1.8"/>
    <circle cx="8" cy="23" r="1.8"/><circle cx="24" cy="23" r="1.8"/>
    <circle cx="16" cy="6" r="1.2"/><circle cx="16" cy="26" r="1.2"/>
    <circle cx="5" cy="16" r="1.2"/><circle cx="27" cy="16" r="1.2"/>
  </svg>
);
const BrushOutlineIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path d="M5 21 Q14 6 27 21" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/>
    <path d="M5 21 Q14 6 27 21" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
);
const BrushSprayIcon = () => (
  <svg viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <circle cx="10" cy="12" r="1.5" opacity="0.7"/>
    <circle cx="14" cy="10" r="1.8" opacity="0.8"/>
    <circle cx="18" cy="11" r="1.6" opacity="0.75"/>
    <circle cx="22" cy="9" r="1.4" opacity="0.65"/>
    <circle cx="12" cy="16" r="2" opacity="0.9"/>
    <circle cx="16" cy="15" r="2.2" opacity="1"/>
    <circle cx="20" cy="14" r="1.9" opacity="0.85"/>
    <circle cx="24" cy="13" r="1.5" opacity="0.7"/>
    <circle cx="14" cy="20" r="1.6" opacity="0.75"/>
    <circle cx="18" cy="19" r="1.8" opacity="0.8"/>
    <circle cx="22" cy="18" r="1.5" opacity="0.7"/>
  </svg>
);
const BrushInkIcon = () => (
  <svg viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path d="M8 14 Q12 10 16 12 Q20 14 24 10" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
    <ellipse cx="10" cy="16" rx="2" ry="4" opacity="0.3"/>
    <ellipse cx="16" cy="15" rx="2.5" ry="5" opacity="0.35"/>
    <ellipse cx="22" cy="13" rx="2" ry="4" opacity="0.3"/>
  </svg>
);
const BrushChalkIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path d="M5 18 Q13 12 21 15 Q25 16 28 13" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" opacity="0.6"/>
    <path d="M5 18 Q13 12 21 15 Q25 16 28 13" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.85" strokeDasharray="1 2"/>
  </svg>
);
const BrushRainbowIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path d="M5 20 Q16 8 27 20" stroke="#ff0000" strokeWidth="2.5" strokeLinecap="round" opacity="0.8"/>
    <path d="M5 22 Q16 10 27 22" stroke="#ff8800" strokeWidth="2.5" strokeLinecap="round" opacity="0.8"/>
    <path d="M5 24 Q16 12 27 24" stroke="#ffff00" strokeWidth="2.5" strokeLinecap="round" opacity="0.8"/>
    <path d="M5 26 Q16 14 27 26" stroke="#00ff00" strokeWidth="2.5" strokeLinecap="round" opacity="0.8"/>
  </svg>
);
const BrushSketchIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path d="M6 16 L10 14 L14 17 L18 13 L22 16 L26 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    <path d="M6 18 L10 16 L14 19 L18 15 L22 18 L26 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    <path d="M6 20 L10 18 L14 21 L18 17 L22 20 L26 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);
const BrushSmokeIcon = () => (
  <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path d="M6 20 Q10 15 16 18 Q22 21 28 15" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" opacity="0.08"/>
    <path d="M6 20 Q10 15 16 18 Q22 21 28 15" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" opacity="0.12"/>
    <path d="M6 20 Q10 15 16 18 Q22 21 28 15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.18"/>
    <path d="M6 20 Q10 15 16 18 Q22 21 28 15" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.25"/>
  </svg>
);

const PATTERNS = [
  { name: 'None', value: 'none', Icon: PatternNoneIcon },
  { name: 'Dots', value: 'dots', Icon: PatternDotsIcon },
  { name: 'Stripes', value: 'stripes', Icon: PatternStripesIcon },
  { name: 'Grid', value: 'grid', Icon: PatternGridIcon },
  { name: 'Hearts', value: 'hearts', Icon: PatternHeartsIcon },
  { name: 'Checkerboard', value: 'checkerboard', Icon: PatternCheckerboardIcon },
  { name: 'Diagonal', value: 'diagonal', Icon: PatternDiagonalIcon },
  { name: 'Stars', value: 'stars', Icon: PatternStarsIcon },
  { name: 'Circles', value: 'circles', Icon: PatternCirclesIcon },
  { name: 'Zigzag', value: 'zigzag', Icon: PatternZigzagIcon },
  { name: 'Triangles', value: 'triangles', Icon: PatternTrianglesIcon },
  { name: 'Waves', value: 'waves', Icon: PatternWavesIcon },
  { name: 'Confetti', value: 'confetti', Icon: PatternConfettiIcon },
  { name: 'Bubbles', value: 'bubbles', Icon: PatternBubblesIcon },
  { name: 'Hexagon', value: 'hexagon', Icon: PatternHexagonIcon },
  { name: 'Cross', value: 'cross', Icon: PatternCrossIcon },
  { name: 'Diamonds', value: 'diamonds', Icon: PatternDiamondsIcon },
  { name: 'Polkadot', value: 'polkadot', Icon: PatternPolkadotIcon },
];

// Sticker IDs
const STICKER_IDS = ['glow', 'flower', 'fun', 'heart', 'multi-heart', 'star', 'dream-big', 'flower-smiley', 'butterfly', 'layered-heart', 'be-you', 'stars-deco', 'flame-heart', 'cutie', 'pixel-heart', 'alien', 'collar', 'footprint', 'tooth', 'rings', 'flame', 'star-ring', 'plus-cross', 'lightning', 'globe', 'dance-party', 'the-2000s-back', 'flower-blob', 'baby-badge', 'starburst', 'pudding', 'jar-dessert-1', 'jar-dessert-2', 'hat', 'donut-1', 'donut-2', 'milk-box-1', 'milk-box-2', 'ice-cream'];

// Sticker configurations with SVG components
const STICKER_CONFIGS = [
  { id: 'glow', label: 'Glow', Component: GlowSticker },
  { id: 'flower', label: 'Flower', Component: FlowerSticker },
  { id: 'fun', label: 'Fun', Component: FunSticker },
  { id: 'heart', label: 'Heart', Component: HeartSticker },
  { id: 'multi-heart', label: 'Multi Heart', Component: MultiHeartSticker },
  { id: 'star', label: 'Star', Component: StarSticker },
  { id: 'dream-big', label: 'Dream Big', Component: DreamBigSticker },
  { id: 'flower-smiley', label: 'Flower Smiley', Component: FlowerSmileySticker },
  { id: 'butterfly', label: 'Butterfly', Component: ButterflySticker },
  { id: 'layered-heart', label: 'Layered Heart', Component: LayeredHeartSticker },
  { id: 'be-you', label: 'Be You', Component: BeYouSticker },
  { id: 'stars-deco', label: 'Stars', Component: StarsDecoSticker },
  { id: 'flame-heart', label: 'Flame Heart', Component: FlameHeartSticker },
  { id: 'cutie', label: 'Cutie', Component: CutieSticker },
  { id: 'pixel-heart', label: 'Pixel Heart', Component: PixelHeartSticker },
  { id: 'alien', label: 'Alien', Component: AlienSticker },
  { id: 'collar', label: 'Collar', Component: CollarSticker },
  { id: 'footprint', label: 'Footprint', Component: FootprintSticker },
  { id: 'tooth', label: 'Tooth', Component: ToothSticker },
  { id: 'rings', label: 'Rings', Component: RingsSticker },
  { id: 'flame', label: 'Flame', Component: FlameSticker },
  { id: 'star-ring', label: 'Star Ring', Component: StarRingSticker },
  { id: 'plus-cross', label: 'Plus', Component: PlusCrossSticker },
  { id: 'lightning', label: 'Lightning', Component: LightningSticker },
  { id: 'globe', label: 'Globe', Component: GlobeSticker },
  { id: 'dance-party', label: '2000 Dance', Component: DancePartySticker },
  { id: 'the-2000s-back', label: '2000s Back', Component: The2000sBackSticker },
  { id: 'flower-blob', label: 'Flower Blob', Component: FlowerBlobSticker },
  { id: 'baby-badge', label: '00s Baby', Component: BabyBadgeSticker },
  { id: 'starburst', label: 'Starburst', Component: StarburstSticker },
  { id: 'pudding', label: 'Pudding', Component: PuddingSticker },
  { id: 'jar-dessert-1', label: 'Jar Cake', Component: JarDessert1Sticker },
  { id: 'jar-dessert-2', label: 'Jar Jelly', Component: JarDessert2Sticker },
  { id: 'hat', label: 'Hat', Component: HatSticker },
  { id: 'donut-1', label: 'Donut', Component: Donut1Sticker },
  { id: 'donut-2', label: 'Donut Mint', Component: Donut2Sticker },
  { id: 'milk-box-1', label: 'Milk', Component: MilkBox1Sticker },
  { id: 'milk-box-2', label: 'Milk Heart', Component: MilkBox2Sticker },
  { id: 'ice-cream', label: 'Ice Cream', Component: IceCreamSticker },
];

// Brush types
const BRUSH_TYPES = [
  { id: 'marker', name: 'Marker', description: 'Bold strokes', Icon: BrushMarkerIcon },
  { id: 'calligraphy', name: 'Calligraphy', description: 'Dynamic width', Icon: BrushCalligraphyIcon },
  { id: 'neon', name: 'Neon Glow', description: 'Glowing effect', Icon: BrushNeonIcon },
  { id: 'crayon', name: 'Crayon', description: 'Textured strokes', Icon: BrushCrayonIcon },
  { id: 'watercolor', name: 'Watercolor', description: 'Soft & fluid', Icon: BrushWatercolorIcon },
  { id: 'pixel', name: 'Pixel', description: '8-bit style', Icon: BrushPixelIcon },
  { id: 'glitter', name: 'Glitter', description: 'Sparkly shimmer', Icon: BrushGlitterIcon },
  { id: 'outline', name: 'Outline', description: 'Hollow strokes', Icon: BrushOutlineIcon },
  { id: 'spray', name: 'Spray Paint', description: 'Aerosol effect', Icon: BrushSprayIcon },
  { id: 'ink', name: 'Ink Brush', description: 'Ink bleeding', Icon: BrushInkIcon },
  { id: 'chalk', name: 'Chalk', description: 'Dusty texture', Icon: BrushChalkIcon },
  { id: 'rainbow', name: 'Rainbow', description: 'Colorful trail', Icon: BrushRainbowIcon },
  { id: 'sketch', name: 'Sketch', description: 'Rough lines', Icon: BrushSketchIcon },
  { id: 'smoke', name: 'Smoke', description: 'Misty fade', Icon: BrushSmokeIcon },
];

// Shape stamps - these will be drawn with the current brush type!
const SHAPE_STAMPS = [
  { id: 'heart', name: 'Heart' },
  { id: 'star', name: 'Star' },
  { id: 'circle', name: 'Circle' },
  { id: 'square', name: 'Square' },
  { id: 'triangle', name: 'Triangle' },
  { id: 'diamond', name: 'Diamond' },
  { id: 'spiral', name: 'Spiral' },
  { id: 'infinity', name: 'Infinity' },
  { id: 'flower', name: 'Flower' },
];

// Cool Templates with presets
const HOLIDAY_THEMES = [
  {
    id: 'classic',
    name: 'Classic Film',
    emoji: '🎞️',
    backgroundColor: '#000000',
    pattern: 'none',
    stickers: ['star', 'fun', 'butterfly', 'flower'],
    borderWidth: 12,
    panelSpacing: 10,
    useFrame: true,
    frameImage: imgClassic,
    framePadding: { top: 90, left: 90, right: 90, bottom: 90 },
    frameGap: 75,
    photoBorder: 5,
    photoBorderColor: '#e5e5e5',
  },
  {
    id: 'lunar-new-year',
    name: 'Lunar New Year',
    emoji: '🧧',
    backgroundColor: '#f5e6d3',
    pattern: 'none',
    stickers: ['dream-big', 'star', 'flower', 'multi-heart'],
    borderWidth: 12,
    panelSpacing: 8,
    useFrame: true,
    frameImage: imgLunarNewYear,
    framePadding: { top: 95, left: 60, right: 60, bottom: 95 },
    frameGap: 15,
    photoBorder: 4,
    photoBorderColor: '#ffd700',
  },
  {
    id: 'halloween',
    name: 'Halloween',
    emoji: '🎃',
    backgroundColor: '#f5e6d3',
    pattern: 'none',
    stickers: ['dream-big', 'star', 'flower', 'multi-heart'],
    borderWidth: 12,
    panelSpacing: 8,
    useFrame: true,
    frameImage: imgHalloween,
    framePadding: { top: 110, left: 58, right: 58, bottom: 110 },
    frameGap: 14,
    photoBorder: 4,
    photoBorderColor: '#ffa500',
  },
  {
    id: 'valentines-day',
    name: 'Valentines Day',
    emoji: '❤️',
    backgroundColor: '#f5e6d3',
    pattern: 'none',
    stickers: ['dream-big', 'star', 'flower', 'multi-heart'],
    borderWidth: 12,
    panelSpacing: 8,
    useFrame: true,
    frameImage: imgValentinesDay,
    framePadding: { top: 85, left: 65, right: 65, bottom: 85 },
    frameGap: 16,
    photoBorder: 4,
    photoBorderColor: '#ffb6c1',
  },
  {
    id: 'graduation',
    name: 'Graduation',
    emoji: '🎓',
    backgroundColor: '#f5e6d3',
    pattern: 'none',
    stickers: ['dream-big', 'star', 'flower', 'multi-heart'],
    borderWidth: 12,
    panelSpacing: 8,
    useFrame: true,
    frameImage: imgGraduation,
    framePadding: { top: 110, left: 58, right: 58, bottom: 110 },
    frameGap: 14,
    photoBorder: 4,
    photoBorderColor: '#1e3a8a',
  },
  {
    id: 'y2k-1',
    name: 'Y2K Vibes',
    emoji: '💿',
    backgroundColor: '#ffd1dc',
    pattern: 'none',
    stickers: ['glow', 'flower', 'heart', 'multi-heart', 'star'],
    borderWidth: 10,
    panelSpacing: 8,
    useFrame: true,
    frameImage: imgY2K1,
    framePadding: { top: 55, left: 55, right: 55, bottom: 55 },
    frameGap: 14,
    photoBorder: 4,
    photoBorderColor: '#ffe4e9',
  },
  {
    id: 'y2k-2',
    name: 'Y2K Holo',
    emoji: '✨',
    backgroundColor: '#000000',
    pattern: 'none',
    stickers: ['star', 'glow', 'fun', 'butterfly'],
    borderWidth: 10,
    panelSpacing: 8,
    useFrame: true,
    frameImage: imgY2K2,
    framePadding: { top: 48, left: 48, right: 48, bottom: 48 },
    frameGap: 12,
    photoBorder: 3,
    photoBorderColor: '#b4a7d6',
  },
  {
    id: 'y2k-3',
    name: 'Y2K Chrome',
    emoji: '💎',
    backgroundColor: '#000000',
    pattern: 'none',
    stickers: ['star', 'glow', 'heart', 'fun'],
    borderWidth: 10,
    panelSpacing: 8,
    useFrame: true,
    frameImage: imgY2K3,
    framePadding: { top: 45, left: 45, right: 45, bottom: 45 },
    frameGap: 14,
    photoBorder: 3,
    photoBorderColor: '#c0c0c0',
  },
  {
    id: 'y2k-4',
    name: 'Y2K Retro',
    emoji: '🌈',
    backgroundColor: '#e8f5e3',
    pattern: 'none',
    stickers: ['flower', 'star', 'fun', 'butterfly'],
    borderWidth: 10,
    panelSpacing: 8,
    useFrame: true,
    frameImage: imgY2K4,
    framePadding: { top: 40, left: 40, right: 40, bottom: 40 },
    frameGap: 12,
    photoBorder: 3,
    photoBorderColor: '#a8d5ba',
  },
  {
    id: 'y2k-5',
    name: 'Y2K Dreamy',
    emoji: '💕',
    backgroundColor: '#fde8f0',
    pattern: 'none',
    stickers: ['heart', 'star', 'glow', 'flower'],
    borderWidth: 10,
    panelSpacing: 8,
    useFrame: true,
    frameImage: imgY2K5,
    framePadding: { top: 42, left: 42, right: 42, bottom: 42 },
    frameGap: 14,
    photoBorder: 3,
    photoBorderColor: '#ffc0e0',
  },
];

// Y2K Text Style Helpers
// For main page titles - gradient style
const getY2KTitleStyle = (): React.CSSProperties => {
  return {
    fontFamily: "'Orbitron', sans-serif",
    background: 'linear-gradient(135deg, #e879f9 0%, #a78bfa 50%, #60a5fa 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    filter: 'drop-shadow(0 0 8px rgba(168, 139, 250, 0.3))',
    fontWeight: 700,
  };
};

// For panel text - simple black
const getPanelTextStyle = (variant: 'title' | 'subtitle' | 'label' | 'caption' = 'label'): React.CSSProperties => {
  const baseStyle: React.CSSProperties = {
    fontFamily: "'Orbitron', sans-serif",
    color: '#1f2937', // gray-800
  };

  switch (variant) {
    case 'title':
      return { ...baseStyle, fontWeight: 700, fontSize: '1.125rem', lineHeight: '1.5' };
    case 'subtitle':
      return { ...baseStyle, fontWeight: 600, fontSize: '0.875rem', lineHeight: '1.5' };
    case 'label':
      return { ...baseStyle, fontWeight: 600, fontSize: '0.875rem', lineHeight: '1.5' };
    case 'caption':
      return { ...baseStyle, fontWeight: 500, fontSize: '0.75rem', lineHeight: '1.4' };
    default:
      return baseStyle;
  }
};

export default function CustomizationScreen({ imageUrl, imageUrls, onFinalize, onBack }: CustomizationScreenProps) {
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [pattern, setPattern] = useState('checkerboard');
  const [borderWidth, setBorderWidth] = useState(8);
  const [panelSpacing, setPanelSpacing] = useState(8);
  const [placedStickers, setPlacedStickers] = useState<Array<{ id: string; x: number; y: number; size: number }>>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawingPaths, setDrawingPaths] = useState<Array<{ points: { x: number; y: number }[]; color: string; width: number; brushType: string; isEraser?: boolean }>>([]);
  const [currentPath, setCurrentPath] = useState<{ x: number; y: number }[]>([]);
  const [drawColor, setDrawColor] = useState('#000000');
  const [drawWidth, setDrawWidth] = useState(3);
  const [eraserWidth, setEraserWidth] = useState(10);
  const [isEraserMode, setIsEraserMode] = useState(false);
  const [brushType, setBrushType] = useState('marker');
  const [selectedShape, setSelectedShape] = useState<string | null>(null);
  const [activeHoliday, setActiveHoliday] = useState<string | null>(null);
  const [holidayStickers, setHolidayStickers] = useState<string[]>(STICKER_IDS);
  const [useFrameBackground, setUseFrameBackground] = useState(false);
  const [currentFrameImage, setCurrentFrameImage] = useState<string | null>(null);
  const [framePadding, setFramePadding] = useState({ top: 50, left: 40, right: 40, bottom: 110 });
  const [frameGap, setFrameGap] = useState(18);
  const [photoBorder, setPhotoBorder] = useState(1);
  const [draggingSticker, setDraggingSticker] = useState<number | null>(null);
  const [selectedSticker, setSelectedSticker] = useState<number | null>(null);
  const [resizingSticker, setResizingSticker] = useState<number | null>(null);
  const [resizeStartSize, setResizeStartSize] = useState(0);
  const [resizeStartPos, setResizeStartPos] = useState({ x: 0, y: 0 });
  const [selectedFilter, setSelectedFilter] = useState('natural'); // Filter selection
  const [pngBlobUrls, setPngBlobUrls] = useState<Record<string, string>>({});
  const [isPanelCollapsed, setIsPanelCollapsed] = useState(false); // Panel collapse state - default expanded
  const [activeTab, setActiveTab] = useState('holiday'); // Track active tab - default to templates
  
  // Photo drag and position states
  const [photoOffset, setPhotoOffset] = useState({ x: 0, y: 0, scale: 1.0 });
  const [isDraggingPhoto, setIsDraggingPhoto] = useState(false);
  const [dragStartPos, setDragStartPos] = useState({ x: 0, y: 0 });
  const [aiQuote, setAiQuote] = useState<string>('');
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const photoBoothRef = useRef<HTMLDivElement>(null);

  // AI Quote library
  const QUOTE_LIBRARY = [
    "Live in the moment",
    "Be your own light",
    "Chase the dream",
    "Create your sunshine",
    "Love conquers all",
    "Time heals everything",
    "We are made of stardust",
    "Everything is temporary",
    "Stay wild and free",
    "Follow your heart always",
    "Trust the timing of your life",
    "You are enough just as you are",
    "Less is more",
    "Let it be",
    "Keep it simple",
    "Find your inner peace",
    "Stay golden",
    "Be the light in the darkness",
    "Make every moment count",
    "Breathe deeply and let go",
    "Forever young at heart",
    "Wild and free",
    "Lost but found",
    "Born to wander the world",
    "Seek the truth within yourself",
    "Be like water",
    "Stay soft in a harsh world",
    "Choose wonder over worry",
    "Embrace change with open arms",
    "Feel everything deeply and fully",
    "Create fearlessly",
    "Live authentically every single day",
    "Magic is real if you believe",
    "Trust yourself more than anything",
    "Nothing lasts forever so cherish now",
    "This too shall pass eventually",
    "Energy never lies trust your gut",
    "Healing takes time be patient",
    "Find beauty in the chaos",
    "There is power in silence",
    "Love yourself first and foremost",
    "Be kind always no exceptions",
    "You create your own reality",
    "The best is yet to come",
    "Today is a precious gift",
    "Make today absolutely amazing",
    "Seize the day",
    "Leave your mark on the world",
    "Think different",
    "Never settle for less than magic",
    "Rise above the noise",
    "Keep climbing the mountain",
    "Aim higher than the stars",
    "Break the rules create new ones",
    "Free your mind from all limits",
    "Take it one day at a time",
    "Keep going you are almost there",
    "You got this believe in yourself",
    "Never give up on your dreams",
    "Make it happen no excuses",
    "Own your story write your truth",
    "Find joy in the simple things",
    "Collect moments not material things",
    "Good vibes only always",
    "Stars shine brightest in the darkness",
    "Silence speaks louder than words",
    "Dance freely in the rain",
    "Your light shines from deep within",
    "Let love lead the way forward",
    "Peace begins with a smile",
    "Happiness is a choice you make",
    "Manifest your wildest dreams daily",
    "All good things take time",
    "Patience is the ultimate power",
    "New beginnings are waiting for you",
    "Life always finds a way",
    "Believe in yourself above all else",
    "Stay hungry stay foolish stay curious",
    "Question everything you think you know",
    "Seek magic in the everyday moments",
    "Stay curious about the world",
    "Be fully present right now",
    "Choose joy over fear",
    "Radiate love and light",
    "Stay true to yourself",
    "Dream bigger than you ever imagined",
    "Love is all you need",
    "Time will tell the truth",
    "Grow through what you go through",
    "Find your wild and set it free",
    "Stay humble stay hungry",
    "Keep it real always",
    "Live more and worry less",
    "All you truly need is love",
    "Life is incredibly beautiful",
    "The journey matters more than destination",
    "You are perfectly imperfect as you are",
    "Let karma do its beautiful thing",
    "Your vibe attracts your tribe",
    "Focus on progress not perfection",
    "Even small steps matter in life",
    "Rise and shine every single day",
    "You get stronger every day",
    "You get to write your own ending",
    "Embrace the beautiful mess of life",
    "Find beauty in every single thing",
    "Let your soul shine bright",
    "Every single moment matters deeply",
    "Be here now nowhere else",
    "Hope anchors the soul in storms",
    "Light always finds a way through",
    "Tomorrow needs you to show up",
    "Stars will always guide us home",
    "Dreams become reality with hard work",
    "Love never fails it only grows",
    "Choose faith over fear every time",
    "Courage conquers all your fears",
    "Kindness is the most powerful magic",
  ];

  // Function to play soft printer sound effect
  const playCelebrationSound = () => {
    // Sound effect disabled
  };

  // Generate random AI quote
  const generateRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * QUOTE_LIBRARY.length);
    setAiQuote(QUOTE_LIBRARY[randomIndex]);
  };



  // Function to draw a path with specific brush style
  const drawBrushPath = (
    ctx: CanvasRenderingContext2D,
    points: { x: number; y: number }[],
    color: string,
    width: number,
    brush: string,
    isEraser: boolean = false
  ) => {
    if (points.length < 2) return;

    // If eraser mode, use destination-out composite operation
    if (isEraser) {
      ctx.save();
      ctx.globalCompositeOperation = 'destination-out';
      ctx.strokeStyle = 'rgba(0,0,0,1)';
      ctx.lineWidth = width;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
      }
      ctx.stroke();
      ctx.restore();
      return;
    }

    switch (brush) {
      case 'marker':
        // Marker pen - semi-transparent with darker edges
        // Main stroke with transparency
        ctx.globalAlpha = 0.6;
        ctx.strokeStyle = color;
        ctx.lineWidth = width * 1.2;
        ctx.lineCap = 'square';
        ctx.lineJoin = 'miter';
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
          ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.stroke();
        
        // Darker edge streaks for marker effect
        ctx.globalAlpha = 0.8;
        ctx.lineWidth = Math.max(1, width * 0.2);
        ctx.beginPath();
        ctx.moveTo(points[0].x - width * 0.4, points[0].y);
        for (let i = 1; i < points.length; i++) {
          ctx.lineTo(points[i].x - width * 0.4, points[i].y);
        }
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(points[0].x + width * 0.4, points[0].y);
        for (let i = 1; i < points.length; i++) {
          ctx.lineTo(points[i].x + width * 0.4, points[i].y);
        }
        ctx.stroke();
        ctx.globalAlpha = 1;
        break;

      case 'calligraphy':
        // Calligraphy - dramatic thick and thin based on stroke direction
        ctx.fillStyle = color;
        for (let i = 1; i < points.length; i++) {
          const dx = points[i].x - points[i - 1].x;
          const dy = points[i].y - points[i - 1].y;
          const angle = Math.atan2(dy, dx);
          const speed = Math.sqrt(dx * dx + dy * dy);
          
          // Thickest when moving horizontally, thinnest when vertical
          const directionFactor = Math.abs(Math.cos(angle));
          const dynamicWidth = width * (0.3 + 1.7 * directionFactor);
          const dynamicHeight = width * (0.2 + 0.3 * (1 - directionFactor));
          
          ctx.beginPath();
          ctx.ellipse(
            points[i].x,
            points[i].y,
            dynamicWidth,
            dynamicHeight,
            angle,
            0,
            Math.PI * 2
          );
          ctx.fill();
        }
        break;

      case 'neon':
        // Glowing effect
        ctx.shadowColor = color;
        ctx.shadowBlur = 15;
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
          ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.stroke();
        ctx.shadowBlur = 0;
        break;

      case 'crayon':
        // Crayon - dense, waxy texture with random grain
        // Base layer - rough strokes
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.globalAlpha = 0.5;
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
          ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.stroke();
        
        // Add dense waxy grain texture
        ctx.globalAlpha = 0.6;
        for (let i = 0; i < points.length; i++) {
          for (let j = 0; j < 12; j++) {
            const offsetX = (Math.random() - 0.5) * width * 1.2;
            const offsetY = (Math.random() - 0.5) * width * 1.2;
            const grainSize = Math.random() * 2 + 1;
            ctx.fillStyle = color;
            ctx.fillRect(points[i].x + offsetX, points[i].y + offsetY, grainSize, grainSize);
          }
        }
        ctx.globalAlpha = 1;
        break;

      case 'watercolor':
        // Watercolor - wet, bleeding edges with color spread
        // Main wash - very transparent
        ctx.globalAlpha = 0.15;
        ctx.strokeStyle = color;
        ctx.lineWidth = width * 2.5;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.shadowColor = color;
        ctx.shadowBlur = width * 1.5;
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
          ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.stroke();
        
        // Add water bleeding effect with random blobs
        ctx.globalAlpha = 0.08;
        for (let i = 0; i < points.length; i += 3) {
          const numBlobs = 3 + Math.floor(Math.random() * 3);
          for (let j = 0; j < numBlobs; j++) {
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * width * 2;
            const blobX = points[i].x + Math.cos(angle) * distance;
            const blobY = points[i].y + Math.sin(angle) * distance;
            const blobSize = width * (0.5 + Math.random() * 1.5);
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(blobX, blobY, blobSize, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        
        // Darker center line
        ctx.globalAlpha = 0.25;
        ctx.lineWidth = width * 0.8;
        ctx.shadowBlur = 0;
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
          ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.stroke();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
        break;

      case 'pixel':
        // Blocky 8-bit style
        const pixelSize = Math.max(4, Math.floor(width / 2));
        ctx.fillStyle = color;
        for (let i = 0; i < points.length; i++) {
          const px = Math.floor(points[i].x / pixelSize) * pixelSize;
          const py = Math.floor(points[i].y / pixelSize) * pixelSize;
          ctx.fillRect(px, py, pixelSize, pixelSize);
        }
        break;

      case 'glitter':
        // Enhanced sparkly strokes with colorful glitter
        // Main stroke with slight transparency
        ctx.globalAlpha = 0.8;
        ctx.strokeStyle = color;
        ctx.lineWidth = width * 1.2;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.shadowColor = color;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
          ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.stroke();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
        
        // Add multi-colored sparkles with variety
        const sparkleColors = ['#ffffff', '#fffacd', '#ffd700', '#ffb6c1', '#87ceeb', '#98fb98'];
        for (let i = 0; i < points.length; i += 3) {
          const numSparkles = 4 + Math.floor(Math.random() * 3);
          for (let j = 0; j < numSparkles; j++) {
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * width * 2.5;
            const sparkleX = points[i].x + Math.cos(angle) * distance;
            const sparkleY = points[i].y + Math.sin(angle) * distance;
            const sparkleSize = Math.random() * 2.5 + 0.5;
            const sparkleColor = sparkleColors[Math.floor(Math.random() * sparkleColors.length)];
            
            // Draw star-shaped sparkle
            ctx.save();
            ctx.fillStyle = sparkleColor;
            ctx.shadowColor = sparkleColor;
            ctx.shadowBlur = 8;
            ctx.globalAlpha = 0.7 + Math.random() * 0.3;
            
            if (Math.random() > 0.5) {
              // Star sparkle
              ctx.beginPath();
              for (let k = 0; k < 5; k++) {
                const starAngle = (k * Math.PI * 2) / 5 - Math.PI / 2;
                const starX = sparkleX + Math.cos(starAngle) * sparkleSize * 2;
                const starY = sparkleY + Math.sin(starAngle) * sparkleSize * 2;
                if (k === 0) {
                  ctx.moveTo(starX, starY);
                } else {
                  ctx.lineTo(starX, starY);
                }
                const innerAngle = starAngle + Math.PI / 5;
                const innerX = sparkleX + Math.cos(innerAngle) * sparkleSize * 0.8;
                const innerY = sparkleY + Math.sin(innerAngle) * sparkleSize * 0.8;
                ctx.lineTo(innerX, innerY);
              }
              ctx.closePath();
              ctx.fill();
            } else {
              // Circle sparkle
              ctx.beginPath();
              ctx.arc(sparkleX, sparkleY, sparkleSize, 0, Math.PI * 2);
              ctx.fill();
              
              // Add cross highlight
              ctx.strokeStyle = sparkleColor;
              ctx.lineWidth = 0.5;
              ctx.beginPath();
              ctx.moveTo(sparkleX - sparkleSize * 1.5, sparkleY);
              ctx.lineTo(sparkleX + sparkleSize * 1.5, sparkleY);
              ctx.moveTo(sparkleX, sparkleY - sparkleSize * 1.5);
              ctx.lineTo(sparkleX, sparkleY + sparkleSize * 1.5);
              ctx.stroke();
            }
            ctx.restore();
          }
        }
        break;

      case 'outline':
        // Hollow strokes
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
          ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.stroke();
        
        // Inner white stroke for hollow effect
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = Math.max(1, width - 3);
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
          ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.stroke();
        break;

      case 'spray':
        // Spray paint effect - scattered dots
        ctx.fillStyle = color;
        for (let i = 0; i < points.length; i++) {
          const numDots = 15 + Math.floor(Math.random() * 10);
          for (let j = 0; j < numDots; j++) {
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * width * 2;
            const dotX = points[i].x + Math.cos(angle) * distance;
            const dotY = points[i].y + Math.sin(angle) * distance;
            const dotSize = Math.random() * 1.5 + 0.5;
            ctx.globalAlpha = 0.3 + Math.random() * 0.4;
            ctx.beginPath();
            ctx.arc(dotX, dotY, dotSize, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        ctx.globalAlpha = 1;
        break;

      case 'ink':
        // Ink brush effect - stroke with bleeding
        ctx.strokeStyle = color;
        ctx.lineWidth = width * 1.3;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
          ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.stroke();
        
        // Add ink bleeding effect
        ctx.globalAlpha = 0.2;
        for (let i = 0; i < points.length; i += 5) {
          const bleedSize = width * (1.5 + Math.random() * 1);
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.ellipse(points[i].x, points[i].y, bleedSize, bleedSize * 0.7, Math.random() * Math.PI, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
        break;

      case 'chalk':
        // Chalk effect - rough, dusty texture
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.globalAlpha = 0.6;
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
          ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.stroke();
        
        // Add dusty particles
        ctx.globalAlpha = 0.4;
        for (let i = 0; i < points.length; i += 2) {
          const numParticles = 8;
          for (let j = 0; j < numParticles; j++) {
            const offsetX = (Math.random() - 0.5) * width * 1.5;
            const offsetY = (Math.random() - 0.5) * width * 1.5;
            const particleSize = Math.random() * 1.5 + 0.5;
            ctx.fillStyle = color;
            ctx.fillRect(points[i].x + offsetX, points[i].y + offsetY, particleSize, particleSize);
          }
        }
        ctx.globalAlpha = 1;
        break;

      case 'rainbow':
        // Rainbow effect - multi-colored strokes
        const rainbowColors = ['#ff0000', '#ff8800', '#ffff00', '#00ff00', '#0088ff', '#8800ff'];
        const offset = 3;
        for (let colorIdx = 0; colorIdx < rainbowColors.length; colorIdx++) {
          ctx.strokeStyle = rainbowColors[colorIdx];
          ctx.lineWidth = width * 0.6;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.globalAlpha = 0.7;
          ctx.beginPath();
          const yOffset = (colorIdx - rainbowColors.length / 2) * offset;
          ctx.moveTo(points[0].x, points[0].y + yOffset);
          for (let i = 1; i < points.length; i++) {
            ctx.lineTo(points[i].x, points[i].y + yOffset);
          }
          ctx.stroke();
        }
        ctx.globalAlpha = 1;
        break;

      case 'sketch':
        // Sketch effect - multiple rough parallel lines
        ctx.strokeStyle = color;
        ctx.lineWidth = Math.max(1, width * 0.3);
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.globalAlpha = 0.4;
        
        for (let offset = -2; offset <= 2; offset++) {
          ctx.beginPath();
          ctx.moveTo(points[0].x + offset, points[0].y + offset);
          for (let i = 1; i < points.length; i++) {
            const jitterX = (Math.random() - 0.5) * 2;
            const jitterY = (Math.random() - 0.5) * 2;
            ctx.lineTo(points[i].x + offset + jitterX, points[i].y + offset + jitterY);
          }
          ctx.stroke();
        }
        ctx.globalAlpha = 1;
        break;

      case 'smoke':
        // Smoke effect - soft, misty layers
        const smokeWidths = [width * 3, width * 2.2, width * 1.5, width * 0.8];
        const smokeOpacities = [0.05, 0.08, 0.12, 0.18];
        
        for (let layer = 0; layer < smokeWidths.length; layer++) {
          ctx.strokeStyle = color;
          ctx.lineWidth = smokeWidths[layer];
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.globalAlpha = smokeOpacities[layer];
          ctx.shadowColor = color;
          ctx.shadowBlur = 15;
          ctx.beginPath();
          ctx.moveTo(points[0].x, points[0].y);
          for (let i = 1; i < points.length; i++) {
            const waveOffset = Math.sin(i * 0.3) * 3;
            ctx.lineTo(points[i].x + waveOffset, points[i].y);
          }
          ctx.stroke();
        }
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
        break;

      default:
        // Default basic stroke
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
          ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.stroke();
    }
  };

  // Preload PNG stickers as blob URLs
  useEffect(() => {
    const loadPNGs = async () => {
      const blobUrls: Record<string, string> = {};
      
      for (const [stickerId, pngSrc] of Object.entries(PNG_STICKER_MAP)) {
        try {
          const response = await fetch(pngSrc);
          const blob = await response.blob();
          blobUrls[stickerId] = URL.createObjectURL(blob);
          console.log('✅ Preloaded PNG:', stickerId);
        } catch (error) {
          console.error('❌ Failed to preload PNG:', stickerId, error);
        }
      }
      
      setPngBlobUrls(blobUrls);
    };
    
    loadPNGs();
    
    // Cleanup
    return () => {
      Object.values(pngBlobUrls).forEach(url => URL.revokeObjectURL(url));
    };
  }, []);

  // Draw on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw all paths
    drawingPaths.forEach(path => {
      drawBrushPath(ctx, path.points, path.color, path.width, path.brushType, path.isEraser);
    });

    // Draw current path
    if (currentPath.length > 1) {
      drawBrushPath(ctx, currentPath, isEraserMode ? backgroundColor : drawColor, isEraserMode ? eraserWidth : drawWidth, brushType, isEraserMode);
    }
  }, [drawingPaths, currentPath, drawColor, drawWidth, eraserWidth, isEraserMode, backgroundColor]);

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Deselect sticker when clicking on canvas
    setSelectedSticker(null);

    // Only allow drawing if the 'draw' tab is active
    if (activeTab !== 'draw') {
      return;
    }

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // If shape is selected, draw shape instead of starting path
    if (selectedShape) {
      drawShapeAtPosition(x, y);
      return;
    }

    setIsDrawing(true);
    setCurrentPath([{ x, y }]);
    setSelectedShape(null); // Deselect shape when starting to draw
  };

  // Render shape preview as SVG path
  const renderShapePreview = (shapeId: string) => {
    const size = 40; // Preview size
    const center = size / 2;
    const points = generateShapePoints(center, center, shapeId, size * 0.8);
    
    if (points.length === 0) return null;
    
    // Convert points to SVG path
    const pathData = points.map((p, i) => {
      return i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`;
    }).join(' ') + ' Z';
    
    return (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <path
          d={pathData}
          fill="none"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };

  // Helper function: Generate path points for a shape outline (to be drawn with current brush)
  const generateShapePoints = (centerX: number, centerY: number, shapeId: string, size: number): { x: number; y: number }[] => {
    const points: { x: number; y: number }[] = [];
    const numPoints = 100; // High resolution for smooth curves

    switch (shapeId) {
      case 'heart': {
        // Heart shape parametric equations
        for (let i = 0; i <= numPoints; i++) {
          const t = (i / numPoints) * Math.PI * 2;
          const hx = size * 0.5 * (16 * Math.pow(Math.sin(t), 3));
          const hy = -size * 0.5 * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
          points.push({
            x: centerX + hx / 16,
            y: centerY + hy / 16
          });
        }
        break;
      }

      case 'star': {
        // 5-pointed star
        const spikes = 5;
        const outerRadius = size * 0.5;
        const innerRadius = size * 0.2;
        for (let i = 0; i <= spikes * 2; i++) {
          const radius = i % 2 === 0 ? outerRadius : innerRadius;
          const angle = (i * Math.PI) / spikes - Math.PI / 2;
          points.push({
            x: centerX + radius * Math.cos(angle),
            y: centerY + radius * Math.sin(angle)
          });
        }
        break;
      }

      case 'circle': {
        // Perfect circle
        for (let i = 0; i <= numPoints; i++) {
          const angle = (i / numPoints) * Math.PI * 2;
          points.push({
            x: centerX + size * 0.5 * Math.cos(angle),
            y: centerY + size * 0.5 * Math.sin(angle)
          });
        }
        break;
      }

      case 'square': {
        // Square with rounded corners for smooth drawing
        const cornerRadius = size * 0.05;
        const halfSize = size * 0.5;
        const steps = Math.floor(numPoints / 4);
        
        // Top edge
        for (let i = 0; i <= steps; i++) {
          const t = i / steps;
          points.push({
            x: centerX - halfSize + t * size,
            y: centerY - halfSize
          });
        }
        // Right edge
        for (let i = 0; i <= steps; i++) {
          const t = i / steps;
          points.push({
            x: centerX + halfSize,
            y: centerY - halfSize + t * size
          });
        }
        // Bottom edge
        for (let i = 0; i <= steps; i++) {
          const t = i / steps;
          points.push({
            x: centerX + halfSize - t * size,
            y: centerY + halfSize
          });
        }
        // Left edge
        for (let i = 0; i <= steps; i++) {
          const t = i / steps;
          points.push({
            x: centerX - halfSize,
            y: centerY + halfSize - t * size
          });
        }
        break;
      }

      case 'triangle': {
        // Equilateral triangle
        const height = size * 0.866; // sqrt(3)/2
        const halfBase = size * 0.5;
        const steps = Math.floor(numPoints / 3);
        
        // Top to bottom-right
        for (let i = 0; i <= steps; i++) {
          const t = i / steps;
          points.push({
            x: centerX + t * halfBase,
            y: centerY - height * 0.5 + t * height
          });
        }
        // Bottom-right to bottom-left
        for (let i = 0; i <= steps; i++) {
          const t = i / steps;
          points.push({
            x: centerX + halfBase - t * size,
            y: centerY + height * 0.5
          });
        }
        // Bottom-left to top
        for (let i = 0; i <= steps; i++) {
          const t = i / steps;
          points.push({
            x: centerX - halfBase + t * halfBase,
            y: centerY + height * 0.5 - t * height
          });
        }
        break;
      }

      case 'diamond': {
        // Diamond (rotated square)
        const halfSize = size * 0.5;
        const steps = Math.floor(numPoints / 4);
        
        // Top to right
        for (let i = 0; i <= steps; i++) {
          const t = i / steps;
          points.push({
            x: centerX + t * halfSize,
            y: centerY - halfSize + t * halfSize
          });
        }
        // Right to bottom
        for (let i = 0; i <= steps; i++) {
          const t = i / steps;
          points.push({
            x: centerX + halfSize - t * halfSize,
            y: centerY + t * halfSize
          });
        }
        // Bottom to left
        for (let i = 0; i <= steps; i++) {
          const t = i / steps;
          points.push({
            x: centerX - t * halfSize,
            y: centerY + halfSize - t * halfSize
          });
        }
        // Left to top
        for (let i = 0; i <= steps; i++) {
          const t = i / steps;
          points.push({
            x: centerX - halfSize + t * halfSize,
            y: centerY - t * halfSize
          });
        }
        break;
      }



      case 'spiral': {
        // Spiral from center outward
        const turns = 3;
        for (let i = 0; i <= numPoints; i++) {
          const t = i / numPoints;
          const angle = t * turns * Math.PI * 2;
          const radius = (size * 0.5) * t;
          points.push({
            x: centerX + radius * Math.cos(angle),
            y: centerY + radius * Math.sin(angle)
          });
        }
        break;
      }

      case 'infinity': {
        // Infinity symbol (lemniscate)
        for (let i = 0; i <= numPoints; i++) {
          const t = (i / numPoints) * Math.PI * 2;
          const scale = size * 0.35;
          const denominator = 1 + Math.pow(Math.sin(t), 2);
          points.push({
            x: centerX + (scale * Math.cos(t)) / denominator,
            y: centerY + (scale * Math.sin(t) * Math.cos(t)) / denominator
          });
        }
        break;
      }



      case 'flower': {
        // Flower with petals
        const petals = 6;
        for (let i = 0; i <= numPoints; i++) {
          const t = (i / numPoints) * Math.PI * 2;
          const petalShape = 1 + 0.5 * Math.sin(petals * t);
          const radius = size * 0.4 * petalShape;
          points.push({
            x: centerX + radius * Math.cos(t),
            y: centerY + radius * Math.sin(t)
          });
        }
        break;
      }
    }

    return points;
  };

  // Draw shape at click position using current brush type
  const drawShapeAtPosition = (x: number, y: number) => {
    if (!selectedShape) return;

    const size = drawWidth * 20; // Shape size based on brush width
    const shapePoints = generateShapePoints(x, y, selectedShape, size);

    if (shapePoints.length === 0) return;

    // Add the shape as a drawing path - it will be drawn with current brushType!
    setDrawingPaths(prev => [...prev, {
      points: shapePoints,
      color: drawColor,
      width: drawWidth,
      brushType: brushType, // Use current brush type (chalk, neon, etc.)
      isEraser: false
    }]);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setCurrentPath(prev => [...prev, { x, y }]);
  };

  const handleMouseUp = () => {
    if (isDrawing && currentPath.length > 1) {
      setDrawingPaths(prev => [...prev, { 
        points: currentPath, 
        color: isEraserMode ? backgroundColor : drawColor, 
        width: isEraserMode ? eraserWidth : drawWidth,
        brushType: brushType,
        isEraser: isEraserMode
      }]);
      setCurrentPath([]);
    }
    setIsDrawing(false);
  };

  const handleUndo = () => {
    setDrawingPaths(prev => prev.slice(0, -1));
  };

  const handleClearDrawing = () => {
    setDrawingPaths([]);
    setCurrentPath([]);
  };

  const handleStickerClick = (stickerId: string) => {
    // Add sticker to center
    setPlacedStickers(prev => [...prev, { 
      id: stickerId, 
      x: 50, 
      y: 50, 
      size: 100 
    }]);
  };

  // Sticker drag handlers
  const handleStickerMouseDown = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    setDraggingSticker(index);
    setSelectedSticker(index);
  };

  // Delete sticker
  const handleDeleteSticker = (index: number) => {
    setPlacedStickers(prev => prev.filter((_, i) => i !== index));
    setSelectedSticker(null);
  };

  // Resize handle mouse down
  const handleResizeMouseDown = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    setResizingSticker(index);
    setResizeStartSize(placedStickers[index].size);
    setResizeStartPos({ x: e.clientX, y: e.clientY });
  };

  const handleContainerMouseMove = (e: React.MouseEvent) => {
    // Handle sticker dragging
    if (draggingSticker !== null) {
      const rect = photoBoothRef.current?.getBoundingClientRect();
      if (!rect) return;

      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      setPlacedStickers(prev =>
        prev.map((s, i) => i === draggingSticker ? { ...s, x, y } : s)
      );
    }

    // Handle sticker resizing
    if (resizingSticker !== null) {
      const deltaX = e.clientX - resizeStartPos.x;
      const deltaY = e.clientY - resizeStartPos.y;
      const delta = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const direction = deltaX + deltaY > 0 ? 1 : -1;
      const newSize = Math.max(40, Math.min(300, resizeStartSize + delta * direction * 0.5));

      setPlacedStickers(prev =>
        prev.map((s, i) => i === resizingSticker ? { ...s, size: newSize } : s)
      );
    }
  };

  const handleContainerMouseUp = () => {
    setDraggingSticker(null);
    setResizingSticker(null);
  };

  // Photo drag handlers
  const handlePhotoMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingPhoto(true);
    setDragStartPos({ x: e.clientX, y: e.clientY });
  };

  const handlePhotoMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingPhoto) return;
    
    const deltaX = e.clientX - dragStartPos.x;
    const deltaY = e.clientY - dragStartPos.y;
    
    setPhotoOffset(prev => ({
      ...prev,
      x: prev.x + deltaX,
      y: prev.y + deltaY
    }));
    
    setDragStartPos({ x: e.clientX, y: e.clientY });
  };

  const handlePhotoMouseUp = () => {
    setIsDraggingPhoto(false);
  };

  const generateFinalImage = async () => {
    // Use canvas-based rendering (html2canvas has issues with oklch colors and figma:asset paths)
    await fallbackGenerateFinalImage();
  };

  const fallbackGenerateFinalImage = async () => {
    const element = photoBoothRef.current;
    if (!element) return;

    // Create a new canvas for the final image
    const finalCanvas = document.createElement('canvas');
    const ctx = finalCanvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to match the photo booth - increased height for more space
    const width = 400;
    const height = 1000; // Increased from 600 to 1000 for more vertical space
    finalCanvas.width = width;
    finalCanvas.height = height;

    if (useFrameBackground) {
      // Load and draw the frame background
      const frameImg = new Image();
      frameImg.src = currentFrameImage!;
      await new Promise((resolve) => {
        frameImg.onload = resolve;
      });
      ctx.drawImage(frameImg, 0, 0, width, height);

      // Get active theme to access photoBorder
      const activeTheme = HOLIDAY_THEMES.find(t => t.id === activeHoliday);
      const photoBorder = activeTheme?.photoBorder || 0;

      // Calculate panel dimensions using dynamic frame padding
      const panelHeight = (height - framePadding.top - framePadding.bottom - frameGap * 3) / 4;
      const panelWidth = width - framePadding.left - framePadding.right;
      const outerRadius = 4; // Outer rounded corner radius for white border container
      const innerRadius = 2; // Inner rounded corner radius for photo

      // Load and draw user images in each panel
      // If we have 4 different images, use them; otherwise repeat the single image
      const imagesToLoad = imageUrls && imageUrls.length === 4 ? imageUrls : [imageUrl, imageUrl, imageUrl, imageUrl];
      
      const loadedImages = await Promise.all(
        imagesToLoad.map((src) => {
          return new Promise<HTMLImageElement>((resolve) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.src = src;
          });
        })
      );

      for (let i = 0; i < 4; i++) {
        const y = framePadding.top + i * (panelHeight + frameGap);
        const x = framePadding.left;
        const img = loadedImages[i];

        // Draw border background with theme color
        if (photoBorder > 0) {
          ctx.save();
          ctx.fillStyle = activeTheme?.photoBorderColor || '#f8f8f8';
          ctx.shadowColor = 'rgba(0,0,0,0.08)';
          ctx.shadowBlur = 6;
          ctx.shadowOffsetY = 2;
          
          // Rounded rectangle for border
          ctx.beginPath();
          ctx.moveTo(x + outerRadius, y);
          ctx.lineTo(x + panelWidth - outerRadius, y);
          ctx.quadraticCurveTo(x + panelWidth, y, x + panelWidth, y + outerRadius);
          ctx.lineTo(x + panelWidth, y + panelHeight - outerRadius);
          ctx.quadraticCurveTo(x + panelWidth, y + panelHeight, x + panelWidth - outerRadius, y + panelHeight);
          ctx.lineTo(x + outerRadius, y + panelHeight);
          ctx.quadraticCurveTo(x, y + panelHeight, x, y + panelHeight - outerRadius);
          ctx.lineTo(x, y + outerRadius);
          ctx.quadraticCurveTo(x, y, x + outerRadius, y);
          ctx.closePath();
          ctx.fill();
          ctx.restore();
        }

        // Draw image (cover fit) with rounded corners
        // Adjust position for photo border
        const photoX = x + photoBorder;
        const photoY = y + photoBorder;
        const photoWidth = panelWidth - photoBorder * 2;
        const photoHeight = panelHeight - photoBorder * 2;
        
        ctx.save();
        
        // Apply filter
        ctx.filter = getFilterStyle(selectedFilter);
        
        // Move to photo panel center
        ctx.translate(photoX + photoWidth / 2, photoY + photoHeight / 2);
        
        // Apply user's scale (scales the entire "panel element" like CSS transform)
        ctx.scale(photoOffset.scale, photoOffset.scale);
        
        // Apply user's translate offset
        ctx.translate(photoOffset.x, photoOffset.y);
        
        // Translate back to top-left corner for drawing
        ctx.translate(-photoWidth / 2, -photoHeight / 2);
        
        // Create rounded rectangle clipping path
        ctx.beginPath();
        ctx.moveTo(innerRadius, 0);
        ctx.lineTo(photoWidth - innerRadius, 0);
        ctx.quadraticCurveTo(photoWidth, 0, photoWidth, innerRadius);
        ctx.lineTo(photoWidth, photoHeight - innerRadius);
        ctx.quadraticCurveTo(photoWidth, photoHeight, photoWidth - innerRadius, photoHeight);
        ctx.lineTo(innerRadius, photoHeight);
        ctx.quadraticCurveTo(0, photoHeight, 0, photoHeight - innerRadius);
        ctx.lineTo(0, innerRadius);
        ctx.quadraticCurveTo(0, 0, innerRadius, 0);
        ctx.closePath();
        ctx.clip();

        // Draw image with cover fit (fills the panel, may overflow)
        const baseCoverScale = Math.max(photoWidth / img.width, photoHeight / img.height);
        const coveredWidth = img.width * baseCoverScale;
        const coveredHeight = img.height * baseCoverScale;
        const imgX = (photoWidth - coveredWidth) / 2;
        const imgY = (photoHeight - coveredHeight) / 2;
        
        ctx.drawImage(img, imgX, imgY, coveredWidth, coveredHeight);
        ctx.restore();
      }
    } else {
      // Original background/pattern logic
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, width, height);

      if (pattern !== 'none') {
        drawPattern(ctx, pattern, width, height);
      }

      // Calculate panel dimensions correctly (matching the preview layout)
      // Add base value of 6px to slider values (slider 0 = 6px actual)
      const actualBorderWidth = borderWidth + 6;
      const actualPanelSpacing = panelSpacing + 6;
      
      const totalBorderWidth = actualBorderWidth * 2; // top and bottom borders
      const totalSpacing = actualPanelSpacing * 3; // spacing between 4 panels
      const availableHeight = height - totalBorderWidth - totalSpacing;
      const panelHeight = availableHeight / 4;
      const panelWidth = width - actualBorderWidth * 2;

      // Load and draw user images in each panel
      // If we have 4 different images, use them; otherwise repeat the single image
      const imagesToLoad = imageUrls && imageUrls.length === 4 ? imageUrls : [imageUrl, imageUrl, imageUrl, imageUrl];
      
      const loadedImages = await Promise.all(
        imagesToLoad.map((src) => {
          return new Promise<HTMLImageElement>((resolve) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.src = src;
          });
        })
      );

      for (let i = 0; i < 4; i++) {
        const y = actualBorderWidth + i * (panelHeight + actualPanelSpacing);
        const x = actualBorderWidth;
        const img = loadedImages[i];
        
        // Draw white background for panel
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(x, y, panelWidth, panelHeight);
        
        // Draw image with cover fit
        ctx.save();
        
        // Apply filter
        ctx.filter = getFilterStyle(selectedFilter);
        
        // Move to panel center
        ctx.translate(x + panelWidth / 2, y + panelHeight / 2);
        
        // Apply user's scale (scales the entire "panel element" like CSS transform)
        ctx.scale(photoOffset.scale, photoOffset.scale);
        
        // Apply user's translate offset
        ctx.translate(photoOffset.x, photoOffset.y);
        
        // Translate back to top-left corner for drawing
        ctx.translate(-panelWidth / 2, -panelHeight / 2);
        
        // Clip to panel bounds
        ctx.beginPath();
        ctx.rect(0, 0, panelWidth, panelHeight);
        ctx.clip();
        
        // Draw image with cover fit (fills the panel, may overflow)
        const baseCoverScale = Math.max(panelWidth / img.width, panelHeight / img.height);
        const coveredWidth = img.width * baseCoverScale;
        const coveredHeight = img.height * baseCoverScale;
        const imgX = (panelWidth - coveredWidth) / 2;
        const imgY = (panelHeight - coveredHeight) / 2;
        
        ctx.drawImage(img, imgX, imgY, coveredWidth, coveredHeight);
        ctx.restore();
      }
    }

    // Draw the canvas overlay (drawings)
    const drawingCanvas = canvasRef.current;
    if (drawingCanvas) {
      ctx.drawImage(drawingCanvas, 0, 0);
    }

    // Draw stickers by finding them in the DOM and serializing to canvas
    for (let i = 0; i < placedStickers.length; i++) {
      const sticker = placedStickers[i];
      const stickerEl = element.querySelector(`[data-sticker-index="${i}"]`);
      
      if (!stickerEl) continue;
      
      // Convert percentage position to pixels
      const stickerX = (sticker.x / 100) * width;
      const stickerY = (sticker.y / 100) * height;
      
      try {
        // Find and serialize the SVG or IMG
        const svgEl = stickerEl.querySelector('svg');
        const imgEl = stickerEl.querySelector('img');
        
        console.log('Sticker rendering:', { 
          index: i, 
          stickerId: sticker.id, 
          hasSvg: !!svgEl, 
          hasImg: !!imgEl,
          imgSrc: imgEl ? (imgEl as HTMLImageElement).src : 'none'
        });
        
        if (svgEl) {
          // Handle SVG stickers
          const clonedSvg = svgEl.cloneNode(true) as SVGElement;
          clonedSvg.setAttribute('width', sticker.size.toString());
          clonedSvg.setAttribute('height', sticker.size.toString());
          
          const svgString = new XMLSerializer().serializeToString(clonedSvg);
          const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
          const url = URL.createObjectURL(svgBlob);
          
          const stickerImg = new Image();
          await new Promise((resolve, reject) => {
            stickerImg.onload = resolve;
            stickerImg.onerror = reject;
            stickerImg.src = url;
          });
          
          // Draw centered at position
          ctx.drawImage(
            stickerImg,
            stickerX - sticker.size / 2,
            stickerY - sticker.size / 2,
            sticker.size,
            sticker.size
          );
          
          URL.revokeObjectURL(url);
          console.log('SVG sticker rendered successfully');
        } else if (PNG_STICKER_MAP[sticker.id] && pngBlobUrls[sticker.id]) {
          // Handle PNG stickers (Frame42-50) - use preloaded blob URL
          console.log('🔍 Processing PNG sticker:', sticker.id);
          const pngBlobUrl = pngBlobUrls[sticker.id];
          
          try {
            const pngImg = new Image();
            await new Promise((resolve, reject) => {
              pngImg.onload = () => {
                console.log('✅ PNG loaded successfully:', sticker.id, pngImg.width, 'x', pngImg.height);
                resolve(null);
              };
              pngImg.onerror = (err) => {
                console.error('❌ PNG load error:', sticker.id, err);
                reject(err);
              };
              pngImg.src = pngBlobUrl;
            });
            
            // Draw PNG to canvas
            ctx.drawImage(
              pngImg,
              stickerX - sticker.size / 2,
              stickerY - sticker.size / 2,
              sticker.size,
              sticker.size
            );
            console.log('✅ PNG sticker rendered successfully:', sticker.id);
          } catch (error) {
            console.error('❌ Error rendering PNG sticker:', sticker.id, error);
          }
        }
      } catch (error) {
        console.error('Error rendering sticker:', error);
      }
    }

    // Draw AI Quote at the bottom if exists
    if (aiQuote) {
      ctx.save();
      ctx.fillStyle = '#ffffff';
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 3;
      ctx.font = "bold 18px 'Orbitron', sans-serif";
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      const quoteY = height - 40; // 40px from bottom
      const quoteX = width / 2;
      const quoteText = `"${aiQuote}"`;
      
      // Draw text stroke (outline)
      ctx.strokeText(quoteText, quoteX, quoteY);
      // Draw text fill
      ctx.fillText(quoteText, quoteX, quoteY);
      ctx.restore();
    }

    // Convert to data URL
    const dataUrl = finalCanvas.toDataURL('image/png');
    onFinalize(dataUrl);
    playCelebrationSound();
  };

  const drawPattern = (ctx: CanvasRenderingContext2D, patternType: string, width: number, height: number) => {
    ctx.globalAlpha = 0.1;
    ctx.fillStyle = '#000000';
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1;

    switch (patternType) {
      case 'dots':
        for (let x = 0; x <= width; x += 20) {
          for (let y = 0; y <= height; y += 20) {
            ctx.beginPath();
            ctx.arc(x, y, 2, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        break;
      case 'stripes':
        for (let x = 0; x <= width; x += 20) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
          ctx.stroke();
        }
        break;
      case 'grid':
        for (let x = 0; x <= width; x += 30) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
          ctx.stroke();
        }
        for (let y = 0; y <= height; y += 30) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }
        break;
      case 'hearts':
        ctx.fillStyle = '#000000';
        for (let x = 0; x <= width; x += 40) {
          for (let y = 0; y <= height; y += 40) {
            ctx.font = '16px Arial';
            ctx.fillText('♥', x, y);
          }
        }
        break;
      case 'checkerboard':
        for (let x = 0; x <= width; x += 20) {
          for (let y = 0; y <= height; y += 20) {
            ctx.fillStyle = (x + y) % 40 < 20 ? '#000000' : '#ffffff';
            ctx.fillRect(x, y, 20, 20);
          }
        }
        break;
      case 'diagonal':
        for (let x = -height; x <= width; x += 20) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x + height, height);
          ctx.stroke();
        }
        break;
      case 'stars':
        ctx.fillStyle = '#000000';
        for (let x = 0; x <= width; x += 40) {
          for (let y = 0; y <= height; y += 40) {
            ctx.font = '16px Arial';
            ctx.fillText('★', x, y);
          }
        }
        break;
      case 'circles':
        ctx.fillStyle = '#000000';
        for (let x = 0; x <= width; x += 40) {
          for (let y = 0; y <= height; y += 40) {
            ctx.beginPath();
            ctx.arc(x, y, 5, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        break;
      case 'zigzag':
        for (let y = 0; y <= height; y += 20) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          for (let x = 0; x <= width; x += 20) {
            ctx.lineTo(x + 10, y + 10);
            ctx.lineTo(x + 20, y);
          }
          ctx.stroke();
        }
        break;
      case 'triangles':
        ctx.fillStyle = '#000000';
        for (let x = 0; x <= width; x += 40) {
          for (let y = 0; y <= height; y += 40) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + 20, y + 20);
            ctx.lineTo(x, y + 40);
            ctx.closePath();
            ctx.fill();
          }
        }
        break;
      case 'waves':
        for (let y = 0; y <= height; y += 30) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          for (let x = 0; x <= width; x += 20) {
            const waveY = y + Math.sin(x / 10) * 10;
            ctx.lineTo(x, waveY);
          }
          ctx.stroke();
        }
        break;
      case 'confetti':
        ctx.fillStyle = '#000000';
        for (let x = 0; x <= width; x += 40) {
          for (let y = 0; y <= height; y += 40) {
            ctx.font = '16px Arial';
            ctx.fillText('🎉', x, y);
          }
        }
        break;
      case 'bubbles':
        for (let x = 0; x <= width; x += 50) {
          for (let y = 0; y <= height; y += 50) {
            const radius = 5 + Math.random() * 8;
            ctx.beginPath();
            ctx.arc(x + Math.random() * 20, y + Math.random() * 20, radius, 0, Math.PI * 2);
            ctx.stroke();
          }
        }
        break;
      case 'hexagon':
        const hexSize = 15;
        for (let y = 0; y <= height; y += hexSize * 1.7) {
          for (let x = 0; x <= width; x += hexSize * 2) {
            const offsetX = (y / (hexSize * 1.7)) % 2 === 0 ? 0 : hexSize;
            ctx.beginPath();
            for (let i = 0; i < 6; i++) {
              const angle = (Math.PI / 3) * i;
              const hx = x + offsetX + hexSize * Math.cos(angle);
              const hy = y + hexSize * Math.sin(angle);
              if (i === 0) ctx.moveTo(hx, hy);
              else ctx.lineTo(hx, hy);
            }
            ctx.closePath();
            ctx.stroke();
          }
        }
        break;
      case 'cross':
        for (let x = 0; x <= width; x += 30) {
          for (let y = 0; y <= height; y += 30) {
            ctx.beginPath();
            ctx.moveTo(x - 5, y);
            ctx.lineTo(x + 5, y);
            ctx.moveTo(x, y - 5);
            ctx.lineTo(x, y + 5);
            ctx.stroke();
          }
        }
        break;
      case 'diamonds':
        for (let x = 0; x <= width; x += 35) {
          for (let y = 0; y <= height; y += 35) {
            ctx.beginPath();
            ctx.moveTo(x, y - 8);
            ctx.lineTo(x + 8, y);
            ctx.lineTo(x, y + 8);
            ctx.lineTo(x - 8, y);
            ctx.closePath();
            ctx.fill();
          }
        }
        break;
      case 'polkadot':
        for (let x = 0; x <= width; x += 40) {
          for (let y = 0; y <= height; y += 40) {
            const radius = 4 + Math.random() * 4;
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        break;
    }

    ctx.globalAlpha = 1;
  };

  const applyHolidayTheme = (themeId: string) => {
    // If clicking the same theme, unselect it
    if (activeHoliday === themeId) {
      setActiveHoliday(null);
      setUseFrameBackground(false);
      setHolidayStickers([]);
      return;
    }
    
    const theme = HOLIDAY_THEMES.find(t => t.id === themeId);
    if (theme) {
      setBackgroundColor(theme.backgroundColor);
      setPattern(theme.pattern);
      setBorderWidth(theme.borderWidth);
      setPanelSpacing(theme.panelSpacing);
      setHolidayStickers(theme.stickers);
      setActiveHoliday(themeId);
      setUseFrameBackground(theme.useFrame);
      setCurrentFrameImage(theme.frameImage);
      setFramePadding(theme.framePadding);
      setFrameGap(theme.frameGap);
      setPhotoBorder(theme.photoBorder);
    }
  };

  // Filter configurations
  const FILTERS = [
    { id: 'natural', name: 'Natural', filter: 'none', category: 'basic' },
    { id: 'warm', name: 'Warm', filter: 'sepia(20%) saturate(120%)', category: 'basic' },
    { id: 'cool', name: 'Cool', filter: 'hue-rotate(10deg) saturate(110%)', category: 'basic' },
    { id: 'bright', name: 'Bright', filter: 'brightness(115%) contrast(105%)', category: 'basic' },
    { id: 'soft', name: 'Soft', filter: 'contrast(85%) brightness(105%) saturate(90%)', category: 'basic' },
    { id: 'contrast', name: 'Contrast Boost', filter: 'contrast(140%) brightness(95%)', category: 'basic' },
    { id: 'vintage', name: 'Vintage', filter: 'sepia(40%) contrast(110%) brightness(95%)', category: 'basic' },
    { id: 'bw', name: 'Black & White', filter: 'grayscale(100%) contrast(110%)', category: 'basic' },
    { id: 'sepia', name: 'Sepia', filter: 'sepia(100%)', category: 'basic' },
    { id: 'fade', name: 'Fade', filter: 'contrast(90%) brightness(110%) saturate(70%)', category: 'basic' },
    { id: 'grain', name: 'Film Grain', filter: 'contrast(115%) brightness(95%) saturate(105%)', category: 'basic' },
    { id: 'portrait', name: 'Portrait Glow', filter: 'brightness(108%) contrast(95%) saturate(105%)', category: 'basic' },
    { id: 'sunset', name: 'Sunset', filter: 'sepia(30%) saturate(130%) hue-rotate(-10deg)', category: 'basic' },
    { id: 'matte', name: 'Matte', filter: 'contrast(85%) saturate(80%) brightness(105%)', category: 'basic' },
    { id: 'clearskin', name: 'Clear Skin', filter: 'brightness(105%) contrast(95%) blur(0.3px)', category: 'basic' },
    { id: 'flash2000', name: 'Flash 2000', filter: 'brightness(130%) contrast(120%) saturate(110%)', category: 'y2k' },
    { id: 'holographic', name: 'Holographic Glow', filter: 'brightness(115%) contrast(105%) saturate(140%) hue-rotate(5deg)', category: 'y2k' },
    { id: 'crt', name: 'CRT Soft', filter: 'contrast(95%) brightness(98%) blur(0.4px)', category: 'y2k' },
    { id: 'myspace', name: 'MySpace Glam', filter: 'contrast(140%) saturate(130%) brightness(105%) hue-rotate(-5deg)', category: 'y2k' },
    { id: 'chrome', name: 'Chrome Shine', filter: 'contrast(125%) brightness(110%) saturate(120%)', category: 'y2k' },
  ];

  // Get filter CSS string
  const getFilterStyle = (filterId: string) => {
    const filter = FILTERS.find(f => f.id === filterId);
    return filter ? filter.filter : 'none';
  };

  return (
    <div className="min-h-screen p-4 md:p-8 relative">
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

      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl text-center mb-6 tracking-wide"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          style={{
            fontFamily: "'Orbitron', sans-serif",
            fontWeight: 700,
            color: '#000000'
          }}
        >
          Customize Your Photo
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Photo Preview */}
          <div className="lg:col-span-2 flex justify-center items-start">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-8"
              style={{ marginLeft: '80px' }}
            >
              <div 
                ref={photoBoothRef}
                className="relative"
                style={{ 
                  width: '400px', 
                  height: '1000px',
                  backgroundColor: 'transparent',
                  margin: '0',
                  padding: '0',
                  boxSizing: 'border-box',
                  overflow: 'visible',
                  position: 'relative'
                }}
                onMouseMove={handleContainerMouseMove}
                onMouseUp={handleContainerMouseUp}
                onMouseLeave={handleContainerMouseUp}
                onClick={(e) => {
                  if (e.target === e.currentTarget) {
                    setSelectedSticker(null);
                  }
                }}
              >
                {/* Frame Background Image */}
                {useFrameBackground && currentFrameImage && (
                  <img 
                    src={currentFrameImage} 
                    alt="Frame background"
                    className="absolute pointer-events-auto"
                    style={{
                      width: '400px',
                      height: '1000px',
                      objectFit: 'fill',
                      position: 'absolute',
                      top: '0',
                      left: '0'
                    }}
                    onClick={() => setSelectedSticker(null)}
                  />
                )}

                {/* Solid Color Background (when not using frame) */}
                {!useFrameBackground && (
                  <div 
                    className="absolute"
                    style={{ 
                      backgroundColor,
                      width: '400px',
                      height: '1000px',
                      position: 'absolute',
                      top: '0',
                      left: '0',
                      pointerEvents: 'auto'
                    }}
                    onClick={() => setSelectedSticker(null)}
                  />
                )}

                {/* Pattern Background */}
                {!useFrameBackground && (
                  <div className="absolute inset-0 pointer-events-none" style={{ width: '400px', height: '1000px' }}>
                    <canvas
                      width="400"
                      height="1000"
                      style={{ 
                        width: '400px', 
                        height: '1000px',
                        position: 'absolute',
                        top: '0',
                        left: '0'
                      }}
                      ref={(canvas) => {
                        if (canvas && pattern !== 'none') {
                          const ctx = canvas.getContext('2d');
                          if (ctx) {
                            ctx.clearRect(0, 0, 400, 1000);
                            drawPattern(ctx, pattern, 400, 1000);
                          }
                        }
                      }}
                    />
                  </div>
                )}

                {/* Four Panels */}
                <div 
                  className="relative flex flex-col justify-between z-10"
                  style={{ 
                    width: '400px',
                    height: '1000px',
                    padding: useFrameBackground 
                      ? `${framePadding.top}px ${framePadding.right}px ${framePadding.bottom}px ${framePadding.left}px`
                      : `${borderWidth + 6}px`, 
                    gap: useFrameBackground ? `${frameGap}px` : `${panelSpacing + 6}px`,
                    boxSizing: 'border-box'
                  }}
                >
                  {[0, 1, 2, 3].map((i) => {
                    // Use different images if available, otherwise use the same image
                    const currentImageUrl = imageUrls && imageUrls.length === 4 ? imageUrls[i] : imageUrl;
                    const activeTheme = HOLIDAY_THEMES.find(t => t.id === activeHoliday);
                    
                    return (
                      <div 
                        key={i} 
                        className="flex-1 overflow-hidden relative"
                        style={{ 
                          minHeight: 0,
                          borderRadius: useFrameBackground ? '4px' : '8px',
                          backgroundColor: useFrameBackground ? (activeTheme?.photoBorderColor || '#f8f8f8') : '#ffffff',
                          padding: useFrameBackground && activeTheme?.photoBorder 
                            ? `${activeTheme.photoBorder}px` 
                            : '0',
                          boxShadow: useFrameBackground ? '0 2px 6px rgba(0,0,0,0.08)' : 'none'
                        }}
                      >
                        {/* Photo wrapper with border for frame mode */}
                        <div
                          className="relative w-full h-full"
                          style={{
                            border: 'none',
                            borderRadius: useFrameBackground ? '2px' : '0',
                            overflow: 'hidden'
                          }}
                        >
                          <img
                            src={currentImageUrl}
                            alt={`Panel ${i + 1}`}
                            className="block w-full h-full cursor-grab active:cursor-grabbing"
                            style={{
                              objectFit: 'cover',
                              objectPosition: 'center',
                              display: 'block',
                              filter: getFilterStyle(selectedFilter),
                              transition: isDraggingPhoto ? 'none' : 'filter 0.3s ease-out',
                              transform: `scale(${photoOffset.scale}) translate(${photoOffset.x}px, ${photoOffset.y}px)`,
                              transformOrigin: 'center center',
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedSticker(null);
                            }}
                            onMouseDown={handlePhotoMouseDown}
                            onMouseMove={handlePhotoMouseMove}
                            onMouseUp={handlePhotoMouseUp}
                            onMouseLeave={handlePhotoMouseUp}
                            draggable={false}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Drawing Canvas Overlay */}
                <canvas
                  ref={canvasRef}
                  width="400"
                  height="1000"
                  className={`absolute inset-0 z-30 ${activeTab === 'draw' ? 'cursor-crosshair' : 'cursor-default'}`}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  style={{ 
                    width: '400px', 
                    height: '1000px', 
                    pointerEvents: 'auto',
                    position: 'absolute',
                    top: '0',
                    left: '0'
                  }}
                />

                {/* Stickers */}
                {placedStickers.map((sticker, index) => {
                  const stickerConfig = STICKER_CONFIGS.find(c => c.id === sticker.id);
                  const StickerComponent = stickerConfig?.Component;
                  const isSelected = selectedSticker === index;
                  
                  if (!StickerComponent) return null;
                  
                  return (
                    <div
                      key={index}
                      data-sticker-index={index}
                      className="absolute z-40 select-none group"
                      style={{
                        left: `${sticker.x}%`,
                        top: `${sticker.y}%`,
                        transform: 'translate(-50%, -50%)',
                        pointerEvents: 'auto',
                        touchAction: 'none',
                      }}
                    >
                      {/* Selection Border */}
                      {isSelected && (
                        <div 
                          className="absolute inset-0 border-2 border-dashed border-purple-500 rounded-lg"
                          style={{
                            width: `${sticker.size + 20}px`,
                            height: `${sticker.size + 20}px`,
                            left: '50%',
                            top: '50%',
                            transform: 'translate(-50%, -50%)',
                            pointerEvents: 'none',
                            zIndex: -1
                          }}
                        />
                      )}
                      
                      {/* Sticker */}
                      <div
                        className="cursor-move"
                        style={{
                          width: `${sticker.size}px`,
                          height: `${sticker.size}px`,
                          transition: draggingSticker === index || resizingSticker === index ? 'none' : 'width 0.2s, height 0.2s',
                        }}
                        onMouseDown={(e) => handleStickerMouseDown(e, index)}
                      >
                        <StickerComponent />
                      </div>

                      {/* Delete Button - Top right corner */}
                      <div className={`absolute -top-1 -right-1 transition-opacity z-50 ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteSticker(index);
                          }}
                          className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center shadow-lg hover:bg-gray-800 transition-colors"
                          style={{ pointerEvents: 'auto' }}
                        >
                          <X className="w-3 h-3" />
                        </motion.button>
                      </div>

                      {/* Resize Handles - Four corners, only show when selected */}
                      {isSelected && (
                        <>
                          {/* Top-left corner */}
                          <div
                            className="absolute w-4 h-4 bg-white border-2 border-purple-500 rounded-full cursor-nwse-resize shadow-md hover:scale-125 transition-transform"
                            style={{
                              left: '-10px',
                              top: '-10px',
                              pointerEvents: 'auto',
                              zIndex: 50
                            }}
                            onMouseDown={(e) => handleResizeMouseDown(e, index)}
                          />
                          
                          {/* Top-right corner */}
                          <div
                            className="absolute w-4 h-4 bg-white border-2 border-purple-500 rounded-full cursor-nesw-resize shadow-md hover:scale-125 transition-transform"
                            style={{
                              right: '-10px',
                              top: '-10px',
                              pointerEvents: 'auto',
                              zIndex: 50
                            }}
                            onMouseDown={(e) => handleResizeMouseDown(e, index)}
                          />
                          
                          {/* Bottom-left corner */}
                          <div
                            className="absolute w-4 h-4 bg-white border-2 border-purple-500 rounded-full cursor-nesw-resize shadow-md hover:scale-125 transition-transform"
                            style={{
                              left: '-10px',
                              bottom: '-10px',
                              pointerEvents: 'auto',
                              zIndex: 50
                            }}
                            onMouseDown={(e) => handleResizeMouseDown(e, index)}
                          />
                          
                          {/* Bottom-right corner */}
                          <div
                            className="absolute w-4 h-4 bg-white border-2 border-purple-500 rounded-full cursor-nwse-resize shadow-md hover:scale-125 transition-transform"
                            style={{
                              right: '-10px',
                              bottom: '-10px',
                              pointerEvents: 'auto',
                              zIndex: 50
                            }}
                            onMouseDown={(e) => handleResizeMouseDown(e, index)}
                          />
                        </>
                      )}
                    </div>
                  );
                })}

                {/* AI Quote Display */}
                {aiQuote && (
                  <div
                    className="absolute z-50 pointer-events-none"
                    style={{
                      bottom: '40px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '90%',
                      textAlign: 'center'
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "'Orbitron', sans-serif",
                        fontSize: '18px',
                        fontWeight: 'bold',
                        color: '#ffffff',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.8), -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
                        lineHeight: '1.2'
                      }}
                    >
                      "{aiQuote}"
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Customization Panel */}
          <div className="lg:col-span-1 relative">
            {!isPanelCollapsed && (
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 20, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="backdrop-blur-md rounded-3xl p-6 sticky top-8 border border-white/60"
                style={{ 
                  background: 'linear-gradient(135deg, rgba(255, 240, 245, 0.7) 0%, rgba(245, 240, 255, 0.7) 25%, rgba(240, 255, 250, 0.7) 50%, rgba(255, 245, 255, 0.7) 75%, rgba(245, 250, 255, 0.7) 100%)', 
                  boxShadow: '0 8px 32px rgba(180, 120, 220, 0.2), 0 4px 16px rgba(147, 51, 234, 0.15), 0 2px 8px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.8)' 
                }}
              >
                <Tabs defaultValue="holiday" value={activeTab} onValueChange={setActiveTab} className="w-full">
                {/* TabsList with collapse button on the right */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <TabsList className="grid grid-cols-5 flex-1">
                    <TabsTrigger value="holiday">
                      <PartyPopper className="w-4 h-4" />
                    </TabsTrigger>
                    <TabsTrigger value="background">
                      <Palette className="w-4 h-4" />
                    </TabsTrigger>
                    <TabsTrigger value="filters">
                      <Sparkles className="w-4 h-4" />
                    </TabsTrigger>
                    <TabsTrigger value="stickers">
                      <Sticker className="w-4 h-4" />
                    </TabsTrigger>
                    <TabsTrigger value="draw">
                      <Pencil className="w-4 h-4" />
                    </TabsTrigger>
                  </TabsList>
                  
                  {/* Toggle Button - next to tabs */}
                  <button
                    onClick={() => setIsPanelCollapsed(true)}
                    className="inline-flex h-9 items-center justify-center rounded-full border border-transparent px-3 py-2 transition-all duration-200 hover:scale-105 active:scale-95 text-gray-600 hover:text-gray-700"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, rgba(240, 230, 255, 0.5) 50%, rgba(255, 240, 250, 0.6) 100%)',
                      boxShadow: '0 4px 16px rgba(180, 120, 220, 0.15), 0 2px 8px rgba(0,0,0,0.05)'
                    }}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <TabsContent value="holiday" className="space-y-4">
                  {/* H1: Main section title */}
                  <h2 className="mb-4" style={getPanelTextStyle('title')}>Cool Templates</h2>
                  <div className="space-y-3 max-h-[420px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-purple-300 scrollbar-track-gray-100">
                    {HOLIDAY_THEMES.map(theme => (
                      <motion.button
                        key={theme.id}
                        onClick={() => applyHolidayTheme(theme.id)}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.92 }}
                        className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                          activeHoliday === theme.id 
                            ? 'border-purple-500 bg-purple-50 shadow-md' 
                            : 'border-gray-300 hover:border-purple-300 bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div style={getPanelTextStyle('label')}>{theme.name}</div>
                          {activeHoliday === theme.id && (
                            <Check className="w-5 h-5 text-purple-500" />
                          )}
                        </div>
                      </motion.button>
                    ))}
                  </div>
                  
                  {activeHoliday && (
                    <div className="mt-4 p-3 bg-purple-50 rounded-lg border border-purple-200">
                      <p style={getPanelTextStyle('subtitle')}>
                        ✨ Theme applied! You can still customize colors, patterns, and add more decorations.
                      </p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="filters" className="space-y-4">
                  <h2 className="mb-4" style={getPanelTextStyle('title')}>Photo Filters</h2>
                  
                  {/* Basic Filters */}
                  <div className="mb-6">
                    <h3 className="mb-3 text-sm font-medium" style={getPanelTextStyle('label')}>Basic Filters</h3>
                    <div className="grid grid-cols-3 gap-2">
                      {FILTERS.filter(f => f.category === 'basic').map(filter => (
                        <motion.button
                          key={filter.id}
                          onClick={() => setSelectedFilter(filter.id)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`p-3 rounded-lg border-2 transition-all text-center ${
                            selectedFilter === filter.id
                              ? 'border-purple-500 bg-purple-50 shadow-md'
                              : 'border-gray-300 hover:border-purple-300 bg-white'
                          }`}
                        >
                          <div className="text-xs font-medium" style={getPanelTextStyle('caption')}>
                            {filter.name}
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Y2K Filters */}
                  <div>
                    <h3 className="mb-3 text-sm font-medium" style={getPanelTextStyle('label')}>💿 Y2K Filters</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {FILTERS.filter(f => f.category === 'y2k').map(filter => (
                        <motion.button
                          key={filter.id}
                          onClick={() => setSelectedFilter(filter.id)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`p-3 rounded-lg border-2 transition-all text-center ${
                            selectedFilter === filter.id
                              ? 'border-purple-500 bg-purple-50 shadow-md'
                              : 'border-gray-300 hover:border-purple-300 bg-white'
                          }`}
                        >
                          <div className="text-xs font-medium" style={getPanelTextStyle('caption')}>
                            {filter.name}
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* AI Quote Generator */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h3 className="mb-3 text-sm font-medium flex items-center gap-2" style={getPanelTextStyle('label')}>
                      <AIIcon className="w-4 h-4" />
                      AI Quote Generator
                    </h3>
                    <motion.button
                      onClick={generateRandomQuote}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full p-4 rounded-xl border-2 border-purple-300 bg-gradient-to-br from-purple-50 to-pink-50 hover:border-purple-400 transition-all shadow-sm hover:shadow-md"
                    >
                      <div className="text-sm font-medium text-purple-700" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                        Turn this feeling into a line.
                      </div>
                    </motion.button>
                    
                    {aiQuote && (
                      <div className="mt-3 p-3 bg-white rounded-lg border border-purple-200 shadow-sm">
                        <p className="text-sm text-center italic text-gray-700" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                          "{aiQuote}"
                        </p>
                        <button
                          onClick={() => setAiQuote('')}
                          className="mt-2 text-xs text-gray-500 hover:text-gray-700 w-full"
                          style={{ fontFamily: "'Orbitron', sans-serif" }}
                        >
                          Clear Quote
                        </button>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="background" className="space-y-4">
                  {/* Photo Position Controls */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      {/* H2: Section title */}
                      <h2 style={getPanelTextStyle('label')}>
                        Photo Position
                      </h2>
                      <button
                        onClick={() => setPhotoOffset({ x: 0, y: 0, scale: 1.2 })}
                        className="text-xs transition-colors hover:scale-110 active:scale-95"
                        style={getPanelTextStyle('caption')}
                      >
                        Reset
                      </button>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      {/* Label */}
                      <span className="text-xs whitespace-nowrap" style={getPanelTextStyle('caption')}>
                        Zoom
                      </span>
                      <Slider
                        value={[photoOffset.scale * 100]}
                        onValueChange={([value]) => setPhotoOffset(prev => ({ ...prev, scale: value / 100 }))}
                        min={80}
                        max={200}
                        step={5}
                        className="flex-1"
                      />
                      <span className="text-xs text-gray-600 font-mono w-12 text-right">
                        {Math.round(photoOffset.scale * 100)}%
                      </span>
                    </div>
                  </div>

                  <div>
                    {/* H2: Section title */}
                    <h2 className="mb-3" style={getPanelTextStyle('label')}>
                      Border Width
                    </h2>
                    <Slider
                      value={[useFrameBackground ? photoBorder : borderWidth]}
                      onValueChange={([value]) => {
                        if (useFrameBackground) {
                          setPhotoBorder(value);
                          // Adjust framePadding proportionally
                          setFramePadding(prev => ({
                            top: prev.top + (value - photoBorder),
                            left: prev.left + (value - photoBorder),
                            right: prev.right + (value - photoBorder),
                            bottom: prev.bottom + (value - photoBorder),
                          }));
                        } else {
                          setBorderWidth(value);
                        }
                      }}
                      min={2}
                      max={50}
                      step={1}
                    />
                  </div>

                  <div>
                    {/* H2: Section title */}
                    <h2 className="mb-3" style={getPanelTextStyle('label')}>
                      Panel Spacing
                    </h2>
                    <Slider
                      value={[useFrameBackground ? frameGap : panelSpacing]}
                      onValueChange={([value]) => {
                        if (useFrameBackground) {
                          setFrameGap(value);
                        } else {
                          setPanelSpacing(value);
                        }
                      }}
                      min={2}
                      max={50}
                      step={1}
                    />
                  </div>

                  <div>
                    {/* H2: Section title */}
                    <h2 className="mb-3" style={getPanelTextStyle('label')}>Pattern</h2>
                    <div className="grid grid-cols-3 gap-2 max-h-[180px] overflow-y-auto pr-1">
                      {PATTERNS.map(p => {
                        const isActive = pattern === p.value && !useFrameBackground;
                        return (
                          <button
                            key={p.value}
                            onClick={() => {
                              setPattern(p.value);
                              setUseFrameBackground(false);
                              setActiveHoliday(null);
                            }}
                            className={`flex flex-col items-center gap-1.5 p-2.5 rounded-xl border-2 transition-all duration-150 hover:scale-105 hover:shadow-md active:scale-95 ${
                              isActive
                                ? 'border-purple-500 bg-purple-50 shadow-sm'
                                : 'border-gray-200 hover:border-purple-300 bg-white'
                            }`}
                          >
                            <div className={`w-8 h-8 ${isActive ? 'text-purple-500' : 'text-gray-500'}`}>
                              <p.Icon />
                            </div>
                            {/* Caption */}
                            <span className="text-[8.5px] leading-tight text-center px-0.5" style={getPanelTextStyle('caption')}>
                              {p.name}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    {/* H2: Section title */}
                    <h2 className="mb-3" style={getPanelTextStyle('label')}>Background Color</h2>
                    <div className="grid grid-cols-6 gap-2 mb-3">
                      {COLORS.map(color => (
                        <button
                          key={color}
                          onClick={() => {
                            setBackgroundColor(color);
                            setUseFrameBackground(false);
                            setActiveHoliday(null);
                          }}
                          className={`w-9 h-9 rounded-full transition-all duration-150 shadow-md hover:scale-125 hover:shadow-lg active:scale-95 ${
                            backgroundColor === color && !useFrameBackground
                              ? 'scale-110 ring-2 ring-offset-2 ring-purple-500'
                              : 'ring-1 ring-black/10'
                          }`}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                    
                    {/* Color CD - Holographic CD Design */}
                    <div className="relative">
                      {/* H3: Sub-section title */}
                      <h3 className="mb-3" style={getPanelTextStyle('subtitle')}>
                        Custom Color
                      </h3>
                      
                      <label className="block cursor-pointer group">
                        <input
                          type="color"
                          value={backgroundColor}
                          onChange={(e) => {
                            setBackgroundColor(e.target.value);
                            setUseFrameBackground(false);
                            setActiveHoliday(null);
                          }}
                          className="absolute opacity-0 w-0 h-0"
                        />
                        
                        <div className="relative p-3 bg-gradient-to-br from-white via-gray-50 to-purple-50/30 rounded-2xl border-2 border-gray-200 group-hover:border-purple-300 transition-all shadow-md group-hover:shadow-lg">
                          {/* Hex Code Display at Top */}
                          <div className="text-center mb-2">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white rounded-full shadow-sm border border-gray-200">
                              <span className="text-xs text-gray-500" style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 500 }}>#</span>
                              <span 
                                className="text-base font-mono font-semibold tracking-wider"
                                style={{ 
                                  color: backgroundColor,
                                  filter: 'brightness(0.7)'
                                }}
                              >
                                {backgroundColor.substring(1).toUpperCase()}
                              </span>
                            </div>
                          </div>
                          
                          {/* Glass-morphic CD Disc */}
                          <div className="flex justify-center mb-2 px-2 py-2">
                            <div className="relative">
                              {/* Sparkle decorations */}
                              <motion.div
                                className="absolute -top-2 -right-2 text-white text-xl"
                                animate={{ 
                                  scale: [1, 1.3, 1],
                                  opacity: [0.6, 1, 0.6]
                                }}
                                transition={{ 
                                  duration: 2,
                                  repeat: Infinity,
                                  ease: "easeInOut"
                                }}
                              >
                                ✨
                              </motion.div>
                              <motion.div
                                className="absolute -bottom-1 -left-2 text-white text-sm"
                                animate={{ 
                                  scale: [1, 1.2, 1],
                                  opacity: [0.5, 1, 0.5]
                                }}
                                transition={{ 
                                  duration: 2.5,
                                  delay: 0.5,
                                  repeat: Infinity,
                                  ease: "easeInOut"
                                }}
                              >
                                ✨
                              </motion.div>
                              
                              {/* Glass CD Disc */}
                              <motion.div 
                                className="w-32 h-32 rounded-full relative transition-all group-hover:scale-105"
                                animate={{ 
                                  rotate: [0, 360]
                                }}
                                transition={{ 
                                  duration: 25,
                                  repeat: Infinity,
                                  ease: "linear"
                                }}
                                whileHover={{
                                  filter: 'drop-shadow(0 0 25px rgba(200, 180, 255, 0.5)) drop-shadow(0 0 45px rgba(180, 230, 255, 0.3))'
                                }}
                                style={{
                                  background: `
                                    radial-gradient(
                                      circle at 50% 50%,
                                      transparent 18%,
                                      rgba(255,255,255,0.08) 18%,
                                      rgba(255,255,255,0.08) 22%,
                                      transparent 22%
                                    ),
                                    conic-gradient(
                                      from 0deg,
                                      rgba(255, 200, 255, 0.4),
                                      rgba(255, 180, 200, 0.4),
                                      rgba(255, 220, 180, 0.4),
                                      rgba(200, 255, 200, 0.4),
                                      rgba(180, 230, 255, 0.4),
                                      rgba(200, 180, 255, 0.4),
                                      rgba(255, 200, 255, 0.4)
                                    )
                                  `,
                                  boxShadow: `
                                    0 0 50px rgba(200, 180, 255, 0.2),
                                    0 8px 32px rgba(0, 0, 0, 0.1),
                                    inset 0 0 30px rgba(255, 255, 255, 0.3),
                                    inset 0 -8px 20px rgba(180, 200, 255, 0.2)
                                  `,
                                  border: '3px solid rgba(255, 255, 255, 0.6)',
                                  backdropFilter: 'blur(10px)'
                                }}
                              >
                                {/* Top glossy highlight */}
                                <div 
                                  className="absolute inset-0 rounded-full"
                                  style={{
                                    background: 'linear-gradient(135deg, rgba(255,255,255,0.6) 0%, transparent 40%)',
                                    clipPath: 'ellipse(80% 35% at 50% 20%)'
                                  }}
                                />
                                
                                {/* Animated shimmer */}
                                <motion.div
                                  className="absolute inset-0 rounded-full"
                                  animate={{
                                    background: [
                                      'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.4) 50%, transparent 70%)',
                                      'linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.4) 50%, transparent 70%)',
                                      'linear-gradient(225deg, transparent 30%, rgba(255,255,255,0.4) 50%, transparent 70%)',
                                      'linear-gradient(315deg, transparent 30%, rgba(255,255,255,0.4) 50%, transparent 70%)',
                                      'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.4) 50%, transparent 70%)'
                                    ]
                                  }}
                                  transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "linear"
                                  }}
                                />
                                
                                {/* Center dark circle with color preview */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <div 
                                    className="w-14 h-14 rounded-full relative"
                                    style={{
                                      background: 'radial-gradient(circle at 35% 35%, rgba(60, 80, 120, 0.95) 0%, rgba(20, 30, 50, 0.98) 60%, rgba(10, 15, 25, 1) 100%)',
                                      boxShadow: `
                                        0 0 0 4px rgba(255,255,255,0.3),
                                        inset 0 3px 8px rgba(80, 120, 160, 0.4),
                                        inset 0 -3px 6px rgba(0,0,0,0.6),
                                        0 6px 16px rgba(0,0,0,0.4)
                                      `
                                    }}
                                  >
                                    {/* Color preview - larger */}
                                    <div className="absolute inset-1.5 rounded-full flex items-center justify-center overflow-hidden">
                                      <div 
                                        className="w-full h-full rounded-full relative"
                                        style={{ 
                                          backgroundColor: backgroundColor,
                                          boxShadow: `
                                            inset 0 0 12px rgba(0,0,0,0.25), 
                                            0 0 20px ${backgroundColor}95,
                                            inset 0 3px 8px rgba(255,255,255,0.3)
                                          `
                                        }}
                                      >
                                        {/* Glass highlight on color */}
                                        <div 
                                          className="absolute inset-0 rounded-full"
                                          style={{
                                            background: 'linear-gradient(135deg, rgba(255,255,255,0.5) 0%, transparent 50%)',
                                            clipPath: 'ellipse(60% 40% at 30% 25%)'
                                          }}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            </div>
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="stickers">
                  {/* H2: Section title */}
                  <h2 className="mb-3" style={getPanelTextStyle('label')}>Add Stickers</h2>
                  <div className="grid grid-cols-3 gap-3 max-h-96 overflow-y-auto">
                    {STICKER_CONFIGS.map(config => {
                      const StickerComponent = config.Component;
                      
                      return (
                        <motion.button
                          key={config.id}
                          onClick={() => handleStickerClick(config.id)}
                          className="relative aspect-square rounded-2xl overflow-hidden group bg-white border-2 border-gray-200"
                          whileHover={{ 
                            scale: 1.1,
                            boxShadow: '0 12px 30px rgba(0,0,0,0.2)'
                          }}
                          whileTap={{ 
                            scale: 0.88
                          }}
                        >
                          <div className="absolute inset-0 p-2">
                            <StickerComponent />
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </TabsContent>

                <TabsContent value="draw" className="space-y-4">
                  <div>
                    {/* H2: Section title */}
                    <h2 className="mb-3" style={getPanelTextStyle('label')}>Brush Type</h2>
                    <div className="grid grid-cols-2 gap-2 max-h-[240px] overflow-y-auto">
                      {BRUSH_TYPES.map(brush => {
                        const isActive = brushType === brush.id;
                        return (
                          <button
                            key={brush.id}
                            onClick={() => setBrushType(brush.id)}
                            className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all duration-150 text-left hover:scale-105 hover:shadow-md active:scale-95 ${
                              isActive
                                ? 'border-purple-500 bg-purple-50 shadow-sm'
                                : 'border-gray-200 hover:border-purple-300 bg-white'
                            }`}
                          >
                            <div className={`w-9 h-9 flex-shrink-0 ${isActive ? 'text-purple-500' : 'text-gray-500'}`}>
                              <brush.Icon />
                            </div>
                            <div className="flex-1 min-w-0">
                              {/* Label */}
                              <div className="text-[10px] leading-tight" style={getPanelTextStyle('label')}>{brush.name}</div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    {/* H2: Section title */}
                    <h2 className="mb-3" style={getPanelTextStyle('label')}>Brush Size: {drawWidth}</h2>
                    <Slider
                      value={[drawWidth]}
                      onValueChange={([value]) => setDrawWidth(value)}
                      min={1}
                      max={20}
                      step={1}
                    />
                  </div>

                  {/* Shapes Section */}
                  <div>
                    {/* H2: Section title */}
                    <h2 className="mb-3" style={getPanelTextStyle('label')}>Quick Shapes</h2>
                    <div className="grid grid-cols-3 gap-2 mb-2">
                      {SHAPE_STAMPS.map(shape => {
                        const isActive = selectedShape === shape.id;
                        return (
                          <button
                            key={shape.id}
                            onClick={() => {
                              setSelectedShape(isActive ? null : shape.id);
                              setIsEraserMode(false);
                            }}
                            className={`aspect-square p-1 rounded-lg border-2 transition-all duration-150 hover:scale-105 hover:shadow-md active:scale-95 flex flex-col items-center justify-center ${
                              isActive
                                ? 'border-purple-500 bg-purple-50 shadow-sm'
                                : 'border-gray-200 hover:border-purple-300 bg-white'
                            }`}
                            style={{ width: '70px', height: '70px' }}
                            title={shape.name}
                          >
                            {renderShapePreview(shape.id)}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    {/* H2: Section title */}
                    <h2 className="mb-3" style={getPanelTextStyle('label')}>Draw Color</h2>
                    <div className="grid grid-cols-6 gap-2 mb-3">
                      {COLORS.map(color => (
                        <button
                          key={color}
                          onClick={() => {
                            setDrawColor(color);
                            setIsEraserMode(false);
                          }}
                          className={`w-9 h-9 rounded-full transition-all duration-150 shadow-md hover:scale-125 hover:shadow-lg active:scale-95 ${
                            drawColor === color && !isEraserMode
                              ? 'scale-110 ring-2 ring-offset-2 ring-purple-500'
                              : 'ring-1 ring-black/10'
                          }`}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                    
                    {/* Color CD - Holographic CD Design */}
                    <div className="relative">
                      {/* H3: Sub-section title */}
                      <h3 className="mb-3" style={getPanelTextStyle('subtitle')}>
                        Custom Color
                      </h3>
                      
                      <label className="block cursor-pointer group">
                        <input
                          type="color"
                          value={drawColor}
                          onChange={(e) => {
                            setDrawColor(e.target.value);
                            setIsEraserMode(false);
                          }}
                          className="absolute opacity-0 w-0 h-0"
                        />
                        
                        <div className="relative p-3 bg-gradient-to-br from-white via-gray-50 to-purple-50/30 rounded-2xl border-2 border-gray-200 group-hover:border-purple-300 transition-all shadow-md group-hover:shadow-lg">
                          {/* Hex Code Display at Top */}
                          <div className="text-center mb-2">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white rounded-full shadow-sm border border-gray-200">
                              <span className="text-xs text-gray-500" style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 500 }}>#</span>
                              <span 
                                className="text-base font-mono font-semibold tracking-wider"
                                style={{ 
                                  color: drawColor,
                                  filter: 'brightness(0.7)'
                                }}
                              >
                                {drawColor.substring(1).toUpperCase()}
                              </span>
                            </div>
                          </div>
                          
                          {/* Glass-morphic CD Disc */}
                          <div className="flex justify-center mb-2 px-2 py-2">
                            <div className="relative">
                              {/* Sparkle decorations */}
                              <motion.div
                                className="absolute -top-2 -right-2 text-white text-xl"
                                animate={{ 
                                  scale: [1, 1.3, 1],
                                  opacity: [0.6, 1, 0.6]
                                }}
                                transition={{ 
                                  duration: 2,
                                  repeat: Infinity,
                                  ease: "easeInOut"
                                }}
                              >
                                ✨
                              </motion.div>
                              <motion.div
                                className="absolute -bottom-1 -left-2 text-white text-sm"
                                animate={{ 
                                  scale: [1, 1.2, 1],
                                  opacity: [0.5, 1, 0.5]
                                }}
                                transition={{ 
                                  duration: 2.5,
                                  delay: 0.5,
                                  repeat: Infinity,
                                  ease: "easeInOut"
                                }}
                              >
                                ✨
                              </motion.div>
                              
                              {/* Glass CD Disc */}
                              <motion.div 
                                className="w-32 h-32 rounded-full relative transition-all group-hover:scale-105"
                                animate={{ 
                                  rotate: [0, 360]
                                }}
                                transition={{ 
                                  duration: 25,
                                  repeat: Infinity,
                                  ease: "linear"
                                }}
                                whileHover={{
                                  filter: 'drop-shadow(0 0 25px rgba(200, 180, 255, 0.5)) drop-shadow(0 0 45px rgba(180, 230, 255, 0.3))'
                                }}
                                style={{
                                  background: `
                                    radial-gradient(
                                      circle at 50% 50%,
                                      transparent 18%,
                                      rgba(255,255,255,0.08) 18%,
                                      rgba(255,255,255,0.08) 22%,
                                      transparent 22%
                                    ),
                                    conic-gradient(
                                      from 0deg,
                                      rgba(255, 200, 255, 0.4),
                                      rgba(255, 180, 200, 0.4),
                                      rgba(255, 220, 180, 0.4),
                                      rgba(200, 255, 200, 0.4),
                                      rgba(180, 230, 255, 0.4),
                                      rgba(200, 180, 255, 0.4),
                                      rgba(255, 200, 255, 0.4)
                                    )
                                  `,
                                  boxShadow: `
                                    0 0 50px rgba(200, 180, 255, 0.2),
                                    0 8px 32px rgba(0, 0, 0, 0.1),
                                    inset 0 0 30px rgba(255, 255, 255, 0.3),
                                    inset 0 -8px 20px rgba(180, 200, 255, 0.2)
                                  `,
                                  border: '3px solid rgba(255, 255, 255, 0.6)',
                                  backdropFilter: 'blur(10px)'
                                }}
                              >
                                {/* Top glossy highlight */}
                                <div 
                                  className="absolute inset-0 rounded-full"
                                  style={{
                                    background: 'linear-gradient(135deg, rgba(255,255,255,0.6) 0%, transparent 40%)',
                                    clipPath: 'ellipse(80% 35% at 50% 20%)'
                                  }}
                                />
                                
                                {/* Animated shimmer */}
                                <motion.div
                                  className="absolute inset-0 rounded-full"
                                  animate={{
                                    background: [
                                      'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.4) 50%, transparent 70%)',
                                      'linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.4) 50%, transparent 70%)',
                                      'linear-gradient(225deg, transparent 30%, rgba(255,255,255,0.4) 50%, transparent 70%)',
                                      'linear-gradient(315deg, transparent 30%, rgba(255,255,255,0.4) 50%, transparent 70%)',
                                      'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.4) 50%, transparent 70%)'
                                    ]
                                  }}
                                  transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "linear"
                                  }}
                                />
                                
                                {/* Center dark circle with color preview */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <div 
                                    className="w-14 h-14 rounded-full relative"
                                    style={{
                                      background: 'radial-gradient(circle at 35% 35%, rgba(60, 80, 120, 0.95) 0%, rgba(20, 30, 50, 0.98) 60%, rgba(10, 15, 25, 1) 100%)',
                                      boxShadow: `
                                        0 0 0 4px rgba(255,255,255,0.3),
                                        inset 0 3px 8px rgba(80, 120, 160, 0.4),
                                        inset 0 -3px 6px rgba(0,0,0,0.6),
                                        0 6px 16px rgba(0,0,0,0.4)
                                      `
                                    }}
                                  >
                                    {/* Color preview - larger */}
                                    <div className="absolute inset-1.5 rounded-full flex items-center justify-center overflow-hidden">
                                      <div 
                                        className="w-full h-full rounded-full relative"
                                        style={{ 
                                          backgroundColor: drawColor,
                                          boxShadow: `
                                            inset 0 0 12px rgba(0,0,0,0.25), 
                                            0 0 20px ${drawColor}95,
                                            inset 0 3px 8px rgba(255,255,255,0.3)
                                          `
                                        }}
                                      >
                                        {/* Glass highlight on color */}
                                        <div 
                                          className="absolute inset-0 rounded-full"
                                          style={{
                                            background: 'linear-gradient(135deg, rgba(255,255,255,0.5) 0%, transparent 50%)',
                                            clipPath: 'ellipse(60% 40% at 30% 25%)'
                                          }}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                              
                            </div>
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div>
                    {/* H2: Section title */}
                    <h2 className="mb-3" style={getPanelTextStyle('label')}>Eraser Size: {eraserWidth}</h2>
                    <Slider
                      value={[eraserWidth]}
                      onValueChange={([value]) => setEraserWidth(value)}
                      min={5}
                      max={50}
                      step={1}
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsEraserMode(!isEraserMode);
                        setSelectedShape(null); // Deselect shape when toggling eraser
                      }}
                      className={`flex-1 transition-all duration-150 hover:scale-105 active:scale-95 ${
                        isEraserMode 
                          ? 'border-purple-500 bg-purple-50 shadow-sm text-purple-700' 
                          : ''
                      }`}
                      style={getPanelTextStyle('label')}
                    >
                      <Eraser className="w-4 h-4 mr-2" />
                      Eraser
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleUndo}
                      disabled={drawingPaths.length === 0}
                      className="transition-all duration-150 hover:scale-110 active:scale-90"
                    >
                      <Undo className="w-4 h-4" />
                    </Button>
                  </div>

                  <Button
                    variant="outline"
                    onClick={handleClearDrawing}
                    className="w-full transition-all duration-150 hover:scale-105 active:scale-95"
                    style={getPanelTextStyle('label')}
                  >
                    Clear All Drawings
                  </Button>
                </TabsContent>
              </Tabs>

              <Button
                onClick={generateFinalImage}
                className="w-full mt-6 text-white py-7 text-xl font-bold transition-all duration-200 hover:shadow-2xl active:scale-95"
                style={{ 
                  background: 'linear-gradient(135deg, #f9c6d8 0%, #d4b0e8 45%, #a8c4f0 100%)',
                  fontFamily: "'Orbitron', sans-serif"
                }}
                size="lg"
              >
                Finalize Photo
              </Button>
              </motion.div>
            )}

            {/* Collapsed state - floating toolbar on the right */}
            {isPanelCollapsed && (
              <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 100, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="fixed right-6 top-1/2 -translate-y-1/2 z-50 backdrop-blur-md rounded-full p-3 border border-white/60"
                style={{ 
                  background: 'linear-gradient(135deg, rgba(255, 240, 245, 0.95) 0%, rgba(245, 240, 255, 0.95) 25%, rgba(240, 255, 250, 0.95) 50%, rgba(255, 245, 255, 0.95) 75%, rgba(245, 250, 255, 0.95) 100%)', 
                  boxShadow: '0 8px 32px rgba(180, 120, 220, 0.3), 0 4px 16px rgba(147, 51, 234, 0.2), 0 2px 8px rgba(0,0,0,0.1)' 
                }}
              >
                <div className="flex flex-col gap-2 items-center">
                  {/* Expand button at top */}
                  <button
                    onClick={() => setIsPanelCollapsed(false)}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-transparent transition-all duration-200 hover:scale-105 active:scale-95 mb-1 text-gray-600 hover:text-gray-700"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, rgba(240, 230, 255, 0.5) 50%, rgba(255, 240, 250, 0.6) 100%)',
                      boxShadow: '0 4px 16px rgba(180, 120, 220, 0.15), 0 2px 8px rgba(0,0,0,0.05)'
                    }}
                    title="Expand Panel"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <div className="h-px w-8 bg-purple-200/50 my-1" />

                  <button
                    onClick={() => setIsPanelCollapsed(false)}
                    className="p-2.5 rounded-full bg-white/60 hover:bg-white/90 transition-all duration-200 hover:scale-110 active:scale-95"
                    title="Background"
                  >
                    <Palette className="w-5 h-5 text-purple-600" />
                  </button>
                  <button
                    onClick={() => setIsPanelCollapsed(false)}
                    className="p-2.5 rounded-full bg-white/60 hover:bg-white/90 transition-all duration-200 hover:scale-110 active:scale-95"
                    title="Filters"
                  >
                    <Sparkles className="w-5 h-5 text-purple-600" />
                  </button>
                  <button
                    onClick={() => setIsPanelCollapsed(false)}
                    className="p-2.5 rounded-full bg-white/60 hover:bg-white/90 transition-all duration-200 hover:scale-110 active:scale-95"
                    title="Stickers"
                  >
                    <Sticker className="w-5 h-5 text-purple-600" />
                  </button>
                  <button
                    onClick={() => setIsPanelCollapsed(false)}
                    className="p-2.5 rounded-full bg-white/60 hover:bg-white/90 transition-all duration-200 hover:scale-110 active:scale-95"
                    title="Draw"
                  >
                    <Pencil className="w-5 h-5 text-purple-600" />
                  </button>
                  <button
                    onClick={() => setIsPanelCollapsed(false)}
                    className="p-2.5 rounded-full bg-white/60 hover:bg-white/90 transition-all duration-200 hover:scale-110 active:scale-95"
                    title="Templates"
                  >
                    <PartyPopper className="w-5 h-5 text-purple-600" />
                  </button>

                  <div className="h-px w-8 bg-purple-200/50 my-1" />

                  <button
                    onClick={generateFinalImage}
                    className="p-2.5 rounded-full transition-all duration-200 hover:scale-110 active:scale-95 shadow-lg"
                    style={{ 
                      background: 'linear-gradient(135deg, #f9c6d8 0%, #d4b0e8 45%, #a8c4f0 100%)'
                    }}
                    title="Finalize Photo"
                  >
                    <Check className="w-5 h-5 text-white" />
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}