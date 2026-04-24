'use client';

import { useState, useTransition } from 'react';
import { createSupportRequest } from '@/app/support/actions';

export function SupportForm({
  type,
  title,
  description,
  defaultSubject = '',
  showCourseField = false,
}: {
  type: 'contact' | 'report' | 'correction';
  title: string;
  description: string;
  defaultSubject?: string;
  showCourseField?: boolean;
}) {
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState('');

  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="text-sm font-medium text-slate-500">サポート</div>
      <h1 className="mt-1 text-3xl font-semibold tracking-tight">{title}</h1>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">{description}</p>

      <form
        className="mt-6 space-y-4"
        action={(formData) => {
          setMessage('');
          startTransition(async () => {
            try {
              await createSupportRequest(formData);
              setMessage('送信しました。運営確認後に対応します。');
            } catch (error) {
              setMessage(error instanceof Error ? error.message : '送信に失敗しました。');
            }
          });
        }}
      >
        <input type="hidden" name="type" value={type} />

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">件名</label>
          <input
            name="subject"
            defaultValue={defaultSubject}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm"
            placeholder="件名を入力してください"
          />
        </div>

        {showCourseField ? (
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              関連する授業ID（任意）
            </label>
            <input
              name="relatedCourseId"
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm"
              placeholder="例: 12"
            />
          </div>
        ) : null}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            メールアドレス（任意）
          </label>
          <input
            name="email"
            type="email"
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm"
            placeholder="返信が必要な場合のみ入力"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">内容</label>
          <textarea
            name="body"
            rows={8}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm"
            placeholder="内容を入力してください"
          />
        </div>

        <button
          type="submit"
          disabled={pending}
          className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white disabled:opacity-50"
        >
          {pending ? '送信中...' : '送信する'}
        </button>

        {message ? <p className="text-sm text-slate-600">{message}</p> : null}
      </form>
    </div>
  );
}