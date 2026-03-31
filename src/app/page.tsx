"use client";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import Experience from "@/components/sections/Experience";
import Tech from "@/components/sections/Tech";
import Works from "@/components/sections/Works";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <div className="relative z-0 bg-base-100 text-base-content min-h-screen max-w-[100vw] overflow-x-hidden">
      <Navbar />
      <Hero />
      <Tech />
      <Experience />
      <Works />
      <Contact />
    </div>
  );
}
