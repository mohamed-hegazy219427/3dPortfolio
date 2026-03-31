"use client";

import { useRef } from "react";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { experiences } from "@/data";
import { Briefcase, Calendar, MapPin, ChevronRight } from "lucide-react";

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Header entrance
    const headerTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".exp-header",
        start: "top 85%",
      },
    });
    headerTl
      .fromTo(".exp-badge", { opacity: 0, y: 20, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.5 })
      .fromTo(".exp-title", { opacity: 0, y: 30, clipPath: "inset(100% 0% 0% 0%)" }, { opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)", duration: 0.6 }, "-=0.3")
      .fromTo(".exp-subtitle", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.3");

    // Timeline line drawing animation
    gsap.fromTo(
      ".timeline-line-fill",
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: ".exp-container",
          start: "top 80%",
          end: "bottom 60%",
          scrub: 1,
        },
      },
    );

    // Cards stagger from alternating sides
    gsap.utils.toArray<HTMLElement>(".exp-card").forEach((card, i) => {
      const xDir = i % 2 === 0 ? -40 : 40;
      gsap.fromTo(
        card,
        { opacity: 0, x: xDir, y: 20, scale: 0.95 },
        {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
          },
        },
      );
    });

    // Timeline dots pop in
    gsap.utils.toArray<HTMLElement>(".timeline-dot").forEach((dot) => {
      gsap.fromTo(
        dot,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: "back.out(2)",
          scrollTrigger: {
            trigger: dot,
            start: "top 88%",
          },
        },
      );
    });

    // Badge stagger inside each card
    gsap.utils.toArray<HTMLElement>(".exp-card").forEach((card) => {
      const badges = card.querySelectorAll(".exp-badge-tag");
      gsap.fromTo(
        badges,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          stagger: 0.06,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
          },
        },
      );
    });
  }, { scope: sectionRef });

  const badgeMap = [
    ["React", "Express.js", "MongoDB", "Node.js"],
    ["React", "Payload CMS", "Front-end", "Performance"],
    ["MERN Stack", "REST APIs", "CI/CD", "Optimization"],
    ["Next.js", "NestJS", "TypeScript", "Prisma", "RBAC"],
  ];

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="w-full section-padding bg-base-200/30 max-w-7xl mx-auto"
    >
      <div className="flex flex-col items-center justify-center text-center exp-header mb-16 gap-4">
        <div className="exp-badge badge badge-outline badge-secondary badge-lg gap-2 font-medium mb-2">
          <Briefcase className="w-4 h-4" />
          Career
        </div>
        <h2 className="exp-title text-3xl md:text-5xl font-bold tracking-tight text-base-content">
          Professional Experience
        </h2>
        <p className="exp-subtitle text-base-content/60 max-w-2xl text-base md:text-lg">
          Over 2 years of experience building scalable web applications and developing impactful solutions.
        </p>
      </div>

      <div className="exp-container flex flex-col gap-6 w-full max-w-4xl mx-auto relative">
        {/* Timeline line with fill */}
        <div className="absolute left-6 top-0 bottom-0 w-px bg-base-300/30 hidden md:block">
          <div className="timeline-line-fill absolute top-0 left-0 w-full bg-linear-to-b from-primary via-secondary to-accent origin-top" style={{ height: "100%" }} />
        </div>

        {experiences.map((exp, index) => {
          const badges = badgeMap[index] || [];
          return (
            <div key={index} className="exp-card relative md:pl-16">
              {/* Timeline dot */}
              <div className="timeline-dot absolute left-4 top-8 w-5 h-5 rounded-full bg-linear-to-br from-primary to-secondary border-4 border-base-100 z-10 hidden md:block shadow-lg shadow-primary/20" />

              <div className="card bg-base-100 border border-base-300/50 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 group card-hover-lift">
                <div className="card-body p-6 sm:p-8">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4 mb-4">
                    {/* Left Side: Role and Company */}
                    <div className="flex items-start gap-4">
                      {/* Company icon */}
                      <div
                        className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 shadow-md border border-base-300/40 overflow-hidden"
                        style={{ background: exp.iconBg }}
                      >
                        <Image
                          src={exp.icon as StaticImageData}
                          alt={exp.company_name}
                          width={36}
                          height={36}
                          className="object-contain"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <h3 className="card-title text-xl font-bold flex items-center gap-2 text-base-content">
                          <Briefcase className="w-5 h-5 text-base-content/50 group-hover:text-primary transition-colors duration-300" />
                          {exp.title}
                        </h3>
                        <p className="text-base font-semibold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent inline-block">
                          {exp.company_name}
                        </p>
                      </div>
                    </div>

                    {/* Right Side: Date and Location */}
                    <div className="flex flex-col gap-2 sm:items-end text-sm font-medium text-base-content/50">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{exp.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{index === 1 ? "Remote / Egypt" : "Egypt"}</span>
                      </div>
                    </div>
                  </div>

                  {/* Points as list */}
                  <ul className="space-y-2 mb-4">
                    {exp.points.slice(0, 4).map((point, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2 text-sm text-base-content/70 leading-relaxed">
                        <ChevronRight className="w-4 h-4 text-primary/60 mt-0.5 shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2 mt-2">
                    {badges.map((txt, idx) => (
                      <span
                        key={idx}
                        className="exp-badge-tag badge badge-outline badge-sm py-3 px-3 font-medium text-base-content/70 hover:badge-primary hover:text-primary-content transition-all duration-200"
                      >
                        {txt}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
