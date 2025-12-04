import React from 'react';
import { motion } from 'framer-motion';

export function FloatingBooks() {
  const books = [
    { id: 1, x: 10, y: 20, delay: 0, size: 40, color: '#3B82F6', speed: 4 },
    { id: 2, x: 80, y: 30, delay: 1, size: 35, color: '#10B981', speed: 5 },
    { id: 3, x: 20, y: 70, delay: 2, size: 45, color: '#F59E0B', speed: 3.5 },
    { id: 4, x: 70, y: 80, delay: 0.5, size: 38, color: '#EF4444', speed: 4.5 },
    { id: 5, x: 50, y: 10, delay: 1.5, size: 42, color: '#8B5CF6', speed: 4.2 },
    { id: 6, x: 15, y: 50, delay: 2.5, size: 36, color: '#06B6D4', speed: 3.8 },
    { id: 7, x: 85, y: 60, delay: 0.8, size: 44, color: '#84CC16', speed: 4.8 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {books.map((book) => (
        <motion.div
          key={book.id}
          className="absolute"
          style={{ left: `${book.x}%`, top: `${book.y}%` }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 10, -10, 0],
            x: [0, 5, -5, 0],
          }}
          transition={{
            duration: book.speed,
            repeat: Infinity,
            delay: book.delay,
            ease: "easeInOut",
          }}
          whileHover={{
            scale: 1.1,
            rotate: 15,
            transition: { duration: 0.3 }
          }}
        >
          <svg
            width={book.size}
            height={book.size * 1.25}
            viewBox="0 0 40 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="5"
              y="10"
              width="30"
              height="30"
              rx="3"
              ry="3"
              fill={book.color}
              stroke="#FFFFFF"
              strokeWidth="1"
              opacity="0.8"
            />
            <rect
              x="8"
              y="15"
              width="24"
              height="20"
              rx="2"
              ry="2"
              fill="#FFFFFF"
              stroke="#E5E7EB"
              strokeWidth="0.5"
            />
            <line
              x1="10"
              y1="20"
              x2="30"
              y2="20"
              stroke="#9CA3AF"
              strokeWidth="0.5"
            />
            <line
              x1="10"
              y1="25"
              x2="30"
              y2="25"
              stroke="#9CA3AF"
              strokeWidth="0.5"
            />
            <line
              x1="10"
              y1="30"
              x2="30"
              y2="30"
              stroke="#9CA3AF"
              strokeWidth="0.5"
            />
            <circle
              cx="12"
              cy="22"
              r="1"
              fill="#6B7280"
            />
            <circle
              cx="16"
              cy="22"
              r="1"
              fill="#6B7280"
            />
            <circle
              cx="20"
              cy="22"
              r="1"
              fill="#6B7280"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
