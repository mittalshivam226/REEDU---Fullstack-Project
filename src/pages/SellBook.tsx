import { useState, FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, X } from 'lucide-react';
import { Layout } from '@/components/Layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { createBook, uploadBookImage } from '@/lib/api/books';
import { getExamCategories, getSubjectsByExam, getBookConditions } from '@/lib/api/metadata';
import type { ExamCategory, Subject, BookCondition } from '@/types';

export function SellBook() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [categories, setCategories] = useState<ExamCategory[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [conditions, setConditions] = useState<BookCondition[]>([]);

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    isbn: '',
    edition: '',
    publisher: '',
    description: '',
    exam_id: '',
    subject_id: '',
    condition_id: '',
    listing_type: 'sell' as 'sell' | 'rent' | 'exchange',
    price: '',
    city: '',
    state: '',
    pincode: '',
    is_negotiable: true,
    prefer_contact_method: 'chat' as 'chat' | 'phone' | 'both',
  });

  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    loadMetadata();
  }, [user, navigate]);

  useEffect(() => {
    if (formData.exam_id) {
      loadSubjects(formData.exam_id);
    }
  }, [formData.exam_id]);

  const loadMetadata = async () => {
    const [categoriesRes, conditionsRes] = await Promise.all([
      getExamCategories(),
      getBookConditions(),
    ]);

    if (categoriesRes.data) setCategories(categoriesRes.data);
    if (conditionsRes.data) setConditions(conditionsRes.data);
  };

  const loadSubjects = async (examId: string) => {
    const { data } = await getSubjectsByExam(examId);
    if (data) setSubjects(data);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + images.length > 5) {
      setError('Maximum 5 images allowed');
      return;
    }

    setImages(prev => [...prev, ...files]);

    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setError('');
    setLoading(true);

    try {
      const bookData = {
        ...formData,
        price: formData.price ? parseFloat(formData.price) : null,
      };

      const { data: book, error: bookError } = await createBook(bookData, user.id);

      if (bookError || !book) {
        throw new Error(bookError?.message || 'Failed to create book listing');
      }

      if (images.length > 0) {
        const uploadPromises = images.map(image => uploadBookImage(image, book.id));
        const results = await Promise.all(uploadPromises);

        const firstImageUrl = results[0]?.url;
        if (firstImageUrl) {
          await fetch('/api/books/update', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: book.id,
              cover_image_url: firstImageUrl,
            }),
          });
        }
      }

      navigate(`/books/${book.id}`);
    } catch (err: any) {
      setError(err.message || 'Failed to create listing');
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Sell Your Book</h1>

        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-sm">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Book Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter book title"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Author
              </label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ISBN
              </label>
              <input
                type="text"
                value={formData.isbn}
                onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Exam *
              </label>
              <select
                required
                value={formData.exam_id}
                onChange={(e) => setFormData({ ...formData, exam_id: e.target.value, subject_id: '' })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Exam</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject
              </label>
              <select
                value={formData.subject_id}
                onChange={(e) => setFormData({ ...formData, subject_id: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={!formData.exam_id}
              >
                <option value="">Select Subject</option>
                {subjects.map((subj) => (
                  <option key={subj.id} value={subj.id}>{subj.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Condition *
              </label>
              <select
                required
                value={formData.condition_id}
                onChange={(e) => setFormData({ ...formData, condition_id: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Condition</option>
                {conditions.map((cond) => (
                  <option key={cond.id} value={cond.id}>{cond.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Describe the book's condition, any highlights, missing pages, etc."
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Listing Type *
              </label>
              <select
                value={formData.listing_type}
                onChange={(e) => setFormData({ ...formData, listing_type: e.target.value as any })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="sell">Sell</option>
                <option value="rent">Rent</option>
                <option value="exchange">Exchange</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price (₹) *
              </label>
              <input
                type="number"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter price"
                min="0"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City *
              </label>
              <input
                type="text"
                required
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                State *
              </label>
              <input
                type="text"
                required
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pincode
              </label>
              <input
                type="text"
                value={formData.pincode}
                onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Book Images (Max 5)
            </label>
            <div className="grid grid-cols-5 gap-4">
              {imagePreviews.map((preview, index) => (
                <div key={index} className="relative aspect-square">
                  <img
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}

              {images.length < 5 && (
                <label className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-blue-500 transition">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <Upload className="h-8 w-8 text-gray-400" />
                </label>
              )}
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="negotiable"
              checked={formData.is_negotiable}
              onChange={(e) => setFormData({ ...formData, is_negotiable: e.target.checked })}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="negotiable" className="ml-2 text-sm text-gray-700">
              Price is negotiable
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating Listing...' : 'Create Listing'}
          </button>
        </form>
      </div>
    </Layout>
  );
}
