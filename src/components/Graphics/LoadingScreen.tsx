import { motion } from 'framer-motion';

export function LoadingScreen() {
  const floatingBooks = [
    { id: 1, x: 15, y: 25, delay: 0, size: 28, color: '#3B82F6', rotation: 15 },
    { id: 2, x: 75, y: 35, delay: 0.4, size: 24, color: '#10B981', rotation: -10 },
    { id: 3, x: 35, y: 65, delay: 0.8, size: 32, color: '#F59E0B', rotation: 25 },
    { id: 4, x: 85, y: 15, delay: 1.2, size: 26, color: '#EF4444', rotation: -15 },
    { id: 5, x: 5, y: 75, delay: 1.6, size: 30, color: '#8B5CF6', rotation: 20 },
    { id: 6, x: 65, y: 70, delay: 2.0, size: 22, color: '#06B6D4', rotation: -20 },
  ];

  const pages = Array.from({ length: 8 }, (_, i) => i);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center z-50 overflow-hidden">
      {/* Animated Background Particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="text-center relative z-10">
        {/* Master 3D Book Opening Animation */}
        <div className="relative mb-12 perspective-1000">
          {/* Book Spine */}
          <motion.div
            className="relative mx-auto"
            style={{ transformStyle: 'preserve-3d' }}
            initial={{ rotateY: 0 }}
            animate={{ rotateY: 180 }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {/* Left Cover */}
            <motion.div
              className="absolute w-32 h-40 bg-gradient-to-r from-amber-600 to-amber-800 rounded-r-lg shadow-2xl"
              style={{
                transformOrigin: 'left center',
                backfaceVisibility: 'hidden',
              }}
              animate={{ rotateY: [0, -180] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="w-full h-full border-r-4 border-amber-900 rounded-r-lg">
                <div className="p-2 text-xs text-amber-100 font-serif">
                  <div className="w-3 h-3 bg-amber-200 rounded-full mb-1"></div>
                  <div className="w-2 h-2 bg-amber-300 rounded-full"></div>
                </div>
              </div>
            </motion.div>

            {/* Right Cover */}
            <motion.div
              className="absolute w-32 h-40 bg-gradient-to-l from-amber-600 to-amber-800 rounded-l-lg shadow-2xl"
              style={{
                transformOrigin: 'right center',
                left: '128px',
                backfaceVisibility: 'hidden',
              }}
              animate={{ rotateY: [0, 180] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="w-full h-full border-l-4 border-amber-900 rounded-l-lg">
                <div className="p-2 text-xs text-amber-100 font-serif text-right">
                  <div className="w-3 h-3 bg-amber-200 rounded-full mb-1 ml-auto"></div>
                  <div className="w-2 h-2 bg-amber-300 rounded-full ml-auto"></div>
                </div>
              </div>
            </motion.div>

            {/* Pages Flipping Animation */}
            {pages.map((page, index) => (
              <motion.div
                key={page}
                className="absolute w-64 h-40 bg-gradient-to-r from-white to-gray-50 shadow-lg"
                style={{
                  left: '16px',
                  transformOrigin: 'left center',
                  zIndex: pages.length - index,
                }}
                animate={{
                  rotateY: [0, 180],
                  x: [0, 20],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: index * 0.1,
                  ease: "easeInOut",
                }}
              >
                <div className="w-full h-full p-3">
                  <div className="w-full h-full border border-gray-200 rounded">
                    <div className="p-2 space-y-1">
                      <div className="h-1 bg-gray-300 rounded w-3/4"></div>
                      <div className="h-1 bg-gray-300 rounded w-1/2"></div>
                      <div className="h-1 bg-gray-300 rounded w-5/6"></div>
                      <div className="h-1 bg-gray-300 rounded w-2/3"></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Floating Books Orbiting Around */}
        <div className="relative w-96 h-48 mb-8">
          {floatingBooks.map((book) => (
            <motion.div
              key={book.id}
              className="absolute"
              style={{
                left: `${book.x}%`,
                top: `${book.y}%`,
                transform: `rotate(${book.rotation}deg)`,
              }}
              animate={{
                rotate: [book.rotation, book.rotation + 360],
                scale: [1, 1.2, 1],
                x: [0, 20, -20, 0],
                y: [0, -15, 15, 0],
              }}
              transition={{
                duration: 4,
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
                  strokeWidth="2"
                  opacity="0.9"
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
                  strokeWidth="1"
                />
                <line x1="10" y1="20" x2="30" y2="20" stroke="#9CA3AF" strokeWidth="1" />
                <line x1="10" y1="25" x2="30" y2="25" stroke="#9CA3AF" strokeWidth="1" />
                <line x1="10" y1="30" x2="30" y2="30" stroke="#9CA3AF" strokeWidth="1" />
                <circle cx="12" cy="22" r="1.5" fill="#6B7280" />
                <circle cx="16" cy="22" r="1.5" fill="#6B7280" />
                <circle cx="20" cy="22" r="1.5" fill="#6B7280" />
              </svg>
            </motion.div>
          ))}
        </div>

        {/* Enhanced Loading Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.h2
            className="text-3xl font-bold text-white mb-3 tracking-wide"
            animate={{
              textShadow: [
                "0 0 10px rgba(255,255,255,0.5)",
                "0 0 20px rgba(255,255,255,0.8)",
                "0 0 10px rgba(255,255,255,0.5)",
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Opening Knowledge...
          </motion.h2>
          <motion.p
            className="text-purple-200 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            Preparing your literary journey
          </motion.p>
        </motion.div>

        {/* Advanced Loading Progress */}
        <motion.div
          className="mt-8 w-64 h-2 bg-gray-700 rounded-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-0 left-0 h-full w-16 bg-gradient-to-r from-transparent via-white to-transparent opacity-50"
            animate={{ x: ["-100%", "400%"] }}
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
