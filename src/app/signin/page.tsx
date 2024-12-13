"use client";

import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

export default function Signin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            // Make API request to the backend
            const response = await fetch("http://localhost:8080/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.text(); // Backend sends response as a string

            if (response.ok) {
                console.log("Signin successful:", data);

                // You can save the token or result to localStorage/sessionStorage if needed:
                // localStorage.setItem("authToken", data);

                // Redirect the user to a protected route after successful sign-in
                window.location.href = "/dashboard"; // Example: redirect to dashboard
            } else {
                console.error("Error signing in:", data);
                setError(data); // Display error message from backend
            }
        } catch (err) {
            console.error("Unexpected error:", err);
            setError("Something went wrong. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex h-screen bg-white">
            {/* Left Image Section */}
            <div className=" md:flex w-1/2 h-full">
                <img
                    src="/background.jpg"
                    alt="background"
                    className="object-cover w-full h-full"
                />
            </div>

            {/* Right Form Section */}
            <div className="flex justify-center w-1/2 p-10">
                <div className="bg-white rounded-lg w-full mx-auto p-10">
                    {/* Sign In Heading */}
                    <h2 className="text-2xl font-bold text-left my-4">Sign in</h2>

                    <form onSubmit={handleSubmit}>
                        {/* Email Input */}
                        <div className="relative w-full my-6">
                            <label
                                htmlFor="email"
                                className="absolute -top-2.5 left-4 bg-white px-1 text-sm text-gray-500"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                placeholder=" "
                                className="w-full border-2 border-gray-500 rounded-md h-12 px-4 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        {/* Password Input */}
                        <div className="relative w-full mt-4">
                            <label
                                htmlFor="password"
                                className="absolute -top-2.5 left-4 bg-white px-1 text-sm text-gray-500"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                placeholder=" "
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full border-2 border-gray-500 rounded-md h-12 px-4 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                required
                            />
                        </div>

                        {/* Forgot Password and Signup Links */}
                        <div className="flex justify-between text-xs my-2">
                            <div>
                                <span className="text-black">Need an account? </span>
                                <a href="/signup" className="text-blue-500 hover:underline">
                                    Sign up
                                </a>
                            </div>
                            <a href="/forgot" className="text-blue-500 hover:underline">
                                Forgot password?
                            </a>
                        </div>
                        
                        {/* Error Message */}
                        {error && <p className="text-red-500 text-xs mt-2">{error}</p>}

                        {/* Sign In Button */}
                        <button 
                            type="submit" 
                            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 my-4"
                            disabled={loading}
                        >
                            {loading ? "Signing in..." : "Sign in"}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-white px-2 text-black">OR CONTINUE WITH</span>
                        </div>
                    </div>

                    {/* Social Signin Buttons */}
                    <div className="flex justify-center gap-4 my-6">
                        <button className="flex w-full justify-center items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-100">
                            <FcGoogle size={30} />
                        </button>
                        <button className="flex w-full justify-center items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-100">
                            <FaFacebook size={30} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
