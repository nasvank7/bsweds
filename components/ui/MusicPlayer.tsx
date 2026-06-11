'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface MusicPlayerProps {
  src: string;
}

export default function MusicPlayer({ src }: MusicPlayerProps) {
  const [playing, setPlaying] = useState(false);
  const [mounted, setMounted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('wedding_music');
    if (saved === 'playing') setPlaying(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.play().catch(() => setPlaying(false));
      localStorage.setItem('wedding_music', 'playing');
    } else {
      audio.pause();
      localStorage.setItem('wedding_music', 'paused');
    }
  }, [playing, mounted]);

  if (!mounted) return null;

  return (
    <>
      <audio ref={audioRef} src={src} loop />
      <motion.button
        onClick={() => setPlaying(!playing)}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center shadow-2xl"
        style={{ background: 'linear-gradient(135deg, #0F5132, #1a7a4c)' }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label={playing ? 'Mute music' : 'Play music'}
        title={playing ? 'Mute nasheed' : 'Play nasheed'}
      >
        {playing ? (
          <motion.div
            className="flex items-end gap-0.5 h-5"
            animate={{ scaleY: [1, 1.4, 0.8, 1.2, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          >
            {[1, 1.5, 0.8, 1.3, 1].map((h, i) => (
              <motion.span
                key={i}
                className="w-1 rounded-full"
                style={{ backgroundColor: '#D4AF37', height: `${h * 12}px` }}
                animate={{ scaleY: [1, h, 0.7, 1] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
              />
            ))}
          </motion.div>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#D4AF37">
            <path d="M11 5L6 9H2v6h4l5 4V5z" />
            <line x1="23" y1="9" x2="17" y2="15" stroke="#D4AF37" strokeWidth="2" />
            <line x1="17" y1="9" x2="23" y2="15" stroke="#D4AF37" strokeWidth="2" />
          </svg>
        )}
      </motion.button>
    </>
  );
}
