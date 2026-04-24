export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { BookOpen, CalendarDays, Search, Sparkles, Users } from 'lucide-react';
import { getCourses } from '@/lib/course-service';

export default async function CoursesPage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    faculty?: string;
    semester?: string;
  }>;
}) {
  const { q = '', faculty = '', semester = '' } = await searchParams;

  const allCourses = await getCourses();
  const courses = await getCourses({ q, faculty, semester });

  const faculties = Array.from(new Set(allCourses.map((course) => course.faculty))).sort((a, b) =>
    a.localeCompare(b, 'ja')
  );

  const semesters = Array.from(new Set(allCourses.map((course) => course.semester))).sort((a, b) =>
    a.localeCompare(b, 'ja')
  );

  return (
    <div className="space-y-8">
      <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex items-center gap-2 text-sm font-medium text-sky-700">
          <Sparkles className="h-4 w-4" />
          授業を探す
        </div>

        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          授業一覧
        </h1>

        <p className="mt-3 text-sm leading-7 text-slate-700">
          キーワード検索に加えて、学部と学期でも絞り込めます。
        </p>

        <form action="/courses" method="get" className="mt-6 grid gap-4 lg:grid-cols-[1.8fr_1fr_1fr_auto]">
          <div>
            <label htmlFor="courses-q" className="sr-only">
              授業名・先生・内容で検索
            </label>
            <div className="flex items-center rounded-2xl border border-slate-300 bg-white px-4 py-3">
              <Search className="h-4 w-4 text-slate-500" />
              <input
                id="courses-q"
                name="q"
                type="text"
                defaultValue={q}
                placeholder="授業名・先生・内容で検索"
                className="ml-3 w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-500"
              />
            </div>
          </div>

          <div>
            <label htmlFor="courses-faculty" className="mb-2 block text-sm font-medium text-slate-700">
              学部
            </label>
            <select
              id="courses-faculty"
              name="faculty"
              defaultValue={faculty}
              className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900"
            >
              <option value="">すべて</option>
              {faculties.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="courses-semester" className="mb-2 block text-sm font-medium text-slate-700">
              学期
            </label>
            <select
              id="courses-semester"
              name="semester"
              defaultValue={semester}
              className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900"
            >
              <option value="">すべて</option>
              {semesters.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end gap-3">
            <button
              type="submit"
              className="inline-flex h-[52px] items-center justify-center rounded-2xl bg-slate-900 px-6 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              検索
            </button>

            <Link
              href="/courses"
              className="inline-flex h-[52px] items-center justify-center rounded-2xl border border-slate-300 bg-white px-5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              解除
            </Link>
          </div>
        </form>

        <div className="mt-5 text-sm text-slate-600">
          検索結果: <span className="font-semibold text-slate-900">{courses.length}</span> 件
        </div>
      </section>

      {courses.length > 0 ? (
        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {courses.map((course) => (
            <Link
              key={course.id}
              href={`/course/${course.id}`}
              className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
            >
              <h2 className="text-xl font-semibold tracking-tight text-slate-900">{course.name}</h2>

              <div className="mt-4 space-y-2 text-sm text-slate-700">
                <div className="inline-flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  {course.teacher}
                </div>

                <div className="inline-flex items-center gap-2">
                  <CalendarDays className="h-4 w-4" />
                  {course.semester} / {course.period}
                </div>

                <div className="inline-flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  {course.credits}単位
                </div>
              </div>

              <div className="mt-5">
                <div className="text-sm font-medium text-slate-800">授業内容</div>
                <p className="mt-2 line-clamp-3 text-sm leading-7 text-slate-700">{course.summary}</p>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-slate-500">評価方法</div>
                  <div className="mt-1 text-slate-800">情報なし</div>
                </div>

                <div>
                  <div className="text-slate-500">授業スタイル</div>
                  <div className="mt-1 text-slate-800">情報なし</div>
                </div>
              </div>
            </Link>
          ))}
        </section>
      ) : (
        <section className="rounded-[32px] border border-slate-200 bg-white p-8 text-center shadow-sm">
          <div className="text-lg font-semibold text-slate-900">該当する授業が見つかりませんでした</div>
          <p className="mt-3 text-sm leading-7 text-slate-700">
            キーワードを短くしたり、学部・学期の条件を解除してもう一度試してください。
          </p>
          <div className="mt-5">
            <Link
              href="/courses"
              className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              条件をすべて解除
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}