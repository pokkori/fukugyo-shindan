// 副業の種類
export type SideJobId = 'point' | 'mercari' | 'crowdworks' | 'blog' | 'stock';

export interface SideJob {
  id: SideJobId;
  name: string;
  shortName: string;
  description: string;
  initialCapital: string;
  timePerWeek: string;
  expectedIncome: string;
  pros: string[];
  cons: string[];
  firstDaySteps: string[];
  checklist: { label: string; detail?: string }[];
  templates: { title: string; content: string }[];
}

export const SIDE_JOBS: Record<SideJobId, SideJob> = {
  point: {
    id: 'point',
    name: 'ポイントサイト',
    shortName: 'ポイントサイト',
    description: 'アンケート・広告視聴・買い物でポイントを貯めて現金化。0円から始められ、通勤中やスキマ時間にできる。',
    initialCapital: '0円',
    timePerWeek: '週3〜5時間',
    expectedIncome: '月5,000〜2万円程度',
    pros: ['完全無料で始められる', '通勤・休憩時間でOK', 'スマホだけで可能'],
    cons: ['単価は低め', '即収益は出にくい'],
    firstDaySteps: [
      '楽天ポイントサイト or モッピー に会員登録',
      'プロフィールを最低限入力（年齢・性別・居住地など）',
      '初回クエスト（1分アンケート）を1件完了',
    ],
    checklist: [
      { label: '会員登録完了' },
      { label: 'プロフィール入力' },
      { label: '初回クエスト1件完了' },
      { label: '2日目: アンケート3件挑戦' },
      { label: '1週間: 500円分のポイントを貯める目標' },
    ],
    templates: [
      {
        title: '登録時のメモ',
        content: 'ユーザーID・パスワードはメモ帳に保存。複数サイト登録の場合は同じメールアドレスで統一すると管理しやすい。',
      },
    ],
  },
  mercari: {
    id: 'mercari',
    name: 'メルカリ・フリマ',
    shortName: 'メルカリ',
    description: '使わないものや仕入れた商品を出品。実物があるのでイメージしやすく、売れたらすぐ収入になる。',
    initialCapital: '0〜5万円（手持ち出品なら0円）',
    timePerWeek: '週5〜10時間',
    expectedIncome: '月1万〜10万円程度',
    pros: ['手持ち品なら0円スタート', '売れたら即収入', '写真撮影・梱包のスキルが身につく'],
    cons: ['梱包・発送の手間', '仕入れを増やすと在庫リスク'],
    firstDaySteps: [
      'メルカリアプリをダウンロード＆会員登録',
      '本人確認を完了',
      'クローゼットから「もう着ない服」を1点選ぶ',
      '写真を3枚撮って出品（タイトル・説明はテンプレ活用）',
    ],
    checklist: [
      { label: '会員登録・本人確認完了' },
      { label: '出品する品を1点決める' },
      { label: '写真撮影（明るい場所・白背景推奨）' },
      { label: '出品完了（初回は送料負担を確認）' },
      { label: '1週間: 3品出品を目標' },
    ],
    templates: [
      {
        title: '出品テンプレ（汎用）',
        content: `【商品名】
未使用・美品です。

【状態】
〇〇のため出品します。状態は写真でご確認ください。

【配送】
ゆうゆうメルカリ便（匿名配送）
※ラッピングは簡易的なものでお送りします。`,
      },
    ],
  },
  crowdworks: {
    id: 'crowdworks',
    name: 'クラウドワークス・スキル販売',
    shortName: 'クラウドワークス',
    description: '文章作成・データ入力・デザインなど、自分のスキルを仕事として受注。パソコンとネット環境があれば自宅でできる。',
    initialCapital: '0円',
    timePerWeek: '週5〜15時間',
    expectedIncome: '月1万〜10万円程度（スキル次第）',
    pros: ['スキルが収入に直結', '実績が積み上がる', '単価アップの道がある'],
    cons: ['初受注まで時間がかかる場合も', '競争率が高い案件もある'],
    firstDaySteps: [
      'クラウドワークスに会員登録',
      'プロフィールを充実させる（経歴・得意なこと・自己PR）',
      '「初めての方歓迎」の簡単な案件を1件選ぶ',
      '提案文を書いて応募（テンプレ活用）',
    ],
    checklist: [
      { label: '会員登録完了' },
      { label: 'プロフィール作成（自己PRを書く）' },
      { label: '興味ある案件を5件ストック' },
      { label: '初回提案を送る' },
      { label: '1週間: 3件以上提案を出す' },
    ],
    templates: [
      {
        title: '初受注向け提案文テンプレ',
        content: `初めての応募です。誠実に丁寧な作業を心がけます。

【対応可能なこと】
・〇〇（案件内容に合わせて記載）
・納期厳守
・修正対応も可能です

ご検討のほどよろしくお願いいたします。`,
      },
    ],
  },
  blog: {
    id: 'blog',
    name: 'ブログ・アフィリエイト',
    shortName: 'ブログ',
    description: '自分の興味あるジャンルで記事を書き、広告やアフィリエイトで収益化。長期戦だが資産として残る。',
    initialCapital: '月1,000円前後（ドメイン・サーバー）',
    timePerWeek: '週5〜10時間',
    expectedIncome: '半年〜1年後に月1万〜（流量次第）',
    pros: ['資産になる', '一度書けば長く読まれる', '自分のペースでOK'],
    cons: ['収益化まで時間がかかる', '継続が必要'],
    firstDaySteps: [
      'ブログのジャンルを1つ決める（趣味・仕事関連・生活など）',
      'WordPress or はてなブログ でブログ開設',
      '最初の1記事を書く（自己紹介 or ジャンル紹介）',
      'SNSで1回シェア',
    ],
    checklist: [
      { label: 'ジャンル決定' },
      { label: 'ブログ開設' },
      { label: '初記事1本公開' },
      { label: 'SNSでシェア' },
      { label: '1ヶ月: 10記事を目標' },
    ],
    templates: [
      {
        title: '初記事のテーマ例',
        content: '・このブログを始めた理由\n・〇〇（ジャンル）について私が思うこと\n・初心者向け：〇〇の始め方',
      },
    ],
  },
  stock: {
    id: 'stock',
    name: 'せどり・転売',
    shortName: 'せどり',
    description: '安く仕入れて高く売る。メルカリ・ヤフオク・Amazonなどで販売。資金と時間があればスケールしやすい。',
    initialCapital: '5万〜10万円（仕入れ資金）',
    timePerWeek: '週10〜20時間',
    expectedIncome: '月3万〜30万円程度',
    pros: ['スケールしやすい', '利益率を自分でコントロール', '仕入れの楽しさ'],
    cons: ['初期資金が必要', '在庫リスク', '勉強が必要'],
    firstDaySteps: [
      'メルカリ・ヤフオクのアカウントを用意',
      '「せどり 初心者」でYouTube動画を2本見る',
      '興味あるカテゴリを1つ決める（本・ゲーム・服など）',
      'フリマアプリで相場を5品分チェック',
    ],
    checklist: [
      { label: '販売アカウント準備' },
      { label: 'カテゴリを1つ決める' },
      { label: '相場調査5品' },
      { label: '仕入れ先（メルカリ・ハードオフ等）を確認' },
      { label: '1週間: 初仕入れ1回を目標' },
    ],
    templates: [
      {
        title: '出品時の検索キーワード確認',
        content: '売りたい商品名＋状態（中古・未使用）で実際に検索し、似た商品の価格帯を確認してから出品価格を決める。',
      },
    ],
  },
};

