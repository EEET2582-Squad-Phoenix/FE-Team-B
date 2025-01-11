export default function Hero() {
    return (
        <section className="relative h-screen">
            <img
            src="/background.jpg"
            alt="background"
            className="absolute inset-0 object-cover w-full h-full"
            />

            <div className="absolute inset-0 bg-black/50"></div>
            
            <div className="relative container mx-auto px-4 h-full flex flex-col items-start justify-center">
                <div className="max-w-2xl pt-20">
                    <h1 className="text-5xl font-bold text-white">
                        Make a Difference Today
                    </h1>
                    <p className="mt-4 text-lg text-white/90 max-w-lg">
                        Join a global community of change-makers supporting impactful
                        projects. Discover meaningful causes, donate securely, and create
                        lasting change.
                    </p>
                </div>
            </div>
        </section>
    );
  }