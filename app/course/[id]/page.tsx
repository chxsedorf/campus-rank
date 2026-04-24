import { notFound } from 'next/navigation';
import {
  BarChart3,
  FileText,
  Info,
  MessageSquare,
  PencilLine,
  Scale,
  Users,
  CalendarDays,
  BookOpen,
} from 'lucide-react';
import {
  MetricCard,
  ReviewCard,
  ScoreBar,
  SectionHeader,
} from '@/components/ui';
import { ReviewForm } from '@/components/review-form';
import {
  getCourseById,
  getPublishedReviewsByCourseId,
} from '@/lib/course-service';

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
                className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            {course.name}
          </h1>

          <div className="mt-3 flex flex-wrap gap-4 text-sm text-slate-600">
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
            <MetricCard
              label="総合評価"
              value={hasReviews ? Number(course.rating) : null}
            />
            <MetricCard
              label="おすすめ度"
              value={hasReviews ? Number(course.recommend) : null}
            />
            <MetricCard
              label="わかりやすさ"
              value={hasReviews ? Number(course.clarity) : null}
            />
          </div>

          {!hasReviews ? (
            <p className="mt-4 text-sm text-slate-500">評価がまだありません。</p>
          ) : null}
        </section>

        <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <SectionHeader icon={<Info className="h-5 w-5" />} title="公式情報" />
          <div className="mt-5 rounded-2xl bg-slate-50 p-4 text-sm leading-7 text-slate-600">
            {course.official_note}
          </div>
        </section>

        <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <SectionHeader icon={<FileText className="h-5 w-5" />} title="授業概要の要約" />
          <p className="mt-5 text-sm leading-8 text-slate-700">{course.summary}</p>
        </section>

        <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <SectionHeader icon={<BarChart3 className="h-5 w-5" />} title="数値評価サマリー" />

          <div className="mt-6 space-y-5">
            <ScoreBar
              label="わかりやすさ"
              value={hasReviews ? Number(course.clarity) : null}
            />
            <ScoreBar
              label="単位の取りやすさ"
              value={hasReviews ? Number(course.easiness) : null}
            />
            <ScoreBar
              label="課題量"
              value={hasReviews ? Number(course.assignments) : null}
            />
            <ScoreBar
              label="テスト難易度"
              value={hasReviews ? Number(course.difficulty) : null}
            />
            <ScoreBar
              label="出席の厳しさ"
              value={hasReviews ? Number(course.attendance) : null}
            />
            <ScoreBar
              label="おすすめ度"
              value={hasReviews ? Number(course.recommend) : null}
            />
          </div>

          {!hasReviews ? (
            <p className="mt-5 text-sm text-slate-500">評価がまだありません。</p>
          ) : (
            <div className="mt-5 text-xs leading-6 text-slate-500">
              ※ いずれも履修判断を助けるための参考値です。人格評価ではなく、授業内容に関係する評価軸のみを採用しています。
            </div>
          )}
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
                    date: new Date(review.created_at).toLocaleDateString('ja-JP'),
                    text: review.body,
                  }}
                />
              ))
            ) : (
              <div className="rounded-2xl border border-slate-200 p-5 text-sm text-slate-600">
                まだ口コミはありません。
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
          <div className="mt-5 rounded-2xl bg-slate-50 p-5 text-sm leading-7 text-slate-600">
            このページの一部は公開されている授業情報をもとに整理しています。正式な情報は必ず大学公式のシラバス・履修要項をご確認ください。
          </div>
        </section>
      </div>

      <aside className="space-y-6">
        <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="text-sm font-medium text-slate-500">この授業の印象</div>

          {hasReviews ? (
            <div className="mt-5 space-y-3 text-sm text-slate-700">
              <div>人気度: {Number(course.recommend).toFixed(1)}</div>
              <div>やさしさ: {Number(course.easiness).toFixed(1)}</div>
              <div>
                実用性: {((Number(course.clarity) + Number(course.recommend)) / 2).toFixed(1)}
              </div>
            </div>
          ) : (
            <div className="mt-5 text-sm text-slate-500">評価がまだありません。</div>
          )}
        </section>
      </aside>
    </div>
  );
}