// 診断の質問
export interface QuizQuestion {
  id: string;
  question: string;
  options: { label: string; value: string; scores: Partial<Record<SideJobId, number>> }[];
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'time',
    question: '週に使える副業時間はどのくらいですか？',
    options: [
      { label: '週3時間以下（通勤・休憩だけ）', value: 'few', scores: { point: 3, mercari: 1, crowdworks: 1, blog: 0, stock: 0 } },
      { label: '週5〜10時間', value: 'medium', scores: { point: 2, mercari: 3, crowdworks: 3, blog: 2, stock: 1 } },
      { label: '週10時間以上', value: 'many', scores: { point: 1, mercari: 3, crowdworks: 3, blog: 3, stock: 3 } },
    ],
  },
  {
    id: 'capital',
    question: '副業に使える初期資金はどのくらいありますか？',
    options: [
      { label: '0円（まずはお金をかけずに始めたい）', value: 'zero', scores: { point: 3, mercari: 2, crowdworks: 3, blog: 1, stock: 0 } },
      { label: '1万〜5万円', value: 'small', scores: { point: 2, mercari: 3, crowdworks: 3, blog: 2, stock: 0 } },
      { label: '5万円以上', value: 'large', scores: { point: 1, mercari: 3, crowdworks: 2, blog: 3, stock: 3 } },
    ],
  },
  {
    id: 'skill',
    question: '活かせそうなスキルはありますか？',
    options: [
      { label: '特にない（未経験から始めたい）', value: 'none', scores: { point: 3, mercari: 3, crowdworks: 0, blog: 2, stock: 2 } },
      { label: '文章を書く・PC作業', value: 'writing', scores: { point: 2, mercari: 1, crowdworks: 3, blog: 3, stock: 0 } },
      { label: 'デザイン・プログラミング', value: 'tech', scores: { point: 0, mercari: 0, crowdworks: 3, blog: 2, stock: 0 } },
      { label: '物の価値を見極められる', value: 'eye', scores: { point: 0, mercari: 3, crowdworks: 0, blog: 0, stock: 3 } },
    ],
  },
  {
    id: 'interest',
    question: 'どんな副業に興味がありますか？',
    options: [
      { label: 'スマホでサクッと稼ぎたい', value: 'easy', scores: { point: 3, mercari: 2, crowdworks: 0, blog: 0, stock: 0 } },
      { label: 'ものの売買（フリマ・せどり）', value: 'selling', scores: { point: 0, mercari: 3, crowdworks: 0, blog: 0, stock: 3 } },
      { label: 'スキルを売りたい', value: 'skill', scores: { point: 0, mercari: 0, crowdworks: 3, blog: 1, stock: 0 } },
      { label: '長期的に資産を作りたい', value: 'asset', scores: { point: 0, mercari: 1, crowdworks: 1, blog: 3, stock: 1 } },
    ],
  },
  {
    id: 'speed',
    question: 'どれくらい早く収入を感じたいですか？',
    options: [
      { label: 'すぐに（今月から）', value: 'fast', scores: { point: 3, mercari: 3, crowdworks: 2, blog: 0, stock: 2 } },
      { label: '2〜3ヶ月後から', value: 'medium', scores: { point: 2, mercari: 2, crowdworks: 3, blog: 1, stock: 2 } },
      { label: '半年後でもOK（コツコツ型）', value: 'slow', scores: { point: 1, mercari: 1, crowdworks: 2, blog: 3, stock: 1 } },
    ],
  },
];

export function calculateResult(answers: Record<string, string>): SideJob[] {
  const totals: Record<SideJobId, number> = {
    point: 0,
    mercari: 0,
    crowdworks: 0,
    blog: 0,
    stock: 0,
  };

  for (const q of QUIZ_QUESTIONS) {
    const chosen = q.options.find((o) => o.value === answers[q.id]);
    if (chosen?.scores) {
      for (const [id, score] of Object.entries(chosen.scores)) {
        totals[id as SideJobId] += score;
      }
    }
  }

  return (['point', 'mercari', 'crowdworks', 'blog', 'stock'] as SideJobId[])
    .map((id) => ({ id, score: totals[id] }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((x) => SIDE_JOBS[x.id]);
}
