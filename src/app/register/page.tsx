// src/app/register/page.tsx

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type Option = { id: string; nome: string };

type FormData = {
  nome_completo: string;
  email: string;
  senha: string;
  numero_agente: string;
  telefone: string;
  bi_numero: string;
  data_nascimento: string;
  nacionalidade: string;
  estado_civil: string;
  sexo: string;
  departamento_id: string;
  cargo_id: string;
};

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState<FormData>({
    nome_completo: "",
    email: "",
    senha: "",
    numero_agente: "",
    telefone: "",
    bi_numero: "",
    data_nascimento: "",
    nacionalidade: "",
    estado_civil: "",
    sexo: "",
    departamento_id: "",
    cargo_id: "",
  });
  const [departamentos, setDepartamentos] = useState<Option[]>([]);
  const [cargos, setCargos] = useState<Option[]>([]);
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch("/api/options/departamentos").then(res => res.json()),
      fetch("/api/options/cargos").then(res => res.json())
    ])
      .then(([d, c]) => {
        setDepartamentos(d);
        setCargos(c);
      })
      .catch(() => setErro("Erro ao carregar departamentos e cargos."));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");
    setLoading(true);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.redirected) {
      router.push(res.url);
    } else {
      const data = await res.json();
      setErro(data.error || "Erro ao registar.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white shadow rounded-xl p-8 w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-4 text-center">Registar Funcionário</h1>

        <form onSubmit={handleRegister} className="space-y-4">
          <input name="nome_completo" placeholder="Nome completo" value={form.nome_completo} onChange={handleChange} required className="w-full border p-2 rounded" />
          <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required className="w-full border p-2 rounded" />
          <input name="senha" type="password" placeholder="Senha" value={form.senha} onChange={handleChange} required className="w-full border p-2 rounded" />
          <input name="numero_agente" placeholder="Número de agente" value={form.numero_agente} onChange={handleChange} required className="w-full border p-2 rounded" />

          <div className="flex gap-4">
            <select name="departamento_id" value={form.departamento_id} onChange={handleChange} required className="w-full border p-2 rounded">
              <option value="">Selecionar departamento</option>
              {departamentos.map(d => <option key={d.id} value={d.id}>{d.nome}</option>)}
            </select>
            <select name="cargo_id" value={form.cargo_id} onChange={handleChange} required className="w-full border p-2 rounded">
              <option value="">Selecionar cargo</option>
              {cargos.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
            </select>
          </div>

          <input name="telefone" placeholder="Telefone" value={form.telefone} onChange={handleChange} className="w-full border p-2 rounded" />
          <input name="bi_numero" placeholder="BI" value={form.bi_numero} onChange={handleChange} className="w-full border p-2 rounded" />

          <div className="flex gap-4">
            <input type="date" name="data_nascimento" value={form.data_nascimento} onChange={handleChange} className="w-full border p-2 rounded" />
            <select name="sexo" value={form.sexo} onChange={handleChange} className="w-full border p-2 rounded">
              <option value="">Sexo</option>
              <option value="M">Masculino</option>
              <option value="F">Feminino</option>
            </select>
          </div>

          <input name="nacionalidade" placeholder="Nacionalidade" value={form.nacionalidade} onChange={handleChange} className="w-full border p-2 rounded" />
          <input name="estado_civil" placeholder="Estado civil" value={form.estado_civil} onChange={handleChange} className="w-full border p-2 rounded" />

          {erro && <p className="text-red-500 text-sm">{erro}</p>}

          <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50">
            {loading ? "A registar..." : "Registar"}
          </button>
        </form>
      </div>
    </div>
  );
}
