'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { WeddingConfig, FamilyMember } from '@/lib/types';
import { useLanguage } from '@/lib/LanguageContext';
import SectionHeader from '../ui/SectionHeader';

interface Props { config: WeddingConfig }

function FamilyCard({ member, side, name, delay }: { member: FamilyMember; side: 'bride' | 'groom'; name: string; delay: number }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });
  const { t, lang } = useLanguage();
  const ml = lang === 'ml';

  const rows = [
    {
      icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(60,16,32,0.6)" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
      label: t.family.father,
      value: ml ? (member.fatherMalayalam || member.father) : member.father,
    },
    {
      icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(60,16,32,0.6)" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
      label: t.family.mother,
      value: ml ? (member.motherMalayalam || member.mother) : member.mother,
    },
    {
      icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
      label: t.family.siblings,
      value: ml ? (member.siblingsMalayalam || member.siblings) : member.siblings,
    },
  ];

  const isGroom = side === 'groom';

  return (
    <motion.div ref={ref} className="relative rounded-3xl overflow-hidden"
      initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay }}
      whileHover={{ y: -5, transition: { duration: 0.3 } }}>
      {/* Gold top stripe */}
      <div className="h-1.5" style={{ background: 'linear-gradient(90deg, #D4AF37, #E8CC6A, #D4AF37)' }} />

      <div className="p-8"
        style={{
          background: 'rgba(255,255,255,0.78)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(212,175,55,0.28)',
          borderTop: 'none',
          boxShadow: '0 8px 40px rgba(60,16,32,0.07), 0 1px 0 rgba(255,255,255,0.9) inset',
        }}>
        {/* Corner ornament */}
        <div className="absolute top-6 right-6 pointer-events-none opacity-15">
          <svg width="36" height="36" viewBox="0 0 36 36">
            <polygon points="18,3 22,13 34,13 25,20 28,31 18,24 8,31 11,20 2,13 14,13" fill="none" stroke="#D4AF37" strokeWidth="1.2" />
          </svg>
        </div>

        {/* Side indicator */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-5"
          style={{ background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.25)' }}>
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#D4AF37' }} />
          <span className={`text-xs font-semibold ${ml ? 'font-malayalam' : 'font-poppins tracking-wider uppercase'}`} style={{ color: '#C5A028' }}>
            {isGroom ? t.family.groomFamily : t.family.brideFamily}
          </span>
        </div>

        {/* Name */}
        <h3 className={`text-2xl md:text-3xl font-bold mb-6 ${ml ? 'font-malayalam' : 'font-playfair'}`}
          style={{ color: '#3C1020' }}>
          {name}
        </h3>

        {/* Divider */}
        <div className="h-px mb-6" style={{ background: 'linear-gradient(to right, rgba(212,175,55,0.4), transparent)' }} />

        {/* Rows */}
        <div className="space-y-5">
          {rows.map((row) => (
            <div key={row.label} className="flex items-start gap-4">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.2)' }}>
                {row.icon}
              </div>
              <div>
                <p className={`text-xs mb-0.5 ${ml ? 'font-malayalam' : 'font-poppins tracking-wider uppercase'}`}
                  style={{ color: 'rgba(212,175,55,0.75)' }}>
                  {row.label}
                </p>
                <p className={`text-sm font-medium leading-snug ${ml ? 'font-malayalam' : 'font-poppins'}`}
                  style={{ color: 'rgba(60,16,32,0.8)' }}>
                  {row.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function FamilySection({ config }: Props) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const { t, lang } = useLanguage();
  const ml = lang === 'ml';

  const groomName = ml ? (config.couple.groom.nameMalayalam || config.couple.groom.name) : config.couple.groom.name;
  const brideName = ml ? (config.couple.bride.nameMalayalam || config.couple.bride.name) : config.couple.bride.name;

  return (
    <section id="family" className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #FEF8F5 0%, #F2E4DB 50%, #FEF8F5 100%)' }}>
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, #D4AF37 30%, #D4AF37 70%, transparent)' }} />
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, #D4AF37 30%, #D4AF37 70%, transparent)' }} />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <div ref={ref}>
          <SectionHeader label={t.family.label} title={t.family.title} />
        </div>

        {/* Quote */}
        <motion.div className="text-center max-w-2xl mx-auto mb-14 -mt-6"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.5 }}>
          <p className={`text-lg md:text-xl leading-relaxed ${ml ? 'font-malayalam' : 'font-playfair italic'}`}
            style={{ color: '#6b7280' }}>
            {t.family.quote}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <FamilyCard member={config.family.groom} side="groom" name={groomName} delay={0.3} />
          <FamilyCard member={config.family.bride} side="bride" name={brideName} delay={0.5} />
        </div>
      </div>
    </section>
  );
}
