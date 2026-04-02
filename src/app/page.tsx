import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Tech from "@/components/sections/Tech";
// StarsClient wraps the ssr:false dynamic import inside a Client Component
import StarsClient from "@/components/canvas/StarsClient";

// Below-fold sections — code-split to reduce initial bundle
const Experience = dynamic(() => import("@/components/sections/Experience"));
const Works = dynamic(() => import("@/components/sections/Works"));
const Testimonials = dynamic(
  () => import("@/components/sections/Testimonials"),
);
const Contact = dynamic(() => import("@/components/sections/Contact"));

export default function Home() {
  return (
    <div className="relative z-0 text-base-content min-h-screen max-w-[100vw] overflow-x-hidden">
      {/* Fixed star field — shared across all sections */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <StarsClient />
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
