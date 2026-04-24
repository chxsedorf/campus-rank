import { supabase } from '@/lib/supabase';
import type { CourseRow, ReviewRow } from '@/lib/types';

export async function getCourses(params?: {
  q?: string;
  faculty?: string;
  semester?: string;
}) {
  let query = supabase
    .from('courses')
    .select('*')
    .order('recommend', { ascending: false });

  if (params?.faculty && params.faculty !== 'すべて') {
    query = query.eq('faculty', params.faculty);
  }

  if (params?.semester && params.semester !== 'すべて') {
    query = query.eq('semester', params.semester);
  }

  if (params?.q) {
    query = query.or(
      `name.ilike.%${params.q}%,teacher.ilike.%${params.q}%,summary.ilike.%${params.q}%`
    );
  }

  const { data, error } = await query;

  if (error) {
    console.error('Supabase getCourses error:', error);
    throw new Error(error.message);
  }

  return (data ?? []) as CourseRow[];
}

export async function getCourseById(id: number) {
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Supabase getCourseById error:', error);
    throw new Error(error.message);
  }

  return data as CourseRow;
}

export async function getPublishedReviewsByCourseId(courseId: number) {
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('course_id', courseId)
    .eq('status', 'published')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Supabase getPublishedReviewsByCourseId error:', error);
    throw new Error(error.message);
  }

  return (data ?? []) as ReviewRow[];
}

export async function getPublishedReviewCount() {
  const { count, error } = await supabase
    .from('reviews')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'published');

  if (error) {
    console.error('Supabase getPublishedReviewCount error:', error);
    throw new Error(error.message);
  }

  return count ?? 0;
}