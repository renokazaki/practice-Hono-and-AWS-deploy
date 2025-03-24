import React from "react";
import TaskItem from "./taskItem";
import { Task, TaskStatus } from "@/app/types/type";

type TaskListProps = {
  tasks: Task[];
  loading: boolean;
  onStatusChange: (id: string, status: TaskStatus) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
};

export default function TaskList({
  tasks,
  loading,
  onStatusChange,
  onDelete,
}: TaskListProps) {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="bg-gray-50 rounded-lg p-8 text-center">
        <p className="text-gray-500">タスクがありません</p>
        <p className="text-gray-400 text-sm mt-2">
          上のフォームから新しいタスクを作成してください
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onStatusChange={onStatusChange}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
