'use client';

import { ReactElement } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { WeddingConfig } from '@/lib/types';
import { useLanguage } from '@/lib/LanguageContext';
import { isBrideSide } from '@/lib/perspective';

interface Props { config: WeddingConfig }

// ─── Icons ───────────────────────────────────────────────────────────────────
const TIMELINE_ICONS: Record<string, ReactElement> = {
  ring: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(30,8,16,0.85)" strokeWidth="2">
      <circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4" fill="rgba(212,175,55,0.25)"/>
    </svg>
  ),
  mosque: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(30,8,16,0.85)" strokeWidth="1.8">
      <path d="M12 2 Q15 5 15 8 L15 10 L9 10 L9 8 Q9 5 12 2Z" fill="rgba(212,175,55,0.3)"/>
      <rect x="2" y="10" width="20" height="1.5" rx="0.75" fill="rgba(30,8,16,0.7)"/>
      <rect x="4" y="11.5" width="16" height="10.5" rx="2" fill="rgba(30,8,16,0.5)"/>
      <rect x="10" y="16" width="4" height="6" rx="1" fill="rgba(212,175,55,0.35)"/>
    </svg>
  ),
  celebration: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(30,8,16,0.85)" strokeWidth="2">
      <path d="M20 7l-8-3-8 3 8 3 8-3zM4 10v6l8 3 8-3v-6"/><path d="M4 10l8 3 8-3"/>
    </svg>
  ),
};

