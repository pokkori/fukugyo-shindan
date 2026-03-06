'use client';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { SIDE_JOBS, type SideJobId } from '@/lib/data';

const STORAGE_KEY = 'fukugyo-last-result';

export default function ResultContent() {
  const searchParams = useSearchParams();
  const [copied, setCopied] = useState(false);
  const ids = (searchParams.get('ids') || 'point,mercari,crowdworks').split(',') as SideJobId[];
  const jobs = ids.map((id) => SIDE_JOBS[id]).filter(Boolean);
  const top = jobs[0];

  // 結果を localStorage に保存（次回「前回の結果」で表示用）
  if (typeof window !== 'undefined' && ids.length > 0) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ids, at: Date.now() }));
    } catch {
      // ignore
    }
  }

  const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}/result?ids=${ids.join(',')}` : '';
  const copyShareUrl = () => {
    if (shareUrl) {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!top) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-400">結果が取得できませんでした。</p>
        <Link href="/quiz" className="text-amber-400 mt-4 inline-block hover:underline">
          もう一度診断する
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen p-6 pb-24">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="no-print text-slate-500 hover:text-slate-300 text-sm mb-6 inline-block">
          ← トップに戻る
        </Link>

        <h1 className="text-2xl font-bold text-slate-100 mb-2">あなたにおすすめの副業</h1>
        <p className="text-slate-400 mb-8">診断結果に基づいて、合いそうな副業を3つピックアップしました。</p>

        {/* 1位 */}
        <div className="mb-8 p-6 rounded-2xl border-2 border-amber-500/50 bg-amber-500/5">
          <span className="text-amber-400 text-sm font-bold">第1位</span>
          <h2 className="text-xl font-bold text-amber-400 mt-1">{top.name}</h2>
          <p className="text-slate-400 mt-2 text-sm">{top.description}</p>
          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            <span className="px-2 py-1 rounded-lg bg-slate-800 text-slate-300">
              初期資金: {top.initialCapital}
            </span>
            <span className="px-2 py-1 rounded-lg bg-slate-800 text-slate-300">
              目安時間: {top.timePerWeek}
            </span>
            <span className="px-2 py-1 rounded-lg bg-slate-800 text-slate-300">
              想定収入: {top.expectedIncome}
            </span>
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-bold text-slate-300 mb-2">今日やること（初日ステップ）</h3>
            <ol className="list-decimal list-inside space-y-1 text-sm text-slate-400">
              {top.firstDaySteps.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ol>
          </div>

          <Link
            href={`/checklist/${top.id}`}
            className="no-print mt-6 inline-block px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold transition-all"
          >
            チェックリストを見る →
          </Link>
        </div>

        {/* 2位・3位 */}
        <div className="space-y-4">
          {jobs.slice(1, 3).map((job, i) => (
            <div key={job.id} className="p-4 rounded-xl border border-slate-700 bg-slate-900/30">
              <span className="text-slate-500 text-sm font-bold">第{i + 2}位</span>
              <h3 className="font-bold text-slate-200">{job.name}</h3>
              <p className="text-slate-500 text-sm mt-1">{job.description.slice(0, 60)}…</p>
              <Link
                href={`/checklist/${job.id}`}
                className="no-print mt-3 inline-block text-amber-400 text-sm font-medium hover:underline"
              >
                チェックリストを見る →
              </Link>
            </div>
          ))}
        </div>

        <div className="no-print mt-12 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => window.print()}
            className="text-sm px-4 py-2 rounded-xl bg-slate-700 text-slate-200 hover:bg-slate-600 border border-slate-600 transition-all"
            aria-label="印刷またはPDFで保存"
          >
            印刷 / PDFで保存
          </button>
          <button
            onClick={copyShareUrl}
            className="text-sm px-4 py-2 rounded-xl border border-slate-600 text-slate-400 hover:text-slate-200 hover:border-slate-500 transition-all"
            aria-label={copied ? 'URLをコピーしました' : '結果URLをコピーして共有'}
          >
            {copied ? 'URLをコピーしました！' : '結果URLをコピーして共有'}
          </button>
          <Link href="/quiz" className="text-slate-500 hover:text-slate-300 text-sm">
            もう一度診断する
          </Link>
        </div>
      </div>
    </main>
  );
}
