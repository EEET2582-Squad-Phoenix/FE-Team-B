import { useState } from "react";
import { useRouter } from "next/navigation";
import { AUTH_CHECK_EMAIL_URL } from "@/constants/service-url/auth-url-config";

export function useSignup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("DONOR");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCheckEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!email.trim() || !password.trim()) {
      setError("Email and password are required.");
      setLoading(false);
      return;
    } // Check if email and password are provided

    try {
      const response = await fetch(AUTH_CHECK_EMAIL_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }); // Send email check request

      if (response.ok) {
        const nextPage = role === "DONOR" ? "/signup/donor" : "/signup/charity"; // Redirect to the appropriate signup page
        const queryString = `?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`; // Pass email and password as query params
        router.push(nextPage + queryString); // Redirect to the next page with query params
      } else if (response.status === 409) {
        setError("Email already exists. Please use a different email."); // Display error message if email already exists
      } else {
        const errorText = await response.text();
        setError(`Error: ${errorText}`);
      }
    } catch (err) {
      setError("An error occurred while checking the email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    role,
    setRole,
    error,
    loading,
    handleCheckEmail,
  };
}