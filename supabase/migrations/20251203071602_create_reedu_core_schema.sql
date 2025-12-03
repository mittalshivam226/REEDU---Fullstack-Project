/*
  # REEDU Platform - Core Database Schema

  ## Overview
  Complete database schema for REEDU - a platform for buying, selling, exchanging, 
  and renting second-hand competitive exam books.

  ## New Tables Created

  1. **profiles**
     - Extended user profile information beyond Supabase auth.users
     - Links to auth.users via user_id
     - Stores: display name, phone, location, bio, avatar, seller rating
     - Tracks verification status and account type (student/coaching/reseller)

  2. **exam_categories**
     - Master list of competitive exams (NEET, JEE, UPSC, CAT, etc.)
     - Used for categorizing books and filtering

  3. **subjects**
     - Subjects within each exam category
     - Links to exam_categories via exam_id
     - Examples: Physics, Chemistry, Polity, Reasoning

  4. **book_conditions**
     - Standardized condition ratings (New, Like New, Good, Fair, Poor)
     - Includes description for each condition

  5. **books**
     - Core book listings created by sellers
     - Includes: title, author, ISBN, edition, description
     - Links to exam_categories and subjects
     - Stores pricing, condition, availability status
     - Tracks seller location and contact preferences
     - Supports multiple images via JSONB array
     - Includes selling type (sell/rent/exchange)

  6. **book_images**
     - Stores URLs to book images in Supabase Storage
     - Links to books table
     - Tracks image order and upload timestamp

  7. **saved_books**
     - Users can save/favorite books for later
     - Links users to books they're interested in

  8. **search_history**
     - Tracks user search queries for recommendations
     - Helps improve search and show trending searches

  ## Security (Row Level Security)

  - All tables have RLS enabled
  - Policies restrict access based on authentication and ownership
  - Public read access for book listings (browsing without login)
  - Write access only for authenticated users on their own data
  - Profile updates restricted to profile owner
  - Book CRUD restricted to book owner

  ## Important Notes

  1. Uses Supabase's built-in auth.users table for authentication
  2. Book images stored in Supabase Storage bucket (to be created separately)
  3. Location data uses text fields (can be enhanced with PostGIS in Phase 2)
  4. Timestamps are automatically managed with DEFAULT now()
  5. All foreign keys have ON DELETE CASCADE for data integrity
*/

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- PROFILES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  display_name text NOT NULL,
  phone text,
  city text,
  state text,
  pincode text,
  bio text,
  avatar_url text,
  account_type text DEFAULT 'student' CHECK (account_type IN ('student', 'coaching', 'reseller')),
  is_verified boolean DEFAULT false,
  seller_rating numeric(3, 2) DEFAULT 0.00,
  total_sales integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view profiles"
  ON profiles FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- =====================================================
-- EXAM CATEGORIES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS exam_categories (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL UNIQUE,
  slug text NOT NULL UNIQUE,
  description text,
  icon_name text,
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE exam_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view exam categories"
  ON exam_categories FOR SELECT
  TO authenticated, anon
  USING (is_active = true);

-- =====================================================
-- SUBJECTS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS subjects (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  exam_id uuid REFERENCES exam_categories(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  slug text NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  UNIQUE(exam_id, slug)
);

ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view subjects"
  ON subjects FOR SELECT
  TO authenticated, anon
  USING (is_active = true);

-- =====================================================
-- BOOK CONDITIONS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS book_conditions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL UNIQUE,
  description text,
  display_order integer DEFAULT 0
);

ALTER TABLE book_conditions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view book conditions"
  ON book_conditions FOR SELECT
  TO authenticated, anon
  USING (true);

-- =====================================================
-- BOOKS TABLE (Main Listings)
-- =====================================================
CREATE TABLE IF NOT EXISTS books (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  seller_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  exam_id uuid REFERENCES exam_categories(id) ON DELETE SET NULL,
  subject_id uuid REFERENCES subjects(id) ON DELETE SET NULL,
  condition_id uuid REFERENCES book_conditions(id) ON DELETE SET NULL,
  
  title text NOT NULL,
  author text,
  isbn text,
  edition text,
  publisher text,
  description text,
  
  listing_type text DEFAULT 'sell' CHECK (listing_type IN ('sell', 'rent', 'exchange')),
  price numeric(10, 2),
  rental_price_per_month numeric(10, 2),
  
  city text NOT NULL,
  state text NOT NULL,
  pincode text,
  
  status text DEFAULT 'available' CHECK (status IN ('available', 'sold', 'rented', 'reserved', 'deleted')),
  
  views_count integer DEFAULT 0,
  saves_count integer DEFAULT 0,
  
  cover_image_url text,
  
  is_negotiable boolean DEFAULT true,
  prefer_contact_method text DEFAULT 'chat' CHECK (prefer_contact_method IN ('chat', 'phone', 'both')),
  
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE books ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view available books"
  ON books FOR SELECT
  TO authenticated, anon
  USING (status = 'available' OR seller_id = auth.uid());

CREATE POLICY "Sellers can insert own books"
  ON books FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = seller_id);

CREATE POLICY "Sellers can update own books"
  ON books FOR UPDATE
  TO authenticated
  USING (auth.uid() = seller_id)
  WITH CHECK (auth.uid() = seller_id);

CREATE POLICY "Sellers can delete own books"
  ON books FOR DELETE
  TO authenticated
  USING (auth.uid() = seller_id);

-- =====================================================
-- BOOK IMAGES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS book_images (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  book_id uuid REFERENCES books(id) ON DELETE CASCADE NOT NULL,
  image_url text NOT NULL,
  display_order integer DEFAULT 0,
  uploaded_at timestamptz DEFAULT now()
);

ALTER TABLE book_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view book images"
  ON book_images FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Sellers can manage own book images"
  ON book_images FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM books
      WHERE books.id = book_images.book_id
      AND books.seller_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM books
      WHERE books.id = book_images.book_id
      AND books.seller_id = auth.uid()
    )
  );

