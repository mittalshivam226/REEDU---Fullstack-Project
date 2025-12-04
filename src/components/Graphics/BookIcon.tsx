import React from 'react';
import { motion } from 'framer-motion';

interface BookIconProps {
  className?: string;
  size?: number;
  animated?: boolean;
}

export function BookIcon({ className = '', size = 24, animated = false }: BookIconProps) {
  const iconVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.1,
      rotate: [0, -5, 5, 0],
      transition: {
        duration: 0.6,
        ease: "easeInOut" as const
      }
    },
    tap: { scale: 0.95 }
  };

  const pageVariants = {
    initial: { opacity: 1 },
    animate: {
      opacity: [1, 0.7, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    }
  };

  if (animated) {
    return (
      <motion.div
        variants={iconVariants}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        className={`inline-block ${className}`}
      >
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            d="M4 19.5C4 18.12 5.12 17 6.5 17H20V7H6.5C5.12 7 4 5.88 4 4.5V19.5Z"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={pageVariants}
            animate="animate"
          />
          <path
            d="M20 7V17"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6.5 4.5V19.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <motion.circle
            cx="8"
            cy="12"
            r="1"
            fill="currentColor"
            variants={pageVariants}
            animate="animate"
            transition={{ delay: 0.2 }}
          />
          <motion.circle
            cx="12"
            cy="12"
            r="1"
            fill="currentColor"
            variants={pageVariants}
            animate="animate"
            transition={{ delay: 0.4 }}
          />
          <motion.circle
            cx="16"
            cy="12"
            r="1"
            fill="currentColor"
            variants={pageVariants}
            animate="animate"
            transition={{ delay: 0.6 }}
          />
        </svg>
      </motion.div>
    );
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M4 19.5C4 18.12 5.12 17 6.5 17H20V7H6.5C5.12 7 4 5.88 4 4.5V19.5Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 7V17"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.5 4.5V19.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="8"
        cy="12"
        r="1"
        fill="currentColor"
      />
      <circle
        cx="12"
        cy="12"
        r="1"
        fill="currentColor"
      />
      <circle
        cx="16"
        cy="12"
        r="1"
        fill="currentColor"
      />
    </svg>
  );
}
