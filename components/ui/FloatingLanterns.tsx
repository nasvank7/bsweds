'use client';

import { motion } from 'framer-motion';

interface Lantern {
  id: number;
  x: number;
  size: number;
  delay: number;
  duration: number;
  color: string;
}

const lanterns: Lantern[] = [
  { id: 1, x: 10, size: 28, delay: 0, duration: 8, color: '#D4AF37' },
  { id: 2, x: 25, size: 22, delay: 1.5, duration: 10, color: '#C5A028' },
  { id: 3, x: 75, size: 32, delay: 0.8, duration: 9, color: '#D4AF37' },
  { id: 4, x: 88, size: 20, delay: 2, duration: 11, color: '#E8C84A' },
  { id: 5, x: 50, size: 26, delay: 3, duration: 8.5, color: '#D4AF37' },
];

function LanternSVG({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size * 1.6} viewBox="0 0 40 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Top cap */}
      <rect x="14" y="0" width="12" height="4" rx="2" fill={color} opacity="0.9" />
      {/* String */}
      <line x1="20" y1="4" x2="20" y2="10" stroke={color} strokeWidth="1.5" />
      {/* Body */}
      <ellipse cx="20" cy="36" rx="14" ry="22" fill={color} opacity="0.15" />
      <ellipse cx="20" cy="36" rx="14" ry="22" fill="none" stroke={color} strokeWidth="1.5" />
      {/* Ribs */}
      <line x1="6" y1="28" x2="34" y2="28" stroke={color} strokeWidth="0.8" opacity="0.7" />
      <line x1="6" y1="36" x2="34" y2="36" stroke={color} strokeWidth="0.8" opacity="0.7" />
      <line x1="6" y1="44" x2="34" y2="44" stroke={color} strokeWidth="0.8" opacity="0.7" />
      {/* Flame glow */}
      <ellipse cx="20" cy="36" rx="6" ry="8" fill={color} opacity="0.25" />
      {/* Bottom tassel */}
      <line x1="20" y1="58" x2="20" y2="64" stroke={color} strokeWidth="1.5" />
      <circle cx="20" cy="64" r="2" fill={color} opacity="0.8" />
    </svg>
  );
}

export default function FloatingLanterns() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {lanterns.map((lantern) => (
        <motion.div
          key={lantern.id}
          className="absolute bottom-0"
          style={{ left: `${lantern.x}%` }}
          initial={{ y: '110%', opacity: 0 }}
          animate={{
            y: [null, '-120vh'],
            opacity: [0, 0.7, 0.7, 0],
            x: [0, 15, -10, 5],
          }}
          transition={{
            duration: lantern.duration,
            delay: lantern.delay,
            repeat: Infinity,
            repeatDelay: lantern.duration * 0.5,
            ease: 'easeInOut',
          }}
        >
          <motion.div
            animate={{ rotate: [-5, 5, -5] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <LanternSVG size={lantern.size} color={lantern.color} />
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
