import Image from "next/image";

export default function HowItWorks() {
    return (
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
    );
}