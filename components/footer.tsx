import Link from 'next/link';

export function Footer() {
  return (
    <footer className="mt-12 border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
        <div>
          <div className="font-semibold tracking-tight">Campus Rank</div>
          <p className="mt-4 max-w-md text-sm leading-7 text-slate-600">
            授業情報や口コミを見やすく整理し、履修登録前に比較しやすくすることを目的とした授業情報サイトです。
            授業選びで迷ったときに、必要な情報をすぐ確認できる形を目指しています。
          </p>
        </div>

        <div>
          <div className="text-sm font-semibold text-slate-900">ポリシー</div>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            <li><Link href="/guide" className="hover:text-slate-900">利用ルール</Link></li>
            <li><Link href="/guide" className="hover:text-slate-900">掲載情報の考え方</Link></li>
            <li><Link href="/guide" className="hover:text-slate-900">投稿時の注意事項</Link></li>
            <li><Link href="/guide" className="hover:text-slate-900">免責事項</Link></li>
          </ul>
        </div>

        <div>
          <div className="text-sm font-semibold text-slate-900">サポート</div>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            <li><Link href="/support/contact" className="hover:text-slate-900">お問い合わせについて</Link></li>
            <li><Link href="/support/report" className="hover:text-slate-900">問題のある投稿を報告する</Link></li>
            <li><Link href="/support/correction" className="hover:text-slate-900">掲載内容の修正相談</Link></li>
            <li><Link href="/guide" className="hover:text-slate-900">このサイトの使い方</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-200">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 text-xs text-slate-500 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <p>© Campus Rank</p>
          <p>授業内容や開講情報は変更される場合があります。正式情報は大学公式案内をご確認ください。</p>
        </div>
      </div>
    </footer>
  );
}