import Link from 'next/link';
import type { ReactNode } from 'react';
import {
  Search,
  Star,
  CalendarDays,
  BookOpen,
  ChevronRight,
} from 'lucide-react';
import type { Course } from '@/lib/data';

export function SearchInput({
  name = 'q',
  defaultValue,
}: {
  name?: string;
  defaultValue?: string;
}) {
  return (
    <div className="relative">
      <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
      <input
        name={name}
        defaultValue={defaultValue}
        placeholder="授業名・教員名・キーワードで検索"
        className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-600 focus:border-slate-300"
      />
    </div>
  );
}

export function SelectField({
  name,
  options,
  label,
  defaultValue,
}: {
  name: string;
  options: string[];
  label: string;
  defaultValue?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-800">
        {label}
      </label>
      <select
        name={name}
        defaultValue={defaultValue}
        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-300"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export function StatCard({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
      <div className="flex items-center gap-3">
        <div className="text-slate-700">{icon}</div>
        <div className="text-sm font-medium text-slate-800">{label}</div>
      </div>
      <div className="mt-4 text-3xl font-semibold tracking-tight text-slate-900">
        {value}
      </div>
    </div>
  );
}

export function FeatureMiniCard({
  icon,
  title,
  text,
}: {
  icon: ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-6">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-slate-700 shadow-sm">
        {icon}
      </div>
      <h4 className="mt-6 text-xl font-semibold tracking-tight text-slate-900">
        {title}
      </h4>
      <p className="mt-4 text-base leading-8 text-slate-700 sm:text-sm sm:leading-7">
        {text}
      </p>
    </div>
  );
}

export function CourseCard({ course }: { course: Course }) {
  return (
    <article className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {course.tags?.slice(0, 5).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-2 text-sm font-medium text-amber-700">
          <Star className="h-4 w-4 fill-current" />
          {Number(course.rating).toFixed(1)}
        </div>
      </div>

      <h3 className="mt-5 text-2xl font-semibold tracking-tight text-slate-900">
        {course.name}
      </h3>

      <p className="mt-3 text-base leading-8 text-slate-700 sm:text-sm sm:leading-7">
        {course.teacher} / {course.faculty}
      </p>

      <p className="mt-6 text-base leading-8 text-slate-700 sm:text-sm sm:leading-8">
        {course.summary}
      </p>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-slate-50 p-4">
          <div className="flex items-center gap-2 text-slate-700">
            <CalendarDays className="h-4 w-4" />
            <span className="text-base sm:text-sm">
              {course.semester} / {course.period}
            </span>
          </div>
        </div>

        <div className="rounded-2xl bg-slate-50 p-4">
          <div className="flex items-center gap-2 text-slate-700">
            <BookOpen className="h-4 w-4" />
            <span className="text-base sm:text-sm">{course.credits}単位</span>
          </div>
        </div>

        <div className="rounded-2xl bg-slate-50 p-4">
          <div className="text-base text-slate-700 sm:text-sm">
            おすすめ{' '}
            <span className="font-semibold text-slate-900">
              {Number(course.recommend).toFixed(1)}
            </span>
          </div>
        </div>

        <div className="rounded-2xl bg-slate-50 p-4">
          <div className="text-base text-slate-700 sm:text-sm">
            課題量{' '}
            <span className="font-semibold text-slate-900">
              {Number(course.assignments).toFixed(1)}
            </span>
          </div>
        </div>
      </div>

      <Link
        href={`/course/${course.id}`}
        className="mt-6 inline-flex items-center gap-2 text-lg font-semibold text-slate-900 transition hover:text-slate-700 sm:text-base"
      >
        詳細を見る
        <ChevronRight className="h-5 w-5" />
      </Link>
    </article>
  );
}

export function RankingListItem({
  index,
  course,
  rankingLabel,
  score,
}: {
  index: number;
  course: Course;
  rankingLabel: string;
  score: number;
}) {
  return (
    <Link
      href={`/course/${course.id}`}
      className="flex items-center gap-4 rounded-[24px] border border-slate-200 bg-white p-4 transition hover:bg-slate-50"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-sm font-semibold text-white">
        {index}
      </div>

      <div className="min-w-0 flex-1">
        <div className="truncate text-lg font-semibold text-slate-900 sm:text-base">
          {course.name}
        </div>
        <div className="mt-1 truncate text-base text-slate-700 sm:text-sm">
          {course.teacher} / {course.faculty}
        </div>
      </div>

      <div className="text-right">
        <div className="text-sm text-slate-700 sm:text-xs">
          {rankingLabel}
        </div>
        <div className="mt-1 text-lg font-semibold text-slate-900 sm:text-base">
          {Number(score).toFixed(1)}
        </div>
      </div>
    </Link>
  );
}

export function MetricCard({
  label,
  value,
}: {
  label: string;
  value: number | null;
}) {
  return (
    <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
      <div className="text-sm font-medium text-slate-800">
        {label}
      </div>
      <div className="mt-3 text-4xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
        {value === null ? '-' : Number(value).toFixed(1)}
      </div>
    </div>
  );
}

export function ScoreBar({
  label,
  value,
}: {
  label: string;
  value: number | null;
}) {
  const safeValue = value === null ? 0 : Number(value);
  const width = `${Math.max(0, Math.min(100, (safeValue / 5) * 100))}%`;

  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-4">
        <span className="text-base font-medium text-slate-800 sm:text-sm">
          {label}
        </span>
        <span className="text-base text-slate-700 sm:text-sm">
          {value === null ? '-' : `${safeValue.toFixed(1)} / 5.0`}
        </span>
      </div>
      <div className="h-3 rounded-full bg-slate-100 sm:h-2.5">
        <div
          className="h-3 rounded-full bg-slate-900 sm:h-2.5"
          style={{ width }}
        />
      </div>
    </div>
  );
}

export function SectionHeader({
  icon,
  title,
}: {
  icon: ReactNode;
  title: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
        {icon}
      </div>
      <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-xl">
        {title}
      </h2>
    </div>
  );
}

export function ReviewCard({
  review,
}: {
  review: {
    id: number;
    author: string;
    date: string;
    text: string;
  };
}) {
  return (
    <article className="rounded-[24px] border border-slate-200 bg-white p-5">
      <div className="flex items-center justify-between gap-4">
        <div className="text-base font-semibold text-slate-900 sm:text-sm">
          {review.author}
        </div>
        <div className="text-sm text-slate-700 sm:text-xs">
          {review.date}
        </div>
      </div>
      <p className="mt-4 text-base leading-8 text-slate-700 sm:text-sm sm:leading-7">
        {review.text}
      </p>
    </article>
  );
}