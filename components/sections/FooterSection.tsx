'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { WeddingConfig } from '@/lib/types';
import { useLanguage } from '@/lib/LanguageContext';

interface Props { config: WeddingConfig }

export default function FooterSection({ config }: Props) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const { t, lang } = useLanguage();
  const ml = lang === 'ml';
  const fontClass = ml ? 'font-malayalam' : 'font-poppins';
  const { contact, couple } = config;

  const groomName = ml ? (couple.groom.nameMalayalam || couple.groom.name) : couple.groom.name;
  const brideName = ml ? (couple.bride.nameMalayalam || couple.bride.name) : couple.bride.name;

  return (
    <footer className="relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #F5ECE8 0%, #EDE2DC 25%, #F2E8E3 55%, #EDE2DC 80%, #F5ECE8 100%)' }}>
      {/* Islamic geometric overlay */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.04 }}>
        <defs>
          <pattern id="fp" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
            <polygon points="40,5 46,22 64,22 51,33 56,50 40,39 24,50 29,33 16,22 34,22" fill="none" stroke="#8B4A2A" strokeWidth="0.8" />
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
            {/* Outer ring */}
            <circle cx="36" cy="36" r="34" fill="none" stroke="rgba(139,74,42,0.18)" strokeWidth="0.8" />
            {/* Crescent */}
            <path d="M36 12 A22 22 0 1 1 36 60 A14 14 0 1 0 36 12Z" fill="rgba(139,74,42,0.15)" stroke="#8B4A2A" strokeWidth="1" />
            {/* Star */}
            <polygon points="48,22 49.8,27.4 55.5,27.4 51,30.6 52.8,36 48,32.8 43.2,36 45,30.6 40.5,27.4 46.2,27.4" fill="#8B4A2A" opacity="0.85" />
          </svg>
        </motion.div>

        {/* Arabic blessing */}
        <motion.p className="font-amiri text-3xl md:text-4xl lg:text-5xl mb-4 leading-loose"
          style={{ color: '#8B4A2A' }} dir="rtl"
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }}>
          بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا
        </motion.p>

        <motion.p className={`text-sm mb-8 ${fontClass}`}
          style={{ color: 'rgba(60,16,32,0.55)' }}
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.3 }}>
          {t.footer.blessingTranslation}
        </motion.p>

        {/* Gold ornament divider */}
        <motion.div className="flex items-center justify-center gap-4 mb-10"
          initial={{ opacity: 0, scaleX: 0 }} animate={inView ? { opacity: 1, scaleX: 1 } : {}} transition={{ delay: 0.4 }}>
          <div className="h-px flex-1 max-w-32" style={{ background: 'linear-gradient(to right, transparent, #D4AF37)' }} />
          <svg width="24" height="24" viewBox="0 0 24 24">
            <polygon points="12,2 14.5,9 22,9 16,13.5 18.5,20.5 12,16.5 5.5,20.5 8,13.5 2,9 9.5,9" fill="#8B4A2A" opacity="0.85" />
          </svg>
          <div className="h-px flex-1 max-w-32" style={{ background: 'linear-gradient(to left, transparent, #D4AF37)' }} />
        </motion.div>

        {/* Couple names */}
        <motion.div className="mb-3"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.5 }}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-0">
            <h2 className={`text-2xl md:text-3xl lg:text-4xl font-bold leading-snug ${ml ? 'font-malayalam' : 'font-playfair'}`}
              style={{ color: '#3C1020', lineHeight: 1.15 }}>{groomName}</h2>
            <span className="font-playfair text-xl sm:text-2xl sm:mx-4 my-1 sm:my-0" style={{ color: '#8B4A2A' }}>♥</span>
            <h2 className={`text-2xl md:text-3xl lg:text-4xl font-bold leading-snug ${ml ? 'font-malayalam' : 'font-playfair'}`}
              style={{ color: '#3C1020', lineHeight: 1.15 }}>{brideName}</h2>
          </div>
        </motion.div>

        <motion.p className={`text-sm mb-12 ${fontClass}`}
          style={{ color: 'rgba(60,16,32,0.45)' }}
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.6 }}>
          {t.footer.tagline}
        </motion.p>

        {/* Contacts */}
        <motion.div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
          initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.65 }}>
          <a href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noopener noreferrer"
            className={`group flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-semibold transition-all ${fontClass}`}
            style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)', color: 'white', boxShadow: '0 6px 24px rgba(37,211,102,0.3)' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            {t.footer.whatsapp}
          </a>
          <a href={`tel:${contact.phone}`}
            className={`flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-semibold transition-all ${fontClass}`}
            style={{ background: 'rgba(139,74,42,0.08)', border: '1px solid rgba(139,74,42,0.28)', color: '#8B4A2A' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5 19.79 19.79 0 0 1 1.63 4.87a2 2 0 0 1 1.99-2.18h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8 10.91a16 16 0 0 0 6.07 6.07l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            {contact.phone}
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div className="flex items-center justify-center gap-4 mb-14"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.75 }}>
          {contact.instagram && (
            <a href={`https://instagram.com/${contact.instagram}`} target="_blank" rel="noopener noreferrer"
              className="w-11 h-11 rounded-full flex items-center justify-center transition-all hover:scale-110"
              style={{ background: 'rgba(139,74,42,0.08)', border: '1px solid rgba(139,74,42,0.25)' }} aria-label="Instagram">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#8B4A2A" strokeWidth="1.8">
                <rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeLinecap="round"/>
              </svg>
            </a>
          )}
          {contact.facebook && (
            <a href={`https://facebook.com/${contact.facebook}`} target="_blank" rel="noopener noreferrer"
              className="w-11 h-11 rounded-full flex items-center justify-center transition-all hover:scale-110"
              style={{ background: 'rgba(139,74,42,0.08)', border: '1px solid rgba(139,74,42,0.25)' }} aria-label="Facebook">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="#8B4A2A">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
          )}
        </motion.div>

        {/* Bottom rule + copyright */}
        <motion.div className="pt-8"
          style={{ borderTop: '1px solid rgba(212,175,55,0.12)' }}
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.85 }}>
          {/* Mini ornament */}
          <div className="flex justify-center mb-5">
            <svg viewBox="0 0 160 16" className="w-32">
              <line x1="0" y1="8" x2="60" y2="8" stroke="rgba(139,74,42,0.28)" strokeWidth="0.8" />
              <circle cx="80" cy="8" r="4" fill="none" stroke="rgba(139,74,42,0.38)" strokeWidth="0.8" />
              <circle cx="80" cy="8" r="1.5" fill="rgba(139,74,42,0.45)" />
              <line x1="100" y1="8" x2="160" y2="8" stroke="rgba(139,74,42,0.28)" strokeWidth="0.8" />
              <polygon points="66,8 70,5 74,8 70,11" fill="none" stroke="rgba(212,175,55,0.35)" strokeWidth="0.7" />
              <polygon points="86,8 90,5 94,8 90,11" fill="none" stroke="rgba(212,175,55,0.35)" strokeWidth="0.7" />
            </svg>
          </div>
          <p className={`text-xs ${fontClass}`} style={{ color: 'rgba(60,16,32,0.4)' }}>
            {t.footer.madeWith} {groomName} & {brideName} — {t.footer.year}
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
