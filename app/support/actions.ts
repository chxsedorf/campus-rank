'use server';

import { revalidatePath } from 'next/cache';
import { supabaseAdmin } from '@/lib/supabase-admin';

export async function createSupportRequest(formData: FormData) {
  const type = String(formData.get('type') || '').trim();
  const subject = String(formData.get('subject') || '').trim();
  const body = String(formData.get('body') || '').trim();
  const email = String(formData.get('email') || '').trim();
  const relatedCourseIdRaw = String(formData.get('relatedCourseId') || '').trim();

  if (!['contact', 'report', 'correction'].includes(type)) {
    throw new Error('問い合わせ種別が不正です。');
  }

  if (!subject) {
    throw new Error('件名を入力してください。');
  }

  if (!body) {
    throw new Error('内容を入力してください。');
  }

  const relatedCourseId =
    relatedCourseIdRaw && !Number.isNaN(Number(relatedCourseIdRaw))
      ? Number(relatedCourseIdRaw)
      : null;

  const { error } = await supabaseAdmin.from('support_requests').insert({
    type,
    subject,
    body,
    email: email || null,
    related_course_id: relatedCourseId,
  });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/support/contact');
  revalidatePath('/support/report');
  revalidatePath('/support/correction');
}