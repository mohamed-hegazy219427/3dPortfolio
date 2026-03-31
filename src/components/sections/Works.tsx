"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { projects } from "@/data";
import { Link as AriaLink } from "react-aria-components";
import { Github, ExternalLink, FolderOpen } from "lucide-react";

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
      stagger: 0.1,
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
      className="w-full section-padding bg-base-100 max-w-7xl mx-auto"
    >
      <div className="flex flex-col items-center justify-center text-center works-header mb-16 gap-4">
        <div className="badge badge-outline badge-accent badge-lg gap-2 font-medium mb-2">
          <FolderOpen className="w-4 h-4" />
          Portfolio
        </div>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-base-content">
          Featured Projects
        </h2>
        <p className="text-base-content/60 max-w-2xl text-base md:text-lg">
          A selection of projects that demonstrate my expertise in full-stack development and modern web practices.
        </p>
      </div>

      <div className="works-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10 w-full">
        {projects.map((project, index) => (
          <div
            key={index}
            className="works-card card bg-base-200/50 border border-base-300/50 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 group overflow-hidden"
          >
            {/* Image */}
            <figure className="relative h-48 sm:h-56 overflow-hidden">
              <Image
                src={project.image}
                alt={project.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-base-300/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Quick action buttons on hover */}
              <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                {project.source_code_link && (
                  <a
                    href={project.source_code_link}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-circle btn-sm bg-base-100/90 hover:bg-base-100 border-0 shadow-lg"
                    aria-label={`View ${project.name} source code`}
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
                {project.live_demo && (
                  <a
                    href={project.live_demo}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-circle btn-sm bg-primary hover:bg-primary/90 text-primary-content border-0 shadow-lg"
                    aria-label={`View ${project.name} live demo`}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </figure>

            {/* Content */}
            <div className="card-body p-6">
              <h3 className="card-title text-lg font-bold text-base-content capitalize">
                {project.name.replace(/-/g, " ")}
              </h3>

              <p className="text-sm text-base-content/60 line-clamp-3 leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-4">
                {project.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="badge badge-ghost badge-sm py-2.5 px-3 font-medium text-base-content/70"
                  >
                    #{tag.name}
                  </span>
                ))}
              </div>

              <div className="card-actions justify-start mt-4 pt-4 border-t border-base-300/50">
                {project.source_code_link && (
                  <AriaLink
                    href={project.source_code_link}
                    target="_blank"
                    className="btn btn-ghost btn-sm gap-2 text-base-content/70 hover:text-base-content font-medium"
                  >
                    <Github className="w-4 h-4" />
                    Code
                  </AriaLink>
                )}
                {project.live_demo && (
                  <AriaLink
                    href={project.live_demo}
                    target="_blank"
                    className="btn btn-primary btn-sm gap-2 font-medium"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Demo
                  </AriaLink>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
