"use client";

import { useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { gsap } from "@/lib/gsap";

const ComputersCanvas = dynamic(
  () => import("@/components/canvas/Computers"),
  { ssr: false }
);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-text-1", {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.2,
      });
      gsap.from(".hero-text-2", {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.5,
      });
      gsap.from(".hero-scroll-indicator", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 1.2,
        ease: "power2.out",
      });

      // Bounce animation for scroll indicator
      gsap.to(".scroll-dot", {
        y: 24,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen mx-auto">
      <div className="absolute inset-0 xl:top-[90px] xs:top-[64px] max-w-7xl mx-auto sm:px-16 px-6 flex flex-row items-start gap-5">
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#915eff]" />
          <div className="w-1 sm:h-80 h-40 violet-gradient" />
        </div>
        <div>
          <h1 className="hero-text-1 font-black text-white lg:text-[80px] sm:text-[60px] xs:text-[50px] text-[40px] lg:leading-[98px] mt-2">
            Hi, I&apos;m{" "}
            <span className="text-[#915EFF]">Mohamed Hegazy</span>
          </h1>
          <p className="hero-text-2 text-[#dfd9ff] font-medium lg:text-[30px] sm:text-[26px] xs:text-[20px] text-[16px] lg:leading-[40px] mt-2">
            I develop front-end React Apps{" "}
            <br className="sm:block hidden" />
            and back-end Node.js Apps
          </p>
        </div>
      </div>

      <ComputersCanvas />

      <div className="hero-scroll-indicator absolute xl:bottom-32 bottom-24 w-full flex justify-center items-center">
        <a href="#about">
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
            <div className="scroll-dot w-3 h-3 rounded-full bg-secondary" />
          </div>
        </a>
      </div>
    </section>
  );
}
