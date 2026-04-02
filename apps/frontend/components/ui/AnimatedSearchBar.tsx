'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

export function AnimatedSearchBar({ className }: { className?: string }) {
  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/v2/marketplace?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      onSubmit={handleSearch}
      className={cn(
        'relative flex items-center w-full max-w-2xl mx-auto rounded-full bg-[#121212]/80 backdrop-blur-md border transition-all duration-300',
        isFocused ? 'border-secondary shadow-glow-secondary' : 'border-[rgba(255,255,255,0.1)] hover:border-[rgba(255,255,255,0.2)]',
        className
      )}
    >
      <div className="pl-5 pr-3 py-4 text-[#A1A1AA]">
        <Search size={22} className={cn('transition-colors', isFocused && 'text-secondary')} />
      </div>
      <input
        type="text"
        placeholder="Search for NEET, JEE books..."
        className="flex-1 bg-transparent text-white text-lg placeholder:text-[#A1A1AA] outline-none focus:ring-0"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      
      <AnimatePresence>
        {query && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            type="button"
            onClick={() => setQuery('')}
            className="pr-5 text-[#A1A1AA] hover:text-white transition-colors"
          >
            <X size={20} />
          </motion.button>
        )}
      </AnimatePresence>

      <button 
        type="submit"
        className="mr-2 my-2 px-6 py-2 rounded-full bg-primary text-white font-medium hover:shadow-glow-primary transition-all duration-300"
      >
        Find
      </button>
    </motion.form>
  );
}
