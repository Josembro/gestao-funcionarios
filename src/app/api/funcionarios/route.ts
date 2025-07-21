// src/app/api/funcionarios/route.ts

import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Rota funcionários activa." });
}
