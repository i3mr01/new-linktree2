import { redirect } from "next/navigation";
import { requireUserServer } from "@/lib/auth";
import DashboardClient from "@/components/dashboard/DashboardClient";

export default async function DashboardPage() {
  try {
    await requireUserServer();
  } catch {
    redirect("/login");
  }

  return <DashboardClient />;
}


