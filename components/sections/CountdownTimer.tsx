'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '@/lib/LanguageContext';

interface Props { weddingDate: string }

function Digit({ value, label, ml }: { value: number; label: string; ml: boolean }) {
  const [prev, setPrev] = useState(value);
  const [flipping, setFlipping] = useState(false);

  useEffect(() => {
    if (value !== prev) {
      setFlipping(true);
      const t = setTimeout(() => { setPrev(value); setFlipping(false); }, 300);
      return () => clearTimeout(t);
    }
  }, [value, prev]);

  const display = String(value).padStart(2, '0');

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative" style={{ perspective: '400px' }}>
        {/* Card body */}
        <div className="relative w-14 h-[4.5rem] md:w-20 md:h-24 lg:w-24 lg:h-28 rounded-xl md:rounded-2xl overflow-hidden"
          style={{
            background: 'linear-gradient(165deg, #3C1020 0%, #2E0A14 100%)',
            border: '1px solid rgba(212,175,55,0.3)',
            boxShadow: '0 12px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(212,175,55,0.15), inset 0 -1px 0 rgba(0,0,0,0.3)',
          }}>
          {/* Top shine */}
          <div className="absolute top-0 left-0 right-0 h-1/2"
            style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.06), transparent)' }} />
          {/* Center fold line */}
          <div className="absolute left-0 right-0 top-1/2 h-px"
            style={{ background: 'rgba(0,0,0,0.4)', boxShadow: '0 1px 0 rgba(255,255,255,0.03)' }} />

          <AnimatePresence mode="wait">
            <motion.span key={display}
              className="absolute inset-0 flex items-center justify-center font-playfair font-bold text-3xl md:text-4xl lg:text-5xl"
              style={{ color: '#D4AF37', textShadow: '0 2px 12px rgba(212,175,55,0.4)' }}
              initial={{ rotateX: flipping ? -90 : 0, opacity: flipping ? 0 : 1 }}
              animate={{ rotateX: 0, opacity: 1 }}
              exit={{ rotateX: 90, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}>
              {display}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
      <p className={`text-xs font-semibold tracking-[0.2em] uppercase ${ml ? 'font-malayalam tracking-normal' : 'font-poppins'}`}
        style={{ color: 'rgba(212,175,55,0.65)' }}>
        {label}
      </p>
    </div>
  );
}

export default function CountdownTimer({ weddingDate }: Props) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const { t, lang } = useLanguage();
  const ml = lang === 'ml';
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);
  const [passed, setPassed] = useState(false);

  useEffect(() => {
    setMounted(true);
    const target = new Date(weddingDate).getTime();
    const tick = () => {
      const diff = target - Date.now();
      if (diff <= 0) { setPassed(true); return; }
      setTime({ days: Math.floor(diff / 86400000), hours: Math.floor((diff % 86400000) / 3600000), minutes: Math.floor((diff % 3600000) / 60000), seconds: Math.floor((diff % 60000) / 1000) });
    };
    tick(); const id = setInterval(tick, 1000); return () => clearInterval(id);
  }, [weddingDate]);

  if (!mounted) return null;

  return (
    <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #F5EDE8 0%, #FEF8F5 40%, #F5EDE8 100%)' }}>
      {/* Floral tile pattern */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.04 }}>
        <defs>
          <pattern id="cp" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
            <polygon points="30,3 37,23 57,23 42,36 48,56 30,44 12,56 18,36 3,23 23,23" fill="none" stroke="#3C1020" strokeWidth="0.8" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#cp)" />
      </svg>

      {/* Gold rule top */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #D4AF37 30%, #D4AF37 70%, transparent)' }} />

      <div ref={ref} className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.p className={`text-xs tracking-[0.35em] uppercase mb-4 ${ml ? 'font-malayalam tracking-normal' : 'font-poppins'}`}
          style={{ color: '#D4AF37' }}
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}>
          {t.countdown.label}
        </motion.p>

        <motion.h2 className={`text-2xl md:text-3xl lg:text-5xl font-bold mb-3 leading-snug ${ml ? 'font-malayalam' : 'font-playfair'}`}
          style={{ color: '#3C1020' }}
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.15 }}>
          {passed ? t.countdown.passed : t.countdown.title}
        </motion.h2>

        <motion.div className="flex justify-center mb-12"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.3 }}>
          <svg viewBox="0 0 200 20" className="w-40 md:w-52">
            <line x1="0" y1="10" x2="68" y2="10" stroke="#D4AF37" strokeWidth="0.75" />
            <circle cx="100" cy="10" r="5" fill="none" stroke="#D4AF37" strokeWidth="1" />
            <circle cx="100" cy="10" r="2" fill="#D4AF37" />
            <line x1="132" y1="10" x2="200" y2="10" stroke="#D4AF37" strokeWidth="0.75" />
            <polygon points="84,10 88,6 92,10 88,14" fill="none" stroke="#D4AF37" strokeWidth="0.75" />
            <polygon points="108,10 112,6 116,10 112,14" fill="none" stroke="#D4AF37" strokeWidth="0.75" />
          </svg>
        </motion.div>

        {/* Timer digits */}
        <motion.div className="flex items-center justify-center gap-1.5 md:gap-3 lg:gap-4"
          initial={{ opacity: 0, scale: 0.9 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.4, duration: 0.6 }}>
          <Digit value={time.days} label={t.countdown.days} ml={ml} />
          <div className="flex flex-col gap-2 mb-8">
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'rgba(212,175,55,0.5)' }} />
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'rgba(212,175,55,0.5)' }} />
          </div>
          <Digit value={time.hours} label={t.countdown.hours} ml={ml} />
          <div className="flex flex-col gap-2 mb-8">
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'rgba(212,175,55,0.5)' }} />
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'rgba(212,175,55,0.5)' }} />
          </div>
          <Digit value={time.minutes} label={t.countdown.minutes} ml={ml} />
          <div className="flex flex-col gap-2 mb-8">
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'rgba(212,175,55,0.5)' }} />
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'rgba(212,175,55,0.5)' }} />
          </div>
          <Digit value={time.seconds} label={t.countdown.seconds} ml={ml} />
        </motion.div>

        <motion.p className={`mt-10 text-base md:text-lg font-medium ${ml ? 'font-malayalam' : 'font-playfair italic'}`}
          style={{ color: 'rgba(60,16,32,0.55)' }}
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.7 }}>
          {ml ? 'ഞായർ, ജൂലൈ 5, 2026' : 'Sunday, 5th July 2026'}
        </motion.p>
      </div>
    </section>
  );
}
