'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { motion, HTMLMotionProps } from 'framer-motion';

type GlassCardProps = React.ComponentProps<typeof motion.div> & {
  children: React.ReactNode;
  gradientHover?: boolean;
};

export function GlassCard({
  children,
  className,
  gradientHover = false,
  ...props
}: GlassCardProps) {
  return (
    <motion.div
      className={cn(
        'relative bg-[#121212]/60 backdrop-blur-md border border-[rgba(255,255,255,0.05)] rounded-xl overflow-hidden transition-all duration-300',
        gradientHover && 'hover:bg-[#121212]/80 hover:border-[#8A2BE2]/30',
        className
      )}
      {...props}
    >
      {/* Optional subtle inner gradient top edge */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.1)] to-transparent" />
      {children}
    </motion.div>
  );
}
