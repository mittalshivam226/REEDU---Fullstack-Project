'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { BookOpen, Plus, Settings, DollarSign, Package, AlertCircle } from 'lucide-react';
import { useAuth } from '@/components/providers/auth-provider';
import { listingsApi, Listing } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { Navbar } from '@/components/layout/Navbar';
import { GlassCard } from '@/components/ui/GlassCard';
import { NeonButton } from '@/components/ui/NeonButton';
import { motion, Variants } from 'framer-motion';

export default function DashboardPage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    fetchUserListings();
  }, [user, router]);

  const fetchUserListings = async () => {
    try {
      setLoading(true);
      const response = await listingsApi.getUserListings();
      setListings(response.data);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'Failed to fetch your listings',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'NEW': return 'bg-green-500/20 text-green-400 border border-green-500/30';
      case 'LIKE_NEW': return 'bg-blue-500/20 text-blue-400 border border-blue-500/30';
      case 'GOOD': return 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30';
      case 'FAIR': return 'bg-orange-500/20 text-orange-400 border border-orange-500/30';
      case 'POOR': return 'bg-red-500/20 text-red-400 border border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border border-gray-500/30';
    }
  };

  if (!user) {
    return null; 
  }

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as any, stiffness: 300, damping: 24 } }
  };

  return (
    <div className="min-h-screen pt-24 font-sans flex flex-col items-center">
      <Navbar />

      <div className="w-full max-w-6xl px-6 pb-20">
        
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <h1 className="text-3xl font-bold text-white mb-2 font-[family-name:var(--font-space-grotesk)]">
            Command Center
          </h1>
          <p className="text-[#A1A1AA]">
            Welcome back, <span className="text-primary font-semibold">{user.name}</span>. Manage your digital inventory.
          </p>
        </motion.div>

        {/* Top Metrics Row */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
        >
          <motion.div variants={itemVariants}>
            <GlassCard className="p-6 flex flex-col gap-2 h-full">
              <div className="flex items-center justify-between text-[#A1A1AA] mb-4">
                <span className="text-sm font-semibold uppercase tracking-wider">Total Listings</span>
                <Package size={18} />
              </div>
              <div className="text-4xl font-bold text-white font-[family-name:var(--font-space-grotesk)]">{listings.length}</div>
              <p className="text-xs text-[#52525B]">Lifetime books listed</p>
            </GlassCard>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <GlassCard className="p-6 flex flex-col gap-2 h-full shadow-glow-primary/5">
              <div className="flex items-center justify-between text-primary mb-4">
                <span className="text-sm font-semibold uppercase tracking-wider">Active Inventory</span>
                <BookOpen size={18} />
              </div>
              <div className="text-4xl font-bold text-white font-[family-name:var(--font-space-grotesk)]">
                {listings.filter(l => l.condition !== 'POOR').length}
              </div>
              <p className="text-xs text-[#52525B]">Currently live on marketplace</p>
            </GlassCard>
          </motion.div>

          <motion.div variants={itemVariants}>
            <GlassCard className="p-6 flex flex-col gap-2 h-full shadow-glow-secondary/5">
              <div className="flex items-center justify-between text-secondary mb-4">
                <span className="text-sm font-semibold uppercase tracking-wider">Total Market Value</span>
                <DollarSign size={18} />
              </div>
              <div className="text-4xl font-bold text-white font-[family-name:var(--font-space-grotesk)]">
                ₹{listings.reduce((sum, l) => sum + l.price, 0).toLocaleString()}
              </div>
              <p className="text-xs text-[#52525B]">Cumulative worth of active items</p>
            </GlassCard>
          </motion.div>
        </motion.div>

        {/* Action Row */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <GlassCard className="p-6 flex flex-col justify-between items-start group hover:border-primary/50 transition-colors">
            <div className="mb-6">
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <Plus size={20} className="text-primary" /> Create Listing
              </h3>
              <p className="text-sm text-[#A1A1AA]">Liquidate your unused modules quickly.</p>
            </div>
            <Link href="/sell" className="w-full">
              <NeonButton variant="primary" className="w-full py-3">Deploy New Asset</NeonButton>
            </Link>
          </GlassCard>

          <GlassCard className="p-6 flex flex-col justify-between items-start opacity-70 cursor-not-allowed">
            <div className="mb-6">
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <Settings size={20} /> Account Protocol
              </h3>
              <p className="text-sm text-[#A1A1AA]">Modify your user identity and security.</p>
            </div>
            <NeonButton variant="ghost" className="w-full py-3 opacity-50" disabled>Coming Soon</NeonButton>
          </GlassCard>
        </motion.div>

        {/* Active Grid */}
        <div className="mb-6 border-b border-[rgba(255,255,255,0.05)] pb-4">
          <h2 className="text-2xl font-bold text-white font-[family-name:var(--font-space-grotesk)]">Deployed Materials</h2>
        </div>

        {loading ? (
             <div className="flex flex-col items-center justify-center py-20 gap-4">
             <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
             <p className="text-[#A1A1AA] text-sm animate-pulse">Syncing Inventory...</p>
           </div>
        ) : listings.length === 0 ? (
          <GlassCard className="flex flex-col items-center justify-center py-20 text-center border-dashed border-[rgba(255,255,255,0.1)]">
             <AlertCircle size={48} className="text-[#52525B] mb-4" />
             <h3 className="text-xl font-bold text-white mb-2">No active deployments</h3>
             <p className="text-[#A1A1AA] mb-6 max-w-sm">You haven't listed any study materials yet. Start monetizing today.</p>
             <Link href="/sell">
               <NeonButton variant="secondary" className="px-8 py-3">Initiate First Listing</NeonButton>
             </Link>
          </GlassCard>
        ) : (
          <motion.div variants={containerVariants} initial="hidden" animate="show" className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {listings.map((listing) => (
              <motion.div key={listing.id} variants={itemVariants}>
                <GlassCard className="p-4 flex flex-row items-center gap-4 hover:bg-[rgba(255,255,255,0.02)] transition-colors">
                  
                  <div className="w-20 h-24 rounded-md overflow-hidden bg-[#121212] flex-shrink-0 border border-[rgba(255,255,255,0.05)]">
                    {listing.images.length > 0 ? (
                      <img src={listing.images[0].url} alt={listing.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <BookOpen size={20} className="text-[#52525B]" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-bold truncate mb-1">{listing.title}</h3>
                    <p className="text-xs text-[#A1A1AA] truncate mb-3">{listing.description || 'No description provided'}</p>
                    
                    <div className="flex items-center gap-2 text-xs">
                      <span className={`px-2 py-1 rounded-sm font-semibold tracking-wide ${getConditionColor(listing.condition)}`}>
                        {listing.condition.replace('_', ' ')}
                      </span>
                      <span className="text-secondary font-bold font-[family-name:var(--font-space-grotesk)] ml-auto text-lg">
                        ₹{listing.price}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 border-l border-[rgba(255,255,255,0.05)] pl-4 ml-2">
                    <Link href={`/listings/${listing.id}`}>
                      <NeonButton variant="ghost" className="w-full text-xs py-2 px-4 shadow-none border border-[rgba(255,255,255,0.1)] hover:border-primary/50">Details</NeonButton>
                    </Link>
                    <NeonButton variant="primary" className="w-full text-xs py-2 px-4 opacity-50 cursor-not-allowed hidden sm:block" disabled>Edit</NeonButton>
                  </div>

                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
