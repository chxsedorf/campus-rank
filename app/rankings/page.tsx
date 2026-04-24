import Link from 'next/link';
import { ChevronRight, Trophy } from 'lucide-react';
import { RankingListItem } from '@/components/ui';
import { getCourses } from '@/lib/course-service';
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

export default async function RankingsPage() {
  const rows = await getCourses();
  const courses = rows.map(toCourse);

  const recommendRanking = [...courses].sort((a, b) => b.recommend - a.recommend);
  const clarityRanking = [...courses].sort((a, b) => b.clarity - a.clarity);
  const easinessRanking = [...courses].sort((a, b) => b.easiness - a.easiness);

  return (
    <div className="space-y-6">
      <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-700">
            <Trophy className="h-6 w-6" />
          </div>
          <div>
            <div className="text-sm font-medium text-slate-700">ランキング</div>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight text-slate-900">
              いま比較されている授業
            </h1>
          </div>
        </div>

        <p className="mt-5 text-base leading-8 text-slate-700 sm:text-sm sm:leading-7">
          おすすめ度、わかりやすさ、単位の取りやすさなどの観点から、公開中の授業を見やすく並べています。
        </p>
      </section>

      <div className="grid gap-6 xl:grid-cols-3">
        <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-sm font-medium text-slate-700">人気順</div>
              <h2 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
                おすすめ度ランキング
              </h2>
            </div>
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-800 transition hover:text-slate-950"
            >
              授業一覧へ
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-6 space-y-3">
            {recommendRanking.length > 0 ? (
              recommendRanking.slice(0, 10).map((course, index) => (
                <RankingListItem
                  key={`recommend-${course.id}`}
                  index={index + 1}
                  course={course}
                  rankingLabel="おすすめ度"
                  score={course.recommend}
                />
              ))
            ) : (
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-700">
                まだランキング対象の授業がありません。
              </div>
            )}
          </div>
        </section>

        <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div>
            <div className="text-sm font-medium text-slate-700">理解しやすさ順</div>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
              わかりやすさランキング
            </h2>
          </div>

          <div className="mt-6 space-y-3">
            {clarityRanking.length > 0 ? (
              clarityRanking.slice(0, 10).map((course, index) => (
                <RankingListItem
                  key={`clarity-${course.id}`}
                  index={index + 1}
                  course={course}
                  rankingLabel="わかりやすさ"
                  score={course.clarity}
                />
              ))
            ) : (
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-700">
                まだランキング対象の授業がありません。
              </div>
            )}
          </div>
        </section>

        <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div>
            <div className="text-sm font-medium text-slate-700">取りやすさ順</div>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
              単位の取りやすさランキング
            </h2>
          </div>

          <div className="mt-6 space-y-3">
            {easinessRanking.length > 0 ? (
              easinessRanking.slice(0, 10).map((course, index) => (
                <RankingListItem
                  key={`easiness-${course.id}`}
                  index={index + 1}
                  course={course}
                  rankingLabel="取りやすさ"
                  score={course.easiness}
                />
              ))
            ) : (
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-700">
                まだランキング対象の授業がありません。
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}