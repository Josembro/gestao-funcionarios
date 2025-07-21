// src/app/page.tsx

import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Coluna esquerda — Conteúdo */}
      <div className="flex-1 flex flex-col justify-center px-10 py-20">
        <h1 className="text-5xl font-bold text-gray-800 mb-6">
          Gestão de Funcionários
        </h1>
        <p className="text-gray-600 text-lg mb-8 max-w-md">
          Sistema corporativo robusto para gerir e acompanhar o desempenho da sua equipa. 
          Melhore a eficiência e mantenha controlo total.
        </p>

        <div className="flex flex-col md:flex-row gap-4">
          <Link href="/login">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition">
              Iniciar Sessão
            </button>
          </Link>

          <Link href="/register">
            <button className="bg-gray-200 text-gray-800 px-6 py-3 rounded-xl font-medium hover:bg-gray-300 transition">
              Registar Conta
            </button>
          </Link>
        </div>

        <p className="mt-12 text-xs text-gray-400">
          &copy; {new Date().getFullYear()} Sistema Corporativo. Todos os direitos reservados.
        </p>
      </div>

      {/* Coluna direita — Imagem */}
      <div className="hidden md:block md:flex-1 bg-blue-100">
        <img
          src="/corporate-team.jpg"
          alt="Equipa corporativa"
          className="w-full h-full object-cover"
        />
      </div>
    </main>
  );
}
