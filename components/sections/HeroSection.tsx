'use client';

import { motion } from 'framer-motion';
import FloatingLanterns from '../ui/FloatingLanterns';
import { WeddingConfig } from '@/lib/types';
import { useLanguage } from '@/lib/LanguageContext';

interface Props { config: WeddingConfig }

const BOKEH = [
  { left: '8%',  top: '18%', w: 280, h: 280, color: '#C9997A', opacity: 0.10, dur: 7  },
  { left: '78%', top: '10%', w: 220, h: 220, color: '#B8922A', opacity: 0.07, dur: 9  },
  { left: '62%', top: '68%', w: 320, h: 320, color: '#D4A8A0', opacity: 0.08, dur: 8  },
  { left: '5%',  top: '72%', w: 200, h: 200, color: '#B8922A', opacity: 0.06, dur: 11 },
  { left: '40%', top: '25%', w: 400, h: 400, color: '#C9997A', opacity: 0.04, dur: 13 },
  { left: '20%', top: '85%', w: 180, h: 180, color: '#D4A8A0', opacity: 0.08, dur: 6  },
  { left: '88%', top: '50%', w: 240, h: 240, color: '#C9997A', opacity: 0.06, dur: 10 },
];

const PARTICLES = [
  [7,9],[14,72],[20,31],[28,84],[35,12],[42,55],[49,88],[57,27],[64,67],[71,14],
  [78,83],[84,40],[91,19],[4,48],[22,95],[38,6],[53,62],[67,35],[82,76],[11,42],
  [31,58],[47,22],[61,79],[75,46],[93,88],[17,68],[44,15],[69,52],[86,26],[9,93],
  [26,37],[51,8],[73,61],[88,32],[3,76],[19,44],[36,90],[58,18],[76,55],[95,70],
];

