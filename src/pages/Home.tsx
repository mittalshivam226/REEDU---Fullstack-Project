import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import { Layout } from '@/components/Layout/Layout';
import { AnimatedBookCard } from '@/components/Graphics/AnimatedBookCard';
import { AnimatedHero } from '@/components/Graphics/AnimatedHero';
import { AnimatedBackground } from '@/components/Graphics/AnimatedBackground';
import { getBooks } from '@/lib/api/books';
import { getExamCategories } from '@/lib/api/metadata';
import type { BookWithDetails, ExamCategory } from '@/types';

export function Home() {
  const [books, setBooks] = useState<BookWithDetails[]>([]);
  const [categories, setCategories] = useState<ExamCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [booksRes, categoriesRes] = await Promise.all([
      getBooks({}, { page: 1, limit: 8 }),
      getExamCategories(),
    ]);

    if (booksRes.data) setBooks(booksRes.data);
    if (categoriesRes.data) setCategories(categoriesRes.data);
    setLoading(false);
  };

  return (
    <Layout>
      <AnimatedBackground />
      <AnimatedHero />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.h2
          className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent mb-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Browse by Exam Category
        </motion.h2>
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 mb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {categories.slice(0, 10).map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1, type: "spring", stiffness: 100 }}
              whileHover={{
                scale: 1.05,
                y: -5,
                transition: { type: "spring", stiffness: 300 }
              }}
            >
              <Link
                to={`/browse?exam=${category.slug}`}
                className="group bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl border border-gray-200 hover:border-blue-400 hover:shadow-xl transition-all duration-300 text-center block relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <motion.div
                  className="text-5xl mb-4 relative z-10"
                  whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 0.3 }}
                >
                  📚
                </motion.div>
                <h3 className="font-bold text-gray-900 text-lg relative z-10 group-hover:text-blue-700 transition-colors duration-300">
                  {category.name}
                </h3>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="flex justify-between items-center mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className="text-3xl font-bold text-gray-900">Recent Listings</h2>
          <Link to="/browse" className="text-blue-600 hover:text-blue-700 font-medium">
            View All →
          </Link>
        </motion.div>

        {loading ? (
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl h-80 shadow-lg"
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{
                  opacity: [0.5, 1, 0.5],
                  scale: [0.8, 1, 0.8],
                  y: [20, 0, 20]
                }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.1,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="p-4 space-y-3">
                  <div className="bg-gray-300 rounded-lg h-48 animate-pulse"></div>
                  <div className="space-y-2">
                    <div className="bg-gray-300 rounded h-4 animate-pulse"></div>
                    <div className="bg-gray-300 rounded h-3 w-3/4 animate-pulse"></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="bg-gray-300 rounded h-6 w-16 animate-pulse"></div>
                    <div className="bg-gray-300 rounded h-4 w-12 animate-pulse"></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : books.length > 0 ? (
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {books.map((book, index) => (
              <motion.div
                key={book.id}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{
                  y: -5,
                  transition: { type: "spring", stiffness: 300 }
                }}
              >
                <AnimatedBookCard book={book} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
          >
            <motion.div
              whileHover={{
                scale: 1.1,
                rotate: [0, -5, 5, 0],
                transition: { duration: 0.5 }
              }}
            >
              <BookOpen className="h-20 w-20 text-gray-400 mx-auto mb-6" />
            </motion.div>
            <motion.h3
              className="text-xl font-semibold text-gray-600 mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              No books available yet
            </motion.h3>
            <motion.p
              className="text-gray-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Be the first to sell your exam books!
            </motion.p>
          </motion.div>
        )}
      </div>
    </Layout>
  );
}
