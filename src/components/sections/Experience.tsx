"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { experiences } from "@/data";
import { Briefcase, Calendar, MapPin, ChevronRight } from "lucide-react";

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".exp-header", {
      y: 30,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".exp-header",
        start: "top 85%",
      },
    });

    gsap.from(".exp-card", {
      y: 40,
      opacity: 0,
      duration: 0.5,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".exp-container",
        start: "top 80%",
      },
    });
  }, { scope: sectionRef });

  const badgeMap = [
    ["React", "Express.js", "MongoDB", "Node.js"],
    ["React", "Payload CMS", "Front-end", "Performance"],
    ["MERN Stack", "REST APIs", "CI/CD", "Optimization"],
  ];

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="w-full section-padding bg-base-200/30 max-w-7xl mx-auto"
    >
      <div className="flex flex-col items-center justify-center text-center exp-header mb-16 gap-4">
        <div className="badge badge-outline badge-secondary badge-lg gap-2 font-medium mb-2">
          <Briefcase className="w-4 h-4" />
          Career
        </div>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-base-content">
          Professional Experience
        </h2>
        <p className="text-base-content/60 max-w-2xl text-base md:text-lg">
          Over 2 years of experience building scalable web applications and developing impactful solutions.
        </p>
      </div>

      <div className="exp-container flex flex-col gap-6 w-full max-w-4xl mx-auto relative">
        {/* Timeline line */}
        <div className="absolute left-6 top-0 bottom-0 w-px bg-base-300/60 hidden md:block" />

        {experiences.map((exp, index) => {
          const badges = badgeMap[index] || [];
          return (
            <div key={index} className="exp-card relative md:pl-16">
              {/* Timeline dot */}
              <div className="absolute left-4 top-8 w-5 h-5 rounded-full bg-primary border-4 border-base-100 z-10 hidden md:block" />

              <div className="card bg-base-100 border border-base-300/50 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group">
                <div className="card-body p-6 sm:p-8">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4 mb-4">
                    {/* Left Side: Role and Company */}
                    <div className="flex flex-col gap-2">
                      <h3 className="card-title text-xl font-bold flex items-center gap-2 text-base-content">
                        <Briefcase className="w-5 h-5 text-base-content/50 group-hover:text-primary transition-colors duration-300" />
                        {exp.title}
                      </h3>
                      <p className="text-lg font-medium text-primary/80">
                        {exp.company_name}
                      </p>
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
                        className="badge badge-outline badge-sm py-3 px-3 font-medium text-base-content/70 hover:badge-primary hover:text-primary-content transition-all duration-200"
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
