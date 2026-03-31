"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Settings, Globe, Layers, Database, TestTube } from "lucide-react";

const skillCategories = [
  {
    title: "Programming Languages",
    icon: <Code className="w-5 h-5 text-muted-foreground" />,
    skills: ["JavaScript", "TypeScript", "HTML 5", "CSS 3"]
  },
  {
    title: "JavaScript Libraries",
    icon: <Globe className="w-5 h-5 text-muted-foreground" />,
    skills: ["React JS", "Next JS", "Redux Toolkit", "GSAP", "Framer Motion", "Three JS"]
  },
  {
    title: "Web Frameworks & UI",
    icon: <Layers className="w-5 h-5 text-muted-foreground" />,
    skills: ["Tailwind CSS", "Bootstrap", "Shadcn UI", "Daisy UI", "Chakra UI"]
  },
  {
    title: "Backend & Databases",
    icon: <Database className="w-5 h-5 text-muted-foreground" />,
    skills: ["Node JS", "Express JS", "Nest JS", "MongoDB", "Mongoose", "Sequelize", "Prisma", "Payload", "Sanity"]
  },
  {
    title: "DevOps & Tools",
    icon: <Settings className="w-5 h-5 text-muted-foreground" />,
    skills: ["docker", "git", "figma"]
  },
  {
    title: "Testing & Practices",
    icon: <TestTube className="w-5 h-5 text-muted-foreground" />,
    skills: ["Jest", "Agile", "REST API"]
  }
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
      className="w-full py-24 bg-background max-w-7xl mx-auto px-6"
    >
      <div className="flex flex-col items-center justify-center text-center tech-header mb-16 gap-4">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
          Technical Skills
        </h2>
        <p className="text-muted-foreground max-w-2xl text-base md:text-lg">
          Comprehensive expertise across modern development stack with focus on scalable web applications and devops practices.
        </p>
      </div>

      <div className="tech-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10 w-full">
        {skillCategories.map((category, index) => (
          <Card key={index} className="tech-card border border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden hover:border-border transition-colors">
            <CardHeader className="pb-3 px-6 pt-6">
              <CardTitle className="text-base font-semibold text-foreground flex items-center gap-3">
                {category.icon}
                {category.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIdx) => (
                  <Badge 
                    key={skillIdx} 
                    variant="secondary" 
                    className="bg-secondary/60 hover:bg-secondary text-secondary-foreground font-medium py-1 px-3 border border-border/40"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
