// src/app/api/options/departamentos/route.ts

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data, error } = await supabase
    .from("departamento")
    .select("id, nome")
    .order("nome");

  if (error) {
    return NextResponse.json({ error: "Erro ao buscar departamentos." }, { status: 500 });
  }

  return NextResponse.json(data);
}
