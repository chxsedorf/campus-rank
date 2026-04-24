'use client';

import { useMemo, useState, useTransition } from 'react';
import { createReview } from '@/app/course/[id]/actions';

type SliderFieldProps = {
  label: string;
  leftLabel: string;
  rightLabel: string;
  value: number;
  onChange: (value: number) => void;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function toFiveScale(value: number) {
  return clamp(Math.round(value / 20), 1, 5);
}

function getRecommendText(value: number) {
  if (value <= 20) return 'おすすめしにくい';
  if (value <= 40) return 'ややおすすめしにくい';
  if (value <= 60) return 'どちらともいえない';
  if (value <= 80) return 'ややおすすめ';
  return 'かなりおすすめ';
}

function getClarityText(value: number) {
  if (value <= 20) return 'かなり分かりにくい';
  if (value <= 40) return 'やや分かりにくい';
  if (value <= 60) return '普通';
  if (value <= 80) return 'やや分かりやすい';
  return 'かなり分かりやすい';
}

function getAssignmentsText(value: number) {
  if (value <= 20) return 'かなり少ない';
  if (value <= 40) return 'やや少ない';
  if (value <= 60) return '普通';
  if (value <= 80) return 'やや多い';
  return 'かなり多い';
}

function getDifficultyText(value: number) {
  if (value <= 20) return 'かなり簡単';
  if (value <= 40) return 'やや簡単';
  if (value <= 60) return '普通';
  if (value <= 80) return 'やや難しい';
  return 'かなり難しい';
}

function getAttendanceText(value: number) {
  if (value <= 20) return 'かなりゆるい';
  if (value <= 40) return 'ややゆるい';
  if (value <= 60) return '普通';
  if (value <= 80) return 'やや厳しい';
  return 'かなり厳しい';
}

function SliderField({
  label,
  leftLabel,
  rightLabel,
  value,
  onChange,
}: SliderFieldProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="flex items-center justify-between gap-4">
        <label className="text-sm font-medium text-slate-800">{label}</label>
        <span className="text-sm font-semibold text-slate-900">{value}</span>
      </div>

      <input
        type="range"
        min="1"
        max="100"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-4 w-full accent-slate-900"
      />

      <div className="mt-2 flex items-center justify-between gap-3 text-xs text-slate-600">
        <span>{leftLabel}</span>
        <span>{rightLabel}</span>
      </div>
    </div>
  );
}

export function ReviewForm({ courseId }: { courseId: number }) {
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState('');

  const [recommendUi, setRecommendUi] = useState(60);
  const [clarityUi, setClarityUi] = useState(60);
  const [assignmentsUi, setAssignmentsUi] = useState(50);
  const [difficultyUi, setDifficultyUi] = useState(50);
  const [attendanceUi, setAttendanceUi] = useState(50);

  const recommend = useMemo(() => toFiveScale(recommendUi), [recommendUi]);
  const clarity = useMemo(() => toFiveScale(clarityUi), [clarityUi]);
  const assignments = useMemo(() => toFiveScale(assignmentsUi), [assignmentsUi]);
  const difficulty = useMemo(() => toFiveScale(difficultyUi), [difficultyUi]);
  const attendance = useMemo(() => toFiveScale(attendanceUi), [attendanceUi]);

  return (
    <form
      className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-5"
      action={(formData) => {
        setMessage('');
        startTransition(async () => {
          try {
            await createReview(courseId, formData);
            setMessage('口コミを投稿しました。');
          } catch (error) {
            setMessage(error instanceof Error ? error.message : '投稿に失敗しました。');
          }
        });
      }}
    >
      <input type="hidden" name="recommend" value={recommend} />
      <input type="hidden" name="clarity" value={clarity} />
      <input type="hidden" name="assignments" value={assignments} />
      <input type="hidden" name="difficulty" value={difficulty} />
      <input type="hidden" name="attendance" value={attendance} />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="表示名">
          <input
            name="author"
            defaultValue="匿名ユーザー"
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900"
          />
        </Field>

        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="text-sm font-medium text-slate-800">おすすめ度</div>
          <div className="mt-2 text-sm text-slate-700">{getRecommendText(recommendUi)}</div>
          <div className="mt-2 text-xs text-slate-500">内部保存: {recommend} / 5</div>
        </div>
      </div>

      <div className="mt-4 grid gap-4">
        <SliderField
          label="おすすめ度"
          leftLabel="おすすめしにくい"
          rightLabel="おすすめ"
          value={recommendUi}
          onChange={setRecommendUi}
        />

        <div className="px-1 text-sm text-slate-700">{getRecommendText(recommendUi)}</div>

        <SliderField
          label="わかりやすさ"
          leftLabel="分かりにくい"
          rightLabel="分かりやすい"
          value={clarityUi}
          onChange={setClarityUi}
        />

        <div className="px-1 text-sm text-slate-700">{getClarityText(clarityUi)}</div>

        <SliderField
          label="課題量"
          leftLabel="少ない"
          rightLabel="多い"
          value={assignmentsUi}
          onChange={setAssignmentsUi}
        />

        <div className="px-1 text-sm text-slate-700">{getAssignmentsText(assignmentsUi)}</div>

        <SliderField
          label="テスト難易度"
          leftLabel="簡単"
          rightLabel="難しい"
          value={difficultyUi}
          onChange={setDifficultyUi}
        />

        <div className="px-1 text-sm text-slate-700">{getDifficultyText(difficultyUi)}</div>

        <SliderField
          label="出席の厳しさ"
          leftLabel="ゆるい"
          rightLabel="厳しい"
          value={attendanceUi}
          onChange={setAttendanceUi}
        />

        <div className="px-1 text-sm text-slate-700">{getAttendanceText(attendanceUi)}</div>
      </div>

      <div className="mt-4">
        <label className="mb-2 block text-sm font-medium text-slate-800">コメント</label>
        <textarea
          name="body"
          rows={6}
          placeholder="授業内容、課題量、試験、予習復習のしやすさなど、履修判断に役立つ内容を記入してください。"
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm leading-7 text-slate-900 placeholder:text-slate-600"
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
        {pending ? '投稿中...' : '投稿を送信'}
      </button>

      {message ? <p className="mt-3 text-sm text-slate-700">{message}</p> : null}
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
      <label className="mb-2 block text-sm font-medium text-slate-800">{label}</label>
      {children}
    </div>
  );
}