'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/components/providers/auth-provider';
import { useToast } from '@/hooks/use-toast';
import { authApi } from '@/lib/api';
import { Navbar } from '@/components/layout/Navbar';
import { GlassCard } from '@/components/ui/GlassCard';
import { NeonButton } from '@/components/ui/NeonButton';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await authApi.login({ email, password });
      login(response.data.user, response.data.token);
      toast({
        title: 'Success',
        description: 'Logged in successfully',
      });
      router.push('/dashboard');
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to login',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 font-sans flex flex-col items-center justify-center relative overflow-hidden">
      <Navbar />
      
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-md px-6 relative z-10"
      >
        <GlassCard className="p-8 pb-10 flex flex-col gap-6 w-full shadow-glow-primary/10">
          <div className="text-center mb-2">
            <h1 className="text-3xl font-bold text-white mb-2 font-[family-name:var(--font-space-grotesk)]">
              Welcome Back
            </h1>
            <p className="text-[#A1A1AA] text-sm">
              Enter your credentials to access your academic marketplace.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider">Email Address</label>
              <input
                type="email"
                required
                className="w-full bg-[#121212] border-b border-[rgba(255,255,255,0.1)] text-white px-4 py-3 outline-none focus:border-primary focus:shadow-[0_4px_10px_rgba(138,43,226,0.15)] transition-all"
                placeholder="you@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider flex justify-between">
                <span>Password</span>
                <Link href="#" className="text-primary hover:underline lowercase tracking-normal">forgot?</Link>
              </label>
              <input
                type="password"
                required
                className="w-full bg-[#121212] border-b border-[rgba(255,255,255,0.1)] text-white px-4 py-3 outline-none focus:border-primary focus:shadow-[0_4px_10px_rgba(138,43,226,0.15)] transition-all"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <NeonButton type="submit" disabled={loading} className="w-full mt-4 py-4">
              {loading ? 'Authenticating...' : 'Sign In'}
            </NeonButton>
          </form>

          <div className="mt-4 text-center text-sm text-[#A1A1AA]">
            Don't have an account?{' '}
            <Link href="/register" className="text-secondary hover:underline font-semibold transition-colors">
              Create an account
            </Link>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}
