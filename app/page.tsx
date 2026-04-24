export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { ArrowRight, BookOpen, MessageSquare, Search } from 'lucide-react';
import { getCourses } from '@/lib/course-service';

export default async function HomePage() {
  const courses = await getCourses();

  const faculties = Array.from(new Set(courses.map((course) => course.faculty))).sort((a, b) =>
    a.localeCompare(b, 'ja')
  );

  const semesters = Array.from(new Set(courses.map((course) => course.semester))).sort((a, b) =>
    a.localeCompare(b, 'ja')
  );

  const featuredCourses = courses.slice(0, 6);

  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-[36px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(15,23,42,0.06),transparent_35%)]" />

        <div className="relative">
          <div className="inline-flex items-center rounded-full border border-slate-200 bg-white/90 px-4 py-1.5 text-[11px] font-semibold tracking-[0.22em] text-slate-500 shadow-sm">
            CAMPUS RANK
          </div>

          <h1 className="mt-6 max-w-4xl text-4xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-5xl lg:text-6xl">
            <span className="bg-gradient-to-r from-slate-950 via-slate-800 to-slate-600 bg-clip-text text-transparent">
              授業選びを、もっとクリアに。
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-base font-medium leading-8 tracking-[-0.01em] text-slate-600 sm:text-lg">
            必要な授業情報を、ひと目で。
          </p>
        </div>

        <form
          action="/courses"
          method="get"
          className="relative mt-8 grid gap-4 lg:grid-cols-[1.8fr_1fr_1fr_auto] lg:items-end"
        >
          <div>
            <label htmlFor="home-q" className="mb-2 block text-sm font-medium text-slate-700">
              キーワード
            </label>
            <div className="flex h-[52px] items-center rounded-2xl border border-slate-300 bg-white px-4">
              <Search className="h-4 w-4 text-slate-500" />
              <input
                id="home-q"
                name="q"
                type="text"
                placeholder="授業名・教員名・キーワードで検索"
                className="ml-3 w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-500"
              />
            </div>
          </div>

          <div>
            <label htmlFor="home-faculty" className="mb-2 block text-sm font-medium text-slate-700">
              学部
            </label>
            <select
              id="home-faculty"
              name="faculty"
              defaultValue=""
              className="h-[52px] w-full rounded-2xl border border-slate-300 bg-white px-4 text-sm text-slate-900"
            >
              <option value="">すべて</option>
              {faculties.map((faculty) => (
                <option key={faculty} value={faculty}>
                  {faculty}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="home-semester" className="mb-2 block text-sm font-medium text-slate-700">
              学期
            </label>
            <select
              id="home-semester"
              name="semester"
              defaultValue=""
              className="h-[52px] w-full rounded-2xl border border-slate-300 bg-white px-4 text-sm text-slate-900"
            >
              <option value="">すべて</option>
              {semesters.map((semester) => (
                <option key={semester} value={semester}>
                  {semester}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className="inline-flex h-[52px] items-center justify-center rounded-2xl bg-slate-900 px-6 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              授業を探す
            </button>
          </div>
        </form>

        <div className="relative mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
              <BookOpen className="h-4 w-4" />
              掲載授業数
            </div>
            <div className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
              {courses.length}
            </div>
          </div>

          <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
              <MessageSquare className="h-4 w-4" />
              公開口コミ数
            </div>
            <div className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">0</div>
          </div>
        </div>
      </section>

      <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="text-sm text-slate-500">注目の授業</div>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
              よく見られている授業
            </h2>
          </div>

          <Link
            href="/courses"
            className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            すべて見る
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-6 grid gap-4">
          {featuredCourses.map((course) => (
            <Link
              key={course.id}
              href={`/course/${course.id}`}
              className="rounded-[24px] border border-slate-200 bg-slate-50 p-5 transition hover:border-slate-300 hover:bg-white"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="text-lg font-semibold text-slate-900">{course.name}</div>
                  <div className="mt-1 text-sm text-slate-700">
                    {course.teacher} / {course.faculty}
                  </div>
                  <div className="mt-1 text-sm text-slate-600">
                    {course.semester} ・ {course.period}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs text-slate-500">おすすめ度</div>
                  <div className="mt-1 text-lg font-semibold text-slate-900">
                    {Number(course.recommend) > 0 ? Number(course.recommend).toFixed(1) : 'ー'}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}