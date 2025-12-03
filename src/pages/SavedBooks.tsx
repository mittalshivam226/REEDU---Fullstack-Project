import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Layout } from '@/components/Layout/Layout';
import { BookCard } from '@/components/Books/BookCard';
import { useAuth } from '@/contexts/AuthContext';
import { getSavedBooks } from '@/lib/api/books';
import type { BookWithDetails } from '@/types';

export function SavedBooks() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [books, setBooks] = useState<BookWithDetails[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    loadSavedBooks();
  }, [user, navigate]);

  const loadSavedBooks = async () => {
    if (!user) return;

    const { data } = await getSavedBooks(user.id);
    if (data) setBooks(data);
    setLoading(false);
  };

  if (!user) return null;

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Saved Books</h1>
          <p className="text-gray-600">Books you've saved for later</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-gray-100 rounded-lg h-80 animate-pulse" />
            ))}
          </div>
        ) : books.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {books.map((book) => (
              <BookCard key={book.id} book={{ ...book, is_saved: true }} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600">No saved books yet. Start browsing to save your favorites!</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
