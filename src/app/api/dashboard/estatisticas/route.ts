// src/api/dashboard/estatisticas/route.ts
import { NextRequest, NextResponse } from "next/server";
import { authorize } from "@/lib/auth/authorize";

export const GET = authorize(["admin", "diretor"], async (req: NextRequest) => {
  return NextResponse.json({
    total_funcionarios: 120,
    ativos: 110,
    em_ferias: 10,
  });
});
