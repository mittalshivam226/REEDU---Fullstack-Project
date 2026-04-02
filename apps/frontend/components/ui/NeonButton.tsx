'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { motion, HTMLMotionProps } from 'framer-motion';

type NeonButtonProps = React.ComponentProps<typeof motion.button> & {
  variant?: 'primary' | 'secondary' | 'ghost';
  children: React.ReactNode;
};

export function NeonButton({
  variant = 'primary',
  className,
  children,
  ...props
}: NeonButtonProps) {
  const baseStyles =
    'relative inline-flex items-center justify-center px-6 py-3 text-sm font-semibold tracking-wide transition-all duration-300 rounded overflow-hidden disabled:opacity-50';

  const variants = {
    primary:
      'bg-primary text-primary-foreground hover:shadow-glow-primary hover:scale-[1.02]',
    secondary:
      'bg-transparent border border-secondary text-secondary hover:bg-[rgba(0,240,255,0.1)] hover:shadow-glow-secondary',
    ghost:
      'bg-transparent text-[#A1A1AA] hover:text-white',
  };

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      className={cn(baseStyles, variants[variant], className)}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
