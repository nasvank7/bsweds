'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Wish } from '@/lib/types';
import { useLanguage } from '@/lib/LanguageContext';

const STORAGE_KEY = 'wedding_wishes';

export default function WishesSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const { t, lang } = useLanguage();
  const ml = lang === 'ml';
  const fontClass = ml ? 'font-malayalam' : 'font-poppins';

  const [wishes, setWishes] = useState<Wish[]>([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<{ name?: string; message?: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try { setWishes(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')); } catch { setWishes([]); }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: typeof errors = {};
    if (!name.trim()) errs.name = t.wishes.nameError;
    if (!message.trim()) errs.message = t.wishes.messageError;
    else if (message.trim().length < 5) errs.message = t.wishes.messageTooShort;
    if (Object.keys(errs).length) { setErrors(errs); return; }
    const wish: Wish = { id: Date.now().toString(), name: name.trim(), message: message.trim(), timestamp: Date.now() };
    const updated = [wish, ...wishes];
    setWishes(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setName(''); setMessage(''); setErrors({});
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const inputStyle = { background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(212,175,55,0.2)', color: '#FFFDF7' };

  return (
    <section id="wishes" className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #FFFDF7, #F7F2E7)' }}>
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)' }} />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <div ref={ref} className="text-center mb-12">
          <motion.p className={`text-xs tracking-[0.3em] uppercase mb-3 ${ml ? 'font-malayalam tracking-normal' : 'font-poppins'}`}
            style={{ color: '#D4AF37' }} initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}>
            {t.wishes.label}
          </motion.p>
          <motion.h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${ml ? 'font-malayalam' : 'font-playfair'}`}
            style={{ color: '#0F5132' }} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }}>
            {t.wishes.title}
          </motion.h2>
          <motion.div className="h-0.5 w-24 mx-auto" style={{ background: 'linear-gradient(to right, transparent, #D4AF37, transparent)' }}
            initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}} transition={{ delay: 0.4 }} />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Form */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.4 }}>
            <form onSubmit={handleSubmit} className="rounded-3xl p-6 space-y-4"
              style={{ background: 'linear-gradient(145deg, #0F5132, #133d26)', border: '1px solid rgba(212,175,55,0.18)', boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}>
              <div>
                <label className={`block text-xs tracking-wider uppercase mb-2 ${fontClass}`} style={{ color: 'rgba(212,175,55,0.75)' }}>{t.wishes.nameLabel}</label>
                <input type="text" value={name}
                  onChange={(e) => { setName(e.target.value); if (errors.name) setErrors((er) => ({ ...er, name: undefined })); }}
                  placeholder={t.wishes.namePlaceholder}
                  className={`w-full rounded-xl px-4 py-3 text-sm outline-none ${fontClass}`} style={inputStyle} />
                {errors.name && <p className={`text-red-400 text-xs mt-1 ${fontClass}`}>{errors.name}</p>}
              </div>
              <div>
                <label className={`block text-xs tracking-wider uppercase mb-2 ${fontClass}`} style={{ color: 'rgba(212,175,55,0.75)' }}>{t.wishes.messageLabel}</label>
                <textarea rows={4} value={message}
                  onChange={(e) => { setMessage(e.target.value); if (errors.message) setErrors((er) => ({ ...er, message: undefined })); }}
                  placeholder={t.wishes.messagePlaceholder}
                  className={`w-full rounded-xl px-4 py-3 text-sm outline-none resize-none ${fontClass}`} style={inputStyle} />
                {errors.message && <p className={`text-red-400 text-xs mt-1 ${fontClass}`}>{errors.message}</p>}
              </div>
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div key="thanks" className="flex items-center justify-center gap-2 py-4 rounded-full"
                    style={{ background: 'rgba(212,175,55,0.2)', border: '1px solid rgba(212,175,55,0.4)' }}
                    initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}>
                    <span style={{ color: '#D4AF37' }}>✓</span>
                    <span className={`text-sm ${fontClass}`} style={{ color: 'rgba(212,175,55,0.9)' }}>{t.wishes.success}</span>
                  </motion.div>
                ) : (
                  <motion.button key="submit" type="submit"
                    className={`w-full py-3.5 rounded-full text-sm font-bold ${ml ? 'font-malayalam' : 'font-poppins tracking-widest uppercase'}`}
                    style={{ background: 'linear-gradient(135deg, #D4AF37, #C5A028)', color: '#0F5132' }}
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    {t.wishes.submit}
                  </motion.button>
                )}
              </AnimatePresence>
            </form>
          </motion.div>

          {/* Wishes wall */}
          <motion.div className="space-y-4 max-h-[480px] overflow-y-auto pr-2"
            style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(212,175,55,0.3) transparent' }}
            initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.5 }}>
            {!mounted ? null : wishes.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-40 text-center">
                <span className="text-3xl mb-3">🤲</span>
                <p className={`text-sm ${fontClass}`} style={{ color: '#9ca3af' }}>{t.wishes.empty}</p>
              </div>
            ) : (
              <AnimatePresence>
                {wishes.map((wish, i) => (
                  <motion.div key={wish.id} className="rounded-2xl p-5"
                    style={{ background: 'white', border: '1px solid rgba(212,175,55,0.2)', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                        style={{ background: 'linear-gradient(135deg, #0F5132, #1a6b42)', color: '#D4AF37' }}>
                        {wish.name.charAt(0).toUpperCase()}
                      </div>
                      <p className={`text-sm font-semibold ${fontClass}`} style={{ color: '#0F5132' }}>{wish.name}</p>
                    </div>
                    <p className={`text-sm leading-relaxed ${fontClass}`} style={{ color: '#4b5563' }}>{wish.message}</p>
                    <p className="font-poppins text-xs mt-2" style={{ color: '#d1d5db' }}>
                      {new Date(wish.timestamp).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
