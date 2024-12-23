export default function Statistics() {
    return (
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
    );
  }