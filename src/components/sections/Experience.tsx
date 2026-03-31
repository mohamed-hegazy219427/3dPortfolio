"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { experiences } from "@/data";
import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, Calendar, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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

  return (
    <section 
      id="experience" 
      ref={sectionRef} 
      className="w-full py-24 bg-background max-w-7xl mx-auto px-6"
    >
      <div className="flex flex-col items-center justify-center text-center exp-header mb-16 gap-4">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
          Professional Experience
        </h2>
        <p className="text-muted-foreground max-w-2xl text-base md:text-lg">
          Over 2 years of experience building scalable web applications and developing impactful solutions.
        </p>
      </div>

      <div className="exp-container flex flex-col gap-6 w-full max-w-4xl mx-auto">
        {experiences.map((exp, index) => {
          // Generate pseudo-badges from description or hardcoded based on common MERN
          const badgeTexts = index === 0 
            ? ["React", "Express.js", "MongoDB", "Node.js"] 
            : index === 1 
            ? ["React", "Payload CMS", "Front-end", "Performance"] 
            : ["MERN Stack", "REST APIs", "CI/CD", "Optimization"];

          return (
            <Card key={index} className="exp-card border border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden hover:border-border transition-colors group">
              <CardContent className="p-6 sm:p-8 flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4 mb-2">
                  
                  {/* Left Side: Role and Company */}
                  <div className="flex flex-col gap-2">
                    <h3 className="text-xl font-bold flex items-center gap-2 text-foreground">
                      <Briefcase className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      {exp.title}
                    </h3>
                    <p className="text-lg font-medium text-muted-foreground">
                      {exp.company_name}
                    </p>
                  </div>

                  {/* Right Side: Date and Location */}
                  <div className="flex flex-col gap-2 sm:items-end text-sm font-medium text-muted-foreground">
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

                <div className="text-muted-foreground/90 font-normal leading-relaxed text-sm sm:text-base">
                  <p>
                    {exp.points.join(" ")}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 mt-2">
                  {badgeTexts.map((txt, idx) => (
                    <Badge 
                      key={idx} 
                      variant="secondary" 
                      className="bg-secondary/60 hover:bg-secondary text-secondary-foreground font-medium py-1 px-3 border border-border/40"
                    >
                      {txt}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
