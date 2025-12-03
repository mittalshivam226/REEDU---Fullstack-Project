import { supabase } from '@/lib/supabase';

export async function getExamCategories() {
  try {
    const { data, error } = await supabase
      .from('exam_categories')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (error) throw error;

    return { data: data || [], error: null };
  } catch (error) {
    console.error('Error fetching exam categories:', error);
    return { data: [], error: error as Error };
  }
}

export async function getSubjectsByExam(examId: string) {
  try {
    const { data, error } = await supabase
      .from('subjects')
      .select('*')
      .eq('exam_id', examId)
      .eq('is_active', true)
      .order('name', { ascending: true });

    if (error) throw error;

    return { data: data || [], error: null };
  } catch (error) {
    console.error('Error fetching subjects:', error);
    return { data: [], error: error as Error };
  }
}

export async function getBookConditions() {
  try {
    const { data, error } = await supabase
      .from('book_conditions')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) throw error;

    return { data: data || [], error: null };
  } catch (error) {
    console.error('Error fetching book conditions:', error);
    return { data: [], error: error as Error };
  }
}
