"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import SectionWrapper from "@/components/SectionWrapper";
import { experiences } from "@/data";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "@/lib/gsap";
import type { Experience } from "@/types";

function ExperienceCard({
  experience,
  index,
}: {
  experience: Experience;
  index: number;
}) {
  return (
    <div
      className={`timeline-item flex gap-6 relative pb-12 ${
        index !== 0 ? "mt-0" : ""
      }`}
      style={{ opacity: 0, transform: "translateY(40px)" }}
    >
      {/* Timeline line and icon */}
      <div className="flex flex-col items-center">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center z-10 shrink-0 border-2 border-[#915eff]"
          style={{ background: experience.iconBg }}
        >
          <Image
            src={experience.icon as StaticImageData}
            alt={experience.company_name}
            width={30}
            height={30}
            className="object-contain"
          />
        </div>
        {index < experiences.length - 1 && (
          <div className="w-0.5 flex-1 bg-[#915eff]/30 mt-2" />
        )}
      </div>

      {/* Content */}
      <div className="bg-[#1d1836] rounded-2xl p-6 flex-1 border border-border">
        <div>
          <h3 className="text-white text-[24px] font-bold">
            {experience.title}
          </h3>
          <p className="text-secondary text-[16px] font-semibold mt-1">
            {experience.company_name}
          </p>
          <p className="text-secondary/60 text-[13px] mt-1">{experience.date}</p>
        </div>

        <ul className="mt-4 list-disc ml-5 space-y-2">
          {experience.points.map((point, i) => (
            <li
              key={i}
              className="text-white-100 text-[14px] pl-1 tracking-wider"
            >
              {point}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".exp-heading", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".exp-heading",
          start: "top 85%",
        },
      });

      gsap.utils.toArray<HTMLElement>(".timeline-item").forEach((item, i) => {
        gsap.to(item, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
          },
          delay: i * 0.1,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <SectionWrapper id="work">
      <div ref={sectionRef}>
        <div className="exp-heading">
          <p className="sm:text-[18px] text-[14px] text-secondary uppercase tracking-wider">
            What I have done so far
          </p>
          <h2 className="text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]">
            Experience.
          </h2>
        </div>

        <div className="mt-20">
          {experiences.map((exp, index) => (
            <ExperienceCard key={index} experience={exp} index={index} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
