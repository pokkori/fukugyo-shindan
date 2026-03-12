import Link from "next/link";

const ITEMS = [
  { label: "販売業者", value: "ポッコリラボ" },
  { label: "運営責任者", value: "新美 諭" },
  { label: "お問い合わせ", value: "X(Twitter) @levona_design へのDM" },
  { label: "販売価格", value: "プレミアムプラン ¥980/月（税込）" },
  { label: "支払方法", value: "クレジットカード（Visa・Mastercard・American Express・JCB）" },
  { label: "支払時期", value: "お申込み時に即時決済。以降、毎月同日に自動更新" },
  { label: "サービス提供時期", value: "決済完了後、即時ご利用いただけます" },
  { label: "返品・キャンセル", value: "デジタルコンテンツの性質上、決済完了後の返金は承っておりません。解約はいつでもStripeカスタマーポータルより行えます。解約後は次回更新日まで引き続きご利用いただけます" },
  { label: "動作環境", value: "インターネット接続環境および最新版ブラウザが必要です" },
];

export default function LegalPage() {
  return (
    <main className="min-h-screen p-6">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="text-amber-400 text-sm hover:underline">← トップに戻る</Link>
        <h1 className="text-2xl font-bold text-slate-100 mt-6 mb-2">特定商取引法に基づく表記</h1>
        <p className="text-slate-400 text-sm mb-8">Act on Specified Commercial Transactions</p>
        <dl className="space-y-4">
          {ITEMS.map((item) => (
            <div key={item.label} className="border-b border-slate-700 pb-4">
              <dt className="text-sm font-semibold text-slate-400 mb-1">{item.label}</dt>
              <dd className="text-slate-200 text-sm leading-relaxed">{item.value}</dd>
            </div>
          ))}
        </dl>
        <p className="text-xs text-slate-500 mt-8">
          ※ 本サービスの診断結果は参考情報です。収入・収益を保証するものではありません。
        </p>
      </div>
    </main>
  );
}
