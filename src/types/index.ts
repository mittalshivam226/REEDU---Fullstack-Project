import type { Database } from './database';

export type Profile = Database['public']['Tables']['profiles']['Row'];
export type ExamCategory = Database['public']['Tables']['exam_categories']['Row'];
export type Subject = Database['public']['Tables']['subjects']['Row'];
export type BookCondition = Database['public']['Tables']['book_conditions']['Row'];
export type Book = Database['public']['Tables']['books']['Row'];
export type BookImage = Database['public']['Tables']['book_images']['Row'];
export type SavedBook = Database['public']['Tables']['saved_books']['Row'];

export interface BookWithDetails extends Book {
  exam_category?: ExamCategory | null;
  subject?: Subject | null;
  condition?: BookCondition | null;
  seller?: Profile | null;
  images?: BookImage[];
  is_saved?: boolean;
}

export interface SearchFilters {
  exam?: string;
  subject?: string;
  condition?: string;
  minPrice?: number;
  maxPrice?: number;
  city?: string;
  state?: string;
  listingType?: 'sell' | 'rent' | 'exchange';
  query?: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

export interface BookFormData {
  title: string;
  author?: string;
  isbn?: string;
  edition?: string;
  publisher?: string;
  description?: string;
  exam_id?: string;
  subject_id?: string;
  condition_id?: string;
  listing_type: 'sell' | 'rent' | 'exchange';
  price?: number;
  rental_price_per_month?: number;
  city: string;
  state: string;
  pincode?: string;
  is_negotiable: boolean;
  prefer_contact_method: 'chat' | 'phone' | 'both';
  images?: File[];
}
