import Link from 'next/link';
import { GraduationCap, Search } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-6 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-sm">
            <GraduationCap className="h-6 w-6" />
          </div>

          <div className="min-w-0">
            <div className="text-2xl font-semibold tracking-tight text-slate-900">
              Campus Rank
            </div>
            <div className="text-sm text-slate-600">履修判断を助ける授業情報サイト</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/"
            className="text-sm font-medium text-slate-700 transition hover:text-slate-900"
          >
            ホーム
          </Link>
          <Link
            href="/courses"
            className="text-sm font-medium text-slate-700 transition hover:text-slate-900"
          >
            授業を探す
          </Link>
          <Link
            href="/rankings"
            className="text-sm font-medium text-slate-700 transition hover:text-slate-900"
          >
            ランキング
          </Link>
        </nav>

        <form action="/courses" method="get" className="ml-auto hidden w-full max-w-sm md:block">
          <div className="flex items-center rounded-2xl border border-slate-300 bg-white px-4 py-3 shadow-sm">
            <Search className="h-4 w-4 text-slate-500" />
            <input
              type="text"
              name="q"
              placeholder="授業名・教員名・キーワードで検索"
              className="ml-3 w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-500"
            />
          </div>
        </form>
      </div>
    </header>
  );
}