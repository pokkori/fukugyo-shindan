'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { QUIZ_QUESTIONS, calculateResult } from '@/lib/data';

const PROGRESS_KEY = 'fukugyo-quiz-progress';
const PROGRESS_EXPIRY_MS = 7 * 24 * 60 * 60 * 1000; // 7日

function loadProgress(): { step: number; answers: Record<string, string> } | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as { step?: number; answers?: Record<string, string>; savedAt?: number };
    const savedAt = typeof data?.savedAt === 'number' ? data.savedAt : 0;
    if (savedAt && Date.now() - savedAt > PROGRESS_EXPIRY_MS) return null;
    const step = typeof data?.step === 'number' ? data.step : 0;
    const answers = data?.answers && typeof data.answers === 'object' ? data.answers : {};
    if (step < 0 || step >= QUIZ_QUESTIONS.length) return null;
    return { step, answers };
  } catch {
    return null;
  }
}

function saveProgress(step: number, answers: Record<string, string>) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify({ step, answers, savedAt: Date.now() }));
  } catch {
    /* ignore */
  }
}

function clearProgress() {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(PROGRESS_KEY);
  } catch {
    /* ignore */
  }
}

export default function QuizPage() {
  const router = useRouter();
  const [hydrated, setHydrated] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showRestoredToast, setShowRestoredToast] = useState(false);

  useEffect(() => {
    const saved = loadProgress();
    if (saved && saved.step > 0) {
      setStep(saved.step);
      setAnswers(saved.answers);
      setShowRestoredToast(true);
      const t = setTimeout(() => setShowRestoredToast(false), 3000);
      setHydrated(true);
      return () => clearTimeout(t);
    }
    setHydrated(true);
  }, []);

  const q = QUIZ_QUESTIONS[step];
  const progress = ((step + 1) / QUIZ_QUESTIONS.length) * 100;

  const handleNext = (value: string) => {
    const next = { ...answers, [q.id]: value };
    setAnswers(next);

    if (step + 1 >= QUIZ_QUESTIONS.length) {
      clearProgress();
      const results = calculateResult(next);
      const ids = results.map((r) => r.id).join(',');
      router.push(`/result?ids=${ids}`);
    } else {
      saveProgress(step + 1, next);
      setStep(step + 1);
    }
  };

  const handleStartOver = () => {
    clearProgress();
    setStep(0);
    setAnswers({});
  };

  const handleBack = () => {
    if (step > 0) {
      const prevStep = step - 1;
      setStep(prevStep);
      saveProgress(prevStep, answers);
    }
  };

  if (!hydrated || !q) {
    return (
      <main className="min-h-screen p-6 pb-24">
        <div className="max-w-xl mx-auto text-center py-12">読み込み中...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-6 pb-24">
      <div className="max-w-xl mx-auto">
        {showRestoredToast && (
          <div className="mb-4 px-4 py-2 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 text-sm animate-in fade-in duration-300" role="status">
            前回の回答を復元しました
          </div>
        )}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-slate-500 hover:text-slate-300 text-sm">
              ← トップに戻る
            </Link>
            {step > 0 && (
              <button
                onClick={handleBack}
                className="text-slate-500 hover:text-slate-300 text-sm"
                aria-label="前の質問に戻る"
              >
                ← 戻る
              </button>
            )}
          </div>
          {step > 0 && (
            <button
              onClick={handleStartOver}
              className="text-slate-500 hover:text-slate-300 text-sm focus:ring-2 focus:ring-amber-500/50 focus:outline-none rounded px-1"
              aria-label="最初からやり直す"
            >
              最初からやり直す
            </button>
          )}
        </div>

        <div className="mb-8">
          <p className="text-slate-500 text-sm">
            質問 {step + 1} / {QUIZ_QUESTIONS.length}
          </p>
          <div className="mt-2 h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-500 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <h2 className="text-xl md:text-2xl font-bold text-slate-100 mb-8">{q.question}</h2>

        <div className="space-y-3" role="group" aria-label="回答を選択">
          {q.options.map((opt, idx) => (
            <button
              key={opt.value}
              onClick={() => handleNext(opt.value)}
              onKeyDown={(e) => {
                if (e.key === 'ArrowDown' && idx < q.options.length - 1) {
                  e.preventDefault();
                  ((e.target as HTMLElement).nextElementSibling as HTMLElement | null)?.focus();
                }
                if (e.key === 'ArrowUp' && idx > 0) {
                  e.preventDefault();
                  ((e.target as HTMLElement).previousElementSibling as HTMLElement | null)?.focus();
                }
              }}
              className="w-full block p-4 rounded-xl border border-slate-700 bg-slate-900/50 hover:border-amber-500/50 hover:bg-slate-800/50 text-left transition-all focus:ring-2 focus:ring-amber-500/50 focus:outline-none"
              aria-label={opt.label}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
