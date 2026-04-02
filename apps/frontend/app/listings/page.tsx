'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { GlassCard } from '@/components/ui/GlassCard';
import { Search } from 'lucide-react';
import { listingsApi, Listing } from '@/lib/api';
import Link from 'next/link';

export default function MarketplacePage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await listingsApi.getAll();
        setListings(response.data.listings || []);
      } catch (error) {
        console.error('Failed to fetch marketplace listings:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchListings();
  }, []);

  return (
    <div className="min-h-screen pt-24 font-sans flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-[1600px] w-full mx-auto px-6 py-8 flex gap-8">
        
        {/* FILTERS PANEL */}
        <aside className="w-64 hidden lg:flex flex-col gap-6 shrink-0">
          <div className="sticky top-28 space-y-6">
            <h3 className="text-xl font-bold text-white font-[family-name:var(--font-space-grotesk)]">Filters</h3>
            <GlassCard className="p-4 flex flex-col gap-4">
              <div className="space-y-2">
                <label className="text-sm text-[#A1A1AA] font-semibold uppercase tracking-wider">Category</label>
                {['All', 'NEET', 'JEE', 'UPSC', 'GATE'].map((cat) => (
                  <label key={cat} className="flex items-center gap-2 cursor-pointer group">
                    <input type="checkbox" className="w-4 h-4 rounded border-[#333] bg-[#121212] checked:bg-primary checked:border-primary transition-colors cursor-pointer" />
                    <span className="text-sm text-gray-300 group-hover:text-white transition-colors">{cat}</span>
                  </label>
                ))}
              </div>
            </GlassCard>
            <GlassCard className="p-4 flex flex-col gap-4">
              <div className="space-y-2">
                <label className="text-sm text-[#A1A1AA] font-semibold uppercase tracking-wider">Condition</label>
                {['Like New', 'Good', 'Fair'].map((cd) => (
                  <label key={cd} className="flex items-center gap-2 cursor-pointer group">
                    <input type="checkbox" className="w-4 h-4 rounded border-[#333] bg-[#121212] checked:bg-primary checked:border-primary cursor-pointer" />
                    <span className="text-sm text-gray-300 group-hover:text-white">{cd}</span>
                  </label>
                ))}
              </div>
            </GlassCard>
          </div>
        </aside>

        {/* RESULTS GRID */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="w-full flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white font-[family-name:var(--font-space-grotesk)]">Explore Books</h1>
            <div className="flex items-center gap-2 text-sm text-[#A1A1AA]">
              <span>Sort by:</span>
              <select className="bg-[#121212] border border-[rgba(255,255,255,0.1)] text-white rounded px-2 py-1 outline-none focus:border-primary">
                <option>Newest Listings</option>
                <option>Price: Low to High</option>
              </select>
            </div>
          </div>

          {loading ? (
             <div className="flex flex-col items-center py-32 w-full gap-4">
               <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
               <span className="text-[#A1A1AA]">Fetching live inventory...</span>
             </div>
          ) : listings.length === 0 ? (
             <div className="flex flex-col items-center justify-center py-32 text-center w-full">
               <h3 className="text-xl text-white font-bold mb-2">No listings found</h3>
               <p className="text-[#A1A1AA]">Be the first to create a listing on the marketplace!</p>
             </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {listings.map((listing, i) => (
                <Link key={listing.id} href={`/listings/${listing.id}`} className="block h-full">
                  <GlassCard gradientHover className="cursor-pointer group flex flex-col h-full animate-fade-in-up" style={{ animationDelay: `${(i % 10) * 0.1}s` }}>
                    <div className="w-full h-48 bg-[#1a1a1a] flex items-center justify-center p-0 rounded-t overflow-hidden">
                      {listing.images && listing.images.length > 0 ? (
                        <img src={listing.images[0]} alt={listing.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <BookIcon />
                      )}
                    </div>
                    <div className="p-5 flex flex-col flex-grow">
                      <div className="flex items-center justify-between mb-1">
                        <div className="text-secondary text-xs font-semibold tracking-wider uppercase">{listing.condition.replace('_', ' ')}</div>
                        <div className="text-[#A1A1AA] text-xs px-2 py-0.5 rounded-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)]">{listing.user?.name || 'Anonymous'}</div>
                      </div>
                      <h3 className="text-white font-medium text-lg leading-tight mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {listing.title}
                      </h3>
                      <div className="mt-auto flex justify-between items-center text-sm pt-4 border-t border-[rgba(255,255,255,0.05)]">
                        <span className="font-bold text-white text-lg font-[family-name:var(--font-space-grotesk)]">₹{listing.price}</span>
                        <span className="text-[#A1A1AA] text-xs">{listing.location}</span>
                      </div>
                    </div>
                  </GlassCard>
                </Link>
              ))}
            </div>
          )}
        </div>

      </main>
    </div>
  );
}

function BookIcon() {
  return (
    <div className="w-16 h-20 bg-[#222] border-l-4 border-primary rounded shadow-glow-primary/20 flex flex-col items-center justify-center opacity-50">
      <div className="w-8 h-1 bg-[#333] mb-1" />
      <div className="w-6 h-1 bg-[#333]" />
    </div>
  );
}
