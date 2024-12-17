import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import StoreProvider from "./StoreProvider";

export const metadata: Metadata = {
  title: "Charitan for Admin",
  description: "Charitan for Admin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang="en">
        <body className="min-h-screen bg-gray-50">
          <Navbar />
          <main>{children}</main>
        </body>
      </html>
    </StoreProvider>
  );
}
