"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { Code, Settings, Globe, Layers, Database, TestTube } from "lucide-react";

const skillCategories = [
  {
    title: "Programming Languages",
    icon: <Code className="w-5 h-5 text-primary" />,
    color: "badge-primary",
    skills: ["JavaScript", "TypeScript", "HTML 5", "CSS 3"],
  },
  {
    title: "JavaScript Libraries",
    icon: <Globe className="w-5 h-5 text-secondary" />,
    color: "badge-secondary",
    skills: ["React JS", "Next JS", "Redux Toolkit", "GSAP", "Framer Motion", "Three JS"],
  },
  {
    title: "Web Frameworks & UI",
    icon: <Layers className="w-5 h-5 text-accent" />,
    color: "badge-accent",
    skills: ["Tailwind CSS", "Bootstrap", "Shadcn UI", "Daisy UI", "Chakra UI"],
  },
  {
    title: "Backend & Databases",
    icon: <Database className="w-5 h-5 text-info" />,
    color: "badge-info",
    skills: ["Node JS", "Express JS", "Nest JS", "MongoDB", "Mongoose", "Sequelize", "Prisma", "Payload", "Sanity"],
  },
  {
    title: "DevOps & Tools",
    icon: <Settings className="w-5 h-5 text-warning" />,
    color: "badge-warning",
    skills: ["Docker", "Git", "Figma"],
  },
  {
    title: "Testing & Practices",
    icon: <TestTube className="w-5 h-5 text-success" />,
    color: "badge-success",
    skills: ["Jest", "Agile", "REST API"],
  },
];

export default function Tech() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".tech-header", {
      y: 30,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".tech-header",
        start: "top 85%",
      },
    });

    gsap.from(".tech-card", {
      y: 40,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".tech-container",
        start: "top 80%",
      },
    });
  }, { scope: containerRef });

  return (
    <section
      id="tech"
      ref={containerRef}
      className="w-full section-padding bg-base-100 max-w-7xl mx-auto"
    >
      <div className="flex flex-col items-center justify-center text-center tech-header mb-16 gap-4">
        <div className="badge badge-outline badge-primary badge-lg gap-2 font-medium mb-2">
          <Code className="w-4 h-4" />
          Tech Stack
        </div>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-base-content">
          Technical Skills
        </h2>
        <p className="text-base-content/60 max-w-2xl text-base md:text-lg">
          Comprehensive expertise across modern development stack with focus on scalable web applications and devops practices.
        </p>
      </div>

      <div className="tech-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10 w-full">
        {skillCategories.map((category, index) => (
          <div
            key={index}
            className="tech-card card bg-base-200/50 border border-base-300/50 hover:border-base-300 hover:shadow-lg transition-all duration-300 group"
          >
            <div className="card-body p-6">
              <h3 className="card-title text-base font-semibold text-base-content flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-base-300/50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </div>
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2 mt-4">
                {category.skills.map((skill, skillIdx) => (
                  <span
                    key={skillIdx}
                    className={`badge ${category.color} badge-outline badge-sm py-3 px-3 font-medium hover:badge-${category.color.replace('badge-', '')} hover:text-${category.color.replace('badge-', '')}-content transition-all duration-200 cursor-default`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
