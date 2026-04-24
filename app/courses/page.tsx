import Link from "next/link";
import {
  BookOpen,
  CalendarDays,
  ClipboardList,
  GraduationCap,
  Search,
  Sparkles,
  Users,
} from "lucide-react";
import { getCourses } from "@/lib/course-service";

export const dynamic = "force-dynamic";

function getText(value: unknown, fallback = "情報なし") {
  if (typeof value !== "string") return fallback;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : fallback;
}

export default async function CoursesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  const query = params.q?.toLowerCase() ?? "";

  const courses = await getCourses();

  const filteredCourses = courses.filter((course: any) => {
    return (
      course.name.toLowerCase().includes(query) ||
      course.teacher.toLowerCase().includes(query) ||
      (course.content_detail ?? "").toLowerCase().includes(query) ||
      (course.evaluation_detail ?? "").toLowerCase().includes(query)
    );
  });

  return (
    <div className="space-y-8">
      {/* ヘッダー */}
      <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex items-center gap-2 text-sm font-medium text-sky-700">
          <Sparkles className="h-4 w-4" />
          授業を探す
        </div>

        <h1 className="mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl">
          授業一覧
        </h1>

        {/* 検索 */}
        <form className="mt-6 flex items-center gap-3">
          <div className="flex w-full items-center gap-2 rounded-2xl border px-4 py-3">
            <Search className="h-4 w-4 text-slate-400" />
            <input
              name="q"
              defaultValue={params.q}
              placeholder="授業名・先生・内容で検索"
              className="w-full text-sm outline-none"
            />
          </div>

          <button className="rounded-2xl bg-slate-900 px-5 py-3 text-sm text-white">
            検索
          </button>
        </form>
      </section>

      {/* 授業カード一覧 */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredCourses.map((course: any) => {
          const content = getText(course.content_detail, course.summary);
          const evaluation = getText(course.evaluation_detail);
          const style = getText(course.class_style);

          return (
            <Link
              key={course.id}
              href={`/course/${course.id}`}
              className="group rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              {/* タグ */}
              <div className="flex flex-wrap gap-2 text-xs">
                {course.tags?.slice(0, 3).map((tag: string) => (
                  <span
                    key={tag}
                    className="rounded-full bg-slate-100 px-2 py-1 text-slate-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* タイトル */}
              <h2 className="mt-3 text-lg font-semibold text-slate-900 group-hover:text-sky-600">
                {course.name}
              </h2>

              {/* 基本情報 */}
              <div className="mt-2 space-y-1 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Users className="h-3 w-3" />
                  {course.teacher}
                </div>
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-3 w-3" />
                  {course.semester} / {course.period}
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-3 w-3" />
                  {course.credits}単位
                </div>
              </div>

              {/* 授業内容 */}
              <div className="mt-4">
                <div className="text-xs font-medium text-slate-500">
                  授業内容
                </div>
                <p className="mt-1 line-clamp-2 text-sm text-slate-700">
                  {content}
                </p>
              </div>

              {/* 評価 */}
              <div className="mt-4">
                <div className="flex items-center gap-1 text-xs font-medium text-slate-500">
                  <ClipboardList className="h-3 w-3" />
                  評価方法
                </div>
                <p className="mt-1 line-clamp-2 text-sm text-slate-700">
                  {evaluation}
                </p>
              </div>

              {/* スタイル */}
              <div className="mt-4">
                <div className="flex items-center gap-1 text-xs font-medium text-slate-500">
                  <GraduationCap className="h-3 w-3" />
                  授業スタイル
                </div>
                <p className="mt-1 text-sm text-slate-700">{style}</p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* 空状態 */}
      {filteredCourses.length === 0 && (
        <div className="text-center text-sm text-slate-500">
          該当する授業が見つかりませんでした
        </div>
      )}
    </div>
  );
}