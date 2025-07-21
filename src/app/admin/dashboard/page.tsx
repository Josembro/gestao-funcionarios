// src/app/admin/dashboard/page.tsx
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardAdmin from "@/components/dashboard/DashboardAdmin";

export default function AdminDashboardPage() {
  return (
    <DashboardLayout>
      <DashboardAdmin />
    </DashboardLayout>
  );
}
