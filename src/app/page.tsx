import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Tech from "@/components/sections/Tech";

// Three.js star field — deferred so it doesn't block first paint
const StarsCanvas = dynamic(() => import("@/components/canvas/Stars"), {
  ssr: false,
});

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
