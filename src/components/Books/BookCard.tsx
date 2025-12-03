import { Link } from 'react-router-dom';
import { MapPin, Heart, BookOpen } from 'lucide-react';
import type { BookWithDetails } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import { toggleSaveBook } from '@/lib/api/books';
import { useState } from 'react';

interface BookCardProps {
  book: BookWithDetails;
}

export function BookCard({ book }: BookCardProps) {
  const { user } = useAuth();
  const [isSaved, setIsSaved] = useState(book.is_saved || false);
  const [, setSavesCount] = useState(book.saves_count);

  const handleToggleSave = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) return;

    const { saved } = await toggleSaveBook(book.id, user.id);
    setIsSaved(saved);
    setSavesCount(prev => saved ? prev + 1 : prev - 1);
  };

  const getConditionColor = (condition?: string) => {
    switch (condition?.toLowerCase()) {
      case 'new':
        return 'bg-green-100 text-green-800';
      case 'like new':
        return 'bg-blue-100 text-blue-800';
      case 'good':
        return 'bg-yellow-100 text-yellow-800';
      case 'fair':
        return 'bg-orange-100 text-orange-800';
      case 'poor':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Link
      to={`/books/${book.id}`}
      className="block bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-200 overflow-hidden group"
    >
      <div className="relative aspect-[3/4] bg-gray-100">
        {book.cover_image_url ? (
          <img
            src={book.cover_image_url}
            alt={book.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <BookOpen className="h-16 w-16 text-gray-300" />
          </div>
        )}
        {user && (
          <button
            onClick={handleToggleSave}
            className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition"
          >
            <Heart
              className={`h-5 w-5 ${isSaved ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
            />
          </button>
        )}
        <div className="absolute top-2 left-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getConditionColor(book.condition?.name)}`}>
            {book.condition?.name}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2 group-hover:text-blue-600 transition">
          {book.title}
        </h3>
        {book.author && (
          <p className="text-sm text-gray-600 mb-2">{book.author}</p>
        )}

        <div className="flex items-center gap-2 mb-2 text-xs text-gray-500">
          {book.exam_category && (
            <span className="bg-gray-100 px-2 py-1 rounded">
              {book.exam_category.name}
            </span>
          )}
          {book.subject && (
            <span className="bg-gray-100 px-2 py-1 rounded">
              {book.subject.name}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg font-bold text-gray-900">
              ₹{book.price?.toLocaleString()}
            </p>
            <p className="text-xs text-gray-500 capitalize">{book.listing_type}</p>
          </div>
          <div className="flex items-center text-xs text-gray-500">
            <MapPin className="h-3 w-3 mr-1" />
            {book.city}
          </div>
        </div>
      </div>
    </Link>
  );
}
