'use client';

import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const springConfig = { damping: 25, stiffness: 400, mass: 0.1 };
  const cursorXSpring = useSpring(-100, springConfig);
  const cursorYSpring = useSpring(-100, springConfig);

  useEffect(() => {
    // Only mount the cursor for non-touch devices
    if (window.matchMedia('(pointer: fine)').matches) {
      setIsVisible(true);

      const updateMousePosition = (e: MouseEvent) => {
        setMousePosition({ x: e.clientX, y: e.clientY });
        cursorXSpring.set(e.clientX);
        cursorYSpring.set(e.clientY);
      };

      const handleMouseOver = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const clickable = target.closest('a, button, input, textarea, select, [role="button"]');
        setIsHovered(!!clickable);
      };

      // Bruteforce hide the default system cursor and text cursors across all interactive elements
      const style = document.createElement('style');
      style.innerHTML = `
        * { cursor: none !important; }
      `;
      document.head.appendChild(style);

      window.addEventListener('mousemove', updateMousePosition);
      window.addEventListener('mouseover', handleMouseOver);

      return () => {
        window.removeEventListener('mousemove', updateMousePosition);
        window.removeEventListener('mouseover', handleMouseOver);
        document.head.removeChild(style);
      };
    }
  }, [cursorXSpring, cursorYSpring]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer Halo Glow */}
      <motion.div
        className="fixed top-0 left-0 w-32 h-32 rounded-full pointer-events-none z-[100] mix-blend-screen"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
          background: 'radial-gradient(circle, rgba(0,240,255,0.15) 0%, rgba(138,43,226,0.1) 40%, transparent 80%)',
          filter: 'blur(4px)',
        }}
        animate={{
          scale: isHovered ? 1.5 : 1,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      />
      
      {/* Inner Core Bright Dot */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[101]"
        style={{
           translateX: '-50%',
           translateY: '-50%',
        }}
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
          width: isHovered ? 12 : 6,
          height: isHovered ? 12 : 6,
          backgroundColor: isHovered ? '#8A2BE2' : '#00F0FF',
          boxShadow: isHovered 
            ? '0 0 15px 4px rgba(138, 43, 226, 0.9)' 
            : '0 0 12px 3px rgba(0, 240, 255, 0.9)',
        }}
        transition={{
          width: { type: "tween", duration: 0.15 },
          height: { type: "tween", duration: 0.15 },
          backgroundColor: { duration: 0.2 },
          boxShadow: { duration: 0.2 },
          x: { duration: 0 },
          y: { duration: 0 }
        }}
      />
    </>
  );
}
