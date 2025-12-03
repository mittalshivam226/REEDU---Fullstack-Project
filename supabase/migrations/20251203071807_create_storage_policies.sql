/*
  # Storage Policies for Book Images

  ## Policies Created
  
  1. **Public read access**
     - Anyone can view book images
  
  2. **Authenticated upload**
     - Authenticated users can upload images
  
  3. **Owner delete**
     - Users can delete their own uploaded images
*/

-- Allow public read access to book images
CREATE POLICY "Public read access for book images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'book-images');

-- Allow authenticated users to upload images
CREATE POLICY "Authenticated users can upload book images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'book-images');

-- Allow users to delete their own images
CREATE POLICY "Users can delete own book images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'book-images' AND auth.uid()::text = (storage.foldername(name))[1]);
