'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import { WeddingConfig } from '@/lib/types';
import { useLanguage } from '@/lib/LanguageContext';

interface Props { config: WeddingConfig }

export default function GiftSection({ config }: Props) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const { t, lang } = useLanguage();
  const ml = lang === 'ml';
  const { gift } = config;
  if (!gift.enabled) return null;

  const message = ml ? (gift.messageMalayalam || gift.message) : gift.message;

  return (
    <section id="gift" className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #F8F0EC, #F2E8E3)' }}>
      <div className="absolute inset-0 pointer-events-none opacity-5"
        style={{ backgroundImage: 'radial-gradient(circle, #D4AF37 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div ref={ref} className="relative z-10 max-w-2xl mx-auto px-6 text-center">
        <motion.div className="flex justify-center mb-8"
          initial={{ opacity: 0, scale: 0.5 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.6 }}>
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center"
            style={{ background: 'rgba(212,175,55,0.15)', border: '1px solid rgba(212,175,55,0.3)' }}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5">
              <polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/>
              <line x1="12" y1="22" x2="12" y2="7"/>
              <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>
            </svg>
          </div>
        </motion.div>

        <motion.h2 className={`text-3xl md:text-4xl font-bold mb-4 ${ml ? 'font-malayalam' : 'font-playfair'}`}
          style={{ color: '#3C1020' }} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }}>
          {message}
        </motion.h2>

        <motion.p className={`text-sm mb-10 ${ml ? 'font-malayalam' : 'font-poppins'}`}
          style={{ color: 'rgba(60,16,32,0.55)' }} initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.3 }}>
          {t.gift.subtext}
        </motion.p>

        <motion.div className="inline-block rounded-3xl p-6"
          style={{ background: 'white', border: '2px solid rgba(212,175,55,0.5)', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}
          initial={{ opacity: 0, scale: 0.9 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.4, type: 'spring', stiffness: 200 }} whileHover={{ scale: 1.02 }}>
          <div className="relative w-40 h-40 mx-auto mb-3">
            <div className="absolute inset-0 flex items-center justify-center rounded-xl" style={{ background: '#f3f4f6' }}>
              <svg width="80" height="80" viewBox="0 0 80 80">
                <rect x="5" y="5" width="30" height="30" fill="none" stroke="#3C1020" strokeWidth="3"/>
                <rect x="12" y="12" width="16" height="16" fill="#3C1020"/>
                <rect x="45" y="5" width="30" height="30" fill="none" stroke="#3C1020" strokeWidth="3"/>
                <rect x="52" y="12" width="16" height="16" fill="#3C1020"/>
                <rect x="5" y="45" width="30" height="30" fill="none" stroke="#3C1020" strokeWidth="3"/>
                <rect x="12" y="52" width="16" height="16" fill="#3C1020"/>
                <rect x="45" y="45" width="8" height="8" fill="#3C1020"/>
                <rect x="57" y="45" width="8" height="8" fill="#3C1020"/>
                <rect x="45" y="57" width="8" height="8" fill="#3C1020"/>
                <rect x="57" y="57" width="8" height="8" fill="#3C1020"/>
              </svg>
            </div>
            <Image src={gift.upiQR} alt="UPI QR" fill className="object-contain rounded-xl" />
          </div>
          <p className="font-poppins text-sm font-semibold text-center" style={{ color: '#3C1020' }}>
            {t.gift.upiLabel}: {gift.upiId}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
