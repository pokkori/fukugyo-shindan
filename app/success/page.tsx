"use client";

import { Suspense } from "react";
import Link from "next/link";

function SuccessContent() {


  return (
    <div className="text-center space-y-6 max-w-md mx-auto p-6">
      <div className="text-6xl">🎉</div>
      <h1 className="text-2xl font-bold text-slate-100">ご購入ありがとうございます！</h1>
      <p className="text-slate-400">
        プレミアムプランが有効になりました。<br />
        全ての副業チェックリストをご利用いただけます。
      </p>
      <Link
        href="/quiz"
        className="inline-block px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold text-lg"
      >
        診断を始める
      </Link>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <Suspense fallback={<div className="text-slate-400">読み込み中...</div>}>
        <SuccessContent />
      </Suspense>
    </main>
  );
}
