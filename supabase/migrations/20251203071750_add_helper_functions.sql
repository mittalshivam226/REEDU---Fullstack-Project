/*
  # Add Helper Functions

  ## New Functions
  
  1. **increment_saves_count**
     - Increments the saves_count for a book
     - Called when a user saves/favorites a book
  
  2. **decrement_saves_count**
     - Decrements the saves_count for a book
     - Called when a user unsaves a book
*/

-- Function to increment saves count
CREATE OR REPLACE FUNCTION increment_saves_count(book_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE books
  SET saves_count = saves_count + 1
  WHERE id = book_id;
END;
$$ LANGUAGE plpgsql;

-- Function to decrement saves count
CREATE OR REPLACE FUNCTION decrement_saves_count(book_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE books
  SET saves_count = GREATEST(saves_count - 1, 0)
  WHERE id = book_id;
END;
$$ LANGUAGE plpgsql;
