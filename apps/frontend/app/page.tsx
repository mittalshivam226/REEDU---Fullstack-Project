'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { Navbar } from '@/components/layout/Navbar';
import { AnimatedSearchBar } from '@/components/ui/AnimatedSearchBar';
import { GlassCard } from '@/components/ui/GlassCard';
import { BookOpen, TrendingUp, ShieldCheck } from 'lucide-react';
import Image from 'next/image';

const categories = [
  { name: 'NEET', color: 'bg-rose-500/10 text-rose-500 border-rose-500/30' },
  { name: 'JEE', color: 'bg-blue-500/10 text-blue-500 border-blue-500/30' },
  { name: 'UPSC', color: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30' },
  { name: 'CAT', color: 'bg-amber-500/10 text-amber-500 border-amber-500/30' },
  { name: 'GATE', color: 'bg-purple-500/10 text-purple-500 border-purple-500/30' },
];

export default function V2LandingPage() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;
    
    // Lightweight GSAP continuous vertical drift (Parallax feel)
    gsap.to('.hero-floater', {
      y: -15,
      yoyo: true,
      repeat: -1,
      duration: 3,
      ease: 'sine.inOut',
      stagger: {
        each: 0.5,
        from: 'random'
      }
    });
  }, []);

  return (
    <div className="min-h-screen pt-24 font-sans">
      <Navbar />
      
      <main className="flex flex-col items-center max-w-7xl mx-auto px-6 pb-20">
        
        {/* HERO SECTION */}
        <section ref={heroRef} className="relative w-full py-20 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="z-10 max-w-4xl"
          >
            <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 text-xs font-medium text-secondary bg-secondary/10 border border-secondary/20 rounded-full tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-secondary shadow-glow-secondary animate-pulse" />
              Revolutionizing Academic Exchange
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6 font-[family-name:var(--font-space-grotesk)] leading-[1.1]">
              The High-End Marketplace for <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Competitive Material.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-[#A1A1AA] mb-12 max-w-2xl mx-auto font-[family-name:var(--font-inter)]">
              Buy and sell used books for NEET, JEE, and UPSC at fractions of original costs. A premium, fast, and structured platform.
            </p>

            <AnimatedSearchBar className="mb-10" />

            {/* Quick Categories */}
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((cat, i) => (
                <motion.a
                  href={`/v2/marketplace?category=${cat.name}`}
                  key={cat.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                  className={`px-4 py-2 rounded-full border text-sm font-semibold tracking-wide transition-colors hover:shadow-lg ${cat.color}`}
                >
                  {cat.name}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Abstract Floating Elements (GSAP applied via class) */}
          <div className="absolute top-10 left-[10%] w-32 h-32 bg-primary/20 rounded-full blur-[60px] hero-floater" />
          <div className="absolute bottom-[-10%] right-[15%] w-48 h-48 bg-secondary/20 rounded-full blur-[80px] hero-floater" />
        </section>

        {/* VALUE PROPS */}
        <section className="w-full mt-24 mb-20">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              { icon: BookOpen, title: 'Structured Search', desc: 'Find exact study modules by exam, author, and edition seamlessly.' },
              { icon: TrendingUp, title: 'Fractional Cost', desc: 'Average savings of 60% compared to buying new retail materials.' },
              { icon: ShieldCheck, title: 'Quality Assured', desc: 'Verified sellers and transparent condition ratings.' },
            ].map((prop, i) => (
              <GlassCard key={i} className="p-8 flex flex-col items-start gap-4">
                <div className="p-3 bg-primary/20 text-primary rounded-lg border border-primary/30 shadow-glow-primary">
                  <prop.icon size={24} />
                </div>
                <h3 className="text-xl font-bold font-[family-name:var(--font-space-grotesk)] text-white">{prop.title}</h3>
                <p className="text-[#A1A1AA] text-base leading-relaxed">{prop.desc}</p>
              </GlassCard>
            ))}
          </motion.div>
        </section>

        {/* TRENDING BOOKS PREVIEW */}
        <section className="w-full text-left">
          <h2 className="text-3xl font-bold text-white mb-8 font-[family-name:var(--font-space-grotesk)]">Trending Right Now</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <GlassCard key={i} gradientHover className="cursor-pointer group flex flex-col h-full">
                <div className="w-full h-48 bg-[#1E1E1E] relative border-b border-[rgba(255,255,255,0.05)] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121212] flex items-center justify-center p-4">
                     {/* Replace with actual image later */}
                     <span className="text-[#A1A1AA] text-sm opacity-50 font-mono">Book Cover {i}</span>
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <div className="text-secondary text-xs font-semibold mb-1 tracking-wider uppercase">NEET Preparatory</div>
                  <h3 className="text-white font-medium text-lg leading-tight mb-2 group-hover:text-primary transition-colors">Biology NCERT Fingertips {i}</h3>
                  <div className="mt-auto flex justify-between items-center text-sm pt-4 border-t border-[rgba(255,255,255,0.05)]">
                    <span className="font-bold text-white">₹350</span>
                    <span className="text-[#A1A1AA] line-through text-xs">₹800</span>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}
