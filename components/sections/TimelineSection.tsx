'use client';

import { ReactElement } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { WeddingConfig } from '@/lib/types';
import { useLanguage } from '@/lib/LanguageContext';

interface Props { config: WeddingConfig }

const iconMap: Record<string, ReactElement> = {
  ring: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3C1020" strokeWidth="2"><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="4" fill="rgba(212,175,55,0.2)" /></svg>),
  mosque: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3C1020" strokeWidth="1.8"><path d="M12 2 Q15 5 15 8 L15 10 L9 10 L9 8 Q9 5 12 2Z" fill="rgba(212,175,55,0.2)" /><rect x="2" y="10" width="20" height="1.5" rx="0.75" fill="#3C1020" /><rect x="4" y="11.5" width="16" height="10.5" rx="2" /><rect x="10" y="16" width="4" height="6" rx="1" fill="rgba(212,175,55,0.3)" /></svg>),
  celebration: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3C1020" strokeWidth="2"><path d="M20 7l-8-3-8 3 8 3 8-3zM4 10v6l8 3 8-3v-6" /><path d="M4 10l8 3 8-3" /></svg>),
  prayer: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3C1020" strokeWidth="1.8"><path d="M12 2 L16 8 L22 8 L17 12 L19 18 L12 14 L5 18 L7 12 L2 8 L8 8 Z" fill="rgba(212,175,55,0.2)" /></svg>),
  feast: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3C1020" strokeWidth="1.8"><path d="M4 11C4 7.13 7.13 4 11 4h2c3.87 0 7 3.13 7 7v1H4v-1z" fill="rgba(212,175,55,0.2)" /><rect x="3" y="12" width="18" height="2" rx="1" /><line x1="12" y1="14" x2="12" y2="20" /><line x1="8" y1="20" x2="16" y2="20" /></svg>),
};

