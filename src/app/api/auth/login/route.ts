import { NextResponse } from "next/server";
import { setSession } from "@/lib/auth";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as null | {
    email?: string;
    password?: string;
  };
  const email = body?.email?.trim() ?? "";
  const password = body?.password ?? "";

  if (email === "demo@demo.com" && password === "password") {
    await setSession();
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json(
    { ok: false, message: "Invalid credentials" },
    { status: 401 }
  );
}
