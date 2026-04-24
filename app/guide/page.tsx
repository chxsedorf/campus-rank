import Link from 'next/link';
import {
  ShieldCheck,
  FileText,
  PencilLine,
  Scale,
  LifeBuoy,
  ChevronRight,
  BookOpen,
  MessageSquare,
  Flag,
} from 'lucide-react';

function GuideSection({
  id,
  icon,
  title,
  children,
}: {
  id: string;
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
          {icon}
        </div>
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
          {title}
        </h2>
      </div>

      <div className="mt-5 space-y-4 text-base leading-8 text-slate-700 sm:text-sm sm:leading-7">
        {children}
      </div>
    </section>
  );
}

export default function GuidePage() {
  return (
    <div className="space-y-6">
      <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
          <BookOpen className="h-4 w-4" />
          利用ガイド
        </div>

        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          Campus Rank の使い方
        </h1>

        <p className="mt-4 max-w-3xl text-base leading-8 text-slate-700 sm:text-sm sm:leading-7">
          Campus Rank は、授業情報や口コミを見やすく整理し、履修登録前に比較しやすくするためのサイトです。
          このページでは、利用ルール、掲載情報の考え方、投稿時の注意事項、免責事項、サポートの使い方をまとめています。
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          <a
            href="#rules"
            className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm font-medium text-slate-800 transition hover:bg-slate-100"
          >
            利用ルール
          </a>
          <a
            href="#policy"
            className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm font-medium text-slate-800 transition hover:bg-slate-100"
          >
            掲載情報の考え方
          </a>
          <a
            href="#posting"
            className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm font-medium text-slate-800 transition hover:bg-slate-100"
          >
            投稿時の注意事項
          </a>
          <a
            href="#disclaimer"
            className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm font-medium text-slate-800 transition hover:bg-slate-100"
          >
            免責事項
          </a>
          <a
            href="#support"
            className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm font-medium text-slate-800 transition hover:bg-slate-100"
          >
            サポート
          </a>
        </div>
      </section>

      <GuideSection
        id="rules"
        icon={<ShieldCheck className="h-5 w-5" />}
        title="利用ルール"
      >
        <p>
          このサイトは、授業の内容や履修判断に役立つ情報を、学生が見やすく確認できるように整理することを目的としています。
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>授業に関係する内容を中心に利用してください。</li>
          <li>個人への攻撃、侮辱、中傷を目的とした利用は禁止です。</li>
          <li>個人情報や、特定の個人を傷つける内容は投稿しないでください。</li>
          <li>運営判断により、問題がある掲載や投稿は非表示・削除することがあります。</li>
        </ul>
      </GuideSection>

      <GuideSection
        id="policy"
        icon={<FileText className="h-5 w-5" />}
        title="掲載情報の考え方"
      >
        <p>
          掲載されている授業情報は、公開されている情報をもとに整理した要約です。見やすさを重視しているため、公式シラバスの全文転載ではありません。
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>授業名、担当教員、学期、単位数などの基本情報を整理して掲載します。</li>
          <li>シラバスや時間割は、内容をそのまま転載せず要点をまとめて表示します。</li>
          <li>正式な履修条件や最新情報は、必ず大学公式の案内を確認してください。</li>
        </ul>
      </GuideSection>

      <GuideSection
        id="posting"
        icon={<PencilLine className="h-5 w-5" />}
        title="投稿時の注意事項"
      >
        <p>
          口コミは、履修登録の判断材料として役立つ内容を歓迎しています。読む人が参考にしやすいように、授業内容に沿った投稿をお願いします。
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>授業の進め方、課題量、試験、予習復習のしやすさなどを書くのがおすすめです。</li>
          <li>「自分はこう感じた」という主観表現を使うと、断定的になりにくくなります。</li>
          <li>教員や学生個人に関する攻撃的な表現は禁止です。</li>
          <li>事実確認が難しい断定や、名誉を傷つける表現は避けてください。</li>
          <li>個人情報、学籍番号、連絡先などは絶対に書かないでください。</li>
        </ul>
      </GuideSection>

      <GuideSection
        id="disclaimer"
        icon={<Scale className="h-5 w-5" />}
        title="免責事項"
      >
        <p>
          このサイトに掲載されている情報は、履修判断を助けるための参考情報です。正確性や完全性を保証するものではありません。
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>授業内容、担当教員、開講時期などは変更される場合があります。</li>
          <li>口コミは投稿者個人の感想であり、運営が内容を保証するものではありません。</li>
          <li>最終的な履修判断は、大学公式情報を確認したうえで行ってください。</li>
        </ul>
      </GuideSection>

      <GuideSection
        id="support"
        icon={<LifeBuoy className="h-5 w-5" />}
        title="サポート"
      >
        <p>
          不具合、問題のある投稿、掲載内容の誤りなどがあれば、サポートページから送信できます。
        </p>

        <div className="grid gap-4 sm:grid-cols-3">
          <Link
            href="/support/contact"
            className="rounded-[24px] border border-slate-200 bg-slate-50 p-5 transition hover:bg-slate-100"
          >
            <div className="flex items-center gap-2 text-sm font-medium text-slate-800">
              <MessageSquare className="h-4 w-4" />
              お問い合わせ
            </div>
            <p className="mt-3 text-sm leading-7 text-slate-700">
              サイトの使い方や不具合、要望などを送れます。
            </p>
            <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-slate-900">
              ページを開く
              <ChevronRight className="h-4 w-4" />
            </div>
          </Link>

          <Link
            href="/support/report"
            className="rounded-[24px] border border-slate-200 bg-slate-50 p-5 transition hover:bg-slate-100"
          >
            <div className="flex items-center gap-2 text-sm font-medium text-slate-800">
              <Flag className="h-4 w-4" />
              問題投稿の報告
            </div>
            <p className="mt-3 text-sm leading-7 text-slate-700">
              不適切な口コミや問題のある投稿を報告できます。
            </p>
            <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-slate-900">
              ページを開く
              <ChevronRight className="h-4 w-4" />
            </div>
          </Link>

          <Link
            href="/support/correction"
            className="rounded-[24px] border border-slate-200 bg-slate-50 p-5 transition hover:bg-slate-100"
          >
            <div className="flex items-center gap-2 text-sm font-medium text-slate-800">
              <FileText className="h-4 w-4" />
              掲載内容の修正相談
            </div>
            <p className="mt-3 text-sm leading-7 text-slate-700">
              掲載情報の誤りや修正したい内容を送れます。
            </p>
            <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-slate-900">
              ページを開く
              <ChevronRight className="h-4 w-4" />
            </div>
          </Link>
        </div>
      </GuideSection>
    </div>
  );
}