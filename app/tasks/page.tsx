"use client";

import Alert from "@/components/alert";
import Layout from "@/components/layout";
import TaskForm from "@/components/taskform";
import TaskList from "@/components/taskList";
import { useEffect, useState } from "react";
import { Task, TaskInput, TaskStatus } from "../types/type";
import { api } from "../lib/api";

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // タスクの取得
  const fetchTasks = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await api.getTasks();
      setTasks(data.tasks);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "予期せぬエラーが発生しました"
      );
    } finally {
      setLoading(false);
    }
  };

  // 初回ロード時にタスクを取得
  useEffect(() => {
    fetchTasks();
  }, []);

  // タスクの作成
  const handleCreateTask = async (taskData: TaskInput) => {
    setError("");
    try {
      const createdTask = await api.createTask(taskData);
      setTasks([createdTask, ...tasks]);
      return Promise.resolve();
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "予期せぬエラーが発生しました";
      setError(errorMessage);
      return Promise.reject(errorMessage);
    }
  };

  // タスクの削除
  const handleDeleteTask = async (id: string) => {
    setError("");
    try {
      await api.deleteTask(id);
      setTasks(tasks.filter((task) => task.id !== id));
      return Promise.resolve();
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "予期せぬエラーが発生しました";
      setError(errorMessage);
      return Promise.reject(errorMessage);
    }
  };

  // タスクのステータス変更
  const handleStatusChange = async (id: string, status: TaskStatus) => {
    setError("");
    try {
      const updatedTask = await api.updateTaskStatus(id, status);
      setTasks(tasks.map((task) => (task.id === id ? updatedTask : task)));
      return Promise.resolve();
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "予期せぬエラーが発生しました";
      setError(errorMessage);
      return Promise.reject(errorMessage);
    }
  };

  // タスクの並び替え（最新の更新順）
  const sortedTasks = [...tasks].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );

  return (
    <Layout title="タスク管理">
      <Alert message={error} type="error" />

      <TaskForm onSubmit={handleCreateTask} />

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">タスク一覧</h2>
        <TaskList
          tasks={sortedTasks}
          loading={loading}
          onStatusChange={handleStatusChange}
          onDelete={handleDeleteTask}
        />
      </div>
    </Layout>
  );
}
