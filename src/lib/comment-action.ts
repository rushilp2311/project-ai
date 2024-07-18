"use server";

import { sql } from "@vercel/postgres";

export async function addComment(values: any) {
  try {
    const { comment, user, task } = values;

    const result =
      await sql`INSERT INTO comments (comment, commenter, task) VALUES (${comment}, ${user},  ${task})`;
    console.log(result);
  } catch (err) {
    throw err;
  }
}
