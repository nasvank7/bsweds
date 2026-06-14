'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { WeddingConfig } from '@/lib/types';
import { useLanguage } from '@/lib/LanguageContext';
import SectionHeader from '../ui/SectionHeader';
import { isBrideSide } from '@/lib/perspective';

interface Props { config: WeddingConfig }

const EVENT_ICONS = {
  mosque: (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
      <path d="M16 3 Q20 7 20 11 L20 13 L12 13 L12 11 Q12 7 16 3Z" fill="#D4AF37" opacity="0.8" />
      <rect x="3" y="13" width="26" height="2" rx="1" fill="#D4AF37" opacity="0.6" />
      <rect x="5" y="15" width="22" height="13" rx="2" fill="none" stroke="#D4AF37" strokeWidth="1.2" />
      <rect x="13" y="21" width="6" height="7" rx="1" fill="#D4AF37" opacity="0.4" />
      <circle cx="9" cy="19.5" r="2" fill="none" stroke="#D4AF37" strokeWidth="1" />
      <circle cx="23" cy="19.5" r="2" fill="none" stroke="#D4AF37" strokeWidth="1" />
    </svg>
  ),
  celebration: (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="11" fill="none" stroke="#D4AF37" strokeWidth="1.2" />
      <path d="M10 23 L13 14 L16 20 L19 14 L22 23" fill="none" stroke="#D4AF37" strokeWidth="1.4" strokeLinejoin="round" />
      <circle cx="16" cy="9" r="2" fill="#D4AF37" opacity="0.7" />
      <line x1="16" y1="5" x2="16" y2="3" stroke="#D4AF37" strokeWidth="1.5" />
      <line x1="23" y1="9" x2="25" y2="7" stroke="#D4AF37" strokeWidth="1.5" />
      <line x1="9" y1="9" x2="7" y2="7" stroke="#D4AF37" strokeWidth="1.5" />
    </svg>
  ),
};

function EventCard({ event, index }: { event: WeddingConfig['events'][0]; index: number }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const { lang } = useLanguage();
  const ml = lang === 'ml';
  const title = ml ? (event.titleMalayalam || event.title) : event.title;
  const date = ml ? (event.dateMalayalam || event.date) : event.date;
  const venue = ml ? (event.venueMalayalam || event.venue) : event.venue;
  const address = ml ? (event.addressMalayalam || event.address) : event.address;

  return (
    <motion.div ref={ref}
      className="relative overflow-hidden rounded-3xl"
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      whileHover={{ y: -6, transition: { duration: 0.3 } }}>
      {/* Arch top shape */}
      <div className="absolute top-0 left-0 right-0 h-2"
        style={{ background: 'linear-gradient(90deg, #D4AF37, #E8CC6A, #D4AF37)' }} />

      <div className="p-5 md:p-8 lg:p-10 h-full"
        style={{
          background: index === 0
            ? 'linear-gradient(145deg, #3C1020 0%, #1C0810 60%, #100408 100%)'
            : 'linear-gradient(145deg, #1a1030 0%, #110a22 60%, #0a0616 100%)',
          border: '1px solid rgba(212,175,55,0.12)',
          boxShadow: '0 24px 64px rgba(0,0,0,0.35)',
        }}>
        {/* Subtle inner pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{ backgroundImage: 'radial-gradient(circle, #D4AF37 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

        {/* Icon */}
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
          style={{ background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.25)' }}>
          {EVENT_ICONS[event.icon as keyof typeof EVENT_ICONS] || EVENT_ICONS.mosque}
        </div>

        {/* Arabic title */}
        <p className="font-amiri text-lg mb-1" style={{ color: 'rgba(212,175,55,0.55)' }} dir="rtl">
          {event.titleArabic}
        </p>

        {/* Title */}
        <h3 className={`text-2xl md:text-3xl lg:text-4xl font-bold mb-5 leading-snug ${ml ? 'font-malayalam' : 'font-playfair'}`}
          style={{ color: '#FEF8F5' }}>
          {title}
        </h3>

        {/* Divider */}
        <div className="h-px mb-6" style={{ background: 'rgba(212,175,55,0.15)' }} />

        {/* Details */}
        <div className="space-y-5">
          {[
            {
              icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
              value: date,
              color: 'rgba(255,253,247,0.92)',
              weight: 'font-medium',
            },
            {
              icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
              value: event.time,
              color: 'rgba(255,253,247,0.92)',
              weight: 'font-medium',
            },
            {
              icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
              value: venue,
              color: 'rgba(255,253,247,0.88)',
              weight: 'font-semibold',
            },
            {
              icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(212,175,55,0.75)" strokeWidth="1.8"><path d="M3 12h18M3 6h18M3 18h12"/></svg>,
              value: address,
              color: 'rgba(255,253,247,0.72)',
              weight: 'font-normal',
            },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="mt-0.5 shrink-0">{item.icon}</div>
              <p className={`text-sm md:text-base leading-relaxed ${item.weight} ${ml ? 'font-malayalam' : 'font-poppins'}`}
                style={{ color: item.color }}>
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function EventDetailsSection({ config }: Props) {
  const [ref] = useInView({ triggerOnce: true, threshold: 0.05 });
  const { t } = useLanguage();
  const activeEvents = (isBrideSide && config.eventsBride) ? config.eventsBride : config.events;

  return (
    <section id="events" className="relative py-16 md:py-24 lg:py-32 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #FFFDF7 0%, #FEF8F5 40%, #FFFDF7 100%)' }}>
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, #D4AF37 30%, #D4AF37 70%, transparent)' }} />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <div ref={ref}><SectionHeader label={t.events.label} title={t.events.title} /></div>

        <div className={activeEvents.length === 1 ? 'max-w-xl mx-auto' : 'grid md:grid-cols-2 gap-6 md:gap-8'}>
          {activeEvents.map((event, i) => (
            <EventCard key={event.id} event={event} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
