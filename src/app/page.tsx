import { AmbientGlow } from "@/components/AmbientGlow";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { AboutStory } from "@/components/AboutStory";
import { Differentials } from "@/components/Differentials";
import { Services } from "@/components/Services";
import { Gallery } from "@/components/Gallery";
import { Team } from "@/components/Team";
import { Reviews } from "@/components/Reviews";
import { FAQ } from "@/components/FAQ";
import { LocationSchedule } from "@/components/LocationSchedule";
import { Contact } from "@/components/Contact";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-midnight-950 text-ice-100 relative overflow-x-hidden">
      <AmbientGlow />
      <Header />
      <Hero />
      <AboutStory />
      <Differentials />
      <Services />
      <Gallery />
      <Team />
      <Reviews />
      <FAQ />
      <LocationSchedule />
      <Contact />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
