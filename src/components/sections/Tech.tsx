"use client";

import { useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import SectionWrapper from "@/components/SectionWrapper";
import { technologies } from "@/data";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "@/lib/gsap";
import type { StaticImageData } from "next/image";

const BallCanvas = dynamic(() => import("@/components/canvas/Ball"), {
  ssr: false,
  loading: () => (
    <div className="w-[150px] h-[150px] flex items-center justify-center">
      <div className="canvas-load" />
    </div>
  ),
});

export default function Tech() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".tech-heading", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".tech-heading",
          start: "top 85%",
        },
      });

      gsap.utils.toArray<HTMLElement>(".tech-card").forEach((card, i) => {
        gsap.from(card, {
          scale: 0,
          opacity: 0,
          duration: 0.5,
          delay: i * 0.04,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <SectionWrapper id="tech">
      <div ref={sectionRef}>
        <div className="tech-heading">
          <p className="sm:text-[18px] text-[14px] text-secondary uppercase tracking-wider">
            My Skills
          </p>
          <h2 className="text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]">
            Technologies.
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-y-8 gap-x-2 items-center justify-center">
          {technologies.map((tech) => {
            const iconSrc =
              typeof tech.icon === "string"
                ? tech.icon
                : (tech.icon as StaticImageData).src;
            return (
              <div
                key={tech.name}
                className="tech-card flex flex-col items-center gap-2"
              >
                <div className="xs:w-[150px] w-full h-[150px]">
                  <BallCanvas icon={iconSrc} />
                </div>
                <p className="text-secondary text-sm text-center">{tech.name}</p>
              </div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
