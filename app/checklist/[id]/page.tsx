'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { SIDE_JOBS, type SideJobId } from '@/lib/data';

async function startCheckout() {
  const res = await fetch('/api/stripe/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  const data = await res.json();
  if (data.url) window.location.href = data.url;
}

const STORAGE_KEY = 'fukugyo-checklist';

function loadProgress(id: string): Record<number, boolean> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const all = JSON.parse(raw) as Record<string, Record<number, boolean>>;
    return all[id] || {};
  } catch {
    return {};
  }
}

function saveProgress(id: string, progress: Record<number, boolean>) {
  if (typeof window === 'undefined') return;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const all = (raw ? JSON.parse(raw) : {}) as Record<string, Record<number, boolean>>;
    all[id] = progress;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  } catch {
    // ignore
  }
}

export default function ChecklistPage() {
  const params = useParams();
  const id = (params?.id as SideJobId) || 'point';
  const job = SIDE_JOBS[id];

  const [progress, setProgress] = useState<Record<number, boolean>>({});
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    fetch('/api/auth/status').then((r) => r.json()).then((d) => setIsPremium(d.isPremium));
  }, []);

  useEffect(() => {
    setProgress(loadProgress(id));
  }, [id]);

  if (!job) {
    return (
      <main className="min-h-screen p-6">
        <p className="text-slate-400">副業が見つかりません。</p>
        <Link href="/" className="text-amber-400 mt-4 inline-block">トップへ</Link>
      </main>
    );
  }

  const toggle = (idx: number) => {
    const next = { ...progress, [idx]: !progress[idx] };
    setProgress(next);
    saveProgress(id, next);
  };

  const doneCount = Object.values(progress).filter(Boolean).length;
  const total = job.checklist.length;

  if (!isPremium) {
    return (
      <main className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="text-5xl">🔒</div>
          <h2 className="text-2xl font-bold text-slate-100">プレミアム限定機能</h2>
          <p className="text-slate-400">
            詳細チェックリストはプレミアムプラン（¥980/月）でご利用いただけます。<br />
            副業開始から月収3万円達成まで、ステップバイステップでサポートします。
          </p>
          <button
            onClick={startCheckout}
            className="w-full max-w-xs mx-auto block px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold text-lg"
          >
            プレミアムで解除する（¥980/月）
          </button>
          <Link href="/result" className="block text-slate-500 hover:text-slate-300 text-sm">
            ← 結果に戻る
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-6 pb-24">
      <div className="max-w-2xl mx-auto">
        <Link href="/result" className="text-slate-500 hover:text-slate-300 text-sm mb-6 inline-block">
          ← 結果に戻る
        </Link>

        <h1 className="text-2xl font-bold text-slate-100">{job.name} チェックリスト</h1>
        <p className="text-slate-400 mt-1">{job.shortName}を始めるためのステップ。チェックを入れて進捗を記録しよう。</p>

        <div className="mt-4 mb-8 h-2 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-amber-500 transition-all"
            style={{ width: `${total > 0 ? (doneCount / total) * 100 : 0}%` }}
          />
        </div>
        <p className="text-sm text-slate-500 mb-6">{doneCount} / {total} 完了</p>

        <div className="space-y-3">
          {job.checklist.map((item, idx) => (
            <label
              key={idx}
              className={`flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
                progress[idx] ? 'border-emerald-500/50 bg-emerald-500/5' : 'border-slate-700 bg-slate-900/30 hover:border-slate-600'
              }`}
            >
              <input
                type="checkbox"
                checked={!!progress[idx]}
                onChange={() => toggle(idx)}
                className="mt-1 w-5 h-5 rounded border-slate-600 text-amber-500 focus:ring-amber-500"
              />
              <div>
                <span className={progress[idx] ? 'line-through text-slate-500' : 'text-slate-200'}>
                  {item.label}
                </span>
                {item.detail && (
                  <p className="text-sm text-slate-500 mt-1">{item.detail}</p>
                )}
              </div>
            </label>
          ))}
        </div>

        {/* テンプレート */}
        {job.templates.length > 0 && (
          <div className="mt-12">
            <h2 className="text-lg font-bold text-slate-200 mb-4">使えるテンプレート</h2>
            <div className="space-y-4">
              {job.templates.map((t, idx) => (
                <TemplateCard key={idx} title={t.title} content={t.content} />
              ))}
            </div>
          </div>
        )}

        <div className="mt-12 text-center">
          <Link href="/" className="text-slate-500 hover:text-slate-300 text-sm">
            トップに戻る
          </Link>
        </div>
      </div>
    </main>
  );
}

function TemplateCard({ title, content }: { title: string; content: string }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900/30 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-800/30 transition-colors"
      >
        <span className="font-medium text-slate-200">{title}</span>
        <span className="text-slate-500">{open ? '閉じる' : '開く'}</span>
      </button>
      {open && (
        <div className="p-4 pt-0">
          <pre className="text-sm text-slate-400 whitespace-pre-wrap bg-slate-950 rounded-lg p-4 font-sans">
            {content}
          </pre>
          <button
            onClick={copy}
            className="mt-2 text-sm text-amber-400 hover:underline"
          >
            {copied ? 'コピーしました！' : 'クリップボードにコピー'}
          </button>
        </div>
      )}
    </div>
  );
}
