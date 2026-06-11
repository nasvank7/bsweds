'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import { useLanguage } from '@/lib/LanguageContext';

interface Props { images: string[] }

export default function GallerySection({ images }: Props) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [selected, setSelected] = useState<number | null>(null);
  const { t, lang } = useLanguage();
  const ml = lang === 'ml';

  const close = () => setSelected(null);
  const prev = () => setSelected((s) => (s! > 0 ? s! - 1 : images.length - 1));
  const next = () => setSelected((s) => (s! < images.length - 1 ? s! + 1 : 0));

  return (
    <section id="gallery" className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #0F5132, #0a3d24)' }}>
      <div className="absolute inset-0 pointer-events-none opacity-5"
        style={{ backgroundImage: 'radial-gradient(circle, #D4AF37 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div ref={ref} className="text-center mb-14">
          <motion.p className={`text-xs tracking-[0.3em] uppercase mb-3 ${ml ? 'font-malayalam tracking-normal' : 'font-poppins'}`}
            style={{ color: 'rgba(212,175,55,0.7)' }} initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}>
            {t.gallery.label}
          </motion.p>
          <motion.h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${ml ? 'font-malayalam' : 'font-playfair'}`}
            style={{ color: '#FFFDF7' }} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }}>
            {t.gallery.title}
          </motion.h2>
          <motion.div className="h-0.5 w-24 mx-auto" style={{ background: 'linear-gradient(to right, transparent, #D4AF37, transparent)' }}
            initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}} transition={{ delay: 0.4 }} />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {images.map((img, i) => {
            const [imgRef, imgInView] = useInView({ triggerOnce: true, threshold: 0.1 });
            const isTall = i % 5 === 0 || i % 7 === 0;
            return (
              <motion.div key={i} ref={imgRef}
                className={`relative overflow-hidden rounded-2xl cursor-pointer group ${isTall ? 'row-span-2' : ''}`}
                style={{ aspectRatio: isTall ? '3/4' : '4/3', border: '1px solid rgba(212,175,55,0.2)' }}
                initial={{ opacity: 0, scale: 0.95 }} animate={imgInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                onClick={() => setSelected(i)} whileHover={{ scale: 1.02 }}>
                <div className="absolute inset-0 flex items-center justify-center"
                  style={{ background: `linear-gradient(${135 + i * 30}deg, rgba(15,81,50,0.5), rgba(10,61,36,0.4))` }}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.2" opacity="0.5">
                    <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
                  </svg>
                </div>
                <Image src={img} alt={`Gallery ${i + 1}`} fill className="object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                  style={{ background: 'rgba(0,0,0,0.45)' }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
                  </svg>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div className="fixed inset-0 z-150 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.92)' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={close}>
            <button className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(212,175,55,0.2)', border: '1px solid rgba(212,175,55,0.3)' }} onClick={close}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
            <button className="absolute left-4 w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(212,175,55,0.2)', border: '1px solid rgba(212,175,55,0.3)' }}
              onClick={(e) => { e.stopPropagation(); prev(); }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <motion.div key={selected} className="relative max-w-3xl max-h-[80vh] w-full"
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}>
              <div className="relative rounded-2xl overflow-hidden"
                style={{ aspectRatio: '4/3', border: '1px solid rgba(212,175,55,0.2)', background: '#0a3d24' }}>
                <Image src={images[selected]} alt={`Gallery ${selected + 1}`} fill className="object-contain" />
              </div>
              <p className={`text-center mt-3 text-sm ${ml ? 'font-malayalam' : 'font-poppins'}`} style={{ color: 'rgba(212,175,55,0.7)' }}>
                {selected + 1} / {images.length}
              </p>
            </motion.div>
            <button className="absolute right-4 w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(212,175,55,0.2)', border: '1px solid rgba(212,175,55,0.3)' }}
              onClick={(e) => { e.stopPropagation(); next(); }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
