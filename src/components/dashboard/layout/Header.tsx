// src/components/dashboard/layout/Header.tsx
"use client";

import { useRouter } from "next/navigation";
import { Menu, Bell, User } from "lucide-react";

export function Header() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
    });
    router.push("/login");
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Menu className="w-6 h-6 text-gray-800 dark:text-white cursor-pointer" />
        <h1 className="text-xl font-semibold text-gray-800 dark:text-white">Painel de Controlo</h1>
      </div>
      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600">
          <Bell className="w-5 h-5 text-gray-700 dark:text-white" />
          <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600">
          <User className="w-5 h-5 text-gray-700 dark:text-white" />
          <span className="text-sm text-gray-800 dark:text-white">Perfil</span>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Sair
        </button>
      </div>
    </header>
  );
}