export default function HeroSection({ config }: Props) {
  const { t: tr, lang: l } = useLanguage();
  const { couple, events, venue } = config;
  const ml = l === 'ml';
  const reception = events.find((e) => e.id === 'reception');

  const groomName = ml ? (couple.groom.nameMalayalam || couple.groom.name) : couple.groom.name;
  const brideName = ml ? (couple.bride.nameMalayalam || couple.bride.name) : couple.bride.name;
  const eventDate = ml ? (reception?.dateMalayalam || reception?.date) : reception?.date;
  const venueName = ml ? (venue.nameMalayalam || venue.name) : venue.name;

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">

      {/* Base gradient */}
      <div className="absolute inset-0"
        style={{ background: 'linear-gradient(175deg, #FAF4F1 0%, #F5ECE8 20%, #EDE2DC 50%, #F2E8E3 70%, #FAF4F1 100%)' }} />

      {/* Bokeh orbs */}
      {BOKEH.map((b, i) => (
        <motion.div key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: b.left, top: b.top,
            width: b.w, height: b.h,
            transform: 'translate(-50%,-50%)',
            background: `radial-gradient(circle, ${b.color} 0%, ${b.color}44 30%, transparent 70%)`,
            filter: 'blur(32px)',
            opacity: b.opacity,
          }}
          animate={{ scale: [1, 1.18, 1], opacity: [b.opacity, b.opacity * 1.5, b.opacity] }}
          transition={{ duration: b.dur, repeat: Infinity, ease: 'easeInOut', delay: i * 0.6 }} />
      ))}

      {/* Central radial glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 70% at 50% 52%, rgba(139,74,42,0.06) 0%, rgba(122,48,64,0.04) 35%, transparent 68%)' }} />

      {/* Floral wreath background decoration */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ opacity: 0.07 }}>
        <svg viewBox="0 0 600 600" className="w-[min(80vw,600px)] h-[min(80vw,600px)]">
          {/* Outer ring */}
          <circle cx="300" cy="300" r="275" fill="none" stroke="#8B4A2A" strokeWidth="0.5" strokeDasharray="3 8" />
          {/* 8 large rose blooms around the ring */}
          {[...Array(8)].map((_, i) => {
            const a = (i * Math.PI * 2) / 8 - Math.PI / 2;
            const cx = 300 + 230 * Math.cos(a);
            const cy = 300 + 230 * Math.sin(a);
            return (
              <g key={i} transform={`translate(${cx},${cy}) rotate(${(i * 45)})`}>
                {/* Rose petals */}
                {[0,45,90,135,180,225,270,315].map((pa) => {
                  const pr = (pa * Math.PI) / 180;
                  const px = 16 * Math.cos(pr);
                  const py = 16 * Math.sin(pr);
                  return <ellipse key={pa} cx={px * 0.6} cy={py * 0.6} rx="8" ry="5"
                    transform={`rotate(${pa})`}
                    fill="none" stroke="#7A3040" strokeWidth="0.7" />;
                })}
                <circle cx="0" cy="0" r="4" fill="none" stroke="#8B4A2A" strokeWidth="0.8" />
              </g>
            );
          })}
          {/* 8 leaf sprigs between roses */}
          {[...Array(8)].map((_, i) => {
            const a = (i * Math.PI * 2) / 8 - Math.PI / 8 * 3;
            const cx = 300 + 230 * Math.cos(a);
            const cy = 300 + 230 * Math.sin(a);
            const angle = (a * 180) / Math.PI + 90;
            return (
              <g key={`l${i}`} transform={`translate(${cx},${cy}) rotate(${angle})`}>
                <ellipse cx="0" cy="-10" rx="6" ry="12" fill="none" stroke="#8B4A2A" strokeWidth="0.6" />
                <line x1="0" y1="-2" x2="0" y2="-18" stroke="#8B4A2A" strokeWidth="0.5" />
              </g>
            );
          })}
          {/* Inner wreath ring */}
          <circle cx="300" cy="300" r="180" fill="none" stroke="#7A3040" strokeWidth="0.4" strokeDasharray="2 5" />
          {/* 12 small blossom dots on inner ring */}
          {[...Array(12)].map((_, i) => {
            const a = (i * Math.PI * 2) / 12;
            const px = 300 + 180 * Math.cos(a);
            const py = 300 + 180 * Math.sin(a);
            return <circle key={`d${i}`} cx={px} cy={py} r="3" fill="#8B4A2A" opacity="0.8" />;
          })}
          {/* Central ornament */}
          {[...Array(6)].map((_, i) => {
            const a = (i * Math.PI * 2) / 6;
            return <ellipse key={`c${i}`} cx={300 + 55 * Math.cos(a)} cy={300 + 55 * Math.sin(a)}
              rx="20" ry="9" transform={`rotate(${i * 60}, ${300 + 55 * Math.cos(a)}, ${300 + 55 * Math.sin(a)})`}
              fill="none" stroke="#8B4A2A" strokeWidth="0.8" />;
          })}
          <circle cx="300" cy="300" r="22" fill="none" stroke="#8B4A2A" strokeWidth="1" />
          <circle cx="300" cy="300" r="8" fill="#8B4A2A" opacity="0.4" />
        </svg>
      </div>

      {/* Floral corner sprays */}
      <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.18 }}>
        {/* Top-left corner */}
        <svg className="absolute top-0 left-0 w-48 h-48 md:w-64 md:h-64" viewBox="0 0 200 200" fill="none">
          <path d="M10 10 Q40 10 60 30 Q80 50 80 80" stroke="#8B4A2A" strokeWidth="1.2" fill="none" />
          <path d="M10 10 Q20 40 40 55 Q60 70 80 80" stroke="#8B4A2A" strokeWidth="0.7" fill="none" />
          <ellipse cx="55" cy="28" rx="14" ry="8" transform="rotate(-40 55 28)" fill="none" stroke="#7A3040" strokeWidth="0.9" />
          <ellipse cx="30" cy="52" rx="12" ry="7" transform="rotate(-70 30 52)" fill="none" stroke="#7A3040" strokeWidth="0.9" />
          <ellipse cx="70" cy="58" rx="10" ry="6" transform="rotate(-20 70 58)" fill="none" stroke="#7A3040" strokeWidth="0.9" />
          {[0,60,120,180,240,300].map((pa) => {
            const pr = (pa * Math.PI) / 180;
            return <line key={pa} x1={56 + 12 * Math.cos(pr)} y1={24 + 12 * Math.sin(pr)}
              x2={56 + 18 * Math.cos(pr)} y2={24 + 18 * Math.sin(pr)} stroke="#8B4A2A" strokeWidth="0.6" />;
          })}
          <circle cx="56" cy="24" r="3.5" fill="#8B4A2A" opacity="0.7" />
          <path d="M75 72 Q90 65 95 75 Q100 85 85 85" fill="none" stroke="#8B4A2A" strokeWidth="0.7" />
        </svg>
        {/* Top-right corner (mirrored) */}
        <svg className="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64" viewBox="0 0 200 200" fill="none" style={{ transform: 'scaleX(-1)' }}>
          <path d="M10 10 Q40 10 60 30 Q80 50 80 80" stroke="#8B4A2A" strokeWidth="1.2" fill="none" />
          <path d="M10 10 Q20 40 40 55 Q60 70 80 80" stroke="#8B4A2A" strokeWidth="0.7" fill="none" />
          <ellipse cx="55" cy="28" rx="14" ry="8" transform="rotate(-40 55 28)" fill="none" stroke="#7A3040" strokeWidth="0.9" />
          <ellipse cx="30" cy="52" rx="12" ry="7" transform="rotate(-70 30 52)" fill="none" stroke="#7A3040" strokeWidth="0.9" />
          <ellipse cx="70" cy="58" rx="10" ry="6" transform="rotate(-20 70 58)" fill="none" stroke="#7A3040" strokeWidth="0.9" />
          {[0,60,120,180,240,300].map((pa) => {
            const pr = (pa * Math.PI) / 180;
            return <line key={pa} x1={56 + 12 * Math.cos(pr)} y1={24 + 12 * Math.sin(pr)}
              x2={56 + 18 * Math.cos(pr)} y2={24 + 18 * Math.sin(pr)} stroke="#8B4A2A" strokeWidth="0.6" />;
          })}
          <circle cx="56" cy="24" r="3.5" fill="#8B4A2A" opacity="0.7" />
          <path d="M75 72 Q90 65 95 75 Q100 85 85 85" fill="none" stroke="#8B4A2A" strokeWidth="0.7" />
        </svg>
        {/* Bottom-left corner (flipped) */}
        <svg className="absolute bottom-0 left-0 w-48 h-48 md:w-64 md:h-64" viewBox="0 0 200 200" fill="none" style={{ transform: 'scaleY(-1)' }}>
          <path d="M10 10 Q40 10 60 30 Q80 50 80 80" stroke="#8B4A2A" strokeWidth="1.2" fill="none" />
          <ellipse cx="55" cy="28" rx="14" ry="8" transform="rotate(-40 55 28)" fill="none" stroke="#7A3040" strokeWidth="0.9" />
          <ellipse cx="30" cy="52" rx="12" ry="7" transform="rotate(-70 30 52)" fill="none" stroke="#7A3040" strokeWidth="0.9" />
          <circle cx="56" cy="24" r="3.5" fill="#8B4A2A" opacity="0.7" />
        </svg>
        {/* Bottom-right corner */}
        <svg className="absolute bottom-0 right-0 w-48 h-48 md:w-64 md:h-64" viewBox="0 0 200 200" fill="none" style={{ transform: 'scale(-1,-1)' }}>
          <path d="M10 10 Q40 10 60 30 Q80 50 80 80" stroke="#8B4A2A" strokeWidth="1.2" fill="none" />
          <ellipse cx="55" cy="28" rx="14" ry="8" transform="rotate(-40 55 28)" fill="none" stroke="#7A3040" strokeWidth="0.9" />
          <ellipse cx="30" cy="52" rx="12" ry="7" transform="rotate(-70 30 52)" fill="none" stroke="#7A3040" strokeWidth="0.9" />
          <circle cx="56" cy="24" r="3.5" fill="#8B4A2A" opacity="0.7" />
        </svg>
      </div>

      {/* Particle field */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.5 }}>
        {PARTICLES.map(([cx, cy], i) => {
          const isRose = i % 3 === 0;
          const r = (i % 5 === 0) ? 1.4 : (i % 3 === 0) ? 1.0 : 0.65;
          return (
            <motion.circle key={i} cx={`${cx}%`} cy={`${cy}%`} r={r}
              fill={isRose ? '#7A3040' : '#8B4A2A'}
              initial={{ opacity: 0.07 + (i % 5) * 0.04 }}
              animate={{ opacity: [0.07 + (i % 5) * 0.04, 0.55 + (i % 4) * 0.1, 0.07 + (i % 5) * 0.04] }}
              transition={{ duration: 2 + (i % 4) * 0.9, repeat: Infinity, delay: (i % 7) * 0.28 }} />
          );
        })}
      </svg>

      {/* Floating lanterns */}
      <FloatingLanterns />

      {/* Content */}
      <div className="relative flex flex-col items-center text-center px-5 md:px-6 pt-24 pb-16 md:pt-32 md:pb-24 max-w-2xl mx-auto" style={{ zIndex: 3 }}>

        {/* Eyebrow */}
        <motion.div className="flex items-center gap-3 mb-7"
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5 }}>
          <div className="h-px w-8" style={{ background: 'rgba(139,74,42,0.45)' }} />
          <p className={`text-xs tracking-[0.3em] uppercase ${ml ? 'font-malayalam tracking-normal' : 'font-poppins'}`}
            style={{ color: 'rgba(139,74,42,0.75)' }}>
            {tr.hero.togetherWith}
          </p>
          <div className="h-px w-8" style={{ background: 'rgba(139,74,42,0.45)' }} />
        </motion.div>

        {/* Groom name */}
        <motion.div className="mb-3"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.7 }}>
          <h1 className={`font-bold leading-none ${ml ? 'font-malayalam' : 'font-playfair'}`}
            style={{ fontSize: 'clamp(2.4rem, 10vw, 6.5rem)', color: '#3C1020', textShadow: '0 2px 16px rgba(139,74,42,0.12)', lineHeight: 1.1 }}>
            {groomName}
          </h1>
          <p className="font-amiri text-xl mt-2" style={{ color: 'rgba(122,48,64,0.55)' }} dir="rtl">
            {couple.groom.nameArabic}
          </p>
        </motion.div>

        {/* Floral divider */}
        <motion.div className="flex items-center gap-3 my-5"
          initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.95 }}>
          <div className="h-px w-10 md:w-16" style={{ background: 'linear-gradient(to right, transparent, rgba(139,74,42,0.45))' }} />
          <svg width="48" height="36" viewBox="0 0 48 36" fill="none">
            {/* Central rose */}
            {[0,45,90,135,180,225,270,315].map((pa) => {
              const pr = (pa * Math.PI) / 180;
              return <ellipse key={pa} cx={24 + 9 * Math.cos(pr)} cy={18 + 9 * Math.sin(pr)} rx="7" ry="4"
                transform={`rotate(${pa}, ${24 + 9 * Math.cos(pr)}, ${18 + 9 * Math.sin(pr)})`}
                fill="none" stroke="#7A3040" strokeWidth="0.9" opacity="0.9" />;
            })}
            <circle cx="24" cy="18" r="3.5" fill="#8B4A2A" opacity="0.8" />
            {/* Left leaf */}
            <ellipse cx="7" cy="18" rx="7" ry="4" fill="none" stroke="#8B4A2A" strokeWidth="0.8" opacity="0.7" />
            <line x1="7" y1="14" x2="7" y2="22" stroke="#8B4A2A" strokeWidth="0.6" opacity="0.6" />
            {/* Right leaf */}
            <ellipse cx="41" cy="18" rx="7" ry="4" fill="none" stroke="#8B4A2A" strokeWidth="0.8" opacity="0.7" />
            <line x1="41" y1="14" x2="41" y2="22" stroke="#8B4A2A" strokeWidth="0.6" opacity="0.6" />
          </svg>
          <div className="h-px w-10 md:w-16" style={{ background: 'linear-gradient(to left, transparent, rgba(139,74,42,0.45))' }} />
        </motion.div>

        {/* Bride name */}
        <motion.div className="mb-10"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 1.05 }}>
          <h1 className={`font-bold leading-none ${ml ? 'font-malayalam' : 'font-playfair'}`}
            style={{ fontSize: 'clamp(2.4rem, 10vw, 6.5rem)', color: '#3C1020', textShadow: '0 2px 16px rgba(139,74,42,0.12)', lineHeight: 1.1 }}>
            {brideName}
          </h1>
          <p className="font-amiri text-xl mt-2" style={{ color: 'rgba(122,48,64,0.55)' }} dir="rtl">
            {couple.bride.nameArabic}
          </p>
        </motion.div>

        {/* Date + Venue chips */}
        <motion.div className="flex flex-col sm:flex-row items-center gap-3 mb-10"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.25 }}>
          <div className="flex items-center gap-2 px-5 py-2.5 rounded-full"
            style={{ background: 'rgba(139,74,42,0.1)', border: '1px solid rgba(139,74,42,0.35)' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#8B4A2A" strokeWidth="2.2">
              <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            <span className={`text-sm font-semibold ${ml ? 'font-malayalam' : 'font-poppins'}`} style={{ color: '#8B4A2A' }}>
              {eventDate}
            </span>
          </div>
          <div className="hidden sm:block w-1 h-1 rounded-full" style={{ background: 'rgba(122,48,64,0.3)' }} />
          <div className="flex items-center gap-2 px-5 py-2.5 rounded-full"
            style={{ background: 'rgba(122,48,64,0.08)', border: '1px solid rgba(122,48,64,0.2)' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#7A3040" strokeWidth="2.2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
            </svg>
            <span className={`text-sm ${ml ? 'font-malayalam' : 'font-poppins'}`} style={{ color: 'rgba(60,16,32,0.65)' }}>
              {venueName}
            </span>
          </div>
        </motion.div>

        {/* Invitation text + scroll cue */}
        <motion.div className="flex flex-col items-center gap-4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
          <p className={`text-xs tracking-widest uppercase ${ml ? 'font-malayalam tracking-normal text-sm' : 'font-poppins'}`}
            style={{ color: 'rgba(122,48,64,0.65)' }}>
            {tr.hero.joinUs}
          </p>
          <motion.div className="w-5 h-8 rounded-full flex items-start justify-center pt-1.5"
            style={{ border: '1.5px solid rgba(139,74,42,0.3)' }}
            animate={{ y: [0, 8, 0] }} transition={{ duration: 2.5, repeat: Infinity }}>
            <motion.div className="w-1 h-2 rounded-full" style={{ background: '#8B4A2A' }}
              animate={{ y: [0, 10, 0], opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity }} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
