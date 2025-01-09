"use client";

import React from "react";
import { Checkbox } from "@/components/ui/checkbox"
import { useSignupDonor } from "@/components/auth/hooks/useSignupDonor";

export default function SignupDonor() {
    const {
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
    } = useSignupDonor();

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
                    {/* Sign Up Heading */}
                    <h2 className="text-2xl font-bold text-left my-4">Sign up</h2>

                    {/* Name Input */}
                    <div className="flex justify-between gap-4 my-6">
                        {/* First Name Input */}
                        <div className="relative w-full">
                            <label
                                htmlFor="firstName"
                                className="absolute -top-2.5 left-4 bg-white px-1 text-sm text-gray-500"
                            >
                                First Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                placeholder=" "
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="w-full border-2 border-gray-500 rounded-md h-12 px-4 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                required
                            />
                        </div>

                        {/* Last Name Input */}
                        <div className="relative w-full">
                            <label
                                htmlFor="lastName"
                                className="absolute -top-2.5 left-4 bg-white px-1 text-sm text-gray-500"
                            >
                                Last Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="lastName"
                                placeholder=" "
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="w-full border-2 border-gray-500 rounded-md h-12 px-4 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                required
                            />
                        </div>
                    </div>

                    {/* Address Input (Optional) */}
                    <div className="relative w-full my-6">
                        <label
                            htmlFor="address"
                            className="absolute -top-2.5 left-4 bg-white px-1 text-sm text-gray-500"
                        >
                            Address
                        </label>
                        <input
                            type="text"
                            id="address"
                            placeholder=" "
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-full border-2 border-gray-500 rounded-md h-12 px-4 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>

                    {/* Language Input (Optional) */}
                    <div className="relative w-full mt-4">
                        <label
                            htmlFor="language"
                            className="absolute -top-2.5 left-4 bg-white px-1 text-sm text-gray-500"
                        >
                            Preferred Language
                        </label>
                        <select
                            id="language"
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            className="w-full border-2 border-gray-500 rounded-md h-12 px-4 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                            defaultValue={"Vietnamese"}
                        >
                            {["Vietnamese", "English", "Spanish", "French", "Chinese", "Japanese", "Korean", "Russian", "Arabic", "German", "Hindi", "Portuguese"]
                            .map((lang) => (
                                <option key={lang.toLowerCase()} value={lang.toLowerCase()}>
                                    {lang}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Avatar and Introduction Video (Same Line) */}
                    <div className="flex justify-between gap-4 mt-6">
                        {/* Avatar Input */}
                        <div className="relative w-full">
                            <label
                                htmlFor="avatar"
                                className="absolute -top-2.5 left-4 bg-white px-1 text-sm text-gray-500"
                            >
                                Avatar
                            </label>
                            <div className="border-2 border-gray-500 rounded-lg h-12 px-4 flex items-center cursor-pointer">
                                <label
                                    htmlFor="avatar"
                                    className="text-gray-500 text-sm cursor-pointer flex-grow"
                                >
                                    {avatar ? avatar.name : "Choose file"}
                                </label>
                                <input
                                    type="file"
                                    id="avatar"
                                    accept="image/*"
                                    onChange={handleAvatarChange}
                                    className="hidden"
                                />
                            </div>
                        </div>

                        {/* Introduction Video Input */}
                        <div className="relative w-full">
                            <label
                                htmlFor="video"
                                className="absolute -top-2.5 left-4 bg-white px-1 text-sm text-gray-500"
                            >
                                Introduction Video
                            </label>
                            <div className="border-2 border-gray-500 rounded-lg h-12 px-4 flex items-center cursor-pointer">
                                <label
                                    htmlFor="video"
                                    className="text-gray-500 text-sm cursor-pointer flex-grow"
                                >
                                    {video ? video.name : "Choose file"}
                                </label>
                                <input
                                    type="file"
                                    id="video"
                                    accept="video/*"
                                    onChange={handleVideoChange}
                                    className="hidden"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Checkbox */}
                    <div className="flex justify-left text-xs my-2">
                        <Checkbox 
                            id="terms"
                        />
                        <div className="ml-2">
                            <span className="text-black">I agree to the </span>
                            <a href="" className="text-black underline">
                                Terms of Service
                            </a>
                            <span className="text-black"> and </span>
                            <a href="" className="text-black underline">
                                Privacy Policy
                            </a>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button 
                        type="submit" 
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 my-4"
                        onClick={handleSubmit}
                    >
                        {loading ? "Signing up..." : "Sign Up"}
                    </button>

                    {/* Error Message */}
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                </div>
            </div>
        </div>
    );
};
