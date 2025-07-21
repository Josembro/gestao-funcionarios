// src/components/dashboard/layout/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Funcionários", href: "/funcionarios" },
    { label: "Solicitações", href: "/solicitacoes" },
    { label: "Documentos", href: "/documentos" },
  ];

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 h-screen p-4 shadow-md">
      <div className="text-lg font-bold mb-6 text-gray-700 dark:text-white">KUMBUKA</div>
      <nav className="flex flex-col gap-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`py-2 px-4 rounded transition-colors duration-150 ${
              pathname === item.href
                ? "bg-primary text-white"
                : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
