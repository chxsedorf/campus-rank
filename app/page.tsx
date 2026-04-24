export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { ArrowRight, BookOpen, Search, ShieldCheck } from 'lucide-react';
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
      <section className="grid gap-6 xl:grid-cols-[1fr_420px]">
        <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
          <div className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700">
            大学の授業選びを、もっと見やすく安全に
          </div>

          <h1 className="mt-6 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            履修登録の前に、
            <br />
            必要な情報をひと目で。
          </h1>

          <p className="mt-5 max-w-3xl text-sm leading-8 text-slate-700 sm:text-base">
            Campus Rank は、公開されている授業情報を整理し、学生の感想を数値評価とともに見やすくまとめた履修支援サイトです。
            教員個人への攻撃ではなく、授業内容・課題量・難易度・わかりやすさなど、履修判断に役立つ情報を中心に掲載します。
          </p>

          <form
            action="/courses"
            method="get"
            className="mt-8 grid gap-4 lg:grid-cols-[1.8fr_1fr_1fr_auto]"
          >
            <div>
              <label htmlFor="home-q" className="sr-only">
                授業名・教員名・キーワード
              </label>
              <div className="flex items-center rounded-2xl border border-slate-200 bg-white px-4 py-3">
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
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900"
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
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900"
              >
                <option value="">すべて</option>
                {semesters.map((semester) => (
                  <option key={semester} value={semester}>
                    {semester}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                className="inline-flex h-[52px] w-full items-center justify-center rounded-2xl bg-slate-900 px-6 text-sm font-medium text-white transition hover:bg-slate-800"
              >
                授業を探す
              </button>
            </div>
          </form>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
              <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                <BookOpen className="h-4 w-4" />
                掲載授業
              </div>
              <div className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
                {courses.length}件
              </div>
            </div>

            <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
              <div className="text-sm font-medium text-slate-700">口コミ</div>
              <div className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
                順次追加中
              </div>
            </div>

            <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
              <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                <ShieldCheck className="h-4 w-4" />
                安全設計
              </div>
              <div className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
                ガイド付き
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="text-sm text-slate-500">おすすめの使い方</div>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900">
            このサイトでできること
          </h2>

          <div className="mt-6 space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-sm font-medium text-slate-800">授業を探す</div>
              <div className="mt-2 text-sm leading-7 text-slate-700">
                授業名・教員名・キーワードから授業を探せます。
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-sm font-medium text-slate-800">傾向を確認する</div>
              <div className="mt-2 text-sm leading-7 text-slate-700">
                わかりやすさ、課題量、テスト難易度、出席の厳しさなどを確認できます。
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-sm font-medium text-slate-800">口コミを投稿する</div>
              <div className="mt-2 text-sm leading-7 text-slate-700">
                履修した学生の視点から、次に取る人へ役立つ情報を残せます。
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_420px]">
        <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <div className="text-sm text-slate-500">人気ランキング</div>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
                学生がよく見る授業
              </h2>
            </div>

            <Link
              href="/courses"
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              もっと見る
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
        </div>

        <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="text-sm text-slate-500">このサイトについて</div>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
            授業選びを、少しだけ楽にする
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-8 text-slate-700">
            <p>
              公開されている時間割情報や授業情報をもとに、履修登録前に見返しやすい形で整理しています。
            </p>
            <p>
              口コミはあくまで参考情報です。最終的な判断は必ず大学公式のシラバスや履修案内を確認してください。
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}