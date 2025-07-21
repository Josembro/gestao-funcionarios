// src/app/api/auth/login/route.ts

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const {
      SUPABASE_URL,
      SUPABASE_SERVICE_ROLE_KEY,
      JWT_SECRET,
    } = process.env;

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY || !JWT_SECRET) {
      return NextResponse.json(
        { error: "Erro de configuração no servidor." },
        { status: 500 }
      );
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    const { email, senha } = await req.json();

    if (!email || !senha) {
      return NextResponse.json(
        { error: "Email e senha são obrigatórios." },
        { status: 400 }
      );
    }

    // Procurar utilizador no Supabase Auth
    const { data: userList, error: userError } = await supabase.auth.admin.listUsers();
    if (userError) {
      console.error("Erro ao listar utilizadores:", userError);
      return NextResponse.json(
        { error: "Erro ao verificar utilizador." },
        { status: 500 }
      );
    }

    const user = userList.users.find(u => u.email === email);
    if (!user) {
      return NextResponse.json(
        { error: "Utilizador não encontrado." },
        { status: 401 }
      );
    }

    const userId = user.id;

    // Buscar dados do funcionário
    const { data: funcionario, error: funcError } = await supabase
      .from("funcionario")
      .select("senha, role")
      .eq("id", userId)
      .maybeSingle();

    if (funcError || !funcionario) {
      return NextResponse.json({ error: "Credenciais inválidas." }, { status: 401 });
    }

    const isValid = await bcrypt.compare(senha, funcionario.senha);
    if (!isValid) {
      return NextResponse.json({ error: "Credenciais inválidas." }, { status: 401 });
    }

    const token = jwt.sign({ id: userId, role: funcionario.role }, JWT_SECRET, {
      expiresIn: "1h",
    });

    const res = NextResponse.json({ redirectTo: `/${funcionario.role}/dashboard` });

    res.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 3600,
    });

    return res;
  } catch (err) {
    console.error("Erro interno no login:", err);
    return NextResponse.json(
      { error: "Erro interno do servidor." },
      { status: 500 }
    );
  }
}
