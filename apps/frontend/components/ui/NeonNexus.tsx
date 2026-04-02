'use client';

import React from 'react';
import { motion } from 'framer-motion';

export function NeonNexus() {
  const rings = Array.from({ length: 5 });

  return (
    <div className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px] flex items-center justify-center perspective-[1000px] pointer-events-none">
      
      {/* Central Volumetric Glow */}
      <div className="absolute inset-0 m-auto w-1/2 h-1/2 bg-blue-500/20 rounded-full blur-[80px]" />
      
      {rings.map((_, i) => {
        const size = 100 - i * 15; // Decreasing size %
        const duration = 15 + i * 5; // Increasing duration for parallax
        const delay = i * -2; // Offset start times
        
        return (
          <motion.div
            key={i}
            className="absolute m-auto rounded-full border-2 border-transparent"
            style={{
              width: `${size}%`,
              height: `${size}%`,
              borderImage: 'linear-gradient(to right, rgba(0,240,255,0.8), rgba(138,43,226,0.3), rgba(0,240,255,0.1)) 1',
              borderRadius: '50%',
              borderImageSlice: 0,
              border: `2px solid rgba(0,240,255,${0.5 - i * 0.1})`, // Fallback for rounded gradient borders
              boxShadow: `inset 0 0 20px rgba(138,43,226,${0.2}), 0 0 30px rgba(0,240,255,${0.2})`,
            }}
            animate={{
              rotateX: [0, 360],
              rotateY: [0, 360],
              rotateZ: [0, 360],
            }}
            transition={{
              duration: duration,
              ease: "linear",
              repeat: Infinity,
              delay: delay,
            }}
          />
        );
      })}
    </div>
  );
}
