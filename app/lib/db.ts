// import { prisma } from "./prisma";

import { Task, TaskPriority, TaskStatus } from "../types/type";
import { mutableMockTasks } from "./mockdata";

// // タスク関連の操作
// export const tasks = {
//   // すべてのタスクを取得
//   async getAll() {
//     return prisma.task.findMany({
//       orderBy: { updatedAt: "desc" },
//     });
//   },

//   // タスクの取得
//   async getById(id: string) {
//     return prisma.task.findUnique({
//       where: { id },
//     });
//   },

//   // タスクの作成
//   async create(data: {
//     title: string;
//     description?: string;
//     status?: string;
//     priority?: string;
//   }) {
//     return prisma.task.create({
//       data,
//     });
//   },

//   // タスクの更新
//   async update(
//     id: string,
//     data: {
//       title?: string;
//       description?: string;
//       status?: string;
//       priority?: string;
//     }
//   ) {
//     return prisma.task.update({
//       where: { id },
//       data,
//     });
//   },

//   // タスクの削除
//   async delete(id: string) {
//     return prisma.task.delete({
//       where: { id },
//     });
//   },
// };

// タスク関連の操作
export const tasks = {
  // すべてのタスクを取得
  async getAll() {
    // 更新日時の降順でソート
    return [...mutableMockTasks].sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  },

  // タスクの取得
  async getById(id: string) {
    return mutableMockTasks.find((task) => task.id === id) || null;
  },

  // タスクの作成
  async create(data: {
    title: string;
    description?: string;
    status?: TaskStatus;
    priority?: TaskPriority;
  }): Promise<Task> {
    const newTask: Task = {
      id: String(Date.now()), // ユニークIDを生成
      title: data.title,
      description: data.description || null,
      status: data.status || "todo",
      priority: data.priority || "medium",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // モックデータに追加
    mutableMockTasks.push(newTask);

    return newTask;
  },

  // タスクの更新
  async update(
    id: string,
    data: {
      title?: string;
      description?: string;
      status: TaskStatus;
      priority: TaskPriority;
    }
  ): Promise<Task> {
    const taskIndex = mutableMockTasks.findIndex((task) => task.id === id);
    if (taskIndex === -1) {
      throw new Error("Task not found");
    }

    const updatedTask = {
      ...mutableMockTasks[taskIndex],
      ...data,
      updatedAt: new Date().toISOString(),
    };

    mutableMockTasks[taskIndex] = updatedTask;
    return updatedTask;
  },

  // タスクの削除
  async delete(id: string) {
    const taskIndex = mutableMockTasks.findIndex((task) => task.id === id);
    if (taskIndex === -1) {
      throw new Error("Task not found");
    }

    mutableMockTasks.splice(taskIndex, 1);
    return { success: true };
  },
};
