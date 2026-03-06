'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const STORAGE_KEY = 'fukugyo-last-result';

export default function HomePage() {
  const [lastResultUrl, setLastResultUrl] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
      if (raw) {
        const data = JSON.parse(raw) as { ids?: string[] };
        if (data.ids?.length) {
          setLastResultUrl(`/result?ids=${data.ids.join(',')}`);
        }
      }
    } catch {
      // ignore
    }
  }, []);
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="max-w-lg w-full text-center space-y-8">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
          副業デビュー診断
        </h1>
        <p className="text-slate-400 text-lg">
          会社員・副業未経験者向け。<br />
          5分の診断で<span className="text-slate-200 font-medium">あなたに合った副業</span>と、<br />
          <span className="text-amber-400 font-medium">今日から始めるチェックリスト</span>をゲット。
        </p>
        <div className="pt-4 space-y-3">
          <Link
            href="/quiz"
            className="inline-block w-full max-w-xs mx-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold text-lg shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all hover:scale-[1.02]"
          >
            診断を始める（約5分）
          </Link>
          {lastResultUrl && (
            <Link
              href={lastResultUrl}
              className="block text-sm text-slate-500 hover:text-amber-400 transition-colors"
            >
              前回の結果を見る →
            </Link>
          )}
        </div>
        <ul className="text-sm text-slate-500 space-y-1 pt-8">
          <li>✓ 5問の簡単な質問に答えるだけ</li>
          <li>✓ 無料・会員登録不要</li>
          <li>✓ 結果はその場で表示</li>
        </ul>
      </div>
    </main>
  );
}
