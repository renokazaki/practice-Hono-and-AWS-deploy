// タスクの優先度
export type TaskPriority = "low" | "medium" | "high";

// タスクのステータス
export type TaskStatus = "todo" | "in-progress" | "done";

// タスクの型定義
export type Task = {
  id: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  createdAt: string;
  updatedAt: string;
};

// タスク作成時の入力データ型
export type TaskInput = {
  title: string;
  description?: string;
  priority?: TaskPriority;
  status?: TaskStatus;
};

// タスク更新時の入力データ型
export type TaskUpdateInput = Partial<TaskInput>;

// API レスポンスの型定義
export type ApiResponse<T> = {
  data?: T;
  error?: string;
};

// タスク一覧レスポンスの型定義
export type TasksResponse = {
  tasks: Task[];
};

// 単一タスクレスポンスの型定義
export type TaskResponse = Task;

// 成功レスポンスの型定義
export type SuccessResponse = {
  success: boolean;
};
