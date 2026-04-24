'use client';

import {
  BookOpen,
  FileText,
  LifeBuoy,
  Scale,
  ShieldAlert,
} from 'lucide-react';

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;

  el.scrollIntoView({
    behavior: 'smooth',
    block: 'center',
    inline: 'nearest',
  });
}

function JumpButton({
  label,
  targetId,
}: {
  label: string;
  targetId: string;
}) {
  return (
    <button
      type="button"
      onClick={() => scrollToSection(targetId)}
      className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-left text-sm font-medium text-slate-700 transition hover:bg-white"
    >
      {label}
    </button>
  );
}

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
      className="scroll-mt-32 rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
          {icon}
        </div>
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
          {title}
        </h2>
      </div>

      <div className="mt-6 space-y-4 text-sm leading-8 text-slate-700">
        {children}
      </div>
    </section>
  );
}

export default function GuidePage() {
  return (
    <div className="space-y-6">
      <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
          <BookOpen className="h-4 w-4" />
          利用ガイド
        </div>

        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          Campus Rank の使い方
        </h1>

        <p className="mt-5 text-sm leading-8 text-slate-700">
          Campus Rank は、授業情報や口コミを見やすく整理し、履修登録前に比較しやすくするためのサイトです。
          このページでは、利用ルール、掲載情報の考え方、投稿時の注意事項、免責事項、サポートの使い方をまとめています。
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          <JumpButton label="利用ルール" targetId="rules" />
          <JumpButton label="掲載情報の考え方" targetId="policy" />
          <JumpButton label="投稿時の注意事項" targetId="posting" />
          <JumpButton label="免責事項" targetId="disclaimer" />
          <JumpButton label="サポート" targetId="support" />
        </div>
      </section>

      <GuideSection
        id="rules"
        icon={<ShieldAlert className="h-5 w-5" />}
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
          <li>授業名、担当教員、開講時期、時限などは公開情報をもとに整理しています。</li>
          <li>年度や学期によって内容が変更される場合があります。</li>
          <li>最終的な履修判断は、大学公式のシラバス・履修案内を必ず確認してください。</li>
        </ul>
      </GuideSection>

      <GuideSection
        id="posting"
        icon={<BookOpen className="h-5 w-5" />}
        title="投稿時の注意事項"
      >
        <p>
          口コミは、次に履修する人の参考になる情報として扱います。主観そのものは問題ありませんが、書き方には配慮が必要です。
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>「自分はこう感じた」という体験ベースで書いてください。</li>
          <li>授業内容、課題量、試験、出席、わかりやすさなど、履修判断に役立つ内容を優先してください。</li>
          <li>断定的な中傷や、攻撃的な表現は避けてください。</li>
          <li>個人を特定できる情報は書かないでください。</li>
        </ul>
      </GuideSection>

      <GuideSection
        id="disclaimer"
        icon={<Scale className="h-5 w-5" />}
        title="免責事項"
      >
        <p>
          このサイトの情報は、履修判断を助けるための参考情報です。内容の完全性や最新性を常に保証するものではありません。
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>授業の実施方法や評価方法は変更されることがあります。</li>
          <li>口コミは投稿者の体験や感想を含むため、すべての人に当てはまるとは限りません。</li>
          <li>最終的な判断は、必ず大学公式情報を確認したうえで行ってください。</li>
        </ul>
      </GuideSection>

      <GuideSection
        id="support"
        icon={<LifeBuoy className="h-5 w-5" />}
        title="サポート"
      >
        <p>
          誤りの修正依頼や、掲載内容に関する相談、問題のある口コミの報告はサポートページから送れます。
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>掲載内容の修正を依頼したい場合は、修正依頼フォームを使ってください。</li>
          <li>不適切な投稿を見つけた場合は、報告フォームから知らせてください。</li>
          <li>一般的な問い合わせはお問い合わせフォームから送れます。</li>
        </ul>
      </GuideSection>
    </div>
  );
}