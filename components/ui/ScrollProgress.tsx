'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 origin-left z-100"
      style={{ scaleX, background: 'linear-gradient(90deg, #7A3040, #8B4A2A, #C9997A, #8B4A2A, #7A3040)' }}
    />
  );
}
