import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Heart, BookOpen } from 'lucide-react';
import type { BookWithDetails } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import { toggleSaveBook } from '@/lib/api/books';
import { useState } from 'react';

interface AnimatedBookCardProps {
  book: BookWithDetails;
}

export function AnimatedBookCard({ book }: AnimatedBookCardProps) {
  const { user } = useAuth();
  const [isSaved, setIsSaved] = useState(book.is_saved || false);
  const [, setSavesCount] = useState(book.saves_count);

  const handleToggleSave = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) return;

    const { saved } = await toggleSaveBook(book.id, user.id);
    setIsSaved(saved);
    setSavesCount(prev => saved ? prev + 1 : prev - 1);
  };

  const getConditionColor = (condition?: string) => {
    switch (condition?.toLowerCase()) {
      case 'new':
        return 'bg-green-100 text-green-800';
      case 'like new':
        return 'bg-blue-100 text-blue-800';
      case 'good':
        return 'bg-yellow-100 text-yellow-800';
      case 'fair':
        return 'bg-orange-100 text-orange-800';
      case 'poor':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{
        scale: 1.05,
        rotateY: 5,
        rotateX: 5,
        z: 50
      }}
      whileTap={{ scale: 0.95 }}
      style={{ perspective: 1000 }}
    >
      <Link
        to={`/books/${book.id}`}
        className="block bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 overflow-hidden group relative"
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={false}
        />
        <div className="relative aspect-[3/4] bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
          {book.cover_image_url ? (
            <motion.img
              src={book.cover_image_url}
              alt={book.title}
              className="w-full h-full object-cover"
              whileHover={{
                scale: 1.15,
                filter: "brightness(1.1) contrast(1.1)"
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          ) : (
            <motion.div
              className="w-full h-full flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <BookOpen className="h-20 w-20 text-gray-400" />
            </motion.div>
          )}
          {user && (
            <motion.button
              onClick={handleToggleSave}
              className="absolute top-3 right-3 p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-200 border border-white/20"
              whileHover={{
                scale: 1.15,
                boxShadow: "0 10px 25px rgba(0,0,0,0.15)"
              }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.div
                animate={{
                  scale: isSaved ? [1, 1.3, 1] : 1,
                  rotate: isSaved ? [0, 10, -10, 0] : 0
                }}
                transition={{ duration: 0.4 }}
              >
                <Heart
                  className={`h-5 w-5 transition-colors duration-200 ${
                    isSaved
                      ? 'fill-red-500 text-red-500 drop-shadow-sm'
                      : 'text-gray-600 hover:text-red-400'
                  }`}
                />
              </motion.div>
            </motion.button>
          )}
          <motion.div
            className="absolute top-3 left-3"
            whileHover={{ scale: 1.05 }}
          >
            <span className={`px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm ${getConditionColor(book.condition?.name)}`}>
              {book.condition?.name}
            </span>
          </motion.div>
          <motion.div
            className="absolute bottom-3 left-3 right-3"
            initial={{ opacity: 0, y: 10 }}
            whileHover={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2">
              <p className="text-white text-xs font-medium truncate">
                {book.title}
              </p>
            </div>
          </motion.div>
        </div>

        <div className="p-5">
          <motion.h3
            className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200"
            whileHover={{ scale: 1.02 }}
          >
            {book.title}
          </motion.h3>
          {book.author && (
            <motion.p
              className="text-sm text-gray-600 mb-3"
              whileHover={{ x: 2 }}
              transition={{ duration: 0.2 }}
            >
              {book.author}
            </motion.p>
          )}

          <motion.div
            className="flex items-center gap-2 mb-4 text-xs text-gray-500"
            whileHover={{ scale: 1.02 }}
          >
            {book.exam_category && (
              <motion.span
                className="bg-gradient-to-r from-blue-50 to-blue-100 px-3 py-1.5 rounded-full border border-blue-200/50"
                whileHover={{ scale: 1.05, backgroundColor: "#DBEAFE" }}
              >
                {book.exam_category.name}
              </motion.span>
            )}
            {book.subject && (
              <motion.span
                className="bg-gradient-to-r from-green-50 to-green-100 px-3 py-1.5 rounded-full border border-green-200/50"
                whileHover={{ scale: 1.05, backgroundColor: "#DCFCE7" }}
              >
                {book.subject.name}
              </motion.span>
            )}
          </motion.div>

          <motion.div
            className="flex items-center justify-between"
            whileHover={{ scale: 1.01 }}
          >
            <div>
              <motion.p
                className="text-xl font-bold text-gray-900 mb-1"
                whileHover={{ scale: 1.05, color: "#1D4ED8" }}
                transition={{ duration: 0.2 }}
              >
                ₹{book.price?.toLocaleString()}
              </motion.p>
              <motion.p
                className="text-xs text-gray-500 capitalize"
                whileHover={{ x: 1 }}
              >
                {book.listing_type}
              </motion.p>
            </div>
            <motion.div
              className="flex items-center text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-full"
              whileHover={{ scale: 1.05, backgroundColor: "#F3F4F6" }}
            >
              <MapPin className="h-3 w-3 mr-1" />
              {book.city}
            </motion.div>
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
}
