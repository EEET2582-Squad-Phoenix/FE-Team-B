"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import {
  AUTH_GET_ME_URL,
  AUTH_LOGOUT_URL,
} from "@/constants/service-url/auth-url-config";
import { DONATE_AS_GUEST_URL } from "@/constants/service-url/app-url-config";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const response = await fetch(AUTH_GET_ME_URL, {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          setIsLoggedIn(true); // User is logged in
        } else {
          setIsLoggedIn(false); // Not logged in
        }
      } catch (error) {
        console.error("Error checking login status:", error);
        setIsLoggedIn(false);
      }
    };

    checkLogin();
  }, []);

  // Handle logout
  const handleLogout = async () => {
    try {
      await fetch(AUTH_LOGOUT_URL, {
        method: "GET",
        credentials: "include",
      });
      setIsLoggedIn(false);
      router.push("/signin");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const isDashboard = pathname.includes("/dashboard");

  return (
    <nav className="bg-blue-500 fixed h-16 top-0 w-full z-10">
      <div className="lg:mx-8 mx-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo section */}
          <Link href="/" className="flex-shrink-0 flex items-center">
            <span className="text-2xl font-semibold text-yellow-400 mr-2">
              Charitan
            </span>
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-6 text-white">
              <Link href="" className="hover:text-yellow-400 duration-200">
                Contact
              </Link>
              <Link href="" className="hover:text-yellow-400 duration-200">
                About
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              {isLoggedIn && isDashboard ? (
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white py-2 px-3 rounded-md"
                >
                  Logout
                </button>
              ) : (
                <Link href="/signin">
                  <button className="bg-yellow-400 text-black py-2 px-3 rounded-md">
                    Sign in
                  </button>
                </Link>
              )}

              <Link href={DONATE_AS_GUEST_URL}>
                <button className="bg-teal-400 text-black py-2 px-3 rounded-md w-full">
                  Donate as guest
                </button>
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white p-2"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-blue-500 fixed top-16 left-0 w-full h-screen">
            <div className="text-center px-2 pt-2 pb-3 space-y-3">
              <Link
                href=""
                className="block text-white hover:text-yellow-400 duration-200 py-2"
              >
                Contact
              </Link>
              <Link
                href=""
                className="block text-white hover:text-yellow-400 duration-200 py-2"
              >
                About
              </Link>
              <div className="flex flex-col space-y-2 pt-2">
                {isLoggedIn ? (
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white py-2 px-3 rounded-md w-full"
                  >
                    Logout
                  </button>
                ) : (
                  <Link href="/signin">
                    <button className="bg-yellow-400 text-black py-2 px-3 rounded-md w-full">
                      Sign in
                    </button>
                  </Link>
                )}
                <Link href={DONATE_AS_GUEST_URL}>
                  <button className="bg-teal-400 text-black py-2 px-3 rounded-md">
                    Donate as guest
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
