"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { Code, Settings, Globe, Layers, Database, TestTube } from "lucide-react";

const skillCategories = [
  {
    title: "Programming Languages",
    icon: <Code className="w-5 h-5" />,
    gradient: "from-blue-500 to-cyan-400",
    badgeColor: "badge-primary",
    skills: ["JavaScript", "TypeScript", "HTML 5", "CSS 3"],
  },
  {
    title: "JavaScript Libraries",
    icon: <Globe className="w-5 h-5" />,
    gradient: "from-purple-500 to-pink-400",
    badgeColor: "badge-secondary",
    skills: ["React JS", "React Native", "Next JS", "Redux Toolkit", "GSAP", "Framer Motion", "Three JS"],
  },
  {
    title: "Web Frameworks & UI",
    icon: <Layers className="w-5 h-5" />,
    gradient: "from-amber-500 to-orange-400",
    badgeColor: "badge-accent",
    skills: ["Tailwind CSS", "Bootstrap", "Shadcn UI", "Daisy UI", "Chakra UI"],
  },
  {
    title: "Backend & Databases",
    icon: <Database className="w-5 h-5" />,
    gradient: "from-emerald-500 to-teal-400",
    badgeColor: "badge-info",
    skills: ["Node JS", "Express JS", "Nest JS", "MongoDB", "Mongoose", "PostgreSQL", "TypeORM", "Sequelize", "Prisma", "Payload", "Sanity"],
  },
  {
    title: "DevOps & Tools",
    icon: <Settings className="w-5 h-5" />,
    gradient: "from-rose-500 to-red-400",
    badgeColor: "badge-warning",
    skills: ["Docker", "Git", "Figma"],
  },
  {
    title: "Testing & Practices",
    icon: <TestTube className="w-5 h-5" />,
    gradient: "from-lime-500 to-green-400",
    badgeColor: "badge-success",
    skills: ["Jest", "Agile", "REST API"],
  },
];

export default function Tech() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Header entrance
    const headerTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".tech-header",
        start: "top 85%",
      },
    });
    headerTl
      .fromTo(".tech-badge", { opacity: 0, y: 20, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.5 })
      .fromTo(".tech-title", { opacity: 0, y: 30, clipPath: "inset(100% 0% 0% 0%)" }, { opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)", duration: 0.6 }, "-=0.3")
      .fromTo(".tech-subtitle", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.3");

    // Cards stagger entrance with a nice scale + rotation
    gsap.utils.toArray<HTMLElement>(".tech-card").forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 50, scale: 0.92, rotateX: 8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          duration: 0.6,
          delay: i * 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".tech-container",
            start: "top 82%",
          },
        },
      );
    });

    // Skill badges stagger inside each card
    gsap.utils.toArray<HTMLElement>(".tech-card").forEach((card) => {
      const badges = card.querySelectorAll(".skill-badge");
      gsap.fromTo(
        badges,
        { opacity: 0, scale: 0.8, y: 10 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.3,
          stagger: 0.04,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
        },
      );
    });
  }, { scope: containerRef });

  return (
    <section
      id="tech"
      ref={containerRef}
      className="w-full section-padding bg-base-200/60 backdrop-blur-sm max-w-7xl mx-auto relative"
    >
      {/* Background dot grid */}
      <div className="absolute inset-0 dot-grid opacity-50 pointer-events-none" />

      <div className="flex flex-col items-center justify-center text-center tech-header mb-16 gap-4 relative z-10">
        <div className="tech-badge badge badge-outline badge-primary badge-lg gap-2 font-medium mb-2">
          <Code className="w-4 h-4" />
          Tech Stack
        </div>
        <h2 className="tech-title text-3xl md:text-5xl font-bold tracking-tight text-base-content">
          Technical Skills
        </h2>
        <p className="tech-subtitle text-base-content/60 max-w-2xl text-base md:text-lg">
          Comprehensive expertise across modern development stack with focus on scalable web applications and devops practices.
        </p>
      </div>

      <div className="tech-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10 w-full">
        {skillCategories.map((category, index) => (
          <div
            key={index}
            className="tech-card card bg-base-200/50 border border-base-300/50 hover:border-base-300 hover:shadow-xl transition-all duration-500 group card-hover-lift"
            style={{ perspective: "800px" }}
          >
            <div className="card-body p-6">
              <h3 className="card-title text-base font-semibold text-base-content flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl bg-linear-to-br ${category.gradient} flex items-center justify-center text-white group-hover:scale-110 group-hover:shadow-lg transition-all duration-300`}>
                  {category.icon}
                </div>
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2 mt-4">
                {category.skills.map((skill, skillIdx) => (
                  <span
                    key={skillIdx}
                    className={`skill-badge badge ${category.badgeColor} badge-outline badge-sm py-3 px-3 font-medium hover:scale-105 transition-all duration-200 cursor-default`}
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
