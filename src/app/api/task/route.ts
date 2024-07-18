import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { title, description, assignee, status, projectId } = data;

    if (!title || !description || !assignee || !status) {
      return;
    }
    await sql`INSERT INTO tasks(title, description, status, assignee, project_id) VALUES (${title}, ${description}, ${status}, ${assignee}, ${projectId})`;
    return NextResponse.json({ message: "Task created" }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { error: `Internal Server Error: ${err.message}` },
      { status: 500 }
    );
  }
}

