import Link from "next/link";
import { notFound } from "next/navigation";
import {
  BarChart3,
  BookOpen,
  CalendarDays,
  FileText,
  Info,
  MessageSquare,
  PencilLine,
  Scale,
  Users,
} from "lucide-react";
import { MetricCard, ReviewCard, ScoreBar, SectionHeader } from "@/components/ui";
import { ReviewForm } from "@/components/review-form";
import { getCourseById, getPublishedReviewsByCourseId } from "@/lib/course-service";

export const dynamic = "force-dynamic";

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const courseId = Number(id);

  if (Number.isNaN(courseId)) {
    notFound();
  }

  let course;
  let reviews;

  try {
    course = await getCourseById(courseId);
    reviews = await getPublishedReviewsByCourseId(courseId);
  } catch {
    notFound();
  }

  const hasReviews = reviews.length > 0;

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_340px]">
      <div className="space-y-6">
        <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-wrap items-center gap-2">
            {course.tags.map((tag: string) => (
              <span
                key={tag}
                className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            {course.name}
          </h1>

          <div className="mt-3 flex flex-wrap gap-4 text-sm text-slate-700">
            <span className="inline-flex items-center gap-2">
              <Users className="h-4 w-4" />
              {course.teacher}
            </span>
            <span className="inline-flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              {course.semester} / {course.period}
            </span>
            <span className="inline-flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              {course.credits}単位
            </span>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <MetricCard label="総合評価" value={hasReviews ? Number(course.rating) : null} />
            <MetricCard label="おすすめ度" value={hasReviews ? Number(course.recommend) : null} />
            <MetricCard label="わかりやすさ" value={hasReviews ? Number(course.clarity) : null} />
          </div>
        </section>

        <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <SectionHeader icon={<Info className="h-5 w-5" />} title="掲載情報について" />
          <p className="mt-5 text-sm leading-8 text-slate-700">
            このページの授業名・担当教員・開講時期・時限などは、公開されている時間割資料や公式情報をもとに整理しています。
            年度や学期によって内容が変更される可能性があるため、履修登録前には必ず大学公式の最新シラバス・履修案内を確認してください。
          </p>
        </section>

        <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <SectionHeader icon={<FileText className="h-5 w-5" />} title="授業の概要" />
          <p className="mt-5 text-sm leading-8 text-slate-700">
            {course.summary}
          </p>
        </section>

        <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <SectionHeader icon={<BarChart3 className="h-5 w-5" />} title="数値評価サマリー" />
          <div className="mt-6 space-y-5">
            <ScoreBar label="わかりやすさ" value={hasReviews ? Number(course.clarity) : null} />
            <ScoreBar label="単位の取りやすさ" value={hasReviews ? Number(course.easiness) : null} />
            <ScoreBar label="課題量" value={hasReviews ? Number(course.assignments) : null} />
            <ScoreBar label="テスト難易度" value={hasReviews ? Number(course.difficulty) : null} />
            <ScoreBar label="出席の厳しさ" value={hasReviews ? Number(course.attendance) : null} />
            <ScoreBar label="おすすめ度" value={hasReviews ? Number(course.recommend) : null} />
          </div>

          {!hasReviews ? (
            <p className="mt-6 text-sm text-slate-700">
              評価がまだありません。
            </p>
          ) : null}
        </section>

        <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <SectionHeader icon={<MessageSquare className="h-5 w-5" />} title="感想・口コミ" />
          <div className="mt-5 rounded-2xl border border-sky-200 bg-sky-50 p-4 text-sm leading-7 text-sky-900">
            感想は履修判断の参考を目的としたものです。教員や個人への攻撃、断定的な中傷表現、個人情報を含む投稿は禁止です。
          </div>

          <div className="mt-6 space-y-4">
            {reviews.length > 0 ? (
              reviews.map((review: any) => (
                <ReviewCard
                  key={review.id}
                  review={{
                    id: review.id,
                    author: review.author,
                    date: new Date(review.created_at).toLocaleDateString("ja-JP"),
                    text: review.body,
                  }}
                />
              ))
            ) : (
              <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm text-slate-700">まだ口コミはありません。</p>
              </div>
            )}
          </div>
        </section>

        <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <SectionHeader icon={<PencilLine className="h-5 w-5" />} title="口コミを投稿する" />
          <ReviewForm courseId={courseId} />
        </section>

        <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <SectionHeader icon={<Scale className="h-5 w-5" />} title="参考・免責情報" />
          <div className="mt-5 rounded-2xl bg-slate-50 p-5 text-sm leading-7 text-slate-700">
            このページの掲載内容は、公開情報や投稿された口コミをもとに整理した参考情報です。
            正式な授業内容、評価方法、履修条件、開講状況は、必ず大学公式のシラバス・履修要項・時間割資料をご確認ください。
          </div>
        </section>
      </div>

      <aside className="space-y-6">
        <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="text-sm font-medium text-slate-700">この授業の印象</div>
          <div className="mt-5 space-y-3 text-sm text-slate-700">
            <div>人気度: {hasReviews ? Number(course.recommend).toFixed(1) : "-"}</div>
            <div>やさしさ: {hasReviews ? Number(course.easiness).toFixed(1) : "-"}</div>
            <div>
              実用性:{" "}
              {hasReviews
                ? ((Number(course.clarity) + Number(course.recommend)) / 2).toFixed(1)
                : "-"}
            </div>
          </div>
        </section>

        <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="text-sm font-medium text-slate-700">公式シラバス</div>
          <Link
            href={course.syllabus_url || "#"}
            target="_blank"
            className="mt-4 inline-flex w-full items-center justify-center rounded-2xl bg-slate-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-700"
          >
            シラバスを確認する
          </Link>
        </section>
      </aside>
    </div>
  );
}