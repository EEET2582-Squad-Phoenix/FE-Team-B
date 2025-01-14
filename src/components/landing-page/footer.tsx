import Link from "next/link";

export default function Footer() {
    return (
        <footer className="py-5 bg-blue-500 text-white text-center">
            <div className="container mx-auto">
                <div className="flex items-center justify-center space-x-6">
                    <Link href="/" className="flex-shrink-0 flex items-center">
                        <img
                            src="/Charitan+.png"
                            alt="logo"
                            className="h-8 w-auto"
                        />
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
    );
}