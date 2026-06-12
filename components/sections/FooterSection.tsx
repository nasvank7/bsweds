'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { WeddingConfig } from '@/lib/types';
import { useLanguage } from '@/lib/LanguageContext';
import { isBrideSide } from '@/lib/perspective';

interface Props { config: WeddingConfig }

export default function FooterSection({ config }: Props) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const { t, lang } = useLanguage();
  const ml = lang === 'ml';
  const fontClass = ml ? 'font-malayalam' : 'font-poppins';
  const { couple } = config;

  const groomName    = ml ? (couple.groom.nameMalayalam || couple.groom.name) : couple.groom.name;
  const brideName    = ml ? (couple.bride.nameMalayalam || couple.bride.name) : couple.bride.name;
  const primaryName  = isBrideSide ? brideName : groomName;
  const secondaryName = isBrideSide ? groomName : brideName;

  return (
    <footer className="relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0A0306 0%, #1C0810 25%, #3C1020 55%, #1C0810 80%, #0A0306 100%)' }}>
      {/* Islamic geometric overlay */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.04 }}>
        <defs>
          <pattern id="fp" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
            <polygon points="40,5 46,22 64,22 51,33 56,50 40,39 24,50 29,33 16,22 34,22" fill="none" stroke="#D4AF37" strokeWidth="0.8" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#fp)" />
      </svg>

      {/* Top gold rule */}
      <div className="h-px" style={{ background: 'linear-gradient(90deg, transparent, #D4AF37 30%, #D4AF37 70%, transparent)' }} />

      {/* Main content */}
      <div ref={ref} className="relative z-10 max-w-4xl mx-auto px-6 py-20 md:py-28 text-center">
        {/* Crescent + star ornament */}
        <motion.div className="flex justify-center mb-10"
          initial={{ opacity: 0, y: -16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
          <svg width="72" height="72" viewBox="0 0 72 72">
            <circle cx="36" cy="36" r="34" fill="none" stroke="rgba(212,175,55,0.18)" strokeWidth="0.8" />
            <path d="M36 12 A22 22 0 1 1 36 60 A14 14 0 1 0 36 12Z" fill="rgba(212,175,55,0.12)" stroke="#D4AF37" strokeWidth="1" />
            <polygon points="48,22 49.8,27.4 55.5,27.4 51,30.6 52.8,36 48,32.8 43.2,36 45,30.6 40.5,27.4 46.2,27.4" fill="#D4AF37" opacity="0.85" />
          </svg>
        </motion.div>

        {/* Arabic blessing */}
        <motion.p className="font-amiri text-3xl md:text-4xl lg:text-5xl mb-4 leading-loose"
          style={{ color: '#D4AF37' }} dir="rtl"
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }}>
          بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا
        </motion.p>

        <motion.p className={`text-sm mb-8 ${fontClass}`}
          style={{ color: 'rgba(255,253,247,0.55)' }}
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.3 }}>
          {t.footer.blessingTranslation}
        </motion.p>

        {/* Gold ornament divider */}
        <motion.div className="flex items-center justify-center gap-4 mb-10"
          initial={{ opacity: 0, scaleX: 0 }} animate={inView ? { opacity: 1, scaleX: 1 } : {}} transition={{ delay: 0.4 }}>
          <div className="h-px flex-1 max-w-32" style={{ background: 'linear-gradient(to right, transparent, #D4AF37)' }} />
          <svg width="24" height="24" viewBox="0 0 24 24">
            <polygon points="12,2 14.5,9 22,9 16,13.5 18.5,20.5 12,16.5 5.5,20.5 8,13.5 2,9 9.5,9" fill="#D4AF37" opacity="0.85" />
          </svg>
          <div className="h-px flex-1 max-w-32" style={{ background: 'linear-gradient(to left, transparent, #D4AF37)' }} />
        </motion.div>

        {/* Couple names */}
        <motion.div className="mb-3"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.5 }}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-0">
            <h2 className={`text-2xl md:text-3xl lg:text-4xl font-bold leading-snug ${ml ? 'font-malayalam' : 'font-playfair'}`}
              style={{ color: '#FEF8F5', lineHeight: 1.15 }}>{primaryName}</h2>
            <span className="font-playfair text-xl sm:text-2xl sm:mx-4 my-1 sm:my-0" style={{ color: '#D4AF37' }}>♥</span>
            <h2 className={`text-2xl md:text-3xl lg:text-4xl font-bold leading-snug ${ml ? 'font-malayalam' : 'font-playfair'}`}
              style={{ color: '#FEF8F5', lineHeight: 1.15 }}>{secondaryName}</h2>
          </div>
        </motion.div>

        <motion.p className={`text-sm mb-12 ${fontClass}`}
          style={{ color: 'rgba(255,253,247,0.45)' }}
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.6 }}>
          {t.footer.tagline}
        </motion.p>

        {/* Bottom rule + copyright */}
        <motion.div className="pt-8"
          style={{ borderTop: '1px solid rgba(212,175,55,0.12)' }}
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.85 }}>
          {/* Mini ornament */}
          <div className="flex justify-center mb-5">
            <svg viewBox="0 0 160 16" className="w-32">
              <line x1="0" y1="8" x2="60" y2="8" stroke="rgba(212,175,55,0.28)" strokeWidth="0.8" />
              <circle cx="80" cy="8" r="4" fill="none" stroke="rgba(212,175,55,0.38)" strokeWidth="0.8" />
              <circle cx="80" cy="8" r="1.5" fill="rgba(212,175,55,0.45)" />
              <line x1="100" y1="8" x2="160" y2="8" stroke="rgba(212,175,55,0.28)" strokeWidth="0.8" />
              <polygon points="66,8 70,5 74,8 70,11" fill="none" stroke="rgba(212,175,55,0.35)" strokeWidth="0.7" />
              <polygon points="86,8 90,5 94,8 90,11" fill="none" stroke="rgba(212,175,55,0.35)" strokeWidth="0.7" />
            </svg>
          </div>
          <p className={`text-xs ${fontClass}`} style={{ color: 'rgba(255,253,247,0.4)' }}>
            {t.footer.madeWith} {primaryName} & {secondaryName} — {t.footer.year}
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
