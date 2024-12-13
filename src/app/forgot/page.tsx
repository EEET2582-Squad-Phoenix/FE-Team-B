"use client";

import React from "react";
import { useState } from "react";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Signin attempt with:", {email});
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

                    {/* Reset Password Button */}
                    <button 
                        type="submit" 
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 my-4"
                        onClick={handleSubmit}
                    >
                        Reset Password
                    </button>
                </div>
            </div>
        </div>
    );
};
