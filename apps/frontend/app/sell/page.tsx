'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Upload, X } from 'lucide-react';
import { listingsApi, CreateListingDto } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { Navbar } from '@/components/layout/Navbar';
import { GlassCard } from '@/components/ui/GlassCard';
import { NeonButton } from '@/components/ui/NeonButton';
import { motion } from 'framer-motion';

export default function SellPage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    condition: '',
    location: '',
    edition: '',
    isbn: '',
    tags: '',
  });
  const [images, setImages] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + images.length > 5) {
      toast({
        title: 'Error',
        description: 'Maximum 5 images allowed',
        variant: 'destructive',
      });
      return;
    }

    setImages(prev => [...prev, ...files]);
    const newUrls = files.map(file => URL.createObjectURL(file));
    setImageUrls(prev => [...prev, ...newUrls]);
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    URL.revokeObjectURL(imageUrls[index]);
    setImageUrls(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.price || !formData.condition || !formData.location) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }
    if (parseFloat(formData.price) <= 0) {
      toast({
        title: 'Error',
        description: 'Price must be greater than 0',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      const placeholderImages = imageUrls.length > 0
        ? imageUrls
        : ['https://via.placeholder.com/400x300?text=No+Image'];

      const listingData: CreateListingDto = {
        title: formData.title,
        description: formData.description || undefined,
        price: parseFloat(formData.price),
        condition: formData.condition as any,
        location: formData.location,
        tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : [],
        edition: formData.edition || undefined,
        isbn: formData.isbn || undefined,
        images: placeholderImages,
      };

      await listingsApi.create(listingData);

      toast({
        title: 'Success',
        description: 'Book listing created successfully!',
      });
      router.push('/dashboard');
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to create listing',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const inputStyles = "w-full bg-[#121212] border-b border-[rgba(255,255,255,0.1)] text-white px-4 py-3 outline-none focus:border-primary focus:shadow-[0_4px_10px_rgba(138,43,226,0.15)] transition-all";
  const labelStyles = "text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider block mb-2";

  return (
    <div className="min-h-screen pt-24 pb-20 font-sans flex flex-col items-center">
      <Navbar />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl px-6"
      >
        <div className="mb-10 mt-6">
          <h1 className="text-4xl font-bold text-white mb-2 font-[family-name:var(--font-space-grotesk)]">Sell Study Material</h1>
          <p className="text-[#A1A1AA]">Monetize your unused books and modules to future aspirants.</p>
        </div>

        <GlassCard className="p-8 md:p-12 w-full">
          <form onSubmit={handleSubmit} className="space-y-8 flex flex-col">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className={labelStyles}>Book Title *</label>
                <input required placeholder="E.g., Complete NCERT Biology Drop Year" className={inputStyles} value={formData.title} onChange={e => handleInputChange('title', e.target.value)} />
              </div>
              <div>
                <label className={labelStyles}>Price (₹) *</label>
                <input required type="number" step="1" min="0" placeholder="0" className={inputStyles} value={formData.price} onChange={e => handleInputChange('price', e.target.value)} />
              </div>
            </div>

            <div>
              <label className={labelStyles}>Description</label>
              <textarea rows={4} placeholder="Describe the highlighting, markings, or included notes..." className={`${inputStyles} resize-none`} value={formData.description} onChange={e => handleInputChange('description', e.target.value)} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className={labelStyles}>Condition *</label>
                <select 
                  required 
                  className={inputStyles} 
                  value={formData.condition} 
                  onChange={e => handleInputChange('condition', e.target.value)}
                >
                  <option value="" disabled>Select Condition</option>
                  <option value="NEW">New</option>
                  <option value="LIKE_NEW">Like New</option>
                  <option value="GOOD">Good</option>
                  <option value="FAIR">Fair</option>
                  <option value="POOR">Poor</option>
                </select>
              </div>
              <div>
                <label className={labelStyles}>Location *</label>
                <input required placeholder="City, State or Coaching Center" className={inputStyles} value={formData.location} onChange={e => handleInputChange('location', e.target.value)} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className={labelStyles}>Edition</label>
                <input placeholder="e.g., 2023 Edition" className={inputStyles} value={formData.edition} onChange={e => handleInputChange('edition', e.target.value)} />
              </div>
              <div>
                <label className={labelStyles}>ISBN</label>
                <input placeholder="ISBN-10 or ISBN-13" className={inputStyles} value={formData.isbn} onChange={e => handleInputChange('isbn', e.target.value)} />
              </div>
            </div>

            <div>
              <label className={labelStyles}>Tags</label>
              <input placeholder="NEET, Biology, Modules (comma separated)" className={inputStyles} value={formData.tags} onChange={e => handleInputChange('tags', e.target.value)} />
            </div>

            {/* Image Upload Zone */}
            <div className="pt-4 border-t border-[rgba(255,255,255,0.05)]">
              <label className={labelStyles}>Images (Max 5)</label>
              <div className="flex flex-wrap gap-4 mt-4">
                {imageUrls.map((url, i) => (
                  <div key={i} className="relative w-24 h-24 rounded-lg overflow-hidden border border-primary">
                    <img src={url} alt="upload" className="w-full h-full object-cover" />
                    <button type="button" onClick={() => removeImage(i)} className="absolute top-1 right-1 bg-black/80 p-1 rounded-full text-white hover:text-red-500">
                      <X size={14} />
                    </button>
                  </div>
                ))}
                
                {images.length < 5 && (
                  <label className="w-24 h-24 border border-dashed border-[rgba(255,255,255,0.2)] rounded-lg flex items-center justify-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-all group">
                    <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" />
                    <Upload className="text-[#A1A1AA] group-hover:text-primary transition-colors" size={24} />
                  </label>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <NeonButton type="submit" disabled={loading} className="flex-1 py-4 text-lg">
                {loading ? 'Processing...' : 'Create Listing'}
              </NeonButton>
              <NeonButton type="button" variant="ghost" onClick={() => router.push('/listings')} className="flex-1 py-4 text-lg">
                Cancel
              </NeonButton>
            </div>
          </form>
        </GlassCard>
      </motion.div>
    </div>
  );
}
