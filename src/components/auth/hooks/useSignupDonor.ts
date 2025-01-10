import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AUTH_REGISTER_URL } from "@/constants/service-url/auth-url-config";
import { Donor } from "@/types/Donor";

export function useSignupDonor() {
  const [donor, setDonor] = useState<Partial<Donor>>({
    firstName: "",
    lastName: "",
    address: "",
    language: "Vietnamese",
    avatar: null,
    video: null,
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const password = searchParams.get("password");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!donor.firstName?.trim() || !donor.lastName?.trim()) {
      setError("First name and last name are required.");
      setLoading(false);
      return;
    }

    const payload: Partial<Donor> = {
      ...donor,
      email: email || "",
      password: password || "",
      role: "DONOR",
    };

    try {
      const response = await fetch(AUTH_REGISTER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Registration successful:", data);
        router.push("/signin");
      } else {
        console.error("Error signing up:", data);
        setError(data);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof Donor) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setDonor({ ...donor, [field]: e.target.value });
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setDonor({ ...donor, avatar: e.target.files[0].name });
    }
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setDonor({ ...donor, video: e.target.files[0].name });
    }
  };

  return {
    donor,
    error,
    loading,
    handleSubmit,
    handleInputChange,
    handleAvatarChange,
    handleVideoChange,
  };
}