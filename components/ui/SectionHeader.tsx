'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '@/lib/LanguageContext';

interface SectionHeaderProps {
  label: string;
  title: string;
  light?: boolean;
}

export function GoldOrnament({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 24" className={`w-40 md:w-52 ${className}`} fill="none">
      <line x1="0" y1="12" x2="68" y2="12" stroke="#D4AF37" strokeWidth="0.75" />
      <polygon points="72,12 78,6 84,12 78,18" fill="none" stroke="#D4AF37" strokeWidth="0.75" />
      <circle cx="100" cy="12" r="6" fill="none" stroke="#D4AF37" strokeWidth="1" />
      <circle cx="100" cy="12" r="2.5" fill="#D4AF37" />
      <polygon points="116,12 122,6 128,12 122,18" fill="none" stroke="#D4AF37" strokeWidth="0.75" />
      <line x1="132" y1="12" x2="200" y2="12" stroke="#D4AF37" strokeWidth="0.75" />
    </svg>
  );
}

export default function SectionHeader({ label, title, light = false }: SectionHeaderProps) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const { lang } = useLanguage();
  const ml = lang === 'ml';

  return (
    <div ref={ref} className="flex flex-col items-center text-center mb-10 md:mb-16 lg:mb-20">
      <motion.p
        className={`text-xs tracking-[0.25em] md:tracking-[0.35em] uppercase mb-3 md:mb-4 ${ml ? 'font-malayalam tracking-normal' : 'font-poppins'}`}
        style={{ color: '#D4AF37' }}
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        {label}
      </motion.p>

      <motion.h2
        className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-5 leading-tight ${ml ? 'font-malayalam' : 'font-playfair'}`}
        style={{ color: light ? '#FEF8F5' : '#3C1020' }}
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.15 }}
      >
        {title}
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={inView ? { opacity: 1, scaleX: 1 } : {}}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        <GoldOrnament />
      </motion.div>
    </div>
  );
}
