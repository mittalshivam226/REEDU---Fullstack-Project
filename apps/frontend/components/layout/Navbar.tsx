'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { NeonButton } from '../ui/NeonButton';

export function Navbar() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 backdrop-blur-lg bg-[#0A0A0A]/70 border-b border-[rgba(255,255,255,0.05)]"
    >
      <div className="flex items-center gap-10">
        <Link href="/v2" className="text-2xl font-bold tracking-tighter text-white">
          RE<span className="text-primary">EDU</span>
        </Link>
        <nav className="hidden md:flex gap-6 text-[#A1A1AA] text-sm font-medium">
          <Link href="/v2/marketplace" className="hover:text-secondary transition-colors">Marketplace</Link>
          <Link href="/v2/marketplace?category=NEET" className="hover:text-white transition-colors">NEET</Link>
          <Link href="/v2/marketplace?category=JEE" className="hover:text-white transition-colors">JEE</Link>
          <Link href="/v2/marketplace?category=UPSC" className="hover:text-white transition-colors">UPSC</Link>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <NeonButton variant="ghost" className="hidden sm:inline-flex">Sign In</NeonButton>
        <NeonButton variant="primary">Sell Your Books</NeonButton>
      </div>
    </motion.header>
  );
}
