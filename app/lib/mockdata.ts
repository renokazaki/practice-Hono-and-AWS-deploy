// src/lib/mockData.ts

import { Task } from "../types/type";

// 現在の日時をベースに日時を生成するヘルパー関数
const getRelativeDate = (daysAgo: number): string => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString();
};

// 仮のタスクデータ
export const mockTasks: Task[] = [
  {
    id: "1",
    title: "プロジェクト計画の作成",
    description:
      "次期開発プロジェクトの全体計画と工程表を作成する。stakeholderとの打ち合わせ内容を反映すること。",
    status: "in-progress",
    priority: "high",
    createdAt: getRelativeDate(5),
    updatedAt: getRelativeDate(1),
  },
  {
    id: "2",
    title: "バグ修正: ログイン画面",
    description:
      "モバイル表示時にログインフォームのレイアウトが崩れる問題を修正する。",
    status: "todo",
    priority: "medium",
    createdAt: getRelativeDate(3),
    updatedAt: getRelativeDate(3),
  },
  {
    id: "3",
    title: "ユーザーフィードバックの分析",
    description:
      "アプリのベータ版に関するユーザーフィードバックを収集し、優先度の高い改善点をリストアップする。",
    status: "done",
    priority: "medium",
    createdAt: getRelativeDate(10),
    updatedAt: getRelativeDate(2),
  },
  {
    id: "4",
    title: "パフォーマンス最適化",
    description:
      "アプリの読み込み時間を改善するためのパフォーマンス最適化を行う。特に画像の遅延読み込みを実装する。",
    status: "todo",
    priority: "high",
    createdAt: getRelativeDate(2),
    updatedAt: getRelativeDate(2),
  },
  {
    id: "5",
    title: "ドキュメント更新",
    description: "新機能に関するAPIドキュメントを更新する。",
    status: "done",
    priority: "low",
    createdAt: getRelativeDate(7),
    updatedAt: getRelativeDate(4),
  },
  {
    id: "6",
    title: "週次進捗レポート作成",
    description: "今週の進捗状況をまとめて、チームリーダーに提出する。",
    status: "todo",
    priority: "medium",
    createdAt: getRelativeDate(1),
    updatedAt: getRelativeDate(1),
  },
  {
    id: "7",
    title: "セキュリティ監査対応",
    description:
      "セキュリティチームから指摘された脆弱性対応を行う。認証フローの見直しを含む。",
    status: "in-progress",
    priority: "high",
    createdAt: getRelativeDate(4),
    updatedAt: getRelativeDate(0),
  },
  {
    id: "8",
    title: "リファクタリング: コアモジュール",
    description:
      "コアモジュールのコードをリファクタリングし、テスト可能性と保守性を向上させる。",
    status: "todo",
    priority: "low",
    createdAt: getRelativeDate(6),
    updatedAt: getRelativeDate(6),
  },
  {
    id: "9",
    title: "新機能: ダークモード",
    description:
      "アプリケーションにダークモードを実装する。ユーザー設定と端末設定に連動させること。",
    status: "in-progress",
    priority: "medium",
    createdAt: getRelativeDate(8),
    updatedAt: getRelativeDate(3),
  },
  {
    id: "10",
    title: "リリース準備",
    description:
      "バージョン2.0のリリース準備を行う。変更履歴の作成とリリースノートのドラフトを含む。",
    status: "todo",
    priority: "high",
    createdAt: getRelativeDate(2),
    updatedAt: getRelativeDate(0),
  },
];

// モックデータをミュータブルにするためのコピー（実際の操作で使用）
export let mutableMockTasks = [...mockTasks];

// モックデータをリセットする関数
export const resetMockTasks = () => {
  mutableMockTasks = [...mockTasks];
};
