'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';

const SECTIONS = [
  { id: 'hero',     key: 'home'     },
  { id: 'couple',   key: 'couple'   },
  { id: 'events',   key: 'events'   },
  { id: 'timeline', key: 'timeline' },
  { id: 'venue',    key: 'venue'    },
  { id: 'family',   key: 'family'   },
];

export default function SideNavigation() {
  const { t, lang, setLang } = useLanguage();
  const ml = lang === 'ml';
  const [active, setActive]     = useState('hero');
  const [hovered, setHovered]   = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { threshold: 0.35 }
    );
    SECTIONS.forEach(s => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { obs.disconnect(); window.removeEventListener('scroll', onScroll); };
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const labels: Record<string, string> = {
    home:     t.nav.home,
    couple:   t.nav.couple,
    events:   t.nav.events,
    timeline: t.nav.timeline,
    venue:    t.nav.venue,
    family:   t.nav.family,
  };

  return (
    <>
      {/* ── Language toggle — top-right corner ── */}
      <motion.div
        className="fixed top-3 right-3 md:top-5 md:right-5 z-50"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}>
        <div className="flex rounded-2xl overflow-hidden"
          style={{
            background: scrolled ? 'rgba(254,248,245,0.96)' : 'rgba(254,248,245,0.82)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(212,175,55,0.35)',
            boxShadow: '0 4px 20px rgba(60,16,32,0.1)',
          }}>
          {(['en', 'ml'] as const).map(l => (
            <button key={l} onClick={() => setLang(l)}
              className={`px-3 py-1.5 md:px-4 md:py-2 text-xs font-semibold transition-all ${l === 'ml' ? 'font-malayalam' : 'font-poppins uppercase tracking-wider'}`}
              style={{
                background: lang === l ? 'linear-gradient(135deg, #D4AF37, #C5A028)' : 'transparent',
                color: lang === l ? '#3C1020' : 'rgba(60,16,32,0.4)',
              }}>
              {l === 'en' ? 'EN' : 'മ'}
            </button>
          ))}
        </div>
      </motion.div>

      {/* ── Dot navigation — right side (desktop only) ── */}
      <motion.nav
        className="fixed right-5 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-end gap-4"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.6 }}>

        {/* Background pill */}
        <div className="absolute inset-y-0 right-0 -inset-x-1 rounded-full pointer-events-none"
          style={{
            background: 'rgba(254,248,245,0.6)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(212,175,55,0.15)',
            boxShadow: '0 4px 24px rgba(60,16,32,0.06)',
          }} />

        {SECTIONS.map((s) => {
          const isActive = active === s.id;
          const isHovered = hovered === s.id;
          return (
            <div key={s.id}
              className="relative flex items-center justify-end"
              onMouseEnter={() => setHovered(s.id)}
              onMouseLeave={() => setHovered(null)}>

              {/* Hover label */}
              <AnimatePresence>
                {isHovered && (
                  <motion.span
                    className="absolute right-7 pointer-events-none whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-semibold"
                    style={{
                      background: 'rgba(254,248,245,0.97)',
                      backdropFilter: 'blur(12px)',
                      border: '1px solid rgba(212,175,55,0.3)',
                      color: '#3C1020',
                      boxShadow: '0 2px 12px rgba(60,16,32,0.1)',
                      fontFamily: ml ? 'Manjari, sans-serif' : 'Poppins, sans-serif',
                    }}
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 8 }}
                    transition={{ duration: 0.18 }}>
                    {labels[s.key]}
                  </motion.span>
                )}
              </AnimatePresence>

              {/* Dot */}
              <button onClick={() => scrollTo(s.id)} aria-label={labels[s.key]}
                className="relative z-10 w-6 h-6 flex items-center justify-center">
                <motion.div
                  className="rounded-full"
                  animate={{
                    width:  isActive ? 11 : 7,
                    height: isActive ? 11 : 7,
                    backgroundColor: isActive ? '#D4AF37' : 'rgba(60,16,32,0.22)',
                  }}
                  style={{
                    border: isActive ? '2px solid rgba(212,175,55,0.45)' : '1.5px solid rgba(60,16,32,0.15)',
                    boxShadow: isActive ? '0 0 0 3px rgba(212,175,55,0.15), 0 2px 8px rgba(212,175,55,0.3)' : 'none',
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 24 }} />
              </button>
            </div>
          );
        })}
      </motion.nav>
    </>
  );
}
