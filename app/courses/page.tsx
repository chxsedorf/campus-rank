import { Search, Filter } from 'lucide-react';
import { CourseCard } from '@/components/ui';
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

export default async function CoursesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; faculty?: string; semester?: string }>;
}) {
  const params = await searchParams;

  const q = params?.q ?? '';
  const faculty = params?.faculty ?? 'すべて';
  const semester = params?.semester ?? 'すべて';

  const allCourses = await getCourses();
  const filteredRows = await getCourses({
    q,
    faculty,
    semester,
  });

  const faculties = ['すべて', ...Array.from(new Set(allCourses.map((c) => c.faculty)))];
  const semesters = ['すべて', ...Array.from(new Set(allCourses.map((c) => c.semester)))];

  const filtered = filteredRows.map(toCourse);

  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      <aside className="h-fit rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
          <Filter className="h-4 w-4" />
          絞り込み
        </div>

        <form action="/courses" className="mt-5 space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-600">
              キーワード
            </label>
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                name="q"
                defaultValue={q}
                placeholder="授業名・教員名・キーワード"
                className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-300"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-600">
              学部
            </label>
            <select
              name="faculty"
              defaultValue={faculty}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-slate-300"
            >
              {faculties.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-600">
              学期
            </label>
            <select
              name="semester"
              defaultValue={semester}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-slate-300"
            >
              {semesters.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            この条件で探す
          </button>
        </form>

        <div className="mt-6 rounded-2xl bg-slate-50 p-4 text-xs leading-6 text-slate-600">
          評価軸は「わかりやすさ」「課題量」「難易度」「出席の厳しさ」など、
          授業内容に関係するものに限定しています。
        </div>
      </aside>

      <section className="space-y-4">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="text-sm font-medium text-slate-500">授業一覧</div>
              <h1 className="mt-1 text-2xl font-semibold tracking-tight">
                条件に合う授業を探す
              </h1>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                授業名、教員名、学部、学期などから履修候補を探せます。
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
              {filtered.length}件ヒット
            </div>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-[28px] border border-slate-200 bg-white p-10 text-center shadow-sm">
            <div className="text-lg font-semibold text-slate-900">
              条件に合う授業が見つかりませんでした
            </div>
            <p className="mt-3 text-sm text-slate-600">
              キーワードや絞り込み条件を変えて、もう一度試してください。
            </p>
          </div>
        ) : (
          <div className="grid gap-4 xl:grid-cols-2">
            {filtered.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}