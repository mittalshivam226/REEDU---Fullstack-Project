'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { GlassCard } from '@/components/ui/GlassCard';
import { NeonButton } from '@/components/ui/NeonButton';
import { NeonNexus } from '@/components/ui/NeonNexus';
import { Play, TrendingUp, ShieldCheck, Zap } from 'lucide-react';
import Link from 'next/link';

export default function V4LandingPage() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for 4D Parallax backgrounds
  const springConfig = { damping: 50, stiffness: 400 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Window bounds safely handled for SSR Next.js prerendering
  const winWidth = typeof window !== 'undefined' ? window.innerWidth : 1000;
  const winHeight = typeof window !== 'undefined' ? window.innerHeight : 800;

  // Background Parallax Map
  const bgX = useTransform(smoothX, [0, winWidth], [-30, 30]);
  const bgY = useTransform(smoothY, [0, winHeight], [-30, 30]);

  // Foreground Parallax Map (Opposite direction for 3D depth)
  const fgX = useTransform(smoothX, [0, winWidth], [30, -30]);
  const fgY = useTransform(smoothY, [0, winHeight], [30, -30]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="relative min-h-screen bg-[#020205] text-white overflow-hidden font-sans">
      <Navbar />

      {/* Deep Volumetric Lighting */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-[#00F0FF]/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-20%] w-[50%] h-[50%] bg-[#8A2BE2]/15 blur-[150px] rounded-full" />
      </div>

      <main className="relative z-10 max-w-[1600px] mx-auto px-6 pt-32 pb-24 min-h-screen flex flex-col justify-center">
        
        {/* PARALLAX MASSIVE TEXT */}
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none z-0 opacity-40 select-none"
          style={{ x: bgX, y: bgY }}
        >
          <h1 className="text-[12vw] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFFF] to-[#333333] leading-none" style={{ WebkitTextStroke: '2px rgba(255,255,255,0.05)' }}>
            REEDU
          </h1>
        </motion.div>

        {/* 4D HERO GRID */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[65vh]">
          
          {/* Left Column: CTA */}
          <motion.div 
            className="col-span-1 lg:col-span-4 flex flex-col items-start gap-6"
            style={{ x: fgX, y: fgY }}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-5xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
              More Than <br />
              Just <span className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">Textbooks</span>
            </h2>
            
            <div className="flex items-center gap-6 mt-4">
              <div className="flex flex-col">
                 <div className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_#00F0FF]" />
                   <span className="text-xs font-mono text-[#A1A1AA] uppercase tracking-wider">Live Assets</span>
                 </div>
                 <span className="text-2xl font-bold">125K+</span>
              </div>
              
              <Link href="/sell">
                 <NeonButton variant="primary" className="px-8 py-4 text-base font-bold shadow-[0_0_40px_-5px_rgba(0,240,255,0.5)]">Start Selling →</NeonButton>
              </Link>
            </div>
          </motion.div>

          {/* Center Column: Neon Nexus */}
          <div className="col-span-1 lg:col-span-4 flex justify-center items-center h-[400px]">
             <NeonNexus />
          </div>

          {/* Right Column: Floating Metrics (Glassmorphism overlap) */}
          <motion.div 
            className="col-span-1 lg:col-span-4 flex flex-col gap-6"
            style={{ x: bgX, y: fgY }}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <p className="text-[#A1A1AA] text-sm leading-relaxed max-w-sm ml-auto border-l border-[rgba(255,255,255,0.1)] pl-4">
               Accelerate your academic trajectory with the highest quality, peer-reviewed study materials. Frictionless exchange, intelligent tracking, zero barriers.
            </p>

            <div className="flex gap-4 ml-auto mt-4">
               <div className="flex flex-col border-r border-[rgba(255,255,255,0.1)] pr-6">
                 <span className="text-xs text-[#A1A1AA] mb-1">Students Joined</span>
                 <span className="text-xl font-bold">90.0K+</span>
               </div>
               <div className="flex flex-col">
                 <span className="text-xs text-[#A1A1AA] mb-1">Fraud Probability</span>
                 <span className="text-xl font-bold text-primary">0.05%</span>
               </div>
            </div>

            <GlassCard className="mt-8 ml-auto w-full max-w-sm p-4 flex items-center gap-4 border-[rgba(0,240,255,0.2)] bg-[rgba(10,10,10,0.6)] backdrop-blur-xl shadow-glow-primary/10">
               <div className="w-16 h-16 rounded-xl overflow-hidden relative shrink-0">
                  {/* Abstract Video/Image Placeholder */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary opacity-50 mix-blend-color-dodge" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Play size={16} className="text-white fill-white" />
                  </div>
               </div>
               <div>
                 <h4 className="font-bold text-sm">See it in Action</h4>
                 <p className="text-xs text-[#A1A1AA]">How ReEdu safeguards transactions instantly.</p>
               </div>
            </GlassCard>
          </motion.div>

        </div>

        {/* BOTTOM OFFSET GRID */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 w-full grid grid-cols-1 md:grid-cols-12 gap-8"
        >
          <div className="md:col-span-5 flex flex-col gap-4">
            <h3 className="text-3xl font-bold leading-tight">Key Features That<br />Empower Your Future</h3>
            
            <GlassCard className="mt-6 p-6 h-64 flex flex-col justify-end bg-gradient-to-t from-[rgba(0,0,0,0.8)] to-transparent border-[rgba(255,255,255,0.05)] relative overflow-hidden group">
               <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-20 group-hover:scale-105 transition-transform duration-700" />
               <div className="relative z-10">
                 <div className="text-2xl font-bold mb-1">47.0K+</div>
                 <div className="text-sm text-[#A1A1AA]">Books Transferred M/M</div>
               </div>
            </GlassCard>
          </div>

          <div className="md:col-span-7 grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-4">
               <div className="p-4 rounded-full border border-[rgba(255,255,255,0.1)] text-xs text-center text-[#A1A1AA] hover:text-white hover:border-primary transition-colors cursor-pointer">
                 Boost Productivity, Automate Search
               </div>
               <div className="p-4 rounded-full border border-[rgba(255,255,255,0.1)] text-xs text-center text-[#A1A1AA] hover:text-white hover:border-secondary transition-colors cursor-pointer">
                 Where Intelligence Meets Efficiency
               </div>
               
               <GlassCard className="mt-auto p-6 border-[rgba(255,255,255,0.05)] hover:border-[rgba(255,255,255,0.15)] transition-colors">
                  <TrendingUp size={20} className="text-primary mb-4" />
                  <h4 className="font-bold text-lg mb-2">Real-Time Aggregation</h4>
                  <p className="text-xs text-[#A1A1AA]">Get instant market prices for your modules powered by dynamic demand architecture.</p>
               </GlassCard>
            </div>

            <div className="flex flex-col gap-4 pt-12">
               <GlassCard className="p-6 h-[200px] border-[rgba(255,255,255,0.05)] flex flex-col justify-between group">
                  <div className="w-full h-1/2 mb-4 bg-gradient-to-r from-[rgba(255,255,255,0.05)] to-transparent rounded-sm relative overflow-hidden">
                     <motion.div 
                        initial={{ x: '-100%' }}
                        animate={{ x: '100%' }}
                        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                        className="w-[10px] h-full bg-primary/50 blur-[5px] absolute"
                     />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm mb-1">Turning Used Material into Capital</h4>
                    <p className="text-xs text-[#A1A1AA] hover:text-white flex items-center gap-2 cursor-pointer">View Details &rarr;</p>
                  </div>
               </GlassCard>

               <GlassCard className="p-6 border-[rgba(255,255,255,0.05)] hover:border-[rgba(255,255,255,0.15)] transition-colors">
                  <ShieldCheck size={20} className="text-secondary mb-4" />
                  <h4 className="font-bold text-lg mb-2">Smarter Decisions</h4>
                  <p className="text-xs text-[#A1A1AA]">Enterprise-grade data protection ensures your privacy during campus exchanges.</p>
               </GlassCard>
            </div>
          </div>
        </motion.div>

      </main>
    </div>
  );
}
