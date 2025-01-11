import { useState } from "react";
import sendHttpRequest from "@/utils/http-call/HttpRequest";
import {
  AUTH_GET_ME_URL,
  AUTH_SIGNIN_URL,
} from "@/constants/service-url/auth-url-config";
import router from "next/router";

export function useSignin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(AUTH_SIGNIN_URL, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok && !data.error) {
        const userResponse = await fetch(AUTH_GET_ME_URL, {
          method: "GET",
          credentials: "include",
        });
        const userData = await userResponse.json();

        switch (userData.role) {
          case "DONOR":
            router.push("http://localhost:3001/donor");
            console.log("Donor");
            break;
          case "CHARITY":
            router.push("http://localhost:3001/organization");
            console.log("Charity");
            break;
          default:
            window.location.href = "/dashboard";
            console.log("Admin");
            break;
        }
      } else {
        setError(data.error);
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
