import { Suspense } from 'react';
import type { Metadata } from 'next';
import { SIDE_JOBS, type SideJobId } from '@/lib/data';
import ResultContent from './ResultContent';

type Props = { searchParams: { ids?: string } };

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const ids = (searchParams?.ids || 'point,mercari,crowdworks').split(',') as SideJobId[];
  const top = SIDE_JOBS[ids[0] as SideJobId];
  const topName = top?.name ?? '副業';
  const title = `あなたにおすすめの副業: ${topName} | 副業デビュー診断`;
  const description = `診断結果：第1位は${topName}です。診断結果に基づいて、合いそうな副業を3つピックアップしました。`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default function ResultPage() {
  return (
    <Suspense fallback={<div className="min-h-screen p-6">読み込み中...</div>}>
      <ResultContent />
    </Suspense>
  );
}
