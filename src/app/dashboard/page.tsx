"use client";
import dynamic from "next/dynamic";

const DashboardContent = dynamic(() => import("@/components/Dashboard"), {
  loading: () => (
    <div className="flex items-center justify-center min-h-screen">
      Loading...
    </div>
  ),
});

export default function DashboardPage() {
  return <DashboardContent />;
}
