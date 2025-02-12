"use client";

import React from "react";
import { useSignin } from "@/components/auth/hooks/useSignin";

export default function Signin() {    
    const {
        email,
        setEmail,
        password,
        setPassword,
        error,
        loading,
        handleSubmit,
    } = useSignin();

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
                                Email <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                id="email"
                                placeholder=" "
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full border-2 border-gray-500 rounded-md h-12 px-4 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                required
                            />
                        </div>

                        {/* Password Input */}
                        <div className="relative w-full mt-4">
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
                </div>
            </div>
        </div>
    );
};
