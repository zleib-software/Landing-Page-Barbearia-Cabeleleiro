import { AmbientGlow } from "@/components/AmbientGlow";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Differentials } from "@/components/Differentials";
import { Services } from "@/components/Services";
import { Gallery } from "@/components/Gallery";
import { Team } from "@/components/Team";
import { Reviews } from "@/components/Reviews";
import { LocationSchedule } from "@/components/LocationSchedule";
import { FAQ } from "@/components/FAQ";
import { Contact } from "@/components/Contact";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-light-100 dark:bg-dark-900 text-light-900 dark:text-gray-100 relative transition-colors duration-300">
      <AmbientGlow />
      <Header />
      <Hero />
      <Differentials />
      <Services />
      <Gallery />
      <Team />
      <Reviews />
      <LocationSchedule />
      <FAQ />
      <Contact />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
