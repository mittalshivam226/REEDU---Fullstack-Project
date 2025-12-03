import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Layout } from '@/components/Layout/Layout';
import { BookCard } from '@/components/Books/BookCard';
import { getBooks } from '@/lib/api/books';
import { getExamCategories, getSubjectsByExam, getBookConditions } from '@/lib/api/metadata';
import type { BookWithDetails, SearchFilters, ExamCategory, Subject, BookCondition } from '@/types';

export function Browse() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [books, setBooks] = useState<BookWithDetails[]>([]);
  const [categories, setCategories] = useState<ExamCategory[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [conditions, setConditions] = useState<BookCondition[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState<SearchFilters>({
    query: searchParams.get('q') || '',
    exam: searchParams.get('exam') || '',
    subject: searchParams.get('subject') || '',
    condition: searchParams.get('condition') || '',
    city: searchParams.get('city') || '',
  });

  useEffect(() => {
    loadMetadata();
  }, []);

  useEffect(() => {
    if (filters.exam) {
      loadSubjects(filters.exam);
    }
  }, [filters.exam]);

  useEffect(() => {
    loadBooks();
  }, [filters]);

  const loadMetadata = async () => {
    const [categoriesRes, conditionsRes] = await Promise.all([
      getExamCategories(),
      getBookConditions(),
    ]);

    if (categoriesRes.data) setCategories(categoriesRes.data);
    if (conditionsRes.data) setConditions(conditionsRes.data);
  };

  const loadSubjects = async (examSlug: string) => {
    const category = categories.find(c => c.slug === examSlug);
    if (!category) return;

    const { data } = await getSubjectsByExam(category.id);
    if (data) setSubjects(data);
  };

  const loadBooks = async () => {
    setLoading(true);
    const categoryId = categories.find(c => c.slug === filters.exam)?.id;
    const subjectId = subjects.find(s => s.slug === filters.subject)?.id;
    const conditionId = conditions.find(c => c.name === filters.condition)?.id;

    const { data } = await getBooks({
      query: filters.query,
      exam: categoryId,
      subject: subjectId,
      condition: conditionId,
      city: filters.city,
    });

    if (data) setBooks(data);
    setLoading(false);
  };

  const handleFilterChange = (key: keyof SearchFilters, value: string) => {
    const newFilters = { ...filters, [key]: value };
    if (key === 'exam') {
      newFilters.subject = '';
    }
    setFilters(newFilters);

    const params = new URLSearchParams();
    Object.entries(newFilters).forEach(([k, v]) => {
      if (v) params.set(k, v);
    });
    setSearchParams(params);
  };

  return (
    <Layout>
      <div className="bg-white border-b border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by book title, author, ISBN..."
                value={filters.query}
                onChange={(e) => handleFilterChange('query', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              <SlidersHorizontal className="h-5 w-5" />
              Filters
            </button>
          </div>

          {showFilters && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              <select
                value={filters.exam}
                onChange={(e) => handleFilterChange('exam', e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Exams</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.slug}>
                    {cat.name}
                  </option>
                ))}
              </select>

              <select
                value={filters.subject}
                onChange={(e) => handleFilterChange('subject', e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={!filters.exam}
              >
                <option value="">All Subjects</option>
                {subjects.map((subj) => (
                  <option key={subj.id} value={subj.slug}>
                    {subj.name}
                  </option>
                ))}
              </select>

              <select
                value={filters.condition}
                onChange={(e) => handleFilterChange('condition', e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Conditions</option>
                {conditions.map((cond) => (
                  <option key={cond.id} value={cond.name}>
                    {cond.name}
                  </option>
                ))}
              </select>

              <input
                type="text"
                placeholder="City"
                value={filters.city}
                onChange={(e) => handleFilterChange('city', e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {books.length} Books Found
          </h2>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(12)].map((_, i) => (
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
            <p className="text-gray-600">No books found matching your criteria.</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
