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
  const ranked = rows.map(toCourse).sort((a, b) => b.recommend - a.recommend);

  return (
    <div className="space-y-6">
      <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="text-sm font-medium text-slate-500">ランキング</div>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight">
          比較しやすい授業ランキング
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
          授業の特徴を数値評価として整理したランキングです。教員個人の人格評価ではなく、
          履修判断に使いやすい評価軸をもとに比較できる設計にしています。
        </p>
      </section>

      <section className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <div className="space-y-3">
          {ranked.map((course, index) => (
            <RankingListItem
              key={course.id}
              index={index + 1}
              course={course}
              rankingLabel="おすすめ度"
              score={course.recommend}
            />
          ))}
        </div>
      </section>
    </div>
  );
}