import Link from 'next/link';
import { Search, GraduationCap } from 'lucide-react';

const navItems = [
  { href: '/', label: 'ホーム' },
  { href: '/courses', label: '授業を探す' },
  { href: '/rankings', label: 'ランキング' },
  { href: '/guide', label: '利用ガイド' },
];

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[20px] bg-slate-900 text-white shadow-sm">
            <GraduationCap className="h-6 w-6" />
          </div>

          <div className="min-w-0">
            <div className="truncate text-lg font-semibold text-slate-900">
              Campus Rank
            </div>
            <p className="truncate text-sm text-slate-700">
              履修判断を助ける授業情報サイト
            </p>
          </div>
        </Link>

        <nav className="ml-6 hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-800 transition hover:text-slate-900"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto hidden w-full max-w-sm lg:block">
          <form action="/courses" className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              name="q"
              placeholder="授業名・教員名・キーワードで検索"
              className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-600 focus:border-slate-300"
            />
          </form>
        </div>
      </div>
    </header>
  );
}