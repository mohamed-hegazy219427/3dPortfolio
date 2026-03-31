"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { projects } from "@/data";
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { Github, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function Works() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".works-header", {
      y: 30,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".works-header",
        start: "top 85%",
      },
    });

    gsap.from(".works-card", {
      y: 40,
      opacity: 0,
      duration: 0.5,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".works-container",
        start: "top 80%",
      },
    });
  }, { scope: containerRef });

  return (
    <section 
      id="works" 
      ref={containerRef} 
      className="w-full py-24 bg-background max-w-7xl mx-auto px-6"
    >
      <div className="flex flex-col items-center justify-center text-center works-header mb-16 gap-4">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
          Featured Projects
        </h2>
        <p className="text-muted-foreground max-w-2xl text-base md:text-lg">
          A selection of projects that demonstrate my expertise in full-stack development and modern web practices.
        </p>
      </div>

      <div className="works-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10 w-full">
        {projects.map((project, index) => (
          <Card key={index} className="works-card flex flex-col h-full overflow-hidden border border-border/50 bg-card/50 backdrop-blur-sm group hover:border-border transition-colors">
            
            <div className="relative w-full h-48 sm:h-56 overflow-hidden bg-muted">
              <Image
                src={project.image}
                alt={project.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <CardHeader className="flex-none p-6 pb-2">
              <CardTitle className="text-xl font-bold text-foreground capitalize">
                {project.name.replace("-", " ")}
              </CardTitle>
            </CardHeader>
            
            <CardContent className="flex-1 p-6 pt-2 pb-4 flex flex-col gap-4">
              <CardDescription className="text-sm text-muted-foreground line-clamp-4 leading-relaxed h-[80px]">
                {project.description}
              </CardDescription>

              <div className="flex flex-wrap gap-2 mt-auto pt-4">
                {project.tags.map((tag, tagIndex) => (
                  <Badge 
                    key={tagIndex} 
                    variant="secondary" 
                    className="bg-secondary/60 hover:bg-secondary text-secondary-foreground font-medium py-1 px-3 border border-border/40"
                  >
                    {tag.name}
                  </Badge>
                ))}
              </div>
            </CardContent>

            <CardFooter className="p-6 pt-0 flex items-center gap-3">
              {project.source_code_link && (
                <Button variant="outline" size="sm" className="rounded-md font-semibold px-4 h-9 bg-transparent hover:bg-secondary" asChild>
                  <a href={project.source_code_link} target="_blank" rel="noreferrer">
                    <Github className="w-4 h-4 mr-2" /> Code
                  </a>
                </Button>
              )}
              {project.live_demo && (
                <Button variant="default" size="sm" className="rounded-md font-semibold px-4 h-9" asChild>
                  <a href={project.live_demo} target="_blank" rel="noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" /> Demo
                  </a>
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
