import React from 'react';
import { motion } from 'framer-motion';

export function LoadingScreen() {
  const books = [
    { id: 1, x: 20, y: 30, delay: 0, size: 35, color: '#3B82F6' },
    { id: 2, x: 70, y: 40, delay: 0.3, size: 30, color: '#10B981' },
    { id: 3, x: 40, y: 60, delay: 0.6, size: 40, color: '#F59E0B' },
    { id: 4, x: 80, y: 20, delay: 0.9, size: 32, color: '#EF4444' },
    { id: 5, x: 10, y: 70, delay: 1.2, size: 38, color: '#8B5CF6' },
  ];

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center z-50">
      <div className="text-center">
        {/* Floating Books Animation */}
        <div className="relative w-64 h-32 mb-8">
          {books.map((book) => (
            <motion.div
              key={book.id}
              className="absolute"
              style={{ left: `${book.x}%`, top: `${book.y}%` }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 5, -5, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: book.delay,
                ease: "easeInOut",
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

        {/* Loading Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.h2
            className="text-2xl font-bold text-gray-800 mb-2"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Loading...
          </motion.h2>
          <motion.p
            className="text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            Preparing your book marketplace
          </motion.p>
        </motion.div>

        {/* Loading Bar */}
        <motion.div
          className="mt-6 w-48 h-1 bg-gray-200 rounded-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}
