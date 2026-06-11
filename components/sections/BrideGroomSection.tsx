'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { WeddingConfig, CoupleInfo } from '@/lib/types';
import { useLanguage } from '@/lib/LanguageContext';
import SectionHeader from '../ui/SectionHeader';

interface Props { config: WeddingConfig }

function PersonCard({ person, role, delay }: { person: CoupleInfo; role: 'groom' | 'bride'; delay: number }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const { lang } = useLanguage();
  const ml = lang === 'ml';
  const displayName = ml ? (person.nameMalayalam || person.name) : person.name;
  const displayDesc = ml ? (person.descriptionMalayalam || person.description) : person.description;
  const roleLabel = ml ? (role === 'groom' ? 'വരൻ' : 'വധു') : (role === 'groom' ? 'The Groom' : 'The Bride');
  const isGroom = role === 'groom';

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay }}
      className="relative overflow-hidden rounded-3xl flex flex-col items-center text-center px-8 py-10"
      style={{
        background: 'rgba(255,255,255,0.75)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(212,175,55,0.3)',
        boxShadow: '0 8px 40px rgba(60,16,32,0.08), 0 1px 0 rgba(255,255,255,0.9) inset',
      }}>

      {/* Floral corner ornaments */}
      {[
        { style: { top: 0, left: 0 } },
        { style: { top: 0, right: 0, transform: 'scaleX(-1)' } },
        { style: { bottom: 0, left: 0, transform: 'scaleY(-1)' } },
        { style: { bottom: 0, right: 0, transform: 'scale(-1,-1)' } },
      ].map((c, i) => (
        <svg key={i} className="absolute w-20 h-20 pointer-events-none" viewBox="0 0 80 80" fill="none"
          style={{ opacity: 0.22, ...c.style }}>
          <path d="M5 5 Q22 5 32 18 Q44 34 44 52" stroke="#D4AF37" strokeWidth="1.2" />
          <ellipse cx="28" cy="14" rx="10" ry="5.5" transform="rotate(-40 28 14)" fill="none" stroke="#D4878D" strokeWidth="0.9" />
          <ellipse cx="15" cy="32" rx="8" ry="4.5" transform="rotate(-70 15 32)" fill="none" stroke="#D4878D" strokeWidth="0.9" />
          <circle cx="28" cy="12" r="2.5" fill="#D4AF37" />
        </svg>
      ))}

      {/* Gold top rule */}
      <div className="absolute top-0 left-0 right-0 h-px rounded-t-3xl"
        style={{ background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)' }} />

      {/* Rose emblem */}
      <div className="mb-6">
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
          <circle cx="30" cy="30" r="27" fill="none" stroke="rgba(212,175,55,0.2)" strokeWidth="1" />
          {[0,45,90,135,180,225,270,315].map((pa) => {
            const pr = (pa * Math.PI) / 180;
            return <ellipse key={pa} cx={30 + 13 * Math.cos(pr)} cy={30 + 13 * Math.sin(pr)} rx="10" ry="5.5"
              transform={`rotate(${pa}, ${30 + 13 * Math.cos(pr)}, ${30 + 13 * Math.sin(pr)})`}
              fill={isGroom ? 'rgba(212,175,55,0.08)' : 'rgba(212,135,141,0.1)'}
              stroke={isGroom ? '#D4AF37' : '#D4878D'} strokeWidth="0.9" />;
          })}
          <circle cx="30" cy="30" r="9" fill="rgba(212,175,55,0.06)"
            stroke={isGroom ? '#D4AF37' : '#D4878D'} strokeWidth="1" />
          <text x="30" y="34.5" textAnchor="middle"
            style={{ fontFamily: 'Amiri, serif', fontSize: '14px', fill: '#D4AF37' }}>
            {isGroom ? 'ب' : 'ش'}
          </text>
        </svg>
      </div>

      {/* Role label */}
      <p className={`text-xs tracking-[0.35em] uppercase mb-2 ${ml ? 'font-malayalam tracking-normal' : 'font-poppins'}`}
        style={{ color: '#D4AF37' }}>
        {roleLabel}
      </p>

      {/* Arabic name */}
      <p className="font-amiri text-3xl mb-2" style={{ color: 'rgba(60,16,32,0.5)' }} dir="rtl">
        {person.nameArabic}
      </p>

      {/* Floral divider */}
      <div className="flex items-center gap-2 my-3 w-full justify-center">
        <div className="h-px flex-1 max-w-[60px]" style={{ background: 'rgba(212,175,55,0.35)' }} />
        <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
          {[0,72,144,216,288].map((pa) => {
            const pr = (pa * Math.PI) / 180;
            return <ellipse key={pa} cx={9 + 4 * Math.cos(pr)} cy={6 + 4 * Math.sin(pr)} rx="3.5" ry="2.2"
              transform={`rotate(${pa}, ${9 + 4 * Math.cos(pr)}, ${6 + 4 * Math.sin(pr)})`}
              fill="none" stroke="#D4878D" strokeWidth="0.7" />;
          })}
          <circle cx="9" cy="6" r="1.8" fill="#D4AF37" opacity="0.8" />
        </svg>
        <div className="h-px flex-1 max-w-[60px]" style={{ background: 'rgba(212,175,55,0.35)' }} />
      </div>

      {/* Display name */}
      <h3 className={`text-2xl md:text-3xl font-bold mb-4 ${ml ? 'font-malayalam' : 'font-playfair'}`}
        style={{ color: '#3C1020' }}>
        {displayName}
      </h3>

      {/* Description */}
      <p className={`text-sm leading-relaxed max-w-[240px] ${ml ? 'font-malayalam' : 'font-poppins'}`}
        style={{ color: 'rgba(60,16,32,0.55)' }}>
        {displayDesc}
      </p>
    </motion.div>
  );
}

