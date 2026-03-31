"use client";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Tech from "@/components/sections/Tech";
import Works from "@/components/sections/Works";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";
import StarsCanvas from "@/components/canvas/Stars";

export default function Home() {
  return (
    <div className="relative z-0 text-base-content min-h-screen max-w-[100vw] overflow-x-hidden">
      {/* Fixed star field — shared across all sections */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <StarsCanvas />
      </div>

      <div className="relative z-10">
        <Navbar />
        <Hero />
        <About />
        <Tech />
        <Experience />
        <Works />
        <Testimonials />
        <Contact />
      </div>
    </div>
  );
}
