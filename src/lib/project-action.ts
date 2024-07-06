"use server";
import { auth } from "@/auth";
import { sql } from "@vercel/postgres";

export async function addProject(formData: FormData) {
  const name = formData.get("name")?.toString();
  const description = formData.get("description")?.toString();

  if (!name || !description) return;
  const session = await auth();
  if (!session?.user) return;
  const email = session.user.email;

  try {
    const user = await sql`SELECT id FROM users WHERE email=${email}`;
    if (!user) return;
    await sql`INSERT INTO projects(name, description, owner) VALUES (${name}, ${description}, ${user.rows[0].id})`;
  } catch (err) {
    throw err;
  }
}
