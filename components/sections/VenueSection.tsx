'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { WeddingConfig } from '@/lib/types';
import { useLanguage } from '@/lib/LanguageContext';
import SectionHeader from '../ui/SectionHeader';
import { isBrideSide } from '@/lib/perspective';

interface Props { config: WeddingConfig }

export default function VenueSection({ config }: Props) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const { t, lang } = useLanguage();
  const ml = lang === 'ml';
  const venue = (isBrideSide && config.venueBride) ? config.venueBride : config.venue;
  const activeEvents = (isBrideSide && config.eventsBride) ? config.eventsBride : config.events;
  const reception = activeEvents.find((e) => e.id === 'reception');
  const venueName = ml ? (venue.nameMalayalam || venue.name) : venue.name;
  const venueAddr = ml ? (venue.addressMalayalam || venue.address) : venue.address;

  return (
    <section id="venue" className="relative py-16 md:py-24 lg:py-32 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #FEF8F5 0%, #FFFDF7 40%, #FEF8F5 100%)' }}>
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, #D4AF37 30%, #D4AF37 70%, transparent)' }} />
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, #D4AF37 30%, #D4AF37 70%, transparent)' }} />

      {/* Soft arabesque bg */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.025 }}>
        <defs>
          <pattern id="vp" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
            <circle cx="40" cy="40" r="28" fill="none" stroke="#3C1020" strokeWidth="1" />
            <circle cx="40" cy="40" r="14" fill="none" stroke="#3C1020" strokeWidth="0.6" />
            <line x1="12" y1="40" x2="68" y2="40" stroke="#3C1020" strokeWidth="0.4" />
            <line x1="40" y1="12" x2="40" y2="68" stroke="#3C1020" strokeWidth="0.4" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#vp)" />
      </svg>

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <div ref={ref}>
          <SectionHeader label={t.venue.label} title={t.venue.title} />
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          {/* Info panel */}
          <motion.div className="relative rounded-3xl overflow-hidden"
            initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.3 }}>
            {/* Gold top strip */}
            <div className="h-1.5 w-full" style={{ background: 'linear-gradient(90deg, #D4AF37, #E8CC6A, #D4AF37)' }} />

            <div className="p-5 md:p-8 lg:p-10 h-full"
              style={{
                background: 'rgba(255,255,255,0.78)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(212,175,55,0.28)',
                borderTop: 'none',
                boxShadow: '0 8px 40px rgba(60,16,32,0.07)',
              }}>
              {/* Venue icon */}
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8"
                style={{ background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.25)' }}>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path d="M16 3 Q20 7 20 11 L20 13 L12 13 L12 11 Q12 7 16 3Z" fill="rgba(212,175,55,0.35)" />
                  <rect x="3" y="13" width="26" height="2" rx="1" fill="#D4AF37" opacity="0.6" />
                  <rect x="5" y="15" width="22" height="14" rx="2" fill="none" stroke="rgba(60,16,32,0.4)" strokeWidth="1.2" />
                  <rect x="13" y="22" width="6" height="7" rx="1" fill="rgba(212,175,55,0.25)" />
                </svg>
              </div>

              {/* Name */}
              <h3 className={`text-xl md:text-2xl lg:text-3xl font-bold mb-3 leading-snug ${ml ? 'font-malayalam' : 'font-playfair'}`}
                style={{ color: '#3C1020' }}>
                {venueName}
              </h3>

              {/* Address */}
              <div className="flex items-start gap-3 mb-8">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(60,16,32,0.4)" strokeWidth="2" className="mt-0.5 flex-shrink-0">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                <p className={`text-sm leading-relaxed ${ml ? 'font-malayalam' : 'font-poppins'}`}
                  style={{ color: 'rgba(60,16,32,0.6)' }}>
                  {venueAddr}
                </p>
              </div>

              {/* Date/time row */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="rounded-2xl p-4" style={{ background: 'rgba(212,175,55,0.06)', border: '1px solid rgba(212,175,55,0.2)' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" className="mb-2">
                    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  <p className={`text-xs ${ml ? 'font-malayalam' : 'font-poppins tracking-wide uppercase'}`} style={{ color: 'rgba(212,175,55,0.75)' }}>
                    {ml ? 'തീയതി' : 'Date'}
                  </p>
                  <p className={`text-sm font-semibold mt-0.5 ${ml ? 'font-malayalam' : 'font-poppins'}`} style={{ color: '#3C1020' }}>
                    {ml ? 'ജൂലൈ 5, 2026' : 'July 5, 2026'}
                  </p>
                </div>
                <div className="rounded-2xl p-4" style={{ background: 'rgba(212,175,55,0.06)', border: '1px solid rgba(212,175,55,0.2)' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" className="mb-2">
                    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                  </svg>
                  <p className={`text-xs ${ml ? 'font-malayalam' : 'font-poppins tracking-wide uppercase'}`} style={{ color: 'rgba(212,175,55,0.75)' }}>
                    {ml ? 'സമയം' : 'Time'}
                  </p>
                  <p className={`text-sm font-semibold mt-0.5 ${ml ? 'font-malayalam' : 'font-poppins'}`} style={{ color: '#3C1020' }}>
                    {reception?.time ?? '5:00 PM'}
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px mb-8" style={{ background: 'rgba(212,175,55,0.2)' }} />

              {/* Buttons */}
              <div className="flex flex-col gap-3">
                <a href={venue.googleMapsUrl} target="_blank" rel="noopener noreferrer"
                  className={`group flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-full text-sm font-bold transition-all ${ml ? 'font-malayalam' : 'font-poppins tracking-wide'}`}
                  style={{ background: 'linear-gradient(135deg, #D4AF37 0%, #E8CC6A 50%, #D4AF37 100%)', color: '#2E0A14', boxShadow: '0 4px 20px rgba(212,175,55,0.35)' }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  {t.venue.openMaps}
                </a>
                <a href={venue.directionsUrl} target="_blank" rel="noopener noreferrer"
                  className={`flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-full text-sm font-semibold transition-all ${ml ? 'font-malayalam' : 'font-poppins tracking-wide'}`}
                  style={{ background: 'transparent', border: '1px solid rgba(212,175,55,0.4)', color: 'rgba(212,175,55,0.9)' }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>
                  {t.venue.getDirections}
                </a>
              </div>
            </div>
          </motion.div>

          {/* Map embed */}
          <motion.div className="rounded-3xl overflow-hidden min-h-[360px]"
            style={{ border: '1px solid rgba(212,175,55,0.25)', boxShadow: '0 24px 64px rgba(0,0,0,0.12)' }}
            initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.5 }}>
            <iframe src={venue.mapEmbed} width="100%" height="100%"
              style={{ border: 0, display: 'block', minHeight: '360px', height: '100%' }}
              allowFullScreen loading="lazy"
              referrerPolicy="no-referrer-when-downgrade" title="Wedding Venue Map" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
