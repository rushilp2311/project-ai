"use server";

import { sql } from "@vercel/postgres";

export async function addComment(values: any) {
  try {
    const { comment, user, task } = values;

    const result =
      await sql`INSERT INTO comments (comment, commenter, task) VALUES (${comment}, ${user},  ${task})`;
  } catch (err) {
    throw err;
  }
}

export async function getCommentByTaskId(taskId: string) {
  try {
    const result =
      await sql`SELECT c.*, u.name as commenter FROM comments c INNER JOIN users u ON c.commenter = u.id WHERE c.task = ${taskId}`;

    return result.rows;
  } catch (err) {
    throw err;
  }
}
