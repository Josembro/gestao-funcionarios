// src/app/funcionario/dashboard/page.tsx
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardFuncionario from "@/components/dashboard/DashboardFuncionario";

export default function FuncionarioDashboardPage() {
  return (
    <DashboardLayout>
      <DashboardFuncionario />
    </DashboardLayout>
  );
}
