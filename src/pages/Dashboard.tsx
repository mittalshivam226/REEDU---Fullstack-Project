import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, Plus, Edit, Trash2 } from 'lucide-react';
import { Layout } from '@/components/Layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { getUserBooks, deleteBook } from '@/lib/api/books';
import type { BookWithDetails } from '@/types';

export function Dashboard() {
  const { user, profile } = useAuth();
  const navigate = useNavigate();

  const [books, setBooks] = useState<BookWithDetails[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    loadUserBooks();
  }, [user, navigate]);

  const loadUserBooks = async () => {
    if (!user) return;

    const { data } = await getUserBooks(user.id);
    if (data) setBooks(data);
    setLoading(false);
  };

  const handleDelete = async (bookId: string) => {
    if (!user || !confirm('Are you sure you want to delete this listing?')) return;

    const { error } = await deleteBook(bookId, user.id);
    if (!error) {
      setBooks(books.filter(b => b.id !== bookId));
    }
  };

  if (!user) return null;

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Dashboard</h1>
          <p className="text-gray-600">Welcome back, {profile?.display_name}!</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">My Listings</h2>
            <Link
              to="/sell"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition flex items-center gap-2"
            >
              <Plus className="h-5 w-5" />
              Add Listing
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-gray-100 rounded-lg h-48 animate-pulse" />
              ))}
            </div>
          ) : books.length > 0 ? (
            <div className="space-y-4">
              {books.map((book) => (
                <div
                  key={book.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                >
                  <div className="flex gap-4">
                    <div className="w-24 h-32 bg-gray-100 rounded flex-shrink-0 overflow-hidden">
                      {book.cover_image_url ? (
                        <img
                          src={book.cover_image_url}
                          alt={book.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <BookOpen className="h-8 w-8 text-gray-300" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <Link
                        to={`/books/${book.id}`}
                        className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition line-clamp-2"
                      >
                        {book.title}
                      </Link>
                      {book.author && (
                        <p className="text-sm text-gray-600 mt-1">{book.author}</p>
                      )}
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-lg font-bold text-gray-900">
                          ₹{book.price?.toLocaleString()}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          book.status === 'available' ? 'bg-green-100 text-green-800' :
                          book.status === 'sold' ? 'bg-gray-100 text-gray-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {book.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                        <span>{book.views_count} views</span>
                        <span>•</span>
                        <span>{book.saves_count} saves</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <Link
                        to={`/books/${book.id}`}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded transition"
                        title="View"
                      >
                        <Edit className="h-5 w-5" />
                      </Link>
                      <button
                        onClick={() => handleDelete(book.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded transition"
                        title="Delete"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">You haven't listed any books yet.</p>
              <Link
                to="/sell"
                className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                <Plus className="h-5 w-5 mr-2" />
                Create Your First Listing
              </Link>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
