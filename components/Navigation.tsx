'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';

export default function Navigation() {
  const { lang, setLang, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const ml = lang === 'ml';

  const navLinks = [
    { label: t.nav.events, href: '#events' },
    { label: t.nav.couple, href: '#couple' },
    { label: t.nav.home, href: '#hero' },
    { label: t.nav.venue, href: '#venue' },
    { label: t.nav.family, href: '#family' },
  ];

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}>
        <div className="w-full max-w-5xl rounded-2xl transition-all duration-500"
          style={{
            background: scrolled ? 'rgba(60,16,32,0.97)' : 'rgba(60,16,32,0.68)',
            backdropFilter: 'blur(24px)',
            border: '1px solid rgba(212,175,55,0.15)',
            boxShadow: scrolled ? '0 12px 48px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)' : '0 4px 24px rgba(0,0,0,0.25)',
          }}>
          <div className="flex items-center justify-between px-5 md:px-8 py-3.5">
            {/* Logo */}
            <button onClick={() => scrollTo('#hero')} className="flex items-center gap-2.5 group">
              <div className="relative w-9 h-9 rounded-full flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #D4AF37, #B8960C)', boxShadow: '0 2px 12px rgba(212,175,55,0.4)' }}>
                <span className="font-playfair text-sm font-bold" style={{ color: '#3C1020' }}>B</span>
                <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full flex items-center justify-center"
                  style={{ background: '#3C1020', border: '1.5px solid #D4AF37' }}>
                  <span className="font-playfair font-bold" style={{ color: '#D4AF37', fontSize: '9px' }}>S</span>
                </div>
              </div>
              <svg className="hidden sm:block w-8 h-8" viewBox="0 0 40 40" fill="none">
                <path d="M20 4 C14 4, 8 9, 8 15 C8 22, 14 28, 20 36 C26 28, 32 22, 32 15 C32 9, 26 4, 20 4Z" fill="none" stroke="#D4AF37" strokeWidth="0.8" opacity="0.5"/>
                <circle cx="20" cy="15" r="4" fill="none" stroke="#D4AF37" strokeWidth="1"/>
                <path d="M20 11 L21.2 14 L24.4 14.2 L22 16.4 L22.8 19.5 L20 17.8 L17.2 19.5 L18 16.4 L15.6 14.2 L18.8 14Z" fill="#D4AF37" opacity="0.9"/>
                <path d="M12 30 Q16 26 20 28 Q24 26 28 30" stroke="#D4AF37" strokeWidth="0.7" fill="none" opacity="0.6"/>
              </svg>
            </button>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link, i) => (
                <button key={link.href} onClick={() => scrollTo(link.href)}
                  className={`relative px-4 py-2 rounded-xl text-xs font-medium transition-colors duration-200 group ${ml ? 'font-malayalam' : 'font-poppins tracking-wider uppercase'}`}
                  style={{ color: 'rgba(255,253,247,0.75)' }}>
                  <span className="relative z-10 group-hover:text-[#D4AF37] transition-colors duration-200" style={{ display: 'block' }}>
                    {i === 2 ? (
                      <span className="flex items-center gap-1">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#D4AF37' }}>
                          <polygon points="12,2 14.5,9.5 22,9.5 16,14 18.5,21.5 12,17 5.5,21.5 8,14 2,9.5 9.5,9.5" />
                        </svg>
                        {link.label}
                      </span>
                    ) : link.label}
                  </span>
                  <motion.div className="absolute bottom-1 left-4 right-4 h-px rounded-full origin-left scale-x-0 group-hover:scale-x-100"
                    style={{ background: '#D4AF37', transition: 'transform 0.2s ease' }} />
                </button>
              ))}
            </nav>

            {/* Right controls */}
            <div className="flex items-center gap-3">
              <div className="flex rounded-xl overflow-hidden" style={{ border: '1px solid rgba(212,175,55,0.25)' }}>
                {(['en', 'ml'] as const).map((l) => (
                  <button key={l} onClick={() => setLang(l)}
                    className={`px-3 py-1.5 text-xs font-semibold transition-all ${l === 'ml' ? 'font-malayalam' : 'font-poppins uppercase tracking-wider'}`}
                    style={{
                      background: lang === l ? 'linear-gradient(135deg, #D4AF37, #C5A028)' : 'transparent',
                      color: lang === l ? '#3C1020' : 'rgba(212,175,55,0.6)',
                    }}>
                    {l === 'en' ? 'EN' : 'മ'}
                  </button>
                ))}
              </div>
              <button className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5 rounded-xl"
                style={{ background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.2)' }}
                onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
                {[0, 1, 2].map((i) => (
                  <motion.span key={i} className="block rounded-full"
                    style={{ backgroundColor: '#D4AF37', height: '1.5px' }}
                    animate={menuOpen
                      ? i === 0 ? { width: '18px', rotate: 45, y: 6 }
                      : i === 1 ? { opacity: 0, width: '18px' }
                      : { width: '18px', rotate: -45, y: -6 }
                      : { width: i === 1 ? '12px' : '18px', rotate: 0, y: 0, opacity: 1 }} />
                ))}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0" style={{ background: 'rgba(10,3,6,0.9)', backdropFilter: 'blur(12px)' }}
              onClick={() => setMenuOpen(false)} />
            <motion.div className="absolute top-24 left-4 right-4 rounded-3xl overflow-hidden"
              style={{ background: 'rgba(60,16,32,0.98)', border: '1px solid rgba(212,175,55,0.18)' }}
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}>
              <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)' }} />
              <div className="p-6 space-y-1">
                {navLinks.map((link, i) => (
                  <motion.button key={link.href} onClick={() => scrollTo(link.href)}
                    className={`w-full text-left px-5 py-4 rounded-2xl flex items-center gap-3 ${ml ? 'font-malayalam text-base' : 'font-poppins text-sm tracking-wider uppercase'}`}
                    style={{ color: 'rgba(255,253,247,0.85)' }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    whileTap={{ scale: 0.98 }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(212,175,55,0.08)'; e.currentTarget.style.color = '#D4AF37'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,253,247,0.85)'; }}>
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#D4AF37', flexShrink: 0 }} />
                    {link.label}
                  </motion.button>
                ))}
              </div>
              <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)' }} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
