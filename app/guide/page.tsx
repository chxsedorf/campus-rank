export default function GuidePage() {
  return (
    <div className="space-y-6">
      <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="text-sm font-medium text-slate-500">利用ガイド</div>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight">
          安全に運営するためのルール
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
          このサイトは、大学の授業選びを助けるための情報整理・共有サービスです。
          公開情報は整理・要約して掲載し、学生の感想は授業内容に関するものを中心に扱います。
        </p>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-semibold tracking-tight">掲載する公開情報について</h2>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
            <li>・授業名、教員名、単位数、開講時期などの事実情報を掲載します。</li>
            <li>・シラバス本文の丸ごとの転載は避け、要約形式で整理します。</li>
            <li>・正式な情報は大学公式シラバス・履修要項を優先します。</li>
          </ul>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-semibold tracking-tight">口コミ投稿のルール</h2>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
            <li>・授業内容、難易度、課題量、出席など履修判断に役立つ内容を投稿してください。</li>
            <li>・教員個人への攻撃、侮辱、断定的な中傷は禁止です。</li>
            <li>・「〜と感じた」「〜と思った」など、主観として表現してください。</li>
          </ul>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-semibold tracking-tight">削除・通報対象</h2>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
            <li>・暴言、人格否定、誹謗中傷を含む投稿</li>
            <li>・個人情報、授業と無関係な私的情報を含む投稿</li>
            <li>・虚偽の断定や第三者の権利を侵害する恐れがある投稿</li>
          </ul>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-semibold tracking-tight">免責事項</h2>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
            <li>・本サイトの情報は履修判断の参考であり、正確性・完全性を保証するものではありません。</li>
            <li>・授業内容、評価方法、開講状況は年度によって変更される場合があります。</li>
            <li>・重要な判断は必ず大学公式の情報をご確認ください。</li>
          </ul>
        </div>
      </section>
    </div>
  );
}