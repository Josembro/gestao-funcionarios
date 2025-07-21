// src/app/dashboard/page.tsx
'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import jwt from "jsonwebtoken";

export default function DashboardRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find(row => row.startsWith("token="))
      ?.split("=")[1];

    if (!token) {
      router.replace("/login");
      return;
    }

    try {
      const payload = jwt.decode(token) as { role: string };
      const role = payload?.role?.toLowerCase();
      if (role) router.replace(`/${role}/dashboard`);
      else router.replace("/login");
    } catch {
      router.replace("/login");
    }
  }, [router]);

  return null; // ou spinner
}
