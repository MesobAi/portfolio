import type { Metadata } from "next";
import { Suspense } from "react";
import { getAdminData } from "@/lib/data";
import { AdminDashboard } from "@/components/admin/dashboard";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const data = await getAdminData();

  return (
    <Suspense fallback="Loading dashboard…">
      <AdminDashboard data={data} />
    </Suspense>
  );
}
