import { useState } from "react";
import { useRouter } from "next/navigation";
import sendHttpRequest from "@/utils/http-call/HttpRequest";
import { AUTH_SIGNIN_URL } from "@/constants/service-url/auth-url-config";

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
        const response = await sendHttpRequest(AUTH_SIGNIN_URL, {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (response.status === 200) {
            // localStorage.setItem("auth_token", response.json);
            // router.push("/dashboard");
            console.log("Sign in successful:", response);
          } else {
            console.log("Sign in failed:", response);
            // console.error("Error signing in:", response.error);
            // setError(response.json.message || "An error occurred during sign-in.");
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