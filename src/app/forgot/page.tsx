"use client";

import React, { useState } from "react";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [isCompleted, setIsCompleted] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            console.log("Resetting password for:", { email });
            // Simulate delay (remove this in production)
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setIsCompleted(true); // Mark action as completed
        } catch (err) {
            setError("Something went wrong. Please try again.");
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
                    {/* Conditional Rendering */}
                    {isCompleted ? (
                        <div className="text-center">
                            <div className="flex justify-center mb-4">
                                {/* Checkmark Icon */}
                                <svg
                                    className="w-12 h-12 text-blue-500"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M2.25 12a9.75 9.75 0 1119.5 0 9.75 9.75 0 01-19.5 0zm15.03-3.72a.75.75 0 00-1.06-1.06l-5.72 5.72-2.22-2.22a.75.75 0 00-1.06 1.06l2.75 2.75c.3.3.79.3 1.06 0l6.25-6.25z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-700">
                                Action Completed!
                            </h2>
                            <p className="text-sm text-gray-600 mt-2">
                                Please check your email inbox for additional instructions.
                            </p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            {/* Forgot Password Heading */}
                            <h2 className="text-2xl font-bold text-left my-4">Forgot password</h2>

                            {/* Email Input */}
                            <div className="relative w-full mt-6">
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

                            {/* Information */}
                            <div className="flex justify-between text-xs my-2">
                                <span className="text-black">Enter your email to reset the password </span>
                            </div>

                            {/* Error Message */}
                            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

                            {/* Reset Password Button */}
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 my-4"
                                disabled={loading}
                            >
                                {loading ? "Sending..." : "Reset Password"}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};
