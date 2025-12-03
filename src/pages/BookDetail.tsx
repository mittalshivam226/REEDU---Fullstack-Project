import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { MapPin, Heart, Phone, MessageCircle, ArrowLeft, BookOpen } from 'lucide-react';
import { Layout } from '@/components/Layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { getBookById, toggleSaveBook } from '@/lib/api/books';
import type { BookWithDetails } from '@/types';

export function BookDetail() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [book, setBook] = useState<BookWithDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    if (id) {
      loadBook();
    }
  }, [id, user]);

  const loadBook = async () => {
    if (!id) return;

    const { data, error } = await getBookById(id, user?.id);

    if (error || !data) {
      navigate('/browse');
      return;
    }

    setBook(data);
    setIsSaved(data.is_saved || false);
    setLoading(false);
  };

  const handleToggleSave = async () => {
    if (!user || !id) return;

    const { saved } = await toggleSaveBook(id, user.id);
    setIsSaved(saved);
  };

  if (loading) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse">
            <div className="h-96 bg-gray-200 rounded-lg mb-8" />
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4" />
            <div className="h-6 bg-gray-200 rounded w-1/2" />
          </div>
        </div>
      </Layout>
    );
  }

  if (!book) return null;

  const images = book.images && book.images.length > 0
    ? book.images.map(img => img.image_url)
    : book.cover_image_url
    ? [book.cover_image_url]
    : [];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            {images.length > 0 ? (
              <div className="space-y-4">
                <div className="aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={images[activeImage]}
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {images.length > 1 && (
                  <div className="grid grid-cols-5 gap-2">
                    {images.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveImage(index)}
                        className={`aspect-square rounded-lg overflow-hidden border-2 ${
                          activeImage === index ? 'border-blue-600' : 'border-transparent'
                        }`}
                      >
                        <img src={img} alt={`${book.title} ${index + 1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="aspect-[3/4] bg-gray-100 rounded-lg flex items-center justify-center">
                <BookOpen className="h-24 w-24 text-gray-300" />
              </div>
            )}
          </div>

          <div>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{book.title}</h1>
                {book.author && (
                  <p className="text-lg text-gray-600 mb-4">by {book.author}</p>
                )}
              </div>
              {user && (
                <button
                  onClick={handleToggleSave}
                  className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition"
                >
                  <Heart className={`h-6 w-6 ${isSaved ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                </button>
              )}
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-4xl font-bold text-gray-900">
                  ₹{book.price?.toLocaleString()}
                </span>
                {book.is_negotiable && (
                  <span className="text-sm text-gray-600">(Negotiable)</span>
                )}
              </div>
              <p className="text-sm text-gray-600 capitalize">{book.listing_type}</p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Condition</p>
                  <p className="font-semibold">{book.condition?.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Exam</p>
                  <p className="font-semibold">{book.exam_category?.name}</p>
                </div>
                {book.subject && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Subject</p>
                    <p className="font-semibold">{book.subject.name}</p>
                  </div>
                )}
                {book.edition && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Edition</p>
                    <p className="font-semibold">{book.edition}</p>
                  </div>
                )}
              </div>

              <div className="flex items-center text-gray-600">
                <MapPin className="h-5 w-5 mr-2" />
                <span>{book.city}, {book.state}</span>
              </div>
            </div>

            {book.description && (
              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-2">Description</h3>
                <p className="text-gray-700 whitespace-pre-line">{book.description}</p>
              </div>
            )}

            <div className="border-t pt-6">
              <h3 className="font-semibold text-lg mb-4">Seller Information</h3>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-xl font-semibold text-blue-600">
                    {book.seller?.display_name?.[0]?.toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="font-semibold">{book.seller?.display_name}</p>
                  <p className="text-sm text-gray-600 capitalize">{book.seller?.account_type}</p>
                </div>
              </div>

              {user?.id !== book.seller_id && (
                <div className="space-y-3">
                  <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2">
                    <MessageCircle className="h-5 w-5" />
                    Contact Seller
                  </button>
                  {book.seller?.phone && (
                    <button className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition flex items-center justify-center gap-2">
                      <Phone className="h-5 w-5" />
                      Call Seller
                    </button>
                  )}
                </div>
              )}

              {user?.id === book.seller_id && (
                <Link
                  to={`/dashboard/books/edit/${book.id}`}
                  className="block w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition text-center"
                >
                  Edit Listing
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
