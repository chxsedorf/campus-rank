export const dynamic = "force-dynamic";
import Link from 'next/link';
import {
  BookOpen,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  Info,
  FileText,
  BarChart3,
  Flag,
  ChevronRight,
} from 'lucide-react';
import {
  CourseCard,
  FeatureMiniCard,
  RankingListItem,
  SearchInput,
  SelectField,
  StatCard,
} from '@/components/ui';
import { getCourses, getPublishedReviewCount } from '@/lib/course-service';
import type { Course } from '@/lib/data';

function toCourse(row: any): Course {
  return {
    id: row.id,
    name: row.name,
    teacher: row.teacher,
    faculty: row.faculty,
    year: row.year_label,
    semester: row.semester,
    period: row.period,
    credits: row.credits,
    summary: row.summary,
    officialNote: row.official_note,
    syllabusUrl: row.syllabus_url,
    rating: Number(row.rating),
    recommend: Number(row.recommend),
    clarity: Number(row.clarity),
    easiness: Number(row.easiness),
    assignments: Number(row.assignments),
    difficulty: Number(row.difficulty),
    attendance: Number(row.attendance),
    tags: row.tags ?? [],
    reviews: [],
  };
}

export default async function HomePage() {
  const rows = await getCourses();
  const reviewCount = await getPublishedReviewCount();

  const courses = rows.map(toCourse);

  const faculties = [
    'すべて',
    ...Array.from(new Set(courses.map((c) => c.faculty))),
  ];

  const semesters = [
    'すべて',
    ...Array.from(new Set(courses.map((c) => c.semester))),
  ];

  const rankedCourses = [...courses].sort((a, b) => b.recommend - a.recommend);

  return (
    <div className="space-y-8">
      <section className="rounded-[28px] border border-slate-200 bg-white p-7 shadow-sm sm:p-10">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
          <Sparkles className="h-3.5 w-3.5" />
          大学の授業選びを、もっと見やすく安全に
        </div>

        <h1 className="max-w-4xl text-3xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
          履修登録の前に、
          <span className="block text-slate-700">必要な情報をひと目で。</span>
        </h1>

        <p className="mt-4 max-w-3xl text-base leading-8 text-slate-700 sm:leading-7">
          Campus Rank は、公開されている授業情報を整理し、学生の感想を数値評価とともに見やすくまとめた履修支援サイトです。
          教員個人への攻撃ではなく、授業内容・課題量・難易度・わかりやすさなど、履修判断に役立つ情報を中心に掲載します。
        </p>

        <form
          action="/courses"
          className="mt-8 grid gap-4 md:grid-cols-[1.5fr_0.8fr_0.8fr_auto] md:items-end"
        >
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-800">
              キーワード
            </label>
            <SearchInput />
          </div>

          <SelectField name="faculty" options={faculties} label="学部" />
          <SelectField name="semester" options={semesters} label="学期" />

          <button className="h-[52px] rounded-2xl bg-slate-900 px-5 text-sm font-medium text-white transition hover:bg-slate-800">
            授業を探す
          </button>
        </form>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <StatCard
            icon={<BookOpen className="h-5 w-5" />}
            label="掲載授業"
            value={`${courses.length}件`}
          />
          <StatCard
            icon={<MessageSquare className="h-5 w-5" />}
            label="口コミ"
            value={`${reviewCount}件`}
          />
          <StatCard
            icon={<ShieldCheck className="h-5 w-5" />}
            label="安全設計"
            value="ガイド付き"
          />
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-sm font-medium text-slate-700">人気ランキング</div>
              <h3 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
                学生がよく見る授業
              </h3>
            </div>

            <Link
              href="/rankings"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-800 transition hover:bg-slate-50"
            >
              もっと見る
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          {rankedCourses.length === 0 ? (
            <div className="mt-6 rounded-2xl border border-slate-200 p-8 text-center text-sm text-slate-700">
              まだ授業データがありません。
            </div>
          ) : (
            <div className="mt-6 space-y-3">
              {rankedCourses.slice(0, 5).map((course, index) => (
                <RankingListItem
                  key={course.id}
                  index={index + 1}
                  course={course}
                  rankingLabel="おすすめ度"
                  score={course.recommend}
                />
              ))}
            </div>
          )}
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div>
            <div className="text-sm font-medium text-slate-700">おすすめの使い方</div>
            <h3 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
              このサイトでできること
            </h3>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <FeatureMiniCard
              icon={<Info className="h-5 w-5" />}
              title="公開情報を整理して表示"
              text="授業名、教員名、単位、開講時期などの公開情報をわかりやすく一覧化。"
            />
            <FeatureMiniCard
              icon={<FileText className="h-5 w-5" />}
              title="シラバスは要約で掲載"
              text="全文転載は避け、内容を要約して掲載。公式ページへのリンクも用意。"
            />
            <FeatureMiniCard
              icon={<BarChart3 className="h-5 w-5" />}
              title="数値評価で比較しやすい"
              text="わかりやすさ、課題量、出席の厳しさなどを定量的に比較可能。"
            />
            <FeatureMiniCard
              icon={<Flag className="h-5 w-5" />}
              title="通報・管理前提の安心設計"
              text="投稿ルールを明示し、問題のある表現は通報・削除できる構造。"
            />
          </div>
        </div>
      </section>

      <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="text-sm font-medium text-slate-700">注目授業</div>
            <h3 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
              いま見つかる授業
            </h3>
          </div>
        </div>

        {courses.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-slate-200 p-8 text-center text-sm text-slate-700">
            まだ授業データがありません。
          </div>
        ) : (
          <div className="mt-6 grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
            {courses.slice(0, 6).map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}