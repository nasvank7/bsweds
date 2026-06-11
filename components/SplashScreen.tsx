'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';

interface Props { onOpen: () => void }

const BOKEH = [
  { l: '8%',  t: '18%', w: 220, c: '#E8B4B8', o: 0.13, d: 7  },
  { l: '88%', t: '12%', w: 180, c: '#D4AF37', o: 0.09, d: 9  },
  { l: '75%', t: '74%', w: 260, c: '#E8B4B8', o: 0.10, d: 8  },
  { l: '14%', t: '80%', w: 200, c: '#D4AF37', o: 0.07, d: 11 },
  { l: '50%', t: '48%', w: 380, c: '#C9A050', o: 0.05, d: 14 },
  { l: '38%', t: '10%', w: 140, c: '#D4878D', o: 0.08, d: 10 },
];

const STARS = [
  [8,14],[16,72],[24,30],[33,86],[41,10],[50,58],[59,27],[67,74],[75,18],[83,62],
  [91,40],[5,52],[29,8],[46,88],[63,44],[79,22],[96,66],[12,95],[37,35],[55,78],
  [22,48],[70,15],[44,67],[88,33],[3,90],[60,5],[77,55],[15,42],[38,72],[92,28],
];

export default function SplashScreen({ onOpen }: Props) {
  const { t, lang } = useLanguage();
  const ml = lang === 'ml';

  useEffect(() => {
    const id = setTimeout(onOpen, 4600);
    return () => clearTimeout(id);
  }, [onOpen]);

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(150deg, #07020A 0%, #1A0810 22%, #3C1020 52%, #250D18 75%, #07020A 100%)' }}
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.85, ease: [0.4, 0, 0.2, 1] }}>

      {/* ── Bokeh orbs ── */}
      {BOKEH.map((b, i) => (
        <motion.div key={i} className="absolute rounded-full pointer-events-none"
          style={{
            left: b.l, top: b.t, width: b.w, height: b.w,
            transform: 'translate(-50%,-50%)',
            background: `radial-gradient(circle, ${b.c} 0%, ${b.c}55 35%, transparent 70%)`,
            filter: 'blur(28px)', opacity: b.o,
          }}
          animate={{ scale: [1, 1.25, 1], opacity: [b.o, b.o * 1.6, b.o] }}
          transition={{ duration: b.d, repeat: Infinity, ease: 'easeInOut', delay: i * 0.8 }} />
      ))}

      {/* ── Star field ── */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.55 }}>
        {STARS.map(([cx, cy], i) => (
          <motion.circle key={i} cx={`${cx}%`} cy={`${cy}%`}
            r={i % 5 === 0 ? 1.4 : i % 3 === 0 ? 1.0 : 0.6}
            fill={i % 4 === 0 ? '#E8B4B8' : '#D4AF37'}
            initial={{ opacity: 0.06 }}
            animate={{ opacity: [0.06, 0.7, 0.06] }}
            transition={{ duration: 2 + (i % 5) * 0.55, repeat: Infinity, delay: (i % 7) * 0.3 }} />
        ))}
      </svg>

      {/* ── Large floral mandala background ── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ opacity: 0.07 }}>
        <svg viewBox="0 0 700 700" className="w-[min(110vw,700px)] h-[min(110vw,700px)]">
          {/* Outermost ring */}
          <circle cx="350" cy="350" r="338" fill="none" stroke="#D4AF37" strokeWidth="0.5" strokeDasharray="4 9" />
          {/* 12 rose clusters on outer ring */}
          {[...Array(12)].map((_, i) => {
            const a = (i * Math.PI * 2) / 12 - Math.PI / 2;
            const cx = 350 + 294 * Math.cos(a);
            const cy = 350 + 294 * Math.sin(a);
            return (
              <g key={i} transform={`translate(${cx},${cy}) rotate(${i * 30})`}>
                {[0,45,90,135,180,225,270,315].map((pa) => {
                  const pr = (pa * Math.PI) / 180;
                  return <ellipse key={pa} cx={16 * Math.cos(pr)} cy={16 * Math.sin(pr)}
                    rx="13" ry="6.5" transform={`rotate(${pa})`}
                    fill="none" stroke="#E8B4B8" strokeWidth="0.8" />;
                })}
                <circle cx="0" cy="0" r="4.5" fill="none" stroke="#D4AF37" strokeWidth="1" />
              </g>
            );
          })}
          {/* 12 leaf sprigs between */}
          {[...Array(12)].map((_, i) => {
            const a = (i * Math.PI * 2) / 12 - Math.PI / 12 * 3;
            const cx = 350 + 288 * Math.cos(a);
            const cy = 350 + 288 * Math.sin(a);
            const ang = (a * 180) / Math.PI + 90;
            return (
              <g key={`l${i}`} transform={`translate(${cx},${cy}) rotate(${ang})`}>
                <ellipse cx="0" cy="-11" rx="6" ry="13" fill="none" stroke="#D4AF37" strokeWidth="0.6" />
                <line x1="0" y1="-2" x2="0" y2="-20" stroke="#D4AF37" strokeWidth="0.5" />
              </g>
            );
          })}
          {/* Mid ring */}
          <circle cx="350" cy="350" r="216" fill="none" stroke="#E8B4B8" strokeWidth="0.4" strokeDasharray="3 6" />
          {/* 8 medium roses on mid ring */}
          {[...Array(8)].map((_, i) => {
            const a = (i * Math.PI * 2) / 8;
            const cx = 350 + 216 * Math.cos(a);
            const cy = 350 + 216 * Math.sin(a);
            return (
              <g key={`m${i}`} transform={`translate(${cx},${cy}) rotate(${i * 45})`}>
                {[0,60,120,180,240,300].map((pa) => {
                  const pr = (pa * Math.PI) / 180;
                  return <ellipse key={pa} cx={10 * Math.cos(pr)} cy={10 * Math.sin(pr)}
                    rx="9" ry="4.5" transform={`rotate(${pa})`} fill="none" stroke="#D4AF37" strokeWidth="0.7" />;
                })}
                <circle cx="0" cy="0" r="3" fill="#D4AF37" opacity="0.7" />
              </g>
            );
          })}
          {/* Inner ring */}
          <circle cx="350" cy="350" r="126" fill="none" stroke="#D4AF37" strokeWidth="0.5" />
          {/* 6 petals */}
          {[...Array(6)].map((_, i) => {
            const a = (i * Math.PI * 2) / 6;
            return <ellipse key={`ip${i}`}
              cx={350 + 78 * Math.cos(a)} cy={350 + 78 * Math.sin(a)}
              rx="38" ry="17"
              transform={`rotate(${i * 60}, ${350 + 78 * Math.cos(a)}, ${350 + 78 * Math.sin(a)})`}
              fill="none" stroke="#E8B4B8" strokeWidth="1" />;
          })}
          {/* Center bloom */}
          <circle cx="350" cy="350" r="34" fill="none" stroke="#D4AF37" strokeWidth="1" />
          <circle cx="350" cy="350" r="12" fill="#D4AF37" opacity="0.18" stroke="#D4AF37" strokeWidth="0.8" />
          {[...Array(8)].map((_, i) => {
            const a = (i * Math.PI * 2) / 8;
            return <line key={i} x1={350 + 14 * Math.cos(a)} y1={350 + 14 * Math.sin(a)}
              x2={350 + 32 * Math.cos(a)} y2={350 + 32 * Math.sin(a)}
              stroke="#D4AF37" strokeWidth="0.7" />;
          })}
        </svg>
      </div>

      {/* ── Corner floral sprays ── */}
      <div className="absolute inset-0 pointer-events-none">
        {[
          { cls: 'top-0 left-0', t: '' },
          { cls: 'top-0 right-0', t: 'scaleX(-1)' },
          { cls: 'bottom-0 left-0', t: 'scaleY(-1)' },
          { cls: 'bottom-0 right-0', t: 'scale(-1,-1)' },
        ].map((c, i) => (
          <motion.svg key={i} className={`absolute ${c.cls} w-32 h-32 sm:w-44 sm:h-44 md:w-56 md:h-56`}
            viewBox="0 0 180 180" fill="none"
            style={{ transform: c.t, opacity: 0 }}
            animate={{ opacity: 0.24 }}
            transition={{ delay: 0.5 + i * 0.08, duration: 1 }}>
            <path d="M10 10 Q48 10 70 38 Q96 68 96 108" stroke="#D4AF37" strokeWidth="1.5" />
            <path d="M10 10 Q32 55 62 72 Q86 88 96 108" stroke="#D4AF37" strokeWidth="0.75" />
            {/* Top rose */}
            {[0,51,102,153,204,255,306,357].map((pa) => {
              const pr = (pa * Math.PI) / 180;
              return <ellipse key={pa} cx={60 + 14 * Math.cos(pr)} cy={26 + 14 * Math.sin(pr)}
                rx="12" ry="6" transform={`rotate(${pa}, ${60 + 14 * Math.cos(pr)}, ${26 + 14 * Math.sin(pr)})`}
                fill="none" stroke="#E8B4B8" strokeWidth="0.9" />;
            })}
            <circle cx="60" cy="26" r="4.5" fill="#D4AF37" opacity="0.85" />
            {/* Mid leaf */}
            <ellipse cx="30" cy="62" rx="14" ry="7" transform="rotate(-68 30 62)" fill="none" stroke="#D4AF37" strokeWidth="0.9" />
            <line x1="30" y1="55" x2="30" y2="69" stroke="#D4AF37" strokeWidth="0.6" transform="rotate(-68 30 62)" />
            {/* Lower rose */}
            {[0,60,120,180,240,300].map((pa) => {
              const pr = (pa * Math.PI) / 180;
              return <ellipse key={pa} cx={76 + 10 * Math.cos(pr)} cy={68 + 10 * Math.sin(pr)}
                rx="9" ry="4.5" transform={`rotate(${pa}, ${76 + 10 * Math.cos(pr)}, ${68 + 10 * Math.sin(pr)})`}
                fill="none" stroke="#E8B4B8" strokeWidth="0.8" />;
            })}
            <circle cx="76" cy="68" r="3" fill="#D4AF37" opacity="0.8" />
            {/* Vine curl */}
            <path d="M84 96 Q98 88 102 99 Q106 110 90 108" fill="none" stroke="#D4AF37" strokeWidth="0.85" />
            {/* Tiny bud */}
            <ellipse cx="44" cy="44" rx="6" ry="3" transform="rotate(-50 44 44)" fill="none" stroke="#D4878D" strokeWidth="0.7" />
          </motion.svg>
        ))}
      </div>

      {/* ── Double border frame ── */}
      <motion.div className="absolute inset-4 sm:inset-7 md:inset-10 rounded-3xl pointer-events-none"
        style={{ border: '1px solid rgba(212,175,55,0.32)' }}
        initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, delay: 0.2 }} />
      <motion.div className="absolute inset-7 sm:inset-12 md:inset-[56px] rounded-2xl pointer-events-none"
        style={{ border: '1px solid rgba(232,180,184,0.15)' }}
        initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, delay: 0.38 }} />

      {/* ── Corner ornaments ── */}
      {[
        'top-5 left-5 sm:top-8 sm:left-8',
        'top-5 right-5 sm:top-8 sm:right-8 rotate-90',
        'bottom-5 right-5 sm:bottom-8 sm:right-8 rotate-180',
        'bottom-5 left-5 sm:bottom-8 sm:left-8 -rotate-90',
      ].map((cls, i) => (
        <motion.div key={i} className={`absolute ${cls} pointer-events-none`}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 0.55 + i * 0.09 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M2 22 L2 2 L22 2" stroke="#D4AF37" strokeWidth="1.3" strokeOpacity="0.55" />
            <circle cx="2" cy="2" r="2" fill="#D4AF37" fillOpacity="0.42" />
          </svg>
        </motion.div>
      ))}

      {/* ── Main content ── */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 sm:px-10 max-w-xs sm:max-w-sm md:max-w-md w-full">

        {/* Crescent + star */}
        <motion.div className="mb-4 sm:mb-6"
          initial={{ opacity: 0, y: -22, scale: 0.72 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.28, ease: 'backOut' }}>
          <svg viewBox="0 0 88 88" fill="none" className="w-14 h-14 sm:w-18 sm:h-18 md:w-20 md:h-20" style={{ width: 'clamp(56px, 12vw, 80px)', height: 'clamp(56px, 12vw, 80px)' }}>
            <circle cx="44" cy="44" r="41" stroke="#D4AF37" strokeWidth="0.6" strokeOpacity="0.22" />
            <circle cx="44" cy="44" r="35" stroke="#E8B4B8" strokeWidth="0.4" strokeOpacity="0.15" />
            <path d="M44 14 A28 28 0 1 1 44 74 A18 18 0 1 0 44 14 Z"
              fill="rgba(212,175,55,0.12)" stroke="#D4AF37" strokeWidth="1.2" />
            <path d="M44 21 A21 21 0 1 1 44 67 A13 13 0 1 0 44 21 Z" fill="rgba(232,180,184,0.06)" />
            <polygon points="63,25 65.2,32 72.5,32 66.7,36.2 68.9,43.2 63,38.9 57.1,43.2 59.3,36.2 53.5,32 60.8,32"
              fill="#D4AF37" opacity="0.92" />
          </svg>
        </motion.div>

        {/* Bismillah */}
        <motion.p className="font-amiri leading-relaxed mb-1"
          style={{ fontSize: 'clamp(1.35rem, 5.5vw, 2.5rem)', color: '#D4AF37', textShadow: '0 2px 18px rgba(212,175,55,0.38)' }}
          dir="rtl"
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.65 }}>
          بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
        </motion.p>

        {/* Translation */}
        <motion.p className={`leading-relaxed mb-4 sm:mb-5 ${ml ? 'font-malayalam text-xs sm:text-sm' : 'font-poppins text-xs italic'}`}
          style={{ color: 'rgba(255,253,247,0.48)', fontSize: ml ? undefined : '0.68rem' }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 1.05 }}>
          {t.splash.bismillahTranslation}
        </motion.p>

        {/* Floral divider */}
        <motion.div className="flex items-center gap-2 mb-4 w-full"
          initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.85, delay: 1.2 }}>
          <div className="h-px flex-1" style={{ background: 'linear-gradient(to right, transparent, rgba(212,175,55,0.6))' }} />
          <svg width="30" height="20" viewBox="0 0 30 20" fill="none">
            {[0,72,144,216,288].map((pa) => {
              const pr = (pa * Math.PI) / 180;
              return <ellipse key={pa} cx={15 + 6 * Math.cos(pr)} cy={10 + 6 * Math.sin(pr)} rx="5.5" ry="3"
                transform={`rotate(${pa}, ${15 + 6 * Math.cos(pr)}, ${10 + 6 * Math.sin(pr)})`}
                fill="none" stroke="#E8B4B8" strokeWidth="0.75" />;
            })}
            <circle cx="15" cy="10" r="2.2" fill="#D4AF37" opacity="0.9" />
          </svg>
          <div className="h-px flex-1" style={{ background: 'linear-gradient(to left, transparent, rgba(212,175,55,0.6))' }} />
        </motion.div>

        {/* Label */}
        <motion.p className={`mb-4 ${ml ? 'font-malayalam text-xs' : 'font-poppins uppercase tracking-[0.28em] text-[10px] sm:text-xs'}`}
          style={{ color: 'rgba(232,180,184,0.62)' }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}>
          {t.splash.weddingInvitation}
        </motion.p>

        {/* Groom name */}
        <motion.p className={`font-bold leading-tight ${ml ? 'font-malayalam' : 'font-playfair'}`}
          style={{ fontSize: 'clamp(1.35rem, 5.5vw, 2.2rem)', color: '#FFFDF7' }}
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.7 }}>
          {lang === 'ml' ? 'ബദറുദ്ദീൻ' : 'Badarudheen'}
        </motion.p>

        {/* Heart divider */}
        <motion.div className="flex items-center gap-2.5 my-2.5"
          initial={{ opacity: 0, scale: 0.4 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.78, type: 'spring', stiffness: 220, damping: 18 }}>
          <div className="h-px w-6 sm:w-10" style={{ background: 'rgba(212,175,55,0.4)' }} />
          <motion.span className="font-playfair text-base sm:text-lg" style={{ color: '#D4AF37' }}
            animate={{ scale: [1, 1.25, 1] }} transition={{ duration: 2.5, repeat: Infinity, delay: 2 }}>♥</motion.span>
          <div className="h-px w-6 sm:w-10" style={{ background: 'rgba(212,175,55,0.4)' }} />
        </motion.div>

        {/* Bride name */}
        <motion.p className={`font-bold leading-tight ${ml ? 'font-malayalam' : 'font-playfair'}`}
          style={{ fontSize: 'clamp(1.35rem, 5.5vw, 2.2rem)', color: '#FFFDF7' }}
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.92, duration: 0.7 }}>
          {lang === 'ml' ? 'ഷഹ്‌ല' : 'Shahla'}
        </motion.p>

        {/* Date */}
        <motion.p className={`mt-3 sm:mt-4 ${ml ? 'font-malayalam text-xs sm:text-sm' : 'font-poppins text-[10px] sm:text-xs'}`}
          style={{ color: 'rgba(212,175,55,0.58)' }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.1 }}>
          {ml ? 'ഞായർ, ജൂലൈ 5, 2026 · 5:00 PM' : 'Sunday, 5th July 2026 · 5:00 PM'}
        </motion.p>
      </div>

      {/* ── Progress bar ── */}
      <motion.div
        className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 w-20 sm:w-28 h-[2px] rounded-full overflow-hidden"
        style={{ background: 'rgba(212,175,55,0.14)' }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.3 }}>
        <motion.div className="h-full rounded-full"
          style={{ background: 'linear-gradient(to right, #B89020, #D4AF37, #E8B4B8, #D4AF37)', transformOrigin: 'left' }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 2.2, ease: 'linear', delay: 2.4 }} />
      </motion.div>
    </motion.div>
  );
}
