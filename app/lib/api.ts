import { Task, TaskInput, TaskStatus } from "../types/type";

// API エラーハンドリング
class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.name = "ApiError";
  }
}

// APIレスポンスの処理
async function handleResponse<T>(response: Response): Promise<T> {
  const contentType = response.headers.get("content-type");
  const isJson = contentType && contentType.includes("application/json");
  const data = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    const message =
      isJson && data.error
        ? data.error
        : `APIリクエストが失敗しました (${response.status})`;
    throw new ApiError(message, response.status);
  }

  return data as T;
}

// API クライアント
export const api = {
  // タスク一覧の取得
  async getTasks(): Promise<{ tasks: Task[] }> {
    const response = await fetch("/api/tasks");
    return handleResponse<{ tasks: Task[] }>(response);
  },

  // タスクの詳細取得
  async getTask(id: string): Promise<Task> {
    const response = await fetch(`/api/tasks/${id}`);
    return handleResponse<Task>(response);
  },

  // タスクの作成
  async createTask(task: TaskInput): Promise<Task> {
    const response = await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });
    return handleResponse<Task>(response);
  },

  // タスクの更新
  async updateTask(id: string, updates: Partial<TaskInput>): Promise<Task> {
    const response = await fetch(`/api/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
    });
    return handleResponse<Task>(response);
  },

  // タスクのステータス更新（よく使われる操作のためのユーティリティメソッド）
  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    return this.updateTask(id, { status });
  },

  // タスクの削除
  async deleteTask(id: string): Promise<{ success: boolean }> {
    const response = await fetch(`/api/tasks/${id}`, {
      method: "DELETE",
    });
    return handleResponse<{ success: boolean }>(response);
  },
};
