// src/lib/auth/authorize.ts

import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

export type Role = "admin" | "rh" | "diretor" | "funcionario";

export function authorize(
  allowedRoles: Role[],
  handler: (req: NextRequest) => Promise<NextResponse>
) {
  return async function (req: NextRequest): Promise<NextResponse> {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll: () => req.cookies.getAll(),
          setAll: () => {},
        },
      }
    );

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    const { data: usuario } = await supabase
      .from("usuario")
      .select("role")
      .eq("auth_id", user.id)
      .single();

    if (!usuario || !allowedRoles.includes(usuario.role)) {
      return NextResponse.json({ error: "Acesso negado" }, { status: 403 });
    }

    return handler(req);
  };
}
