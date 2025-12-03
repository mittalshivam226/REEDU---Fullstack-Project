import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, BookOpen, TrendingUp, Shield, Users } from 'lucide-react';
import { Layout } from '@/components/Layout/Layout';
import { BookCard } from '@/components/Books/BookCard';
import { getBooks } from '@/lib/api/books';
import { getExamCategories } from '@/lib/api/metadata';
import type { BookWithDetails, ExamCategory } from '@/types';

export function Home() {
  const [books, setBooks] = useState<BookWithDetails[]>([]);
  const [categories, setCategories] = useState<ExamCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [booksRes, categoriesRes] = await Promise.all([
      getBooks({}, { page: 1, limit: 8 }),
      getExamCategories(),
    ]);

    if (booksRes.data) setBooks(booksRes.data);
    if (categoriesRes.data) setCategories(categoriesRes.data);
    setLoading(false);
  };

  return (
    <Layout>
      <div className="bg-gradient-to-br from-blue-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Buy & Sell Used Exam Books
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Your trusted marketplace for second-hand NEET, JEE, UPSC, CAT books and more
            </p>
            <Link
              to="/browse"
              className="inline-flex items-center bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
            >
              <Search className="h-5 w-5 mr-2" />
              Browse Books
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Best Prices</h3>
              <p className="text-gray-600 text-sm">
                Save up to 70% on used books in great condition
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-4">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Verified Sellers</h3>
              <p className="text-gray-600 text-sm">
                Buy from trusted students and coaching centers
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mb-4">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Local Deals</h3>
              <p className="text-gray-600 text-sm">
                Find books in your city and save on shipping
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Browse by Exam</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-16">
          {categories.slice(0, 10).map((category) => (
            <Link
              key={category.id}
              to={`/browse?exam=${category.slug}`}
              className="bg-white p-6 rounded-lg border-2 border-gray-200 hover:border-blue-600 hover:shadow-md transition text-center"
            >
              <div className="text-3xl mb-2">📚</div>
              <h3 className="font-semibold text-gray-900">{category.name}</h3>
            </Link>
          ))}
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Recent Listings</h2>
          <Link to="/browse" className="text-blue-600 hover:text-blue-700 font-medium">
            View All →
          </Link>
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
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600">No books available yet. Be the first to sell!</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
