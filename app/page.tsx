export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { ArrowRight, BookOpen, MessageSquare, Star, Users } from 'lucide-react';
import {
  getCourses,
  getPublishedReviewCount,
  getPublishedReviewCountsByCourseIds,
} from '@/lib/course-service';

export default async function HomePage() {
  const courses = await getCourses();
  const publishedReviewCount = await getPublishedReviewCount();

  const reviewCountsByCourseId = await getPublishedReviewCountsByCourseIds(
    courses.map((course) => course.id)
  );

  const featuredCourses = courses.slice(0, 6);

  return (
    <div className="space-y-10">
      <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700">
            Campus Rank
          </div>

          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            履修前に、知りたいことをすぐ確認
          </h1>

          <p className="mt-4 text-sm leading-8 text-slate-700 sm:text-base">
            授業情報や口コミを見やすく整理し、履修登録前に比較しやすくすることを目的とした授業情報サイトです。
            授業選びで迷ったときに、必要な情報をすぐ確認できる形を目指しています。
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/courses"
              className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              授業一覧を見る
            </Link>

            <Link
              href="/guide"
              className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-800 transition hover:bg-slate-50"
            >
              このサイトの使い方
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
            <BookOpen className="h-4 w-4" />
            掲載授業数
          </div>
          <div className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
            {courses.length}
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
            <MessageSquare className="h-4 w-4" />
            公開口コミ数
          </div>
          <div className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
            {publishedReviewCount}
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
            <Users className="h-4 w-4" />
            対応状況
          </div>
          <div className="mt-3 text-base font-medium text-slate-900">
            学部別に順次拡張中
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
              注目の授業
            </h2>
            <p className="mt-2 text-sm text-slate-700">
              授業詳細ページから口コミや評価の傾向を確認できます。
            </p>
          </div>

          <Link
            href="/courses"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-700 transition hover:text-slate-900"
          >
            すべて見る
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {featuredCourses.map((course) => {
            const hasPublishedReviews = (reviewCountsByCourseId[course.id] ?? 0) > 0;

            return (
              <Link
                key={course.id}
                href={`/course/${course.id}`}
                className="group rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
              >
                <div className="flex flex-wrap gap-2">
                  {course.tags?.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="mt-4 line-clamp-2 text-lg font-semibold text-slate-900">
                  {course.name}
                </h3>

                <div className="mt-2 text-sm text-slate-700">
                  {course.teacher} / {course.faculty}
                </div>

                <div className="mt-1 text-sm text-slate-600">
                  {course.semester} ・ {course.period}
                </div>

                <div className="mt-5 grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-slate-500">おすすめ度</div>
                    <div className="mt-1 text-lg font-semibold text-slate-900">
                      {hasPublishedReviews ? Number(course.recommend).toFixed(1) : 'ー'}
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-slate-500">口コミ数</div>
                    <div className="mt-1 text-lg font-semibold text-slate-900">
                      {reviewCountsByCourseId[course.id] ?? 0}
                    </div>
                  </div>
                </div>

                <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-slate-700 transition group-hover:text-slate-900">
                  <Star className="h-4 w-4" />
                  詳細を見る
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}