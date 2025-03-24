import React from "react";
import { Task, TaskStatus } from "@/app/types/type";

type TaskItemProps = {
  task: Task;
  onStatusChange: (id: string, status: TaskStatus) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
};

export default function TaskItem({
  task,
  onStatusChange,
  onDelete,
}: TaskItemProps) {
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [isChangingStatus, setIsChangingStatus] = React.useState(false);

  const handleStatusChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newStatus = e.target.value as TaskStatus;
    setIsChangingStatus(true);
    try {
      await onStatusChange(task.id, newStatus);
    } finally {
      setIsChangingStatus(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("このタスクを削除してもよろしいですか？")) {
      setIsDeleting(true);
      try {
        await onDelete(task.id);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  // 優先度に応じたスタイル
  const priorityClasses = {
    high: "bg-red-100 text-red-800",
    medium: "bg-yellow-100 text-yellow-800",
    low: "bg-green-100 text-green-800",
  };

  // ステータスに応じたスタイル
  const statusClasses = {
    todo: "bg-gray-100 text-gray-800",
    "in-progress": "bg-blue-100 text-blue-800",
    done: "bg-green-100 text-green-800",
  };

  // 優先度の日本語表示
  const priorityLabels = {
    high: "高",
    medium: "中",
    low: "低",
  };

  // ステータスの日本語表示
  const statusLabels = {
    todo: "未着手",
    "in-progress": "進行中",
    done: "完了",
  };

  return (
    <div className="border rounded-lg p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h3 className="text-lg font-semibold">{task.title}</h3>
        <p className="text-gray-600 mb-2">{task.description}</p>
        <div className="flex space-x-2 mb-2 sm:mb-0">
          <span
            className={`text-xs px-2 py-1 rounded-full ${
              priorityClasses[task.priority]
            }`}
          >
            {priorityLabels[task.priority]}
          </span>
          <span
            className={`text-xs px-2 py-1 rounded-full ${
              statusClasses[task.status]
            }`}
          >
            {statusLabels[task.status]}
          </span>
          <span className="text-xs px-2 py-1 text-gray-500">
            {new Date(task.updatedAt).toLocaleString("ja-JP", {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      </div>

      <div className="flex space-x-2 mt-2 sm:mt-0">
        <select
          value={task.status}
          onChange={handleStatusChange}
          disabled={isChangingStatus}
          className="text-sm border rounded py-1 px-2 disabled:opacity-50"
        >
          <option value="todo">未着手</option>
          <option value="in-progress">進行中</option>
          <option value="done">完了</option>
        </select>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="bg-red-500 hover:bg-red-700 text-white text-sm py-1 px-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isDeleting ? "削除中..." : "削除"}
        </button>
      </div>
    </div>
  );
}
