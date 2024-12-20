"use-client";

import Link from "next/link";
import Image from "next/image";
export default function Home() {
    return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="relative h-screen">
        <img
          src="/background.jpg"
          alt="background"
          className="absolute inset-0 object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 flex flex-col items-start justify-start h-full text-left text-white p-40">
          <h1 className="text-5xl font-bold">Make a Difference Today</h1>
          <p className="mt-4 text-base max-w-lg">
            Join a global community of change-makers supporting impactful
            projects. Discover meaningful causes, donate securely, and create
            lasting change.
          </p>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-5 bg-blue-500 text-white text-center">
        <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold">172,000</h2>
            <p className="mt-2 text-sm">people helped</p>
          </div>
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold">194,000,000 $</h2>
            <p className="mt-2 text-sm">in donations</p>
          </div>
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold">2,437</h2>
            <p className="mt-2 text-sm">charities</p>
          </div>
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold">20+</h2>
            <p className="mt-2 text-sm">countries</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-10 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl font-bold mb-8 text-blue-500">How it works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Donors */}
            <div className="p-6 bg-white shadow-md rounded-lg">
              <div className="text-4xl mb-4 flex justify-center">
                <Image 
                  src="/gift.svg"
                  alt="Donor icon"
                  width={40}
                  height={40}
                  className="text-yellow-500"
                />
              </div>
              <h3 className="text-xl font-bold mb-4 text-yellow-500">Donors</h3>
              <p className="text-sm">Support impactful projects by donating to verified causes and tracking your contributions in real-time.</p>
            </div>
            {/* Volunteers */}
            <div className="p-6 bg-white shadow-md rounded-lg">
              <div className="text-4xl mb-4 flex justify-center text-blue-500">
                <Image 
                  src="/heart.svg"
                  alt="Volunteer icon"
                  width={40}
                  height={40}
                  style={{ color: '#3B82F6' }}
                />
              </div>
              <h3 className="text-xl font-bold mb-4 text-blue-500">Volunteers</h3>
              <p className="text-sm">Join hands with communities and organizations in need—your skills and time can drive meaningful change.</p>
            </div>
            {/* Fundraisers */}
            <div className="p-6 bg-white shadow-md rounded-lg">
              <div className="text-4xl mb-4 flex justify-center text-green-500">
                <Image 
                  src="/hospital.svg"
                  alt="Fundraiser icon"
                  width={40}
                  height={40}
                  style={{ color: '#22C55E' }}
                />
              </div>
              <h3 className="text-xl font-bold mb-4 text-green-500">Fundraisers</h3>
              <p className="text-sm">Expand your reach by connecting with a broader network of donors and volunteers. Share your mission and amplify your impact like never before.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-5 bg-blue-600 text-white text-center">
        <div className="container mx-auto">
          {/* Logo section */}
          <div className="flex items-center justify-center space-x-6">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-semibold text-yellow-400 mr-2">
                Charitan
              </span>
            </Link>
            <p>&copy; 2024 Charitan. All Rights Reserved.</p>
            <a href="#" className="hover:underline">About</a>
            <a href="#" className="hover:underline">Privacy</a>
            <a href="#" className="hover:underline">Terms</a>
            <a href="#" className="hover:underline">Contact Us</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
