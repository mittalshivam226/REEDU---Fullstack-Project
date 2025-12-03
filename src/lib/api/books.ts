import { supabase } from '@/lib/supabase';
import type { BookWithDetails, SearchFilters, PaginationParams } from '@/types';

export async function getBooks(
  filters?: SearchFilters,
  pagination?: PaginationParams
) {
  try {
    let query = supabase
      .from('books')
      .select(`
        *,
        exam_category:exam_categories(*),
        subject:subjects(*),
        condition:book_conditions(*),
        seller:profiles(*),
        images:book_images(*)
      `)
      .eq('status', 'available')
      .order('created_at', { ascending: false });

    if (filters?.exam) {
      query = query.eq('exam_id', filters.exam);
    }

    if (filters?.subject) {
      query = query.eq('subject_id', filters.subject);
    }

    if (filters?.condition) {
      query = query.eq('condition_id', filters.condition);
    }

    if (filters?.city) {
      query = query.ilike('city', `%${filters.city}%`);
    }

    if (filters?.state) {
      query = query.ilike('state', `%${filters.state}%`);
    }

    if (filters?.listingType) {
      query = query.eq('listing_type', filters.listingType);
    }

    if (filters?.minPrice !== undefined) {
      query = query.gte('price', filters.minPrice);
    }

    if (filters?.maxPrice !== undefined) {
      query = query.lte('price', filters.maxPrice);
    }

    if (filters?.query) {
      query = query.ilike('title', `%${filters.query}%`);
    }

    if (pagination) {
      const from = (pagination.page - 1) * pagination.limit;
      const to = from + pagination.limit - 1;
      query = query.range(from, to);
    }

    const { data, error, count } = await query;

    if (error) throw error;

    return { data: data as BookWithDetails[], count, error: null };
  } catch (error) {
    console.error('Error fetching books:', error);
    return { data: [], count: 0, error: error as Error };
  }
}

export async function getBookById(id: string, userId?: string) {
  try {
    const { data, error } = await supabase
      .from('books')
      .select(`
        *,
        exam_category:exam_categories(*),
        subject:subjects(*),
        condition:book_conditions(*),
        seller:profiles(*),
        images:book_images(*)
      `)
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;

    if (!data) {
      return { data: null, error: new Error('Book not found') };
    }

    let isSaved = false;
    if (userId) {
      const { data: savedData } = await supabase
        .from('saved_books')
        .select('id')
        .eq('book_id', id)
        .eq('user_id', userId)
        .maybeSingle();

      isSaved = !!savedData;
    }

    await supabase
      .from('books')
      .update({ views_count: (data.views_count || 0) + 1 })
      .eq('id', id);

    return {
      data: { ...data, is_saved: isSaved } as BookWithDetails,
      error: null,
    };
  } catch (error) {
    console.error('Error fetching book:', error);
    return { data: null, error: error as Error };
  }
}

export async function createBook(bookData: any, userId: string) {
  try {
    const { data, error } = await supabase
      .from('books')
      .insert({
        ...bookData,
        seller_id: userId,
      })
      .select()
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error('Error creating book:', error);
    return { data: null, error: error as Error };
  }
}

export async function updateBook(id: string, updates: any, userId: string) {
  try {
    const { data, error } = await supabase
      .from('books')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .eq('seller_id', userId)
      .select()
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error('Error updating book:', error);
    return { data: null, error: error as Error };
  }
}

export async function deleteBook(id: string, userId: string) {
  try {
    const { error } = await supabase
      .from('books')
      .delete()
      .eq('id', id)
      .eq('seller_id', userId);

    if (error) throw error;

    return { error: null };
  } catch (error) {
    console.error('Error deleting book:', error);
    return { error: error as Error };
  }
}

export async function getUserBooks(userId: string) {
  try {
    const { data, error } = await supabase
      .from('books')
      .select(`
        *,
        exam_category:exam_categories(*),
        subject:subjects(*),
        condition:book_conditions(*),
        images:book_images(*)
      `)
      .eq('seller_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return { data: data as BookWithDetails[], error: null };
  } catch (error) {
    console.error('Error fetching user books:', error);
    return { data: [], error: error as Error };
  }
}

export async function toggleSaveBook(bookId: string, userId: string) {
  try {
    const { data: existing } = await supabase
      .from('saved_books')
      .select('id')
      .eq('book_id', bookId)
      .eq('user_id', userId)
      .maybeSingle();

    if (existing) {
      const { error } = await supabase
        .from('saved_books')
        .delete()
        .eq('id', existing.id);

      if (error) throw error;

      await supabase.rpc('decrement_saves_count', { book_id: bookId });

      return { saved: false, error: null };
    } else {
      const { error } = await supabase
        .from('saved_books')
        .insert({ book_id: bookId, user_id: userId });

      if (error) throw error;

      await supabase.rpc('increment_saves_count', { book_id: bookId });

      return { saved: true, error: null };
    }
  } catch (error) {
    console.error('Error toggling save:', error);
    return { saved: false, error: error as Error };
  }
}

export async function getSavedBooks(userId: string) {
  try {
    const { data, error } = await supabase
      .from('saved_books')
      .select(`
        book_id,
        books:book_id (
          *,
          exam_category:exam_categories(*),
          subject:subjects(*),
          condition:book_conditions(*),
          seller:profiles(*),
          images:book_images(*)
        )
      `)
      .eq('user_id', userId)
      .order('saved_at', { ascending: false });

    if (error) throw error;

    const books = data?.map((item: any) => item.books).filter(Boolean) || [];

    return { data: books as BookWithDetails[], error: null };
  } catch (error) {
    console.error('Error fetching saved books:', error);
    return { data: [], error: error as Error };
  }
}

export async function uploadBookImage(file: File, bookId: string) {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${bookId}/${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('book-images')
      .upload(fileName, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('book-images')
      .getPublicUrl(fileName);

    return { url: publicUrl, error: null };
  } catch (error) {
    console.error('Error uploading image:', error);
    return { url: null, error: error as Error };
  }
}
