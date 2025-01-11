"use client";

import React from "react";
import { useSignup } from "@/components/auth/hooks/useSignup";

export default function Signup() {
    const {
        email,
        setEmail,
        password,
        setPassword,
        role,
        setRole,
        error,
        loading,
        handleCheckEmail,
      } = useSignup();

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
                    <h2 className="text-2xl font-bold text-left my-4">Sign up</h2>

                    {/* Email Input */}
                    <div className="relative w-full my-6">
                        <label
                            htmlFor="email"
                            className="absolute -top-2.5 left-4 bg-white px-1 text-sm text-gray-500"
                        >
                            Email <span className="text-red-500">*</span>
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
                    <div className="relative w-full my-6">
                        <label
                            htmlFor="password"
                            className="absolute -top-2.5 left-4 bg-white px-1 text-sm text-gray-500"
                        >
                            Password <span className="text-red-500">*</span>
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
                        <p className="mt-1 text-xs text-gray-500">
                            Must be at least 8 characters long, include an uppercase letter, a number, and a special character.
                        </p>
                    </div>

                    {/* Role Selection */}
                    <div className="relative w-full mt-4">
                        <label
                            htmlFor="role"
                            className="absolute -top-2.5 left-4 bg-white px-1 text-sm text-gray-500"
                        >
                            Role <span className="text-red-500">*</span>
                        </label>
                        <select
                            id="role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full border-2 border-gray-500 rounded-md h-12 px-4 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                            required
                        >
                            <option value="DONOR">Donor</option>
                            <option value="CHARITY">Charity</option>
                        </select>
                    </div>

                    {/* Signin Links */}
                    <div className="flex justify-between text-xs my-2">
                        <div>
                            <span className="text-black">Already have an account? </span>
                            <a href="/signin" className="text-blue-500 hover:underline">
                                Sign in
                            </a>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button 
                        type="submit" 
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 my-4"
                        onClick={handleCheckEmail}
                        disabled={loading}
                    >
                        {loading ? "Checking email..." : "Continue"}
                    </button>
                    
                    {/* Error Message */}
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                </div>
            </div>
        </div>
    );
};
