"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const DashboardContent = dynamic(() => import("@/components/Dashboard"), {
  loading: () => (
    <div className="flex items-center justify-center min-h-screen">
      Loading...
    </div>
  ),
});

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      router.push("/signin");
    }
  } , [router]);
  return <DashboardContent />;
}

// function DashboardPage() {
//   return <DashboardContent />;
// }

// export default withAuth(DashboardPage);