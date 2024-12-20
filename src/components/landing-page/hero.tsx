export default function Hero() {
    return (
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
    );
  }