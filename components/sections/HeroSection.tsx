'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import FloatingLanterns from '../ui/FloatingLanterns';
import { WeddingConfig } from '@/lib/types';
import { useLanguage } from '@/lib/LanguageContext';
import { isBrideSide } from '@/lib/perspective';

interface Props { config: WeddingConfig }

const BOKEH = [
  { left: '8%',  top: '18%', w: 340, h: 340, color: '#D4878D', opacity: 0.10, dur: 7  },
  { left: '80%', top: '8%',  w: 260, h: 260, color: '#D4AF37', opacity: 0.07, dur: 9  },
  { left: '65%', top: '70%', w: 380, h: 380, color: '#E8B4B8', opacity: 0.08, dur: 8  },
  { left: '4%',  top: '75%', w: 240, h: 240, color: '#D4AF37', opacity: 0.06, dur: 11 },
  { left: '42%', top: '22%', w: 460, h: 460, color: '#C9A050', opacity: 0.04, dur: 13 },
];

const PARTICLES = [
  [7,9],[14,72],[20,31],[28,84],[35,12],[42,55],[49,88],[57,27],[64,67],[71,14],
  [78,83],[84,40],[91,19],[4,48],[22,95],[38,6],[53,62],[67,35],[82,76],[11,42],
  [31,58],[47,22],[61,79],[75,46],[93,88],[17,68],[44,15],[69,52],[86,26],[9,93],
];

function CountdownBlock({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-14 h-16 sm:w-16 sm:h-18 md:w-20 md:h-24 rounded-2xl overflow-hidden flex items-center justify-center"
        style={{
          background: 'linear-gradient(160deg, rgba(212,175,55,0.15) 0%, rgba(212,175,55,0.06) 100%)',
          border: '1px solid rgba(212,175,55,0.35)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)',
        }}>
        {/* Shine line */}
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.6), transparent)' }} />
        <span className="font-playfair font-bold text-2xl sm:text-3xl md:text-4xl tabular-nums"
          style={{ color: '#D4AF37', textShadow: '0 2px 12px rgba(212,175,55,0.4)' }}>
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <span className="text-[9px] sm:text-[10px] tracking-[0.2em] uppercase font-poppins"
        style={{ color: 'rgba(212,175,55,0.5)' }}>
        {label}
      </span>
    </div>
  );
}

