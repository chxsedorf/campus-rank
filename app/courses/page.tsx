import { CourseCard, SearchInput, SelectField } from '@/components/ui';
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
  searchParams?: Promise<{
    q?: string;
    faculty?: string;
    semester?: string;
  }>;
}) {
  const resolved = (await searchParams) ?? {};
  const q = resolved.q ?? '';
  const faculty = resolved.faculty ?? 'すべて';
  const semester = resolved.semester ?? 'すべて';

  const rows = await getCourses({
    q,
    faculty,
    semester,
  });

  const courses = rows.map(toCourse);

  const allRows = await getCourses();
  const allCourses = allRows.map(toCourse);

  const faculties = [
    'すべて',
    ...Array.from(new Set(allCourses.map((course) => course.faculty))),
  ];

  const semesters = [
    'すべて',
    ...Array.from(new Set(allCourses.map((course) => course.semester))),
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      <aside className="h-fit rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="text-sm font-medium text-slate-800">絞り込み</div>

        <form action="/courses" className="mt-5 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-800">
              キーワード
            </label>
            <SearchInput name="q" defaultValue={q} />
          </div>

          <SelectField
            name="faculty"
            label="学部"
            options={faculties}
            defaultValue={faculty}
          />

          <SelectField
            name="semester"
            label="学期"
            options={semesters}
            defaultValue={semester}
          />

          <button className="w-full rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800">
            この条件で探す
          </button>
        </form>

        <div className="mt-6 rounded-2xl bg-slate-50 p-4 text-sm leading-7 text-slate-700">
          評価軸は「わかりやすさ」「課題量」「難易度」「出席の厳しさ」など、授業内容に関係するものに限定しています。
        </div>
      </aside>

      <section className="space-y-6">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="text-sm font-medium text-slate-700">授業一覧</div>
              <h1 className="mt-1 text-3xl font-semibold tracking-tight text-slate-900">
                条件に合う授業を探す
              </h1>
              <p className="mt-3 text-base leading-8 text-slate-700 sm:text-sm sm:leading-7">
                授業名、教員名、学部、学期などから履修候補を探せます。
              </p>
            </div>

            <div className="inline-flex h-fit items-center rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-800">
              {courses.length}件ヒット
            </div>
          </div>
        </div>

        {courses.length === 0 ? (
          <div className="rounded-[28px] border border-slate-200 bg-white p-10 text-center shadow-sm">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
              条件に合う授業が見つかりませんでした
            </h2>
            <p className="mt-3 text-base leading-8 text-slate-700 sm:text-sm sm:leading-7">
              キーワードや絞り込み条件を変えて、もう一度試してください。
            </p>
          </div>
        ) : (
          <div className="grid gap-4 xl:grid-cols-2">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}