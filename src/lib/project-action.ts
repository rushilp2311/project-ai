"use server";
import { auth } from "@/auth";
import { sql } from "@vercel/postgres";
import { redirect } from "next/navigation";

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
    redirect("/dashboard");
  } catch (err) {
    throw err;
  }
}

export async function getAllProjectsForCurrentOwner({
  forDashboard,
}: {
  forDashboard?: boolean;
}) {
  try {
    const session = await auth();
    if (!session?.user) return;

    const query = `SELECT * FROM projects`;

    if (forDashboard) {
      query.concat(" LIMIT 5");
    }

    const result = await sql.query(query);

    return {
      data: result.rows,
      queryCount: result.rowCount,
    };
  } catch (err) {
    throw err;
  }
}