function TimelineItem({ item, index, isLast }: { item: WeddingConfig['timeline'][0]; index: number; isLast: boolean }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const { lang } = useLanguage();
  const ml = lang === 'ml';
  const isEven = index % 2 === 0;
  const title = ml ? (item.titleMalayalam || item.title) : item.title;
  const desc = ml ? (item.descriptionMalayalam || item.description) : item.description;
  const dateLabel = ml ? (item.dateMalayalam || item.date) : item.date;

  return (
    <div ref={ref} className="relative">
      {/* ─── DESKTOP alternating layout ─── */}
      <div className="hidden md:grid md:grid-cols-[1fr_56px_1fr] md:gap-0 w-full items-start">
        {/* Left slot */}
        <div className="flex justify-end pr-8 pt-2 pb-12">
          {isEven && (
            <motion.div className="max-w-xs text-right"
              initial={{ opacity: 0, x: -28 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }}>
              {item.titleArabic && (
                <p className="font-amiri text-lg mb-1" style={{ color: 'rgba(212,175,55,0.75)' }} dir="rtl">{item.titleArabic}</p>
              )}
              <h3 className={`text-xl md:text-2xl font-bold mb-2 ${ml ? 'font-malayalam' : 'font-playfair'}`} style={{ color: '#3C1020' }}>{title}</h3>
              <div className="flex items-center justify-end gap-2 mb-2">
                <span className={`text-xs font-semibold ${ml ? 'font-malayalam' : 'font-poppins tracking-wider uppercase'}`} style={{ color: '#D4AF37' }}>{dateLabel}</span>
              </div>
              {desc && (
                <p className={`text-sm leading-relaxed ${ml ? 'font-malayalam' : 'font-poppins'}`} style={{ color: 'rgba(60,16,32,0.55)' }}>{desc}</p>
              )}
            </motion.div>
          )}
        </div>

        {/* Center medallion + line */}
        <div className="flex flex-col items-center">
          {index > 0 && <div className="w-0.5 h-6 -mt-6" style={{ background: 'linear-gradient(to bottom, rgba(212,175,55,0.6), rgba(212,175,55,0.3))' }} />}
          {index === 0 && <div className="h-0" />}
          <motion.div className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 relative z-10"
            style={{ background: 'linear-gradient(135deg, #D4AF37 0%, #E8CC6A 50%, #C5A028 100%)', boxShadow: '0 0 0 5px rgba(212,175,55,0.15), 0 0 0 10px rgba(212,175,55,0.06), 0 6px 24px rgba(212,175,55,0.35)' }}
            initial={{ scale: 0, rotate: -60 }} animate={inView ? { scale: 1, rotate: 0 } : {}} transition={{ duration: 0.55, delay: 0.1, type: 'spring', stiffness: 200 }}>
            {iconMap[item.icon] || iconMap.ring}
          </motion.div>
          {!isLast && <div className="w-0.5 flex-1 min-h-10" style={{ background: 'linear-gradient(to top, rgba(212,175,55,0.6), rgba(212,175,55,0.3))' }} />}
        </div>

        {/* Right slot */}
        <div className="flex justify-start pl-8 pt-2 pb-12">
          {!isEven && (
            <motion.div className="max-w-xs"
              initial={{ opacity: 0, x: 28 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }}>
              {item.titleArabic && (
                <p className="font-amiri text-lg mb-1" style={{ color: 'rgba(212,175,55,0.75)' }} dir="rtl">{item.titleArabic}</p>
              )}
              <h3 className={`text-xl md:text-2xl font-bold mb-2 ${ml ? 'font-malayalam' : 'font-playfair'}`} style={{ color: '#3C1020' }}>{title}</h3>
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-xs font-semibold ${ml ? 'font-malayalam' : 'font-poppins tracking-wider uppercase'}`} style={{ color: '#D4AF37' }}>{dateLabel}</span>
              </div>
              {desc && (
                <p className={`text-sm leading-relaxed ${ml ? 'font-malayalam' : 'font-poppins'}`} style={{ color: 'rgba(60,16,32,0.55)' }}>{desc}</p>
              )}
            </motion.div>
          )}
        </div>
      </div>

      {/* ─── MOBILE left-anchored layout ─── */}
      <div className="md:hidden flex gap-5 pb-10">
        <div className="flex flex-col items-center flex-shrink-0">
          {index > 0 && <div className="w-0.5 h-4 -mt-4" style={{ background: 'rgba(212,175,55,0.4)' }} />}
          {index === 0 && <div className="h-0" />}
          <motion.div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #D4AF37, #C5A028)', boxShadow: '0 0 0 4px rgba(212,175,55,0.12), 0 4px 16px rgba(212,175,55,0.3)' }}
            initial={{ scale: 0 }} animate={inView ? { scale: 1 } : {}} transition={{ duration: 0.5, type: 'spring' }}>
            {iconMap[item.icon] || iconMap.ring}
          </motion.div>
          {!isLast && <div className="w-0.5 flex-1 min-h-8 mt-1" style={{ background: 'rgba(212,175,55,0.3)' }} />}
        </div>

        <motion.div className="flex-1 min-w-0 pt-1"
          initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }}>
          {item.titleArabic && (
            <p className="font-amiri text-base mb-0.5" style={{ color: 'rgba(212,175,55,0.75)' }} dir="rtl">{item.titleArabic}</p>
          )}
          <h3 className={`text-lg font-bold mb-1 ${ml ? 'font-malayalam' : 'font-playfair'}`} style={{ color: '#3C1020' }}>{title}</h3>
          <span className={`text-xs font-semibold mb-2 block ${ml ? 'font-malayalam' : 'font-poppins tracking-wider uppercase'}`} style={{ color: '#D4AF37' }}>{dateLabel}</span>
          {desc && (
            <p className={`text-sm leading-relaxed ${ml ? 'font-malayalam' : 'font-poppins'}`} style={{ color: 'rgba(60,16,32,0.55)' }}>{desc}</p>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default function TimelineSection({ config }: Props) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const { t, lang } = useLanguage();
  const ml = lang === 'ml';

  return (
    <section id="timeline" className="relative py-16 md:py-24 lg:py-32 overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #FEF8F5 0%, #F5EDE8 50%, #FEF8F5 100%)' }}>

      {/* Floral dot pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{ backgroundImage: 'radial-gradient(circle, #3C1020 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, #D4AF37 30%, #D4AF37 70%, transparent)' }} />
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, #D4AF37 30%, #D4AF37 70%, transparent)' }} />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <div ref={ref} className="text-center mb-20">
          <motion.p className={`text-xs tracking-[0.35em] uppercase mb-3 ${ml ? 'font-malayalam tracking-normal' : 'font-poppins'}`}
            style={{ color: '#D4AF37' }}
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}>
            {t.timeline.label}
          </motion.p>
          <motion.h2 className={`text-2xl md:text-3xl lg:text-5xl font-bold mb-4 leading-snug ${ml ? 'font-malayalam' : 'font-playfair'}`}
            style={{ color: '#3C1020' }}
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }}>
            {t.timeline.title}
          </motion.h2>
          <motion.div className="flex items-center justify-center gap-3"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.4 }}>
            <div className="h-px w-16" style={{ background: 'linear-gradient(to right, transparent, #D4AF37)' }} />
            <svg width="12" height="12" viewBox="0 0 12 12"><polygon points="6,1 7.5,4.5 11,4.5 8.5,6.8 9.5,10.5 6,8 2.5,10.5 3.5,6.8 1,4.5 4.5,4.5" fill="#D4AF37" /></svg>
            <div className="h-px w-16" style={{ background: 'linear-gradient(to left, transparent, #D4AF37)' }} />
          </motion.div>
        </div>

        <div>
          {config.timeline.map((item, i) => (
            <TimelineItem key={item.id} item={item} index={i} isLast={i === config.timeline.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