export default function HeroSection({ config }: Props) {
  const { t: tr, lang: l } = useLanguage();
  const { couple } = config;
  const ml = l === 'ml';

  const activeEvents = (isBrideSide && config.eventsBride) ? config.eventsBride : config.events;
  const venue        = (isBrideSide && config.venueBride)  ? config.venueBride  : config.venue;
  const weddingDate  = (isBrideSide && config.weddingDateBride) ? config.weddingDateBride : config.weddingDate;
  const reception    = activeEvents.find((e) => e.id === 'reception');

  const groomName      = ml ? (couple.groom.nameMalayalam || couple.groom.name) : couple.groom.name;
  const brideName      = ml ? (couple.bride.nameMalayalam || couple.bride.name) : couple.bride.name;
  const eventDate      = ml ? (reception?.dateMalayalam || reception?.date) : reception?.date;
  const venueName      = ml ? (venue.nameMalayalam || venue.name) : venue.name;
  const venueAddr      = ml ? (venue.addressMalayalam || venue.address) : venue.address;
  const primaryName    = isBrideSide ? brideName  : groomName;
  const primaryArabic  = isBrideSide ? couple.bride.nameArabic : couple.groom.nameArabic;
  const secondaryName  = isBrideSide ? groomName  : brideName;
  const secondaryArabic = isBrideSide ? couple.groom.nameArabic : couple.bride.nameArabic;

  const [time, setTime]       = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [passed, setPassed]   = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const target = new Date(weddingDate).getTime();
    const tick = () => {
      const diff = target - Date.now();
      if (diff <= 0) { setPassed(true); return; }
      setTime({
        days:    Math.floor(diff / 86400000),
        hours:   Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [weddingDate]);

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0"
        style={{ background: 'linear-gradient(175deg, #0A0306 0%, #1C0810 18%, #350F1C 50%, #4A1525 65%, #350F1C 80%, #0A0306 100%)' }} />

      {/* Bokeh */}
      {BOKEH.map((b, i) => (
        <motion.div key={i} className="absolute rounded-full pointer-events-none"
          style={{
            left: b.left, top: b.top, width: b.w, height: b.h,
            transform: 'translate(-50%,-50%)',
            background: `radial-gradient(circle, ${b.color} 0%, ${b.color}33 40%, transparent 70%)`,
            filter: 'blur(40px)', opacity: b.opacity,
          }}
          animate={{ scale: [1, 1.15, 1], opacity: [b.opacity, b.opacity * 1.6, b.opacity] }}
          transition={{ duration: b.dur, repeat: Infinity, ease: 'easeInOut', delay: i * 0.7 }} />
      ))}

      {/* Central glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 75% 65% at 50% 50%, rgba(212,175,55,0.06) 0%, rgba(212,135,141,0.04) 40%, transparent 70%)' }} />

      {/* Decorative wreath ring */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ opacity: 0.06 }}>
        <svg viewBox="0 0 600 600" className="w-[min(90vw,640px)] h-[min(90vw,640px)]">
          <circle cx="300" cy="300" r="280" fill="none" stroke="#D4AF37" strokeWidth="0.6" strokeDasharray="4 10" />
          <circle cx="300" cy="300" r="190" fill="none" stroke="#E8B4B8" strokeWidth="0.4" strokeDasharray="2 6" />
          {[...Array(16)].map((_, i) => {
            const a = (i * Math.PI * 2) / 16;
            return <circle key={i} cx={300 + 280 * Math.cos(a)} cy={300 + 280 * Math.sin(a)} r="3.5" fill="#D4AF37" opacity="0.7" />;
          })}
          {[...Array(8)].map((_, i) => {
            const a = (i * Math.PI * 2) / 8 - Math.PI / 2;
            const cx = 300 + 235 * Math.cos(a);
            const cy = 300 + 235 * Math.sin(a);
            return (
              <g key={i} transform={`translate(${cx},${cy}) rotate(${i * 45})`}>
                {[0,60,120,180,240,300].map((pa) => {
                  const pr = (pa * Math.PI) / 180;
                  return <ellipse key={pa} cx={10 * Math.cos(pr)} cy={10 * Math.sin(pr)} rx="7" ry="4"
                    transform={`rotate(${pa})`} fill="none" stroke="#E8B4B8" strokeWidth="0.6" />;
                })}
                <circle cx="0" cy="0" r="3" fill="#D4AF37" opacity="0.6" />
              </g>
            );
          })}
        </svg>
      </div>

      {/* Corner florals */}
      <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.22 }}>
        {(['none', 'scaleX(-1)', 'scaleY(-1)', 'scale(-1,-1)'] as const).map((tf, i) => (
          <svg key={i} className="absolute w-44 h-44 md:w-64 md:h-64" viewBox="0 0 200 200" fill="none"
            style={{
              top: i < 2 ? 0 : 'auto', bottom: i >= 2 ? 0 : 'auto',
              left: i % 2 === 0 ? 0 : 'auto', right: i % 2 === 1 ? 0 : 'auto',
              transform: tf,
            }}>
            <path d="M8 8 Q38 8 58 28 Q78 48 78 82" stroke="#D4AF37" strokeWidth="1.2" fill="none" />
            <path d="M8 8 Q18 38 38 54 Q58 68 78 82" stroke="#D4AF37" strokeWidth="0.6" fill="none" />
            <ellipse cx="54" cy="26" rx="13" ry="7.5" transform="rotate(-40 54 26)" fill="none" stroke="#E8B4B8" strokeWidth="0.9" />
            <ellipse cx="28" cy="50" rx="11" ry="6.5" transform="rotate(-70 28 50)" fill="none" stroke="#E8B4B8" strokeWidth="0.9" />
            <ellipse cx="68" cy="56" rx="9" ry="5.5" transform="rotate(-20 68 56)" fill="none" stroke="#E8B4B8" strokeWidth="0.9" />
            <circle cx="54" cy="22" r="3" fill="#D4AF37" opacity="0.8" />
          </svg>
        ))}
      </div>

      {/* Particles */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.45 }}>
        {PARTICLES.map(([cx, cy], i) => (
          <motion.circle key={i} cx={`${cx}%`} cy={`${cy}%`}
            r={(i % 5 === 0) ? 1.5 : (i % 3 === 0) ? 1.0 : 0.6}
            fill={i % 3 === 0 ? '#E8B4B8' : '#D4AF37'}
            initial={{ opacity: 0.06 + (i % 5) * 0.04 }}
            animate={{ opacity: [0.06 + (i % 5) * 0.04, 0.5 + (i % 4) * 0.1, 0.06 + (i % 5) * 0.04] }}
            transition={{ duration: 2.5 + (i % 4) * 0.8, repeat: Infinity, delay: (i % 7) * 0.3 }} />
        ))}
      </svg>

      <FloatingLanterns />

      {/* ── Content ── */}
      <div className="relative z-10 flex flex-col items-center text-center w-full max-w-xl mx-auto px-6 pt-24 pb-14 md:pt-32 md:pb-20">

        {/* Eyebrow label */}
        <motion.div className="flex items-center gap-4 mb-8"
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
          <div className="h-px w-10" style={{ background: 'linear-gradient(to right, transparent, rgba(212,175,55,0.6))' }} />
          <p className={`text-[10px] tracking-[0.4em] uppercase ${ml ? 'font-malayalam tracking-normal text-xs' : 'font-poppins'}`}
            style={{ color: 'rgba(212,175,55,0.75)' }}>
            {tr.hero.togetherWith}
          </p>
          <div className="h-px w-10" style={{ background: 'linear-gradient(to left, transparent, rgba(212,175,55,0.6))' }} />
        </motion.div>

        {/* Primary name */}
        <motion.div className="mb-1"
          initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, delay: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}>
          <h1 className={`leading-[1.05] tracking-tight ${ml ? 'font-malayalam' : 'font-playfair'}`}
            style={{ fontSize: 'clamp(2.8rem, 11vw, 7rem)', color: '#FFFDF7', textShadow: '0 6px 40px rgba(10,3,6,0.7)' }}>
            {primaryName}
          </h1>
          <p className="font-amiri text-xl mt-2" style={{ color: 'rgba(232,180,184,0.5)' }} dir="rtl">
            {primaryArabic}
          </p>
        </motion.div>

        {/* Ornament divider */}
        <motion.div className="flex items-center gap-4 my-5"
          initial={{ opacity: 0, scaleX: 0.4 }} animate={{ opacity: 1, scaleX: 1 }} transition={{ duration: 0.9, delay: 0.82 }}>
          <div className="h-px flex-1 max-w-20" style={{ background: 'linear-gradient(to right, transparent, rgba(212,175,55,0.45))' }} />
          <svg width="50" height="26" viewBox="0 0 50 26" fill="none">
            {[0,40,80,120,160,200,240,280].map((pa) => {
              const pr = (pa * Math.PI) / 180;
              return <ellipse key={pa} cx={25 + 8 * Math.cos(pr)} cy={13 + 8 * Math.sin(pr)} rx="6.5" ry="3.5"
                transform={`rotate(${pa}, ${25 + 8 * Math.cos(pr)}, ${13 + 8 * Math.sin(pr)})`}
                fill="none" stroke="#E8B4B8" strokeWidth="0.85" opacity="0.85" />;
            })}
            <circle cx="25" cy="13" r="3" fill="#D4AF37" opacity="0.9" />
            <line x1="2" y1="13" x2="14" y2="13" stroke="rgba(212,175,55,0.4)" strokeWidth="0.8" />
            <line x1="36" y1="13" x2="48" y2="13" stroke="rgba(212,175,55,0.4)" strokeWidth="0.8" />
          </svg>
          <div className="h-px flex-1 max-w-20" style={{ background: 'linear-gradient(to left, transparent, rgba(212,175,55,0.45))' }} />
        </motion.div>

        {/* Secondary name */}
        <motion.div className="mb-7"
          initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, delay: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}>
          <h1 className={`leading-[1.05] tracking-tight ${ml ? 'font-malayalam' : 'font-playfair'}`}
            style={{ fontSize: 'clamp(2.8rem, 11vw, 7rem)', color: '#FFFDF7', textShadow: '0 6px 40px rgba(10,3,6,0.7)' }}>
            {secondaryName}
          </h1>
          <p className="font-amiri text-xl mt-2" style={{ color: 'rgba(232,180,184,0.5)' }} dir="rtl">
            {secondaryArabic}
          </p>
        </motion.div>

        {/* Quran verse */}
        <motion.div className="mb-8 px-4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.05, duration: 0.8 }}>
          <p className={`leading-relaxed ${ml ? 'font-malayalam text-sm' : 'font-playfair italic text-base md:text-lg'}`}
            style={{ color: 'rgba(232,180,184,0.45)' }}>
            {tr.quran.verse}
          </p>
          <p className="font-poppins text-[10px] tracking-[0.25em] uppercase mt-2"
            style={{ color: 'rgba(212,175,55,0.35)' }}>
            {tr.quran.ref}
          </p>
        </motion.div>

        {/* ── Info card ── */}
        <motion.div className="w-full rounded-3xl overflow-hidden mb-7"
          style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(212,175,55,0.25)' }}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.15, duration: 0.8 }}>
          {/* Gold top stripe */}
          <div className="h-0.5" style={{ background: 'linear-gradient(90deg, transparent, #D4AF37 25%, #E8CC6A 50%, #D4AF37 75%, transparent)' }} />

          <div style={{ background: 'rgba(10,3,6,0.55)', backdropFilter: 'blur(20px)' }}>
            {/* Date + Time */}
            <div className="flex items-stretch divide-x"
              style={{ borderBottom: '1px solid rgba(212,175,55,0.1)', divideColor: 'rgba(212,175,55,0.1)' } as React.CSSProperties}>
              <div className="flex-1 flex flex-col items-center justify-center gap-1.5 py-5">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(212,175,55,0.6)" strokeWidth="1.8">
                  <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                <p className="font-poppins text-[10px] tracking-[0.25em] uppercase" style={{ color: 'rgba(212,175,55,0.5)' }}>
                  {ml ? 'തീയതി' : 'Date'}
                </p>
                <p className={`text-sm font-semibold leading-snug ${ml ? 'font-malayalam' : 'font-poppins'}`}
                  style={{ color: '#D4AF37' }}>
                  {eventDate}
                </p>
              </div>
              <div className="flex-1 flex flex-col items-center justify-center gap-1.5 py-5"
                style={{ borderLeft: '1px solid rgba(212,175,55,0.1)' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(212,175,55,0.6)" strokeWidth="1.8">
                  <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                </svg>
                <p className="font-poppins text-[10px] tracking-[0.25em] uppercase" style={{ color: 'rgba(212,175,55,0.5)' }}>
                  {ml ? 'സമയം' : 'Time'}
                </p>
                <p className={`text-sm font-semibold ${ml ? 'font-malayalam' : 'font-poppins'}`}
                  style={{ color: '#D4AF37' }}>
                  {reception?.time}
                </p>
              </div>
            </div>

            {/* Venue */}
            <div className="flex flex-col items-center justify-center gap-1.5 px-6 py-5">
              <div className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.2)' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.8">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <p className={`text-sm font-semibold leading-snug text-center ${ml ? 'font-malayalam' : 'font-poppins'}`}
                style={{ color: 'rgba(255,253,247,0.92)' }}>
                {venueName}
              </p>
              <p className={`text-xs leading-snug text-center ${ml ? 'font-malayalam' : 'font-poppins'}`}
                style={{ color: 'rgba(255,253,247,0.5)' }}>
                {venueAddr}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Countdown */}
        {mounted && !passed && (
          <motion.div className="flex items-end justify-center gap-3 sm:gap-4 mb-8"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3, duration: 0.7 }}>
            <CountdownBlock value={time.days}    label={ml ? 'ദിവസം' : 'Days'} />
            <CountdownBlock value={time.hours}   label={ml ? 'മണിക്കൂർ' : 'Hours'} />
            <CountdownBlock value={time.minutes} label={ml ? 'മിനിറ്റ്' : 'Mins'} />
            <CountdownBlock value={time.seconds} label={ml ? 'സെക്കൻഡ്' : 'Secs'} />
          </motion.div>
        )}
        {mounted && passed && (
          <motion.p className={`text-lg mb-8 ${ml ? 'font-malayalam' : 'font-playfair italic'}`}
            style={{ color: 'rgba(212,175,55,0.85)' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}>
            {ml ? 'ആഘോഷം ആരംഭിച്ചു!' : 'The celebration has begun!'}
          </motion.p>
        )}

        {/* Get Directions */}
        <motion.a
          href={venue.directionsUrl} target="_blank" rel="noopener noreferrer"
          className={`inline-flex items-center gap-3 px-8 py-3.5 rounded-full text-sm font-bold transition-all ${ml ? 'font-malayalam' : 'font-poppins tracking-wide'}`}
          style={{ background: 'linear-gradient(135deg, #D4AF37 0%, #E8CC6A 50%, #C5A028 100%)', color: '#1C0810', boxShadow: '0 6px 28px rgba(212,175,55,0.4), 0 2px 0 rgba(255,255,255,0.15) inset' }}
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.45, duration: 0.7 }}
          whileHover={{ scale: 1.05, boxShadow: '0 10px 36px rgba(212,175,55,0.55)' }}
          whileTap={{ scale: 0.97 }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polygon points="3 11 22 2 13 21 11 13 3 11"/>
          </svg>
          {ml ? 'വഴി കാണിക്കൂ' : 'Get Directions'}
        </motion.a>
      </div>
    </section>
  );
}
