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

  console.log(result);
  return result.rows[0];
}
