import { useState } from "react";
import {
  AUTH_GET_ME_URL,
  AUTH_LOGIN_URL,
} from "@/constants/service-url/auth-url-config";
import { useRouter } from "next/navigation";

export function useSignin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(AUTH_LOGIN_URL, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }); // Send login request

      const data = await response.json();

      if (response.ok && !data.error) {
        const userResponse = await fetch(AUTH_GET_ME_URL, {
          method: "GET",
          credentials: "include",
        }); // Get user data after successful login
        const userData = await userResponse.json();

        if (userResponse.status === 200) {
          switch (userData.role) {
            case "DONOR":
              console.log("Donor");
              router.push("http://localhost:3001/donor");
              break; // Redirect to dashboard if user is an admin
            case "CHARITY":
              console.log("Charity");
              router.push("http://localhost:3001/organization");
              break; // Redirect to organization page if user is a charity
            case "ADMIN":
              console.log("Admin");  
              router.push("http://localhost:3000/dashboard");
              break; // Redirect to admin page if user is an admin
            default:
              console.log("Role unknown");
              router.push("/");
              break; // Redirect to home page if user role is unknown
          }
        } else {
          setError("Failed to get user data"); // Display error message if user data fetch fails
        }
      } else {
        setError(data.error); // Display error message if login fails
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    loading,
    handleSubmit,
  };
}