-- =====================================================
-- SAVED BOOKS TABLE (Favorites/Wishlist)
-- =====================================================
CREATE TABLE IF NOT EXISTS saved_books (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  book_id uuid REFERENCES books(id) ON DELETE CASCADE NOT NULL,
  saved_at timestamptz DEFAULT now(),
  UNIQUE(user_id, book_id)
);

ALTER TABLE saved_books ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own saved books"
  ON saved_books FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can save books"
  ON saved_books FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can unsave books"
  ON saved_books FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- =====================================================
-- SEARCH HISTORY TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS search_history (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  search_query text NOT NULL,
  filters jsonb,
  results_count integer DEFAULT 0,
  searched_at timestamptz DEFAULT now()
);

ALTER TABLE search_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own search history"
  ON search_history FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can add to search history"
  ON search_history FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_books_seller_id ON books(seller_id);
CREATE INDEX IF NOT EXISTS idx_books_exam_id ON books(exam_id);
CREATE INDEX IF NOT EXISTS idx_books_subject_id ON books(subject_id);
CREATE INDEX IF NOT EXISTS idx_books_status ON books(status);
CREATE INDEX IF NOT EXISTS idx_books_created_at ON books(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_books_city ON books(city);
CREATE INDEX IF NOT EXISTS idx_books_title ON books USING gin(to_tsvector('english', title));
CREATE INDEX IF NOT EXISTS idx_book_images_book_id ON book_images(book_id);
CREATE INDEX IF NOT EXISTS idx_saved_books_user_id ON saved_books(user_id);
CREATE INDEX IF NOT EXISTS idx_saved_books_book_id ON saved_books(book_id);

-- =====================================================
-- SEED DATA: Exam Categories
-- =====================================================
INSERT INTO exam_categories (name, slug, description, display_order) VALUES
  ('NEET', 'neet', 'National Eligibility cum Entrance Test for medical aspirants', 1),
  ('JEE', 'jee', 'Joint Entrance Examination for engineering aspirants', 2),
  ('UPSC', 'upsc', 'Union Public Service Commission for civil services', 3),
  ('CAT', 'cat', 'Common Admission Test for MBA aspirants', 4),
  ('GATE', 'gate', 'Graduate Aptitude Test in Engineering', 5),
  ('Bank PO', 'bank-po', 'Banking and financial services exams', 6),
  ('SSC', 'ssc', 'Staff Selection Commission exams', 7),
  ('Railways', 'railways', 'Railway Recruitment Board exams', 8),
  ('NDA', 'nda', 'National Defence Academy entrance', 9),
  ('CLAT', 'clat', 'Common Law Admission Test', 10)
ON CONFLICT (slug) DO NOTHING;

-- =====================================================
-- SEED DATA: Subjects
-- =====================================================
INSERT INTO subjects (exam_id, name, slug) VALUES
  ((SELECT id FROM exam_categories WHERE slug = 'neet'), 'Physics', 'physics'),
  ((SELECT id FROM exam_categories WHERE slug = 'neet'), 'Chemistry', 'chemistry'),
  ((SELECT id FROM exam_categories WHERE slug = 'neet'), 'Biology', 'biology'),
  ((SELECT id FROM exam_categories WHERE slug = 'jee'), 'Physics', 'physics'),
  ((SELECT id FROM exam_categories WHERE slug = 'jee'), 'Chemistry', 'chemistry'),
  ((SELECT id FROM exam_categories WHERE slug = 'jee'), 'Mathematics', 'mathematics'),
  ((SELECT id FROM exam_categories WHERE slug = 'upsc'), 'History', 'history'),
  ((SELECT id FROM exam_categories WHERE slug = 'upsc'), 'Geography', 'geography'),
  ((SELECT id FROM exam_categories WHERE slug = 'upsc'), 'Polity', 'polity'),
  ((SELECT id FROM exam_categories WHERE slug = 'upsc'), 'Economics', 'economics'),
  ((SELECT id FROM exam_categories WHERE slug = 'cat'), 'Quantitative Aptitude', 'quantitative-aptitude'),
  ((SELECT id FROM exam_categories WHERE slug = 'cat'), 'Verbal Ability', 'verbal-ability'),
  ((SELECT id FROM exam_categories WHERE slug = 'cat'), 'Logical Reasoning', 'logical-reasoning')
ON CONFLICT (exam_id, slug) DO NOTHING;

-- =====================================================
-- SEED DATA: Book Conditions
-- =====================================================
INSERT INTO book_conditions (name, description, display_order) VALUES
  ('New', 'Brand new, unused book with no marks or damage', 1),
  ('Like New', 'Gently used, appears almost new with minimal signs of use', 2),
  ('Good', 'Used with minor wear, all pages intact and readable', 3),
  ('Fair', 'Heavily used with visible wear, highlighting, or notes', 4),
  ('Poor', 'Significant damage, torn pages, or heavy markings', 5)
ON CONFLICT (name) DO NOTHING;