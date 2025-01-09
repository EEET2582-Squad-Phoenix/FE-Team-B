import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AUTH_REGISTER_URL } from "@/constants/service-url/auth-url-config";

export function useSignupDonor() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [language, setLanguage] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const password = searchParams.get("password");
  const role = searchParams.get("role");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!firstName.trim() || !lastName.trim()) {
      setError("First name and last name are required.");
      setLoading(false);
      return;
    }

    const payload = {
      email,
      password,
      role,
      firstName,
      lastName,
      address,
      language,
      avatar: avatar ? avatar.name : null,
      video: video ? video.name : null,
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

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setAvatar(e.target.files[0]);
    }
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setVideo(e.target.files[0]);
    }
  };

  return {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    address,
    setAddress,
    language,
    setLanguage,
    avatar,
    video,
    error,
    loading,
    handleSubmit,
    handleAvatarChange,
    handleVideoChange,
  };
}