"use client";

import React from "react";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Signup attempt with:", {email, password, role});
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
                    <h2 className="text-2xl font-bold text-left my-4">Sign up</h2>

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
                    <div className="relative w-full my-6">
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

                    {/* Role Input */}
                    <div className="relative w-full mt-4">
                        <label
                            htmlFor="role"
                            className="absolute -top-2.5 left-4 bg-white px-1 text-sm text-gray-500"
                        >
                            Role
                        </label>
                        <input
                            type="role"
                            id="role"
                            placeholder=" "
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full border-2 border-gray-500 rounded-md h-12 px-4 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                            required
                        />
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
                        onClick={handleSubmit}
                    >
                        Continue
                    </button>

                    {/* Divider */}
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-white px-2 text-black">OR CONTINUE WITH</span>
                        </div>
                    </div>

                    {/* Social Login Buttons */}
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
