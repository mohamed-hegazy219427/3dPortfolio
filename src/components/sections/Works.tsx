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
    // Header entrance
    const headerTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".works-header",
        start: "top 85%",
      },
    });
    headerTl
      .fromTo(".works-badge", { opacity: 0, y: 20, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.5 })
      .fromTo(".works-title", { opacity: 0, y: 30, clipPath: "inset(100% 0% 0% 0%)" }, { opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)", duration: 0.6 }, "-=0.3")
      .fromTo(".works-subtitle", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.3");

    // Cards with staggered image reveal
    gsap.utils.toArray<HTMLElement>(".works-card").forEach((card, i) => {
      const img = card.querySelector(".works-card-img");
      const content = card.querySelector(".works-card-content");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: "top 88%",
        },
      });

      tl.fromTo(
        card,
        { opacity: 0, y: 50, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, delay: i * 0.08, ease: "power3.out" },
      );

      if (img) {
        tl.fromTo(
          img,
          { clipPath: "inset(0% 100% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 0.8, ease: "power4.inOut" },
          "-=0.4",
        );
      }

      if (content) {
        tl.fromTo(
          content,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
          "-=0.4",
        );
      }
    });
  }, { scope: containerRef });

  return (
    <section
      id="works"
      ref={containerRef}
      className="w-full section-padding bg-base-200/60 backdrop-blur-sm max-w-7xl mx-auto relative"
    >
      {/* Background decoration */}
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="flex flex-col items-center justify-center text-center works-header mb-16 gap-4 relative z-10">
        <div className="works-badge badge badge-outline badge-accent badge-lg gap-2 font-medium mb-2">
          <FolderOpen className="w-4 h-4" />
          Portfolio
        </div>
        <h2 className="works-title text-3xl md:text-5xl font-bold tracking-tight text-base-content">
          Featured Projects
        </h2>
        <p className="works-subtitle text-base-content/60 max-w-2xl text-base md:text-lg">
          A selection of projects that demonstrate my expertise in full-stack development and modern web practices.
        </p>
      </div>

      <div className="works-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10 w-full">
        {projects.map((project, index) => (
          <div
            key={index}
            className="works-card card bg-base-200/50 border border-base-300/50 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 group overflow-hidden card-hover-lift"
          >
            {/* Image */}
            <figure className="works-card-img relative h-48 sm:h-56 overflow-hidden">
              <Image
                src={project.image}
                alt={project.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-linear-to-t from-base-300/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

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
            <div className="works-card-content card-body p-6">
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
