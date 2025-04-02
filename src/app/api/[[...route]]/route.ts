import { Hono } from "hono";
import { handle } from "hono/vercel";
import { cors } from "hono/cors";
import { tasks } from "../../../server/lib/db";

// Hono アプリケーションのインスタンス化
const app = new Hono().basePath("/api");

// CORS ミドルウェアの設定
app.use(
  "*",
  cors({
    origin: "*",
    allowMethods: ["GET", "POST", "PUT", "DELETE"],
    allowHeaders: ["Content-Type"],
  })
);

// ヘルスチェックエンドポイント
app.get("/health", (c) => {
  return c.json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});

// タスク関連のエンドポイント
// タスク一覧の取得
app.get("/tasks", async (c) => {
  try {
    const allTasks = await tasks.getAll();
    return c.json({ tasks: allTasks });
  } catch (error) {
    console.error("Get tasks error:", error);
    return c.json({ error: "Failed to get tasks" }, 500);
  }
});

// タスクの詳細取得
app.get("/tasks/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const task = await tasks.getById(id);

    if (!task) {
      return c.json({ error: "Task not found" }, 404);
    }

    return c.json(task);
  } catch (error) {
    console.error("Get task error:", error);
    return c.json({ error: "Failed to get task" }, 500);
  }
});

// タスクの作成
app.post("/tasks", async (c) => {
  try {
    const body = await c.req.json();

    if (!body.title) {
      return c.json({ error: "Title is required" }, 400);
    }

    const newTask = await tasks.create({
      title: body.title,
      description: body.description || "",
      status: body.status || "todo",
      priority: body.priority || "medium",
    });

    return c.json(newTask, 201);
  } catch (error) {
    console.error("Create task error:", error);
    return c.json({ error: "Failed to create task" }, 500);
  }
});

// タスクの更新
app.put("/tasks/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();

    // タスクが存在するか確認
    const existingTask = await tasks.getById(id);

    if (!existingTask) {
      return c.json({ error: "Task not found" }, 404);
    }

    const updatedTask = await tasks.update(id, {
      title: body.title,
      description: body.description,
      status: body.status,
      priority: body.priority,
    });

    return c.json(updatedTask);
  } catch (error) {
    console.error("Update task error:", error);
    return c.json({ error: "Failed to update task" }, 500);
  }
});

// タスクの削除
app.delete("/tasks/:id", async (c) => {
  try {
    const id = c.req.param("id");

    // タスクが存在するか確認
    const existingTask = await tasks.getById(id);

    if (!existingTask) {
      return c.json({ error: "Task not found" }, 404);
    }

    await tasks.delete(id);

    return c.json({ success: true });
  } catch (error) {
    console.error("Delete task error:", error);
    return c.json({ error: "Failed to delete task" }, 500);
  }
});

// Vercel アダプターを使用
export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);
export const PATCH = handle(app);

// import { Hono } from "hono";
// import { handle } from "hono/vercel";
// import { cors } from "hono/cors";
// import { tasks } from "@/app/lib/db";

// // Hono アプリケーションのインスタンス化
// const app = new Hono().basePath("/api");

// // CORS ミドルウェアの設定
// app.use(
//   "*",
//   cors({
//     origin: "*",
//     allowMethods: ["GET", "POST", "PUT", "DELETE"],
//     allowHeaders: ["Content-Type"],
//   })
// );

// // ヘルスチェックエンドポイント
// app.get("/health", (c) => {
//   return c.json({
//     status: "ok",
//     timestamp: new Date().toISOString(),
//   });
// });

// // タスク関連のエンドポイント
// // タスク一覧の取得
// app.get("/tasks", async (c) => {
//   try {
//     const allTasks = await tasks.getAll();
//     return c.json({ tasks: allTasks });
//   } catch (error) {
//     console.error("Get tasks error:", error);
//     return c.json({ error: "Failed to get tasks" }, 500);
//   }
// });

// // タスクの詳細取得
// app.get("/tasks/:id", async (c) => {
//   try {
//     const id = c.req.param("id");
//     const task = await tasks.getById(id);

//     if (!task) {
//       return c.json({ error: "Task not found" }, 404);
//     }

//     return c.json(task);
//   } catch (error) {
//     console.error("Get task error:", error);
//     return c.json({ error: "Failed to get task" }, 500);
//   }
// });

// // タスクの作成
// app.post("/tasks", async (c) => {
//   try {
//     const body = await c.req.json();

//     if (!body.title) {
//       return c.json({ error: "Title is required" }, 400);
//     }

//     const newTask = await tasks.create({
//       title: body.title,
//       description: body.description || "",
//       status: body.status || "todo",
//       priority: body.priority || "medium",
//     });

//     return c.json(newTask, 201);
//   } catch (error) {
//     console.error("Create task error:", error);
//     return c.json({ error: "Failed to create task" }, 500);
//   }
// });

// // タスクの更新
// app.put("/tasks/:id", async (c) => {
//   try {
//     const id = c.req.param("id");
//     const body = await c.req.json();

//     // タスクが存在するか確認
//     const existingTask = await tasks.getById(id);

//     if (!existingTask) {
//       return c.json({ error: "Task not found" }, 404);
//     }

//     const updatedTask = await tasks.update(id, {
//       title: body.title,
//       description: body.description,
//       status: body.status,
//       priority: body.priority,
//     });

//     return c.json(updatedTask);
//   } catch (error) {
//     console.error("Update task error:", error);
//     return c.json({ error: "Failed to update task" }, 500);
//   }
// });

// // タスクの削除
// app.delete("/tasks/:id", async (c) => {
//   try {
//     const id = c.req.param("id");

//     // タスクが存在するか確認
//     const existingTask = await tasks.getById(id);

//     if (!existingTask) {
//       return c.json({ error: "Task not found" }, 404);
//     }

//     await tasks.delete(id);

//     return c.json({ success: true });
//   } catch (error) {
//     console.error("Delete task error:", error);
//     return c.json({ error: "Failed to delete task" }, 500);
//   }
// });

// // Vercel アダプターを使用
// export const GET = handle(app);
// export const POST = handle(app);
// export const PUT = handle(app);
// export const DELETE = handle(app);
// export const PATCH = handle(app);
