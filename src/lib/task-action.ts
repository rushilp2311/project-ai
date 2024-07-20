"use server";

import { sql } from "@vercel/postgres";

export async function getTasks(projectId: string) {
  const result =
    await sql`SELECT t.*, u.name as assignee_name FROM tasks t INNER JOIN users u ON u.id = t.assignee WHERE project_id=${projectId}`;

  return result.rows;
}

export async function getTaskById(taskId: string) {
  const result =
    await sql`SELECT t.*, u.name as assignee_name FROM tasks t INNER JOIN users u ON u.id = t.assignee WHERE t.id=${taskId}`;

  return result.rows[0];
}

export async function updateTask(task: any, comment_summary: string) {
  try {
    const { description, status, id } = task;

    const result =
     await sql`UPDATE tasks SET comment_summary=${comment_summary}, description=${description}, status=${status} WHERE id=${id}`;

  } catch (err) {
    throw err;
  }
}
