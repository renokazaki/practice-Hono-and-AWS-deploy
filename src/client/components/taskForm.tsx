import React, { useState } from "react";
import { TaskInput, TaskPriority } from "@/src/shared/types/type";

type TaskFormProps = {
  onSubmit: (task: TaskInput) => Promise<void>;
};

export default function TaskForm({ onSubmit }: TaskFormProps) {
  const [task, setTask] = useState<TaskInput>({
    title: "",
    description: "",
    priority: "medium",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!task.title.trim()) return;

    setIsSubmitting(true);
    try {
      await onSubmit(task);
      // フォームをリセット
      setTask({ title: "", description: "", priority: "medium" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-xl font-bold mb-4">新しいタスク</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            タイトル
          </label>
          <input
            type="text"
            id="title"
            value={task.title}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            disabled={isSubmitting}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            説明
          </label>
          <textarea
            id="description"
            value={task.description}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows={3}
            disabled={isSubmitting}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="priority"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            優先度
          </label>
          <select
            id="priority"
            value={task.priority}
            onChange={(e) =>
              setTask({
                ...task,
                priority: e.target.value as TaskPriority,
              })
            }
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            disabled={isSubmitting}
          >
            <option value="low">低</option>
            <option value="medium">中</option>
            <option value="high">高</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isSubmitting || !task.title.trim()}
        >
          {isSubmitting ? "作成中..." : "タスクを作成"}
        </button>
      </form>
    </div>
  );
}
