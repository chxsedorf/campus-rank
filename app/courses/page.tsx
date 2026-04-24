<form
  action="/courses"
  method="get"
  className="mt-6 grid gap-4 lg:grid-cols-[1.8fr_1fr_1fr_auto] lg:items-end"
>
  <div>
    <label htmlFor="courses-q" className="mb-2 block text-sm font-medium text-slate-700">
      キーワード
    </label>
    <div className="flex h-[52px] items-center rounded-2xl border border-slate-300 bg-white px-4">
      <Search className="h-4 w-4 text-slate-500" />
      <input
        id="courses-q"
        name="q"
        type="text"
        defaultValue={q}
        placeholder="授業名・先生・内容で検索"
        className="ml-3 w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-500"
      />
    </div>
  </div>

  <div>
    <label htmlFor="courses-faculty" className="mb-2 block text-sm font-medium text-slate-700">
      学部
    </label>
    <select
      id="courses-faculty"
      name="faculty"
      defaultValue={faculty}
      className="h-[52px] w-full rounded-2xl border border-slate-300 bg-white px-4 text-sm text-slate-900"
    >
      <option value="">すべて</option>
      {faculties.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  </div>

  <div>
    <label htmlFor="courses-semester" className="mb-2 block text-sm font-medium text-slate-700">
      学期
    </label>
    <select
      id="courses-semester"
      name="semester"
      defaultValue={semester}
      className="h-[52px] w-full rounded-2xl border border-slate-300 bg-white px-4 text-sm text-slate-900"
    >
      <option value="">すべて</option>
      {semesters.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  </div>

  <div className="flex gap-3 lg:pb-0">
    <button
      type="submit"
      className="inline-flex h-[52px] items-center justify-center rounded-2xl bg-slate-900 px-6 text-sm font-medium text-white transition hover:bg-slate-800"
    >
      検索
    </button>

    <Link
      href="/courses"
      className="inline-flex h-[52px] items-center justify-center rounded-2xl border border-slate-300 bg-white px-5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
    >
      解除
    </Link>
  </div>
</form>