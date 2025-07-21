// src/components/dashboard/DashboardAdmin.tsx

import { Card, CardContent } from "@/components/ui/card";
import { Users, Settings, ShieldCheck, Bell } from "lucide-react";

export default function DashboardAdmin() {
  return (
    <div className="p-6 grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
      <Card className="shadow-xl">
        <CardContent className="flex flex-col gap-2 p-4">
          <h2 className="text-xl font-semibold">Gestão de Utilizadores</h2>
          <p className="text-gray-600">Controlar contas, papéis e permissões.</p>
          <ShieldCheck className="text-primary w-5 h-5" />
        </CardContent>
      </Card>
      <Card className="shadow-xl">
        <CardContent className="flex flex-col gap-2 p-4">
          <h2 className="text-xl font-semibold">Parâmetros do Sistema</h2>
          <p className="text-gray-600">Definir regras, enums e configurações globais.</p>
          <Settings className="text-primary w-5 h-5" />
        </CardContent>
      </Card>
      <Card className="shadow-xl">
        <CardContent className="flex flex-col gap-2 p-4">
          <h2 className="text-xl font-semibold">Notificações</h2>
          <p className="text-gray-600">Alertas do sistema e monitorização.</p>
          <Bell className="text-primary w-5 h-5" />
        </CardContent>
      </Card>
      <Card className="shadow-xl">
        <CardContent className="flex flex-col gap-2 p-4">
          <h2 className="text-xl font-semibold">Estatísticas Globais</h2>
          <p className="text-gray-600">Total de utilizadores, cargos e acessos.</p>
          <Users className="text-primary w-5 h-5" />
        </CardContent>
      </Card>
    </div>
  );
}
