"use-client";

import Hero from "@/components/landing-page/hero";
import Statistics from "@/components/landing-page/statistics";
import HowItWorks from "@/components/landing-page/how-it-works";
import Footer from "@/components/landing-page/footer";

export default function Home() {
    return (
    <main className="bg-white">
      <Hero/>
      <Statistics/>
      <HowItWorks/>
      <Footer/>
    </main>
  );
}
