import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">タスク管理アプリケーション</h1>
        <p className="text-lg text-gray-700 mb-8">
          Next.js と Hono.js
          で構築されたシンプルでモダンなタスク管理アプリケーションです。
        </p>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">アプリケーションの機能</h2>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>タスクの作成、表示、更新、削除</li>
              <li>優先度の設定（低、中、高）</li>
              <li>ステータスの管理（未着手、進行中、完了）</li>
              <li>最新の更新順でのタスク表示</li>
            </ul>

            <Link
              href="/tasks"
              className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              タスク管理を始める →
            </Link>
          </div>

          <div className="bg-gray-50 px-6 py-4">
            <p className="text-sm text-gray-600">
              このアプリケーションは AWS ECS と Fargate 上で実行されています。
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
