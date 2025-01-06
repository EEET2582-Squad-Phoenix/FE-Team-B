import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const withAuth = (WrappedComponent: React.ComponentType) => {
    return (props: any) => {
      const router = useRouter();
      const [isAuthenticated, setIsAuthenticated] = useState(false);
  
      useEffect(() => {
        if (typeof window !== "undefined") {
          const token = localStorage.getItem("token");
          if (!token) {
            router.push("/signin");
          } else {
            setIsAuthenticated(true);
          }
        }
      }, [router]);
  
      if (!isAuthenticated) {
        return null; // or a redirect to signin page
      }
  
      return <WrappedComponent {...props} />;
    };
  };
  
  export default withAuth;