export default function BrideGroomSection({ config }: Props) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const { t } = useLanguage();

  return (
    <section id="couple" className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #FEF8F5 0%, #F5EDE8 50%, #FEF8F5 100%)' }}>

      {/* Floral background pattern */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.04 }}>
        <defs>
          <pattern id="bgp" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <polygon points="50,5 61,35 93,35 67,55 77,85 50,65 23,85 33,55 7,35 39,35"
              fill="none" stroke="#3C1020" strokeWidth="1" />
            <circle cx="50" cy="50" r="10" fill="none" stroke="#D4AF37" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#bgp)" />
      </svg>

      {/* Gold rule top */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #D4AF37 30%, #D4AF37 70%, transparent)' }} />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <div ref={ref}>
          <SectionHeader label={t.couple.label} title={t.couple.title} />
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto relative">
          <PersonCard person={config.couple.groom} role="groom" delay={0.2} />

          {/* Center connector — desktop */}
          <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-3 z-10">
            <div className="h-16 w-px" style={{ background: 'linear-gradient(to bottom, transparent, rgba(212,175,55,0.5))' }} />
            <div className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #D4AF37, #C5A028)', boxShadow: '0 4px 20px rgba(212,175,55,0.4)' }}>
              <span className="font-playfair text-lg font-bold" style={{ color: '#2E0A14' }}>&</span>
            </div>
            <div className="h-16 w-px" style={{ background: 'linear-gradient(to top, transparent, rgba(212,175,55,0.5))' }} />
          </div>

          {/* Center divider — mobile */}
          <div className="md:hidden flex items-center gap-4 -my-2">
            <div className="h-px flex-1" style={{ background: 'rgba(212,175,55,0.3)' }} />
            <div className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #D4AF37, #C5A028)' }}>
              <span className="font-playfair text-base font-bold" style={{ color: '#2E0A14' }}>&</span>
            </div>
            <div className="h-px flex-1" style={{ background: 'rgba(212,175,55,0.3)' }} />
          </div>

          <PersonCard person={config.couple.bride} role="bride" delay={0.4} />
        </div>
      </div>
    </section>
  );
}
