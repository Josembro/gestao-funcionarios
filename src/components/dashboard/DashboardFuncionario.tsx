// src/components/dashboard/DashboardFuncionario.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Bell, CalendarCheck, FileText } from "lucide-react";

export default function DashboardFuncionario() {
  return (
    <div className="p-6 grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
      <Card className="shadow-xl">
        <CardContent className="flex flex-col gap-2 p-4">
          <h2 className="text-xl font-semibold">Minhas Férias</h2>
          <p className="text-gray-600">Consultar histórico e próximas férias.</p>
          <CalendarCheck className="text-primary w-5 h-5" />
        </CardContent>
      </Card>
      <Card className="shadow-xl">
        <CardContent className="flex flex-col gap-2 p-4">
          <h2 className="text-xl font-semibold">Meus Documentos</h2>
          <p className="text-gray-600">Ver BI, NIF, contratos, certificados.</p>
          <FileText className="text-primary w-5 h-5" />
        </CardContent>
      </Card>
      <Card className="shadow-xl">
        <CardContent className="flex flex-col gap-2 p-4">
          <h2 className="text-xl font-semibold">Notificações</h2>
          <p className="text-gray-600">Avisos recentes do RH e do sistema.</p>
          <Bell className="text-primary w-5 h-5" />
        </CardContent>
      </Card>
    </div>
  );
}
