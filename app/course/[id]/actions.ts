'use server';

import { revalidatePath } from 'next/cache';
import { supabaseAdmin } from '@/lib/supabase-admin';

function toInt(value: FormDataEntryValue | null) {
  return Number(value ?? 0);
}

function clamp(value: number, min = 1, max = 5) {
  return Math.max(min, Math.min(max, value));
}

function round1(value: number) {
  return Number(value.toFixed(1));
}

async function recalculateCourseMetrics(courseId: number) {
  const { data: reviews, error: reviewsError } = await supabaseAdmin
    .from('reviews')
    .select('recommend, clarity, assignments, difficulty, attendance')
    .eq('course_id', courseId)
    .eq('status', 'published');

  if (reviewsError) {
    throw new Error(reviewsError.message);
  }

  if (!reviews || reviews.length === 0) {
    const { error: resetError } = await supabaseAdmin
      .from('courses')
      .update({
        rating: 0,
        recommend: 0,
        clarity: 0,
        easiness: 0,
        assignments: 0,
        difficulty: 0,
        attendance: 0,
      })
      .eq('id', courseId);

    if (resetError) {
      throw new Error(resetError.message);
    }

    return;
  }

  const avg = (
    key: 'recommend' | 'clarity' | 'assignments' | 'difficulty' | 'attendance'
  ) => reviews.reduce((sum, review) => sum + Number(review[key]), 0) / reviews.length;

  // 投稿値そのものの平均
  const rawRecommend = avg('recommend');
  const clarity = avg('clarity');
  const assignments = avg('assignments');
  const difficulty = avg('difficulty');
  const attendance = avg('attendance');

  // 負担系を「高いほど悪い」→「高いほど良い」に反転
  const assignmentsPositive = 6 - assignments;
  const difficultyPositive = 6 - difficulty;
  const attendancePositive = 6 - attendance;

  // 単位の取りやすさ：
  // 課題量・テスト難易度・出席の厳しさから計算
  const easiness =
    assignmentsPositive * 0.4 +
    difficultyPositive * 0.4 +
    attendancePositive * 0.2;

  // 補正版おすすめ度：
  // 投稿されたおすすめ度をベースにしつつ、
  // 負担が重い授業は少し下がるようにする
  const adjustedRecommend =
    rawRecommend * 0.55 +
    clarity * 0.2 +
    easiness * 0.25;

  // 総合評価：
  // わかりやすさ・おすすめ度・単位の取りやすさをバランスよく反映
  const rating =
    clarity * 0.4 +
    adjustedRecommend * 0.35 +
    easiness * 0.25;

  const { error: updateError } = await supabaseAdmin
    .from('courses')
    .update({
      rating: round1(clamp(rating)),
      recommend: round1(clamp(adjustedRecommend)),
      clarity: round1(clamp(clarity)),
      easiness: round1(clamp(easiness)),
      assignments: round1(clamp(assignments)),
      difficulty: round1(clamp(difficulty)),
      attendance: round1(clamp(attendance)),
    })
    .eq('id', courseId);

  if (updateError) {
    throw new Error(updateError.message);
  }
}

export async function createReview(courseId: number, formData: FormData) {
  const author = String(formData.get('author') || '匿名ユーザー').trim();
  const recommend = toInt(formData.get('recommend'));
  const clarity = toInt(formData.get('clarity'));
  const assignments = toInt(formData.get('assignments'));
  const difficulty = toInt(formData.get('difficulty'));
  const attendance = toInt(formData.get('attendance'));
  const body = String(formData.get('body') || '').trim();

  if (!body) {
    throw new Error('コメントを入力してください。');
  }

  if ([recommend, clarity, assignments, difficulty, attendance].some((v) => v < 1 || v > 5)) {
    throw new Error('評価は1〜5で入力してください。');
  }

  const { error: insertError } = await supabaseAdmin.from('reviews').insert({
    course_id: courseId,
    author: author || '匿名ユーザー',
    recommend,
    clarity,
    assignments,
    difficulty,
    attendance,
    body,
    status: 'published',
  });

  if (insertError) {
    throw new Error(insertError.message);
  }

  await recalculateCourseMetrics(courseId);

  revalidatePath(`/course/${courseId}`);
  revalidatePath('/courses');
  revalidatePath('/rankings');
  revalidatePath('/');
}