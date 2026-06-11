'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '@/lib/LanguageContext';

export default function QuranVerseSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.25 });
  const { t, lang } = useLanguage();
  const ml = lang === 'ml';

  return (
    <section id="quran" ref={ref} className="relative py-16 md:py-28 lg:py-36 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #FEF8F5 0%, #FFFDF7 100%)' }}>
      {/* Background Islamic geometric */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.04 }}>
        <defs>
          <pattern id="qp" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <polygon points="50,5 61,35 93,35 67,55 77,85 50,65 23,85 33,55 7,35 39,35" fill="none" stroke="#3C1020" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#qp)" />
      </svg>

      {/* Top & bottom gold rules */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent 0%, #D4AF37 30%, #D4AF37 70%, transparent 100%)' }} />
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent 0%, #D4AF37 30%, #D4AF37 70%, transparent 100%)' }} />

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        {/* Ornamental star */}
        <motion.div className="flex justify-center mb-10"
          initial={{ opacity: 0, rotate: -45, scale: 0.5 }}
          animate={inView ? { opacity: 1, rotate: 0, scale: 1 } : {}}
          transition={{ duration: 0.9, ease: 'backOut' }}>
          <svg width="52" height="52" viewBox="0 0 52 52">
            <polygon points="26,3 30,19 47,19 34,29 39,45 26,35 13,45 18,29 5,19 22,19" fill="none" stroke="#D4AF37" strokeWidth="1.5" />
            <polygon points="26,11 28.5,19 36,19 30,23.5 32.5,31 26,27 19.5,31 22,23.5 16,19 23.5,19" fill="rgba(212,175,55,0.15)" stroke="#D4AF37" strokeWidth="0.5" />
            <circle cx="26" cy="26" r="3" fill="#D4AF37" />
          </svg>
        </motion.div>

        {/* Label */}
        <motion.p className={`text-xs tracking-[0.35em] uppercase mb-8 ${ml ? 'font-malayalam tracking-normal' : 'font-poppins'}`}
          style={{ color: '#D4AF37' }}
          initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }}>
          {t.quran.label}
        </motion.p>

        {/* Arabic — large */}
        <motion.div className="relative mb-8"
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.35, duration: 0.8 }}>
          <p className="font-amiri leading-loose" style={{ color: '#3C1020', fontSize: 'clamp(2rem, 9vw, 4.5rem)' }} dir="rtl">
            وَخَلَقْنَاكُمْ أَزْوَاجًا
          </p>
        </motion.div>

        {/* Gold ornament */}
        <motion.div className="flex items-center justify-center gap-4 mb-8"
          initial={{ opacity: 0, scaleX: 0 }} animate={inView ? { opacity: 1, scaleX: 1 } : {}} transition={{ delay: 0.55 }}>
          <div className="h-px flex-1 max-w-28" style={{ background: 'linear-gradient(to right, transparent, #D4AF37)' }} />
          <svg width="18" height="18" viewBox="0 0 18 18"><circle cx="9" cy="9" r="7" fill="none" stroke="#D4AF37" strokeWidth="1"/><circle cx="9" cy="9" r="2.5" fill="#D4AF37"/></svg>
          <div className="h-px flex-1 max-w-28" style={{ background: 'linear-gradient(to left, transparent, #D4AF37)' }} />
        </motion.div>

        {/* English translation */}
        <motion.h2 className={`text-lg md:text-2xl lg:text-4xl font-bold mb-4 italic leading-snug ${ml ? 'font-malayalam not-italic' : 'font-playfair'}`}
          style={{ color: '#1a1a1a' }}
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.65 }}>
          {t.quran.verse}
        </motion.h2>

        <motion.p className={`text-sm font-medium ${ml ? 'font-malayalam' : 'font-poppins'}`}
          style={{ color: '#D4AF37' }}
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.8 }}>
          {t.quran.ref}
        </motion.p>
      </div>
    </section>
  );
}
