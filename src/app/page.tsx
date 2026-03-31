"use client";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Tech from "@/components/sections/Tech";
import Works from "@/components/sections/Works";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";
import dynamic from "next/dynamic";

const StarsCanvas = dynamic(() => import("@/components/canvas/Stars"), {
  ssr: false,
});

export default function Home() {
  return (
    <div className="relative z-0 bg-background">
      <div
        className="bg-cover bg-no-repeat bg-center"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at top, #3d1a6e 0%, #050816 60%)",
        }}
      >
        <Navbar />
        <Hero />
      </div>
      <About />
      <Experience />
      <Tech />
      <Works />
      <Testimonials />
      <div className="relative z-0">
        <Contact />
        <StarsCanvas />
      </div>
      <Footer />
    </div>
  );
}
