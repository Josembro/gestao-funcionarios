// src/app/api/auth/register/route.ts

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, JWT_SECRET } = process.env;

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY || !JWT_SECRET) {
      return NextResponse.json(
        { error: "As variáveis SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY e JWT_SECRET são obrigatórias." },
        { status: 500 }
      );
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    const body = await req.json();

    const {
      nome_completo,
      email,
      senha,
      numero_agente,
      telefone,
      bi_numero,
      data_nascimento,
      nacionalidade,
      estado_civil,
      sexo,
      departamento_id,
      cargo_id,
      role,
    } = body;

    if (!nome_completo || !email || !senha || !numero_agente || !departamento_id || !cargo_id) {
      return NextResponse.json(
        { error: "Preencha todos os campos obrigatórios." },
        { status: 400 }
      );
    }

    const { data: existente } = await supabase
      .from("funcionario")
      .select("id")
      .or(`email.eq.${email},numero_agente.eq.${numero_agente},bi_numero.eq.${bi_numero}`)
      .maybeSingle();

    if (existente) {
      return NextResponse.json(
        { error: "Funcionário já registado com este email, BI ou número de agente." },
        { status: 409 }
      );
    }

    const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
      email,
      password: senha,
      user_metadata: { email_verified: true },
      email_confirm: true
    });

    if (authError || !authUser?.user?.id) {
      console.error("Erro ao criar auth user:", authError);
      return NextResponse.json({ error: "Falha no registo de login." }, { status: 500 });
    }

    const hashed = await bcrypt.hash(senha, 10);

    const { data, error } = await supabase
      .from("funcionario")
      .insert({
        id: authUser.user.id,
        nome_completo,
        email,
        senha: hashed,
        numero_agente,
        telefone: telefone || null,
        bi_numero: bi_numero || null,
        data_nascimento: data_nascimento || null,
        nacionalidade: nacionalidade || null,
        estado_civil: estado_civil || null,
        sexo: sexo || null,
        departamento_id,
        cargo_id,
        role: role || "funcionario",
      })
      .select()
      .single();

    if (error || !data) {
      console.error(error);
      return NextResponse.json({ error: "Erro ao registar funcionário." }, { status: 500 });
    }

    const token = jwt.sign({ id: data.id, role: data.role }, JWT_SECRET, { expiresIn: "1h" });

    const res = NextResponse.redirect(new URL(`/${data.role}/dashboard`, req.url));
    res.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 3600,
    });

    return res;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Erro interno do servidor." }, { status: 500 });
  }
}
