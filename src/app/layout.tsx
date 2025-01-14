import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import StoreProvider from "./StoreProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
          <main className="mt-16">{children}</main>
          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </body>
      </html>
    </StoreProvider>
  );
}
