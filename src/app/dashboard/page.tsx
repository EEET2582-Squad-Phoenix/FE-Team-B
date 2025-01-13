"use client";

import { AUTH_GET_ME_URL, AUTH_LOGOUT_URL } from "@/constants/service-url/auth-url-config";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const DashboardContent = dynamic(() => import("@/components/Dashboard"), {
  loading: () => (
    <div className="flex items-center justify-center min-h-screen">
      Loading...
    </div>
  ),
});

export default function DashboardPage() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkAccess = async () => {
      try {
        const response = await fetch(AUTH_GET_ME_URL, {
          method: "GET",
          credentials: "include",
        }); // Check if user is authorized

        const user = await response.json();
        if (user.role === "ADMIN") {
          setIsAuthorized(true);
        } else {
          // await fetch(AUTH_LOGOUT_URL, {
          //   method: "GET",
          //   credentials: "include",
          // }); // Logout if unauthorized and send user back to signin page
          router.push("/signin");
        }
      } catch (error) {
        console.error("Failed to verify user role:", error);
        router.push("/signin"); // Redirect to login if unauthorized
      }
    };

    checkAccess();
  }, [router]);

  // Show a loading screen while validating access
  if (!isAuthorized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Checking access...
      </div>
    );
  }

  return <DashboardContent />;
}
