import { AmbientGlow } from "@/components/AmbientGlow";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { AboutStory } from "@/components/AboutStory";
import { Services } from "@/components/Services";
import { Gallery } from "@/components/Gallery";
import { LocationSchedule } from "@/components/LocationSchedule";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-obsidian-950 text-sand-100 relative overflow-x-hidden">
      <AmbientGlow />
      <Header />
      <Hero />
      <AboutStory />
      <Services />
      <Gallery />
      <LocationSchedule />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
