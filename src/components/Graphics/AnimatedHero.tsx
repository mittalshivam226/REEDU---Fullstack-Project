import React from 'react';
import { Link } from 'react-router-dom';
import { Search, TrendingUp, Shield, Users, Star, Zap } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FloatingBooks } from './FloatingBooks';

export function AnimatedHero() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <motion.div
      className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-24 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      style={{ y }}
    >
      <FloatingBooks />
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5, type: "spring", stiffness: 200 }}
            className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-6"
          >
            <Star className="h-4 w-4 mr-2" />
            Trusted by 10,000+ Students
          </motion.div>
          <motion.h1
            className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-6 leading-tight"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            Buy & Sell Used
            <br />
            <span className="text-blue-600">Exam Books</span>
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            Your trusted marketplace for second-hand NEET, JEE, UPSC, CAT books and more.
            Save money, study smarter.
          </motion.p>
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              to="/browse"
              className="group inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <Search className="h-6 w-6 mr-3 group-hover:rotate-12 transition-transform" />
              Browse Books
              <Zap className="h-5 w-5 ml-3 group-hover:scale-110 transition-transform" />
            </Link>
            <Link
              to="/sell"
              className="inline-flex items-center border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl text-lg font-semibold hover:border-blue-500 hover:text-blue-600 transition-all duration-300"
            >
              Sell Your Books
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.3 }}
        >
          <motion.div
            className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl text-center border border-white/20"
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <motion.div
              className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl mb-6"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </motion.div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">Best Prices</h3>
            <p className="text-gray-600 leading-relaxed">
              Save up to 70% on used books in great condition. Quality education shouldn't break the bank.
            </p>
          </motion.div>

          <motion.div
            className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl text-center border border-white/20"
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <motion.div
              className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl mb-6"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <Shield className="h-8 w-8 text-green-600" />
            </motion.div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">Verified Sellers</h3>
            <p className="text-gray-600 leading-relaxed">
              Buy from trusted students and coaching centers. Every seller is verified for your peace of mind.
            </p>
          </motion.div>

          <motion.div
            className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl text-center border border-white/20"
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <motion.div
              className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl mb-6"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <Users className="h-8 w-8 text-purple-600" />
            </motion.div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">Local Deals</h3>
            <p className="text-gray-600 leading-relaxed">
              Find books in your city and save on shipping. Connect with local students and study groups.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
