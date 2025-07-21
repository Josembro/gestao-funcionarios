// src/app/api/solicitacoes/route.ts

import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Rota solicitações activa." });
}
