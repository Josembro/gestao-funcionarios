// src/components/dashboard/DashboardDiretor.tsx

import { Card, CardContent } from "@/components/ui/card";
import { Users, CalendarCheck, FileText, BarChart2, Bell } from "lucide-react";

export default function DashboardDiretor() {
  return (
    <div className="p-6 grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
      <Card className="shadow-xl">
        <CardContent className="flex flex-col gap-2 p-4">
          <h2 className="text-xl font-semibold">Visão Geral de Recursos Humanos</h2>
          <p className="text-gray-600">Ver o estado atual dos funcionários e admissões.</p>
          <Users className="text-primary w-5 h-5" />
        </CardContent>
      </Card>

      <Card className="shadow-xl">
        <CardContent className="flex flex-col gap-2 p-4">
          <h2 className="text-xl font-semibold">Solicitações Recentes</h2>
          <p className="text-gray-600">Analisar pedidos pendentes de aprovação superior.</p>
          <FileText className="text-primary w-5 h-5" />
        </CardContent>
      </Card>

      <Card className="shadow-xl">
        <CardContent className="flex flex-col gap-2 p-4">
          <h2 className="text-xl font-semibold">Resumo de Férias</h2>
          <p className="text-gray-600">Acompanhar ausências e férias por departamento.</p>
          <CalendarCheck className="text-primary w-5 h-5" />
        </CardContent>
      </Card>

      <Card className="shadow-xl">
        <CardContent className="flex flex-col gap-2 p-4">
          <h2 className="text-xl font-semibold">Notificações Institucionais</h2>
          <p className="text-gray-600">Alertas administrativos e de desempenho.</p>
          <Bell className="text-primary w-5 h-5" />
        </CardContent>
      </Card>

      <Card className="shadow-xl">
        <CardContent className="flex flex-col gap-2 p-4">
          <h2 className="text-xl font-semibold">Indicadores Estratégicos</h2>
          <p className="text-gray-600">Relatórios de desempenho e métricas chave.</p>
          <BarChart2 className="text-primary w-5 h-5" />
        </CardContent>
      </Card>
    </div>
  );
}
