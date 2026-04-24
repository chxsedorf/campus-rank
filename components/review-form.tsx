"use client";

import { useState, useTransition } from "react";
import { createReview } from "@/app/course/[id]/actions";

export function ReviewForm({ courseId }: { courseId: number }) {
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState("");

  return (
    <form
      className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-5"
      action={(formData) => {
        setMessage("");
        startTransition(async () => {
          try {
            await createReview(courseId, formData);
            setMessage("口コミを投稿しました。");
          } catch (error) {
            setMessage(error instanceof Error ? error.message : "投稿に失敗しました。");
          }
        });
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="表示名">
          <input
            name="author"
            defaultValue="匿名ユーザー"
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm"
          />
        </Field>

        <Field label="おすすめ度">
          <ScoreSelect name="recommend" />
        </Field>

        <Field label="わかりやすさ">
          <ScoreSelect name="clarity" />
        </Field>

        <Field label="課題量">
          <ScoreSelect name="assignments" />
        </Field>

        <Field label="テスト難易度">
          <ScoreSelect name="difficulty" />
        </Field>

        <Field label="出席の厳しさ">
          <ScoreSelect name="attendance" />
        </Field>
      </div>

      <div className="mt-4">
        <label className="mb-2 block text-sm font-medium text-slate-700">コメント</label>
        <textarea
          name="body"
          rows={6}
          placeholder="授業内容、課題量、試験、予習復習のしやすさなど、履修判断に役立つ内容を記入してください。"
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm"
        />
      </div>

      <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-7 text-amber-900">
        <div className="font-medium">投稿ルール</div>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>教員個人への中傷や侮辱は禁止です。</li>
          <li>事実ベースまたは体験ベースで記述してください。</li>
          <li>「〜と感じた」「〜と思った」など主観表現を推奨します。</li>
          <li>個人情報は記載しないでください。</li>
        </ul>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="mt-5 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white disabled:opacity-50"
      >
        {pending ? "投稿中..." : "投稿を送信"}
      </button>

      {message ? <p className="mt-3 text-sm text-slate-600">{message}</p> : null}
    </form>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">{label}</label>
      {children}
    </div>
  );
}

function ScoreSelect({ name }: { name: string }) {
  return (
    <select
      name={name}
      defaultValue="3"
      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm"
    >
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
    </select>
  );
}