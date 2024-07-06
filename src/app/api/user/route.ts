import { signUpSchema } from "@/util/zodSchema";
import bcrypt from "bcrypt";
import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";
import { GetUserRequestType } from "@/types/User";
import { count } from "console";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, password } = await signUpSchema.parseAsync(data);

    const salt = await bcrypt.genSalt(10);
    const pwHash = await bcrypt.hash(password, salt);

    await sql`INSERT INTO users (name, email, password) VALUES (${name}, ${email},  ${pwHash});`;
    return NextResponse.json({ message: "User created" }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { error: `Internal Server Error: ${err.message}` },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    console.log(request.nextUrl.searchParams);
    const searchType = request.nextUrl.searchParams.get("searchType");
    const searchText = request.nextUrl.searchParams.get("searchText");
    const field = request.nextUrl.searchParams.get("field");

    if (searchType === "fuzzySearch") {
      if (!searchText)
        return NextResponse.json(
          {
            message: "Search text required with fuzzySearch option.",
          },
          { status: 400 }
        );
      const result =
        await sql`SELECT id, name, email FROM users ORDER BY LEVENSHTEIN(name, ${searchText}) ASC LIMIT 5`;
      return NextResponse.json(
        { data: result.rows, count: result.rowCount },
        { status: 200 }
      );
    }
  } catch (err: any) {
    return NextResponse.json(
      { error: `Internal Server Error: ${err.message}` },
      { status: 500 }
    );
  }
}
