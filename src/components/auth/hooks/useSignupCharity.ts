import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AUTH_REGISTER_URL } from "@/constants/service-url/auth-url-config";
import { Charity } from "@/types/Charity";

export function useSignupCharity() {
  const [charity, setCharity] = useState<Partial<Charity>>({
    name: "",
    address: "",
    taxCode: "",
    type: "individual",
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

    if (!charity.name?.trim() || !charity.address?.trim() || !charity.taxCode?.trim() || !charity.type?.trim()) {
      setError("You need to fill in all the mandatory fields.");
      setLoading(false);
      return;
    }

    const payload: Partial<Charity> = {
      ...charity,
      email: email || "",
      password: password || "",
      role: "CHARITY",
    };

    try {
      const response = await fetch(AUTH_REGISTER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.text();

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

  const handleInputChange = (field: keyof Charity) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setCharity({ ...charity, [field]: e.target.value });
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCharity({ ...charity, avatar: e.target.files[0].name });
    }
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCharity({ ...charity, video: e.target.files[0].name });
    }
  };

  return {
    charity,
    error,
    loading,
    handleSubmit,
    handleInputChange,
    handleAvatarChange,
    handleVideoChange,
  };
}