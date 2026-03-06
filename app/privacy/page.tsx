import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen p-6">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="text-amber-400 text-sm hover:underline">← トップに戻る</Link>
        <h1 className="text-2xl font-bold text-slate-100 mt-6 mb-8">プライバシーポリシー</h1>
        <div className="text-sm text-slate-300 leading-relaxed space-y-6">
          <section><h2 className="font-bold text-slate-200 mb-2">1. 収集する情報</h2><ul className="list-disc list-inside space-y-1 text-slate-400"><li>決済時にStripe社が収集する支払情報（当社はカード番号を保持しません）</li><li>ブラウザのCookieおよびlocalStorage（利用回数の管理）</li><li>アクセスログ（IPアドレス・ブラウザ種別・閲覧ページ）</li></ul></section>
          <section><h2 className="font-bold text-slate-200 mb-2">2. 利用目的</h2><ul className="list-disc list-inside space-y-1 text-slate-400"><li>サービスの提供・運営・改善</li><li>不正利用の検知と防止</li></ul></section>
          <section><h2 className="font-bold text-slate-200 mb-2">3. 第三者提供</h2><p className="text-slate-400">法令に基づく場合および決済処理のためStripe, Inc.に提供する場合を除き、第三者への提供は行いません。</p></section>
          <section><h2 className="font-bold text-slate-200 mb-2">4. お問い合わせ</h2><p className="text-slate-400">support@example.com</p></section>
        </div>
        <p className="text-slate-600 text-xs mt-8 pt-4 border-t border-slate-700">制定日：2025年1月1日</p>
      </div>
    </main>
  );
}
