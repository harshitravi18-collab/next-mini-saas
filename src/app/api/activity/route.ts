import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/auth";
import { listActivity } from "@/lib/activity";

export async function GET() {
  if (!(await isAuthed()))
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  return NextResponse.json({ items: listActivity() });
}
