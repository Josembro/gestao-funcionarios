// src/app/api/usuarios/route.ts

import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Rota usuários activa." });
}
