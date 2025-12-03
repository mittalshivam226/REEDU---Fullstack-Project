export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          user_id: string;
          display_name: string;
          phone: string | null;
          city: string | null;
          state: string | null;
          pincode: string | null;
          bio: string | null;
          avatar_url: string | null;
          account_type: 'student' | 'coaching' | 'reseller';
          is_verified: boolean;
          seller_rating: number;
          total_sales: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          display_name: string;
          phone?: string | null;
          city?: string | null;
          state?: string | null;
          pincode?: string | null;
          bio?: string | null;
          avatar_url?: string | null;
          account_type?: 'student' | 'coaching' | 'reseller';
          is_verified?: boolean;
          seller_rating?: number;
          total_sales?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          display_name?: string;
          phone?: string | null;
          city?: string | null;
          state?: string | null;
          pincode?: string | null;
          bio?: string | null;
          avatar_url?: string | null;
          account_type?: 'student' | 'coaching' | 'reseller';
          is_verified?: boolean;
          seller_rating?: number;
          total_sales?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      exam_categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          icon_name: string | null;
          display_order: number;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          icon_name?: string | null;
          display_order?: number;
          is_active?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          icon_name?: string | null;
          display_order?: number;
          is_active?: boolean;
          created_at?: string;
        };
      };
      subjects: {
        Row: {
          id: string;
          exam_id: string;
          name: string;
          slug: string;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          exam_id: string;
          name: string;
          slug: string;
          is_active?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          exam_id?: string;
          name?: string;
          slug?: string;
          is_active?: boolean;
          created_at?: string;
        };
      };
      book_conditions: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          display_order: number;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          display_order?: number;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string | null;
          display_order?: number;
        };
      };
      books: {
        Row: {
          id: string;
          seller_id: string;
          exam_id: string | null;
          subject_id: string | null;
          condition_id: string | null;
          title: string;
          author: string | null;
          isbn: string | null;
          edition: string | null;
          publisher: string | null;
          description: string | null;
          listing_type: 'sell' | 'rent' | 'exchange';
          price: number | null;
          rental_price_per_month: number | null;
          city: string;
          state: string;
          pincode: string | null;
          status: 'available' | 'sold' | 'rented' | 'reserved' | 'deleted';
          views_count: number;
          saves_count: number;
          cover_image_url: string | null;
          is_negotiable: boolean;
          prefer_contact_method: 'chat' | 'phone' | 'both';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          seller_id: string;
          exam_id?: string | null;
          subject_id?: string | null;
          condition_id?: string | null;
          title: string;
          author?: string | null;
          isbn?: string | null;
          edition?: string | null;
          publisher?: string | null;
          description?: string | null;
          listing_type?: 'sell' | 'rent' | 'exchange';
          price?: number | null;
          rental_price_per_month?: number | null;
          city: string;
          state: string;
          pincode?: string | null;
          status?: 'available' | 'sold' | 'rented' | 'reserved' | 'deleted';
          views_count?: number;
          saves_count?: number;
          cover_image_url?: string | null;
          is_negotiable?: boolean;
          prefer_contact_method?: 'chat' | 'phone' | 'both';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          seller_id?: string;
          exam_id?: string | null;
          subject_id?: string | null;
          condition_id?: string | null;
          title?: string;
          author?: string | null;
          isbn?: string | null;
          edition?: string | null;
          publisher?: string | null;
          description?: string | null;
          listing_type?: 'sell' | 'rent' | 'exchange';
          price?: number | null;
          rental_price_per_month?: number | null;
          city?: string;
          state?: string;
          pincode?: string | null;
          status?: 'available' | 'sold' | 'rented' | 'reserved' | 'deleted';
          views_count?: number;
          saves_count?: number;
          cover_image_url?: string | null;
          is_negotiable?: boolean;
          prefer_contact_method?: 'chat' | 'phone' | 'both';
          created_at?: string;
          updated_at?: string;
        };
      };
      book_images: {
        Row: {
          id: string;
          book_id: string;
          image_url: string;
          display_order: number;
          uploaded_at: string;
        };
        Insert: {
          id?: string;
          book_id: string;
          image_url: string;
          display_order?: number;
          uploaded_at?: string;
        };
        Update: {
          id?: string;
          book_id?: string;
          image_url?: string;
          display_order?: number;
          uploaded_at?: string;
        };
      };
      saved_books: {
        Row: {
          id: string;
          user_id: string;
          book_id: string;
          saved_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          book_id: string;
          saved_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          book_id?: string;
          saved_at?: string;
        };
      };
      search_history: {
        Row: {
          id: string;
          user_id: string | null;
          search_query: string;
          filters: Json | null;
          results_count: number;
          searched_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          search_query: string;
          filters?: Json | null;
          results_count?: number;
          searched_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          search_query?: string;
          filters?: Json | null;
          results_count?: number;
          searched_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
