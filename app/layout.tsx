import type { Metadata } from 'next';
import './globals.css';
import ErrorBoundary from './ErrorBoundary';

export const metadata: Metadata = {
  title: '副業デビュー診断 | あなたに合った副業を見つける',
  description: '会社員・副業未経験者向け。5分の診断で自分に合った副業と、今日から始めるチェックリストをゲット。',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="min-h-screen">
        <ErrorBoundary>{children}</ErrorBoundary>
      </body>
    </html>
  );
}
