'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';

interface Props { onOpen: () => void }

export default function SplashScreen({ onOpen }: Props) {
  const { t, lang } = useLanguage();
  const ml = lang === 'ml';

  useEffect(() => {
    const id = setTimeout(onOpen, 4200);
    return () => clearTimeout(id);
  }, [onOpen]);

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #0A0306 0%, #1C0810 30%, #3C1020 60%, #1C0810 80%, #0A0306 100%)' }}
      exit={{ opacity: 0, scale: 1.06 }}
      transition={{ duration: 0.9, ease: 'easeInOut' }}>

      {/* Bokeh background */}
      {[
        { left: '10%', top: '20%', w: 200, color: '#E8B4B8', op: 0.1 },
        { left: '80%', top: '15%', w: 160, color: '#D4AF37', op: 0.08 },
        { left: '70%', top: '70%', w: 240, color: '#E8B4B8', op: 0.09 },
        { left: '15%', top: '75%', w: 180, color: '#D4AF37', op: 0.07 },
        { left: '50%', top: '45%', w: 350, color: '#C9A050', op: 0.04 },
      ].map((b, i) => (
        <motion.div key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: b.left, top: b.top, width: b.w, height: b.w,
            transform: 'translate(-50%,-50%)',
            background: `radial-gradient(circle, ${b.color} 0%, ${b.color}44 35%, transparent 70%)`,
            filter: 'blur(30px)', opacity: b.op,
          }}
          animate={{ scale: [1, 1.2, 1], opacity: [b.op, b.op * 1.6, b.op] }}
          transition={{ duration: 6 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.7 }} />
      ))}

      {/* Twinkling stars — gold + blush */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.45 }}>
        {[
          [8,14],[16,72],[24,30],[33,86],[41,10],[50,58],[59,27],[67,74],[75,18],[83,62],
          [91,40],[5,52],[29,8],[46,88],[63,44],[79,22],[96,66],[12,95],[37,35],[55,78],
        ].map(([cx, cy], i) => (
          <motion.circle key={i} cx={`${cx}%`} cy={`${cy}%`} r={i % 3 === 0 ? 1.2 : 0.7}
            fill={i % 4 === 0 ? '#E8B4B8' : '#D4AF37'}
            initial={{ opacity: 0.1 }}
            animate={{ opacity: [0.1, 0.65, 0.1] }}
            transition={{ duration: 2 + (i % 4), repeat: Infinity, delay: (i % 6) * 0.35 }} />
        ))}
      </svg>

      {/* Outer double border */}
      <motion.div className="absolute inset-5 md:inset-10 rounded-3xl pointer-events-none"
        style={{ border: '1px solid rgba(212,175,55,0.28)' }}
        initial={{ opacity: 0, scale: 0.93 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, delay: 0.2 }} />
      <motion.div className="absolute inset-8 md:inset-[54px] rounded-2xl pointer-events-none"
        style={{ border: '1px solid rgba(232,180,184,0.12)' }}
        initial={{ opacity: 0, scale: 0.93 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, delay: 0.4 }} />

      {/* Corner ornaments */}
      {['top-6 left-6 md:top-11 md:left-11', 'top-6 right-6 md:top-11 md:right-11 rotate-90',
        'bottom-6 right-6 md:bottom-11 md:right-11 rotate-180', 'bottom-6 left-6 md:bottom-11 md:left-11 -rotate-90',
      ].map((cls, i) => (
        <motion.div key={i} className={`absolute ${cls} pointer-events-none`}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 + i * 0.1 }}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path d="M2 26 L2 2 L26 2" stroke="#D4AF37" strokeWidth="1.2" strokeOpacity="0.5" />
            <circle cx="2" cy="2" r="2" fill="#D4AF37" fillOpacity="0.35" />
          </svg>
        </motion.div>
      ))}

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-center px-10 max-w-md">

        {/* Crescent + star */}
        <motion.div className="mb-8"
          initial={{ opacity: 0, y: -28, scale: 0.75 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.3, ease: 'backOut' }}>
          <svg width="88" height="88" viewBox="0 0 88 88" fill="none">
            <circle cx="44" cy="44" r="41" stroke="#D4AF37" strokeWidth="0.6" strokeOpacity="0.22" />
            <circle cx="44" cy="44" r="35" stroke="#E8B4B8" strokeWidth="0.4" strokeOpacity="0.14" />
            {/* Crescent */}
            <path d="M44 14 A28 28 0 1 1 44 74 A18 18 0 1 0 44 14 Z"
              fill="rgba(212,175,55,0.1)" stroke="#D4AF37" strokeWidth="1.2" />
            {/* Inner crescent soft fill */}
            <path d="M44 21 A21 21 0 1 1 44 67 A13 13 0 1 0 44 21 Z"
              fill="rgba(232,180,184,0.06)" />
            {/* Star beside crescent */}
            <polygon points="63,25 65.2,32 72.5,32 66.7,36.2 68.9,43.2 63,38.9 57.1,43.2 59.3,36.2 53.5,32 60.8,32"
              fill="#D4AF37" opacity="0.92" />
          </svg>
        </motion.div>

        {/* Bismillah */}
        <motion.p className="font-amiri leading-loose mb-3"
          style={{ fontSize: 'clamp(1.9rem, 7.5vw, 3rem)', color: '#D4AF37', textShadow: '0 2px 20px rgba(212,175,55,0.35)' }}
          dir="rtl"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.75 }}>
          بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
        </motion.p>

        {/* Ornament divider */}
        <motion.div className="flex items-center gap-3 my-5"
          initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }} transition={{ duration: 0.8, delay: 1.15 }}>
          <div className="h-px w-14" style={{ background: 'linear-gradient(to right, transparent, rgba(212,175,55,0.65))' }} />
          <svg width="14" height="14" viewBox="0 0 14 14">
            <polygon points="7,1 8.3,4.8 12.5,4.8 9.2,7.4 10.5,11.2 7,8.6 3.5,11.2 4.8,7.4 1.5,4.8 5.7,4.8" fill="#D4AF37" opacity="0.85" />
          </svg>
          <div className="h-px w-14" style={{ background: 'linear-gradient(to left, transparent, rgba(212,175,55,0.65))' }} />
        </motion.div>

        {/* Translation */}
        <motion.p className={`text-xs md:text-sm mb-8 ${ml ? 'font-malayalam' : 'font-poppins italic'}`}
          style={{ color: 'rgba(255,253,247,0.55)' }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.35 }}>
          {t.splash.bismillahTranslation}
        </motion.p>

        {/* Wedding Invitation label */}
        <motion.p className={`text-xs tracking-[0.4em] uppercase mb-3 ${ml ? 'font-malayalam tracking-normal' : 'font-poppins'}`}
          style={{ color: 'rgba(232,180,184,0.6)' }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}>
          {t.splash.weddingInvitation}
        </motion.p>

        {/* Couple names */}
        <motion.p className={`text-3xl md:text-4xl font-bold ${ml ? 'font-malayalam' : 'font-playfair'}`}
          style={{ color: '#FEF8F5' }}
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.85 }}>
          {lang === 'ml' ? 'ബദറുദ്ദീൻ' : 'Badarudheen'}
          <span className="font-playfair mx-3 text-2xl" style={{ color: '#D4AF37' }}>♥</span>
          {lang === 'ml' ? 'ഷഹ്‌ല' : 'Shahla'}
        </motion.p>
      </div>

      {/* Progress bar */}
      <motion.div
        className="absolute bottom-14 md:bottom-16 left-1/2 -translate-x-1/2 w-28 h-0.5 rounded-full overflow-hidden"
        style={{ background: 'rgba(212,175,55,0.15)' }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}>
        <motion.div className="h-full rounded-full origin-left"
          style={{ background: 'linear-gradient(to right, #C5A028, #D4AF37, #E8B4B8, #D4AF37)' }}
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
          transition={{ duration: 2, ease: 'linear', delay: 2.2 }} />
      </motion.div>
    </motion.div>
  );
}
