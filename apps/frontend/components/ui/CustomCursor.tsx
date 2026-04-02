'use client';

import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);

  // Very tight spring for the glow so it follows closely but smoothly
  const springConfig = { damping: 40, stiffness: 600, mass: 0.1 };
  const cursorXSpring = useSpring(-200, springConfig);
  const cursorYSpring = useSpring(-200, springConfig);

  useEffect(() => {
    // Only mount the spotlight for non-touch devices
    if (window.matchMedia('(pointer: fine)').matches) {
      setIsVisible(true);

      const updateMousePosition = (e: MouseEvent) => {
        cursorXSpring.set(e.clientX);
        cursorYSpring.set(e.clientY);
      };

      window.addEventListener('mousemove', updateMousePosition);

      return () => {
        window.removeEventListener('mousemove', updateMousePosition);
      };
    }
  }, [cursorXSpring, cursorYSpring]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none mix-blend-screen z-[1]"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        translateX: '-50%',
        translateY: '-50%',
        background: 'radial-gradient(circle, rgba(0, 240, 255, 0.15) 0%, rgba(138, 43, 226, 0.05) 40%, transparent 70%)',
        filter: 'blur(40px)',
      }}
    />
  );
}