// ─── Section heading ──────────────────────────────────────────────────────────
function SectionLabel({ label, title, inView, delay = 0, ml }: {
  label: string; title: string; inView: boolean; delay?: number; ml: boolean
}) {
  return (
    <div className="text-center mb-12">
      <motion.div className="inline-flex items-center gap-3 mb-4"
        initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay }}>
        <div className="h-px w-8" style={{ background: 'linear-gradient(to right, transparent, rgba(212,175,55,0.5))' }} />
        <p className={`text-[10px] tracking-[0.4em] uppercase ${ml ? 'font-malayalam tracking-normal text-xs' : 'font-poppins'}`}
          style={{ color: 'rgba(212,175,55,0.65)' }}>
          {label}
        </p>
        <div className="h-px w-8" style={{ background: 'linear-gradient(to left, transparent, rgba(212,175,55,0.5))' }} />
      </motion.div>
      <motion.h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold leading-tight ${ml ? 'font-malayalam' : 'font-playfair'}`}
        style={{ color: '#FEF8F5' }}
        initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: delay + 0.12, duration: 0.7 }}>
        {title}
      </motion.h2>
      <motion.div className="flex items-center justify-center gap-3 mt-4"
        initial={{ opacity: 0, scaleX: 0 }} animate={inView ? { opacity: 1, scaleX: 1 } : {}} transition={{ delay: delay + 0.28, duration: 0.6 }}>
        <div className="h-px w-12" style={{ background: 'linear-gradient(to right, transparent, rgba(212,175,55,0.4))' }} />
        <svg width="10" height="10" viewBox="0 0 10 10">
          <polygon points="5,1 6.2,3.8 9.5,3.8 7,5.8 7.9,9 5,7.2 2.1,9 3,5.8 0.5,3.8 3.8,3.8" fill="#D4AF37" opacity="0.7"/>
        </svg>
        <div className="h-px w-12" style={{ background: 'linear-gradient(to left, transparent, rgba(212,175,55,0.4))' }} />
      </motion.div>
    </div>
  );
}

// ─── Gold divider ─────────────────────────────────────────────────────────────
function GoldDivider({ ornament = 'star' }: { ornament?: 'star' | 'crescent' }) {
  return (
    <div className="flex items-center gap-5 my-16 md:my-20">
      <div className="h-px flex-1" style={{ background: 'linear-gradient(to right, transparent, rgba(212,175,55,0.25))' }} />
      {ornament === 'crescent' ? (
        <svg width="28" height="28" viewBox="0 0 72 72">
          <path d="M36 14 A20 20 0 1 1 36 58 A12 12 0 1 0 36 14Z" fill="rgba(212,175,55,0.15)" stroke="#D4AF37" strokeWidth="1" opacity="0.7"/>
          <polygon points="46,22 47.5,26.5 52,26.5 48.5,29.2 50,34 46,31.2 42,34 43.5,29.2 40,26.5 44.5,26.5" fill="#D4AF37" opacity="0.65"/>
        </svg>
      ) : (
        <svg width="22" height="22" viewBox="0 0 24 24">
          <polygon points="12,2 14.2,8.5 21,8.5 15.5,12.8 17.8,19.5 12,15.5 6.2,19.5 8.5,12.8 3,8.5 9.8,8.5" fill="#D4AF37" opacity="0.55"/>
        </svg>
      )}
      <div className="h-px flex-1" style={{ background: 'linear-gradient(to left, transparent, rgba(212,175,55,0.25))' }} />
    </div>
  );
}

// ─── Person card ──────────────────────────────────────────────────────────────
function PersonCard({ person, role, delay }: {
  person: WeddingConfig['couple']['bride']; role: 'bride' | 'groom'; delay: number
}) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.12 });
  const { lang } = useLanguage();
  const ml    = lang === 'ml';
  const name  = ml ? (person.nameMalayalam || person.name) : person.name;
  const desc  = ml ? (person.descriptionMalayalam || person.description) : person.description;
  const label = ml ? (role === 'groom' ? 'വരൻ' : 'വധു') : (role === 'groom' ? 'The Groom' : 'The Bride');
  const isGroom = role === 'groom';
  const accentColor = isGroom ? '#D4AF37' : '#D4878D';

  return (
    <motion.div ref={ref}
      className="relative rounded-3xl overflow-hidden flex flex-col items-center text-center"
      style={{ boxShadow: '0 16px 56px rgba(0,0,0,0.45), 0 0 0 1px rgba(212,175,55,0.15)' }}
      initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -4, transition: { duration: 0.3 } }}>

      {/* Gold top stripe */}
      <div className="w-full h-0.5"
        style={{ background: isGroom
          ? 'linear-gradient(90deg, transparent, #D4AF37 25%, #E8CC6A 50%, #D4AF37 75%, transparent)'
          : 'linear-gradient(90deg, transparent, #D4878D 25%, #E8B4B8 50%, #D4878D 75%, transparent)' }} />

      <div className="w-full px-6 py-8 md:px-8 md:py-10"
        style={{ background: 'linear-gradient(170deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)' }}>

        {/* Corner ornaments */}
        <div className="absolute top-5 right-5 pointer-events-none" style={{ opacity: 0.12 }}>
          <svg width="32" height="32" viewBox="0 0 32 32">
            <polygon points="16,2 19,11 29,11 21,17 24,26 16,20 8,26 11,17 3,11 13,11"
              fill="none" stroke={accentColor} strokeWidth="1.2"/>
          </svg>
        </div>

        {/* Role badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6"
          style={{ background: `rgba(${isGroom ? '212,175,55' : '212,135,141'},0.1)`, border: `1px solid rgba(${isGroom ? '212,175,55' : '212,135,141'},0.25)` }}>
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: accentColor }} />
          <span className={`text-[10px] tracking-[0.3em] uppercase ${ml ? 'font-malayalam tracking-normal text-xs' : 'font-poppins'}`}
            style={{ color: accentColor }}>
            {label}
          </span>
        </div>

        {/* Emblem */}
        <div className="flex justify-center mb-5">
          <svg width="56" height="56" viewBox="0 0 60 60" fill="none">
            <circle cx="30" cy="30" r="26" fill="none" stroke={`rgba(${isGroom ? '212,175,55' : '212,135,141'},0.2)`} strokeWidth="0.8"/>
            {[0,45,90,135,180,225,270,315].map((pa) => {
              const pr = (pa * Math.PI) / 180;
              return <ellipse key={pa}
                cx={30 + 12 * Math.cos(pr)} cy={30 + 12 * Math.sin(pr)} rx="9" ry="5"
                transform={`rotate(${pa}, ${30 + 12 * Math.cos(pr)}, ${30 + 12 * Math.sin(pr)})`}
                fill={isGroom ? 'rgba(212,175,55,0.07)' : 'rgba(212,135,141,0.09)'}
                stroke={accentColor} strokeWidth="0.8"/>;
            })}
            <circle cx="30" cy="30" r="8.5" fill="rgba(212,175,55,0.05)" stroke={accentColor} strokeWidth="0.9"/>
            <text x="30" y="34.5" textAnchor="middle"
              style={{ fontFamily: 'Amiri, serif', fontSize: '13px', fill: '#D4AF37' }}>
              {isGroom ? 'ب' : 'ش'}
            </text>
          </svg>
        </div>

        {/* Arabic name */}
        <p className="font-amiri text-xl mb-3" style={{ color: 'rgba(232,180,184,0.5)' }} dir="rtl">
          {person.nameArabic}
        </p>

        {/* Thin divider */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="h-px w-10" style={{ background: `linear-gradient(to right, transparent, rgba(${isGroom ? '212,175,55' : '212,135,141'},0.35))` }} />
          <div className="w-1 h-1 rounded-full" style={{ background: accentColor, opacity: 0.6 }} />
          <div className="h-px w-10" style={{ background: `linear-gradient(to left, transparent, rgba(${isGroom ? '212,175,55' : '212,135,141'},0.35))` }} />
        </div>

        {/* Name */}
        <h3 className={`text-2xl md:text-3xl font-bold mb-3 leading-snug ${ml ? 'font-malayalam' : 'font-playfair'}`}
          style={{ color: '#FEF8F5' }}>
          {name}
        </h3>

        {/* Description */}
        <p className={`text-xs md:text-sm leading-relaxed ${ml ? 'font-malayalam' : 'font-poppins'}`}
          style={{ color: 'rgba(255,253,247,0.45)' }}>
          {desc}
        </p>
      </div>
    </motion.div>
  );
}

// ─── Timeline item ────────────────────────────────────────────────────────────
function TimelineItem({ item, index, isLast }: {
  item: WeddingConfig['timeline'][0]; index: number; isLast: boolean
}) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });
  const { lang } = useLanguage();
  const ml        = lang === 'ml';
  const title     = ml ? (item.titleMalayalam || item.title) : item.title;
  const desc      = ml ? (item.descriptionMalayalam || item.description) : item.description;
  const dateLabel = ml ? (item.dateMalayalam || item.date) : item.date;

  return (
    <div ref={ref} className="flex gap-5 sm:gap-6">
      {/* Connector column */}
      <div className="flex flex-col items-center shrink-0" style={{ width: 44 }}>
        {index > 0 && (
          <div className="w-px flex-1 max-h-6 -mt-6"
            style={{ background: 'linear-gradient(to bottom, transparent, rgba(212,175,55,0.4))' }} />
        )}
        <motion.div
          className="w-11 h-11 rounded-full flex items-center justify-center shrink-0 relative z-10"
          style={{ background: 'linear-gradient(135deg, #D4AF37 0%, #E8CC6A 50%, #C5A028 100%)', boxShadow: '0 0 0 4px rgba(212,175,55,0.1), 0 0 0 8px rgba(212,175,55,0.05), 0 6px 20px rgba(212,175,55,0.35)' }}
          initial={{ scale: 0, rotate: -30 }} animate={inView ? { scale: 1, rotate: 0 } : {}}
          transition={{ duration: 0.55, type: 'spring', stiffness: 220, delay: 0.1 }}>
          {TIMELINE_ICONS[item.icon] || TIMELINE_ICONS.ring}
        </motion.div>
        {!isLast && (
          <div className="w-px flex-1 min-h-12 mt-2"
            style={{ background: 'linear-gradient(to bottom, rgba(212,175,55,0.4), rgba(212,175,55,0.1))' }} />
        )}
      </div>

      {/* Text */}
      <motion.div className="flex-1 pb-10 pt-1"
        initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.65, delay: 0.18 }}>
        {item.titleArabic && (
          <p className="font-amiri text-base mb-1" style={{ color: 'rgba(212,175,55,0.6)' }} dir="rtl">
            {item.titleArabic}
          </p>
        )}
        <h3 className={`text-xl font-bold mb-1.5 ${ml ? 'font-malayalam' : 'font-playfair'}`}
          style={{ color: '#FEF8F5' }}>
          {title}
        </h3>
        <div className="inline-flex items-center gap-1.5 mb-3 px-2.5 py-1 rounded-full"
          style={{ background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.18)' }}>
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2.5">
            <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
          </svg>
          <span className={`text-[10px] font-semibold tracking-wide ${ml ? 'font-malayalam' : 'font-poppins'}`}
            style={{ color: '#D4AF37' }}>
            {dateLabel}
          </span>
        </div>
        {desc && (
          <p className={`text-sm leading-relaxed ${ml ? 'font-malayalam' : 'font-poppins'}`}
            style={{ color: 'rgba(255,253,247,0.45)' }}>
            {desc}
          </p>
        )}
      </motion.div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function OurStorySection({ config }: Props) {
  const [headerRef, headerInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [tlRef, tlInView]         = useInView({ triggerOnce: true, threshold: 0.05 });
  const [footRef, footInView]     = useInView({ triggerOnce: true, threshold: 0.1 });
  const { t, lang }               = useLanguage();
  const ml                        = lang === 'ml';
  const fontClass                 = ml ? 'font-malayalam' : 'font-poppins';

  const groomName      = ml ? (config.couple.groom.nameMalayalam || config.couple.groom.name) : config.couple.groom.name;
  const brideName      = ml ? (config.couple.bride.nameMalayalam || config.couple.bride.name) : config.couple.bride.name;
  const primaryName    = isBrideSide ? brideName : groomName;
  const secondaryName  = isBrideSide ? groomName : brideName;
  const activeTimeline = (isBrideSide && config.timelineBride) ? config.timelineBride : config.timeline;

  return (
    <section id="story" className="relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0A0306 0%, #1C0810 12%, #350F1C 42%, #1C0810 78%, #0A0306 100%)' }}>

      {/* Subtle geometric tile */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.032 }}>
        <defs>
          <pattern id="sp" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
            <polygon points="40,4 47,24 67,24 52,36 58,56 40,44 22,56 28,36 13,24 33,24"
              fill="none" stroke="#D4AF37" strokeWidth="0.9"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#sp)"/>
      </svg>

      {/* Top edge line */}
      <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, #D4AF37 25%, #E8CC6A 50%, #D4AF37 75%, transparent)' }} />

      <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 py-20 md:py-28">

        {/* ── Couple ── */}
        <div ref={headerRef}>
          <SectionLabel label={t.couple.label} title={t.couple.title} inView={headerInView} ml={ml} />
          <div className="grid md:grid-cols-2 gap-5 md:gap-7 max-w-2xl md:max-w-none mx-auto">
            <PersonCard
              person={isBrideSide ? config.couple.bride : config.couple.groom}
              role={isBrideSide ? 'bride' : 'groom'} delay={0.15} />
            <PersonCard
              person={isBrideSide ? config.couple.groom : config.couple.bride}
              role={isBrideSide ? 'groom' : 'bride'} delay={0.28} />
          </div>
        </div>

        <GoldDivider ornament="star" />

        {/* ── Timeline ── */}
        <div ref={tlRef}>
          <SectionLabel label={t.timeline.label} title={t.timeline.title} inView={tlInView} ml={ml} delay={0.1} />
          <div className="max-w-md mx-auto">
            {activeTimeline.map((item, i) => (
              <TimelineItem key={item.id} item={item} index={i} isLast={i === activeTimeline.length - 1} />
            ))}
          </div>
        </div>

        <GoldDivider ornament="crescent" />

        {/* ── Blessing / Footer ── */}
        <div ref={footRef} className="text-center">

          {/* Crescent ornament */}
          <motion.div className="flex justify-center mb-8"
            initial={{ opacity: 0, y: -12 }} animate={footInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
            <svg width="64" height="64" viewBox="0 0 72 72">
              <circle cx="36" cy="36" r="32" fill="none" stroke="rgba(212,175,55,0.14)" strokeWidth="0.8"/>
              <path d="M36 12 A22 22 0 1 1 36 60 A14 14 0 1 0 36 12Z"
                fill="rgba(212,175,55,0.1)" stroke="#D4AF37" strokeWidth="1"/>
              <polygon points="48,22 49.8,27.4 55.5,27.4 51,30.6 52.8,36 48,32.8 43.2,36 45,30.6 40.5,27.4 46.2,27.4"
                fill="#D4AF37" opacity="0.8"/>
            </svg>
          </motion.div>

          {/* Arabic blessing */}
          <motion.p className="font-amiri text-3xl md:text-4xl lg:text-5xl leading-loose mb-3"
            style={{ color: '#D4AF37' }} dir="rtl"
            initial={{ opacity: 0, y: 14 }} animate={footInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.12, duration: 0.8 }}>
            بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا
          </motion.p>

          <motion.p className={`text-sm mb-10 ${fontClass}`}
            style={{ color: 'rgba(255,253,247,0.38)' }}
            initial={{ opacity: 0 }} animate={footInView ? { opacity: 1 } : {}} transition={{ delay: 0.28 }}>
            {t.footer.blessingTranslation}
          </motion.p>

          {/* Names */}
          <motion.div className="flex flex-col sm:flex-row items-center justify-center gap-0 sm:gap-0 mb-3"
            initial={{ opacity: 0 }} animate={footInView ? { opacity: 1 } : {}} transition={{ delay: 0.4 }}>
            <h2 className={`text-3xl md:text-4xl font-bold leading-tight ${ml ? 'font-malayalam' : 'font-playfair'}`}
              style={{ color: '#FEF8F5' }}>
              {primaryName}
            </h2>
            <span className="font-amiri text-2xl sm:text-3xl mx-4 my-1 sm:my-0" style={{ color: 'rgba(212,175,55,0.7)' }}>
              ♥
            </span>
            <h2 className={`text-3xl md:text-4xl font-bold leading-tight ${ml ? 'font-malayalam' : 'font-playfair'}`}
              style={{ color: '#FEF8F5' }}>
              {secondaryName}
            </h2>
          </motion.div>

          <motion.p className={`text-sm mb-14 ${fontClass}`}
            style={{ color: 'rgba(255,253,247,0.3)' }}
            initial={{ opacity: 0 }} animate={footInView ? { opacity: 1 } : {}} transition={{ delay: 0.5 }}>
            {t.footer.tagline}
          </motion.p>

          {/* Bottom rule */}
          <motion.div
            initial={{ opacity: 0 }} animate={footInView ? { opacity: 1 } : {}} transition={{ delay: 0.65 }}>
            <div className="flex justify-center mb-5">
              <svg viewBox="0 0 160 14" className="w-36">
                <line x1="0" y1="7" x2="58" y2="7" stroke="rgba(212,175,55,0.22)" strokeWidth="0.8"/>
                <circle cx="80" cy="7" r="4" fill="none" stroke="rgba(212,175,55,0.32)" strokeWidth="0.8"/>
                <circle cx="80" cy="7" r="1.5" fill="rgba(212,175,55,0.4)"/>
                <line x1="102" y1="7" x2="160" y2="7" stroke="rgba(212,175,55,0.22)" strokeWidth="0.8"/>
                <polygon points="64,7 68,4 72,7 68,10" fill="none" stroke="rgba(212,175,55,0.3)" strokeWidth="0.7"/>
                <polygon points="88,7 92,4 96,7 92,10" fill="none" stroke="rgba(212,175,55,0.3)" strokeWidth="0.7"/>
              </svg>
            </div>
            <p className={`text-xs ${fontClass}`} style={{ color: 'rgba(255,253,247,0.22)' }}>
              {t.footer.madeWith} {primaryName} & {secondaryName} — {t.footer.year}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
