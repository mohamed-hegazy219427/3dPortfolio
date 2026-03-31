"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import SectionWrapper from "@/components/SectionWrapper";
import { projects } from "@/data";
import { github } from "@/assets";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "@/lib/gsap";
import type { Project } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

const TAG_COLORS: Record<string, string> = {
  "blue-text-gradient": "text-blue-400",
  "green-text-gradient": "text-green-400",
  "pink-text-gradient": "text-pink-400",
  "orange-text-gradient": "text-orange-400",
};

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(cardRef.current, {
      rotateY: x * 15,
      rotateX: -y * 15,
      duration: 0.3,
      ease: "power2.out",
      transformPerspective: 600,
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  return (
    <div
      className={`project-card project-card-${index}`}
      style={{ opacity: 0, transform: "translateY(40px)" }}
    >
      <Card
        ref={cardRef}
        className="bg-tertiary border-border sm:w-[360px] w-full overflow-hidden"
        style={{ transformStyle: "preserve-3d", perspective: "600px" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <CardContent className="p-0">
          <div className="relative w-full h-[230px]">
            <Image
              src={project.image as StaticImageData}
              alt={project.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 360px"
            />
            <div className="absolute inset-0 flex justify-end m-3 gap-1">
              <button
                onClick={() => window.open(project.source_code_link, "_blank")}
                title="Source code"
                className="black-gradient border-slate-400 border w-10 h-10 rounded-full flex justify-center items-center cursor-pointer hover:scale-110 transition-transform"
              >
                <Image
                  src={github}
                  alt="source code"
                  width={20}
                  height={20}
                  className="object-contain"
                />
              </button>
              <button
                onClick={() => window.open(project.live_demo, "_blank")}
                title="Live demo"
                className="border-slate-400 border bg-slate-50 w-10 h-10 rounded-full flex justify-center items-center cursor-pointer hover:scale-110 transition-transform"
              >
                <ExternalLink className="w-4 h-4 text-slate-800" />
              </button>
            </div>
          </div>

          <div className="p-5">
            <h3 className="text-white font-bold text-[24px]">{project.name}</h3>
            <p className="mt-2 text-secondary text-[14px] line-clamp-4 leading-relaxed">
              {project.description}
            </p>
          </div>
        </CardContent>
        <CardFooter className="px-5 pb-5 pt-0 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge
              key={tag.name}
              variant="outline"
              className={`border-none bg-transparent text-[14px] font-medium ${
                TAG_COLORS[tag.color] ?? "text-secondary"
              }`}
            >
              #{tag.name}
            </Badge>
          ))}
        </CardFooter>
      </Card>
    </div>
  );
}

const INITIAL_COUNT = 3;

export default function Works() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const extraRef = useRef<HTMLDivElement>(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".works-heading", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".works-heading",
          start: "top 85%",
        },
      });

      gsap.utils.toArray<HTMLElement>(".project-card").forEach((card, i) => {
        if (i < INITIAL_COUNT) {
          gsap.to(card, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: i * 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
            },
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleToggle = () => {
    if (!showAll) {
      setShowAll(true);
      // Animate extra cards in after they render
      requestAnimationFrame(() => {
        projects.slice(INITIAL_COUNT).forEach((_, i) => {
          const card = document.querySelector(
            `.project-card-${INITIAL_COUNT + i}`
          ) as HTMLElement;
          if (card) {
            gsap.to(card, {
              opacity: 1,
              y: 0,
              duration: 0.5,
              delay: i * 0.1,
              ease: "power2.out",
            });
          }
        });
      });
    } else {
      // Animate out then hide
      const extraCards = Array.from(
        document.querySelectorAll<HTMLElement>(
          projects
            .slice(INITIAL_COUNT)
            .map((_, i) => `.project-card-${INITIAL_COUNT + i}`)
            .join(", ")
        )
      );
      gsap.to(extraCards, {
        opacity: 0,
        y: 40,
        duration: 0.3,
        stagger: 0.05,
        ease: "power2.in",
        onComplete: () => setShowAll(false),
      });
    }
  };

  const visibleProjects = showAll ? projects : projects.slice(0, INITIAL_COUNT);

  return (
    <SectionWrapper id="">
      <div ref={sectionRef}>
        <div className="works-heading">
          <p className="sm:text-[18px] text-[14px] text-secondary uppercase tracking-wider">
            My Work
          </p>
          <h2 className="text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]">
            Projects.
          </h2>
        </div>

        <p className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]">
          The following projects showcase my skills and experience through
          real-world examples. Each project is briefly described with links to
          code repositories and live demos.
        </p>

        <div className="mt-20 flex flex-wrap justify-center gap-5">
          {visibleProjects.map((project, index) => (
            <ProjectCard key={`project-${index}`} project={project} index={index} />
          ))}
        </div>

        {projects.length > INITIAL_COUNT && (
          <div className="mt-10 flex justify-center">
            <Button
              onClick={handleToggle}
              variant="outline"
              className="border-[#915eff] text-[#915eff] hover:bg-[#915eff] hover:text-white transition-colors px-8 py-3"
            >
              {showAll ? "Show Less" : `Show More (${projects.length - INITIAL_COUNT} more)`}
            </Button>
          </div>
        )}
      </div>
    </SectionWrapper>
  );
}
