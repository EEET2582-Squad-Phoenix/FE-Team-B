"use-client";

export default function Home() {
  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="relative h-screen bg-cover bg-center" style={{ backgroundImage: "url('/path-to-your-image.jpg')" }}>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
          <h1 className="text-5xl font-bold">Make a Difference Today</h1>
          <p className="mt-4 text-xl">
            Join a global community of change-makers supporting impactful projects. Discover meaningful causes, donate securely, and create lasting change.
          </p>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-10 bg-blue-500 text-white text-center">
        <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <h2 className="text-2xl font-bold">172,000</h2>
            <p className="mt-2">people helped</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold">194,000,000 $</h2>
            <p className="mt-2">in donations</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold">2,437</h2>
            <p className="mt-2">charities</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold">20+</h2>
            <p className="mt-2">countries</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">How it works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Donors */}
            <div className="p-6 bg-white shadow-md rounded-lg">
              <div className="text-4xl text-yellow-500 mb-4">🎁</div>
              <h3 className="text-xl font-bold mb-4">Donors</h3>
              <p>Support impactful projects by donating to verified causes and tracking your contributions in real-time.</p>
            </div>
            {/* Volunteers */}
            <div className="p-6 bg-white shadow-md rounded-lg">
              <div className="text-4xl text-blue-500 mb-4">🙌</div>
              <h3 className="text-xl font-bold mb-4">Volunteers</h3>
              <p>Join hands with communities and organizations in need—your skills and time can drive meaningful change.</p>
            </div>
            {/* Fundraisers */}
            <div className="p-6 bg-white shadow-md rounded-lg">
              <div className="text-4xl text-green-500 mb-4">🔒</div>
              <h3 className="text-xl font-bold mb-4">Fundraisers</h3>
              <p>Expand your reach by connecting with a broader network of donors and volunteers. Share your mission.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 bg-blue-600 text-white text-center">
        <div className="container mx-auto">
          <p>&copy; 2024 Charitan. All Rights Reserved.</p>
          <div className="flex justify-center space-x-6 mt-4">
            <a href="#" className="hover:underline">Privacy</a>
            <a href="#" className="hover:underline">Terms</a>
            <a href="#" className="hover:underline">Contact Us</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
