"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedin, setIsLoggedin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    setIsLoggedin(!!token);
  } , []);

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    setIsLoggedin(false);
    router.push("/");
  }

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
              {isLoggedin ? (
                <button onClick={handleLogout} className="bg-red-500 text-white py-2 px-3 rounded-md">
                  Logout
                </button>
              ) : (
                <Link href="/signin">
                <button className="bg-yellow-400 text-black py-2 px-3 rounded-md">
                  Sign in
                </button>
                </Link>
              )}
              
              <button className="bg-teal-400 text-black py-2 px-3 rounded-md">
                Donate as guest
              </button>
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
          <div className="md:hidden">
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
                <button className="bg-yellow-400 text-black py-2 px-3 rounded-md">
                  Sign in
                </button>
                <button className="bg-teal-400 text-black py-2 px-3 rounded-md">
                  Donate as guest
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
