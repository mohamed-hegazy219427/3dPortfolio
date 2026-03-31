"use client";

import { useRef } from "react";
import Image from "next/image";
import { creator } from "@/assets";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Zap, ArrowDown } from "lucide-react";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.fromTo(
        ".hero-badge",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
      )
        .fromTo(
          ".hero-title",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power3.out", stagger: 0.1 },
          "-=0.3",
        )
        .fromTo(
          ".hero-desc",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
          "-=0.3",
        )
        .fromTo(
          ".hero-actions",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
          "-=0.3",
        )
        .fromTo(
          ".hero-stats",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
          "-=0.3",
        )
        .fromTo(
          ".hero-image",
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" },
          0.2,
        );
    },
    { scope: containerRef },
  );

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative w-full min-h-screen mx-auto flex flex-col justify-center overflow-hidden bg-background pt-24"
    >
      {/* Background radial gradient subtle glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 dark:bg-primary/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20 z-10">
        {/* Left Content */}
        <div className="flex-[1.2] flex flex-col items-start gap-6 w-full">
          <div className="hero-badge flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-secondary/50 text-sm font-medium text-foreground w-fit">
            <Zap size={14} className="text-foreground" />
            <span>Available for Work</span>
          </div>

          <div className="hero-title flex flex-col gap-2">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.1]">
              Hello, I&apos;m
              <br />
              Mohamed Hegazy
            </h1>
          </div>

          <p className="hero-desc text-lg sm:text-xl text-muted-foreground font-medium max-w-xl leading-relaxed">
            MERN Stack Developer crafting digital experiences with{" "}
            <span className="text-foreground font-semibold">2+ years</span> of
            expertise.
            <br className="hidden sm:block" />
            <span className="text-base sm:text-lg font-normal mt-2 block opacity-80">
              Specializing in full-stack development, modern web practices, and
              scalable solutions that drive business growth.
            </span>
          </p>

          <div className="hero-actions flex flex-wrap items-center gap-4 mt-2">
            <Button
              size="lg"
              className="rounded-full shadow-md font-semibold px-8 h-12"
              asChild
            >
              <a href="#">Download Resume</a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full font-semibold px-8 h-12 bg-transparent"
              asChild
            >
              <a href="#works">View My Work</a>
            </Button>

            <div className="flex items-center gap-2 ml-2">
              <a
                href="https://github.com/mohamed-hegazy219427"
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-secondary transition-colors"
              >
                <Github size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/mohamed-hegazy-134109179/"
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-secondary transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="mailto:mohamedhegazy19427@gmail.com"
                className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-secondary transition-colors"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          <div className="hero-stats flex items-center gap-10 mt-10 pt-10 w-full">
            <div className="flex flex-col gap-1">
              <span className="text-3xl font-bold text-foreground">10+</span>
              <span className="text-sm font-medium text-muted-foreground">
                Projects
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-3xl font-bold text-foreground">2+</span>
              <span className="text-sm font-medium text-muted-foreground">
                Years Exp
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-3xl font-bold text-foreground">100%</span>
              <span className="text-sm font-medium text-muted-foreground opacity-80">
                Client Satisfaction
              </span>
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="hero-image flex-1 flex justify-center lg:justify-end w-full relative">
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-[450px] md:h-[450px]">
            <div className="absolute inset-0  rounded-full opacity-20 dark:opacity-40 " />
            <div className="absolute inset-4 bg-secondary rounded-full overflow-hidden flex items-center justify-center shadow-2xl">
              <Image
                src={creator}
                alt="Mohamed Hegazy"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute bottom-4 right-4 sm:bottom-10 sm:right-10 px-4 py-2 bg-popover/80 backdrop-blur-md border border-border rounded-full flex items-center gap-2 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
              <span className="text-xs font-semibold text-foreground">
                Available for hire
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
        <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest">
          Scroll to explore
        </span>
        <a
          href="#tech"
          className="w-6 h-6 rounded-full flex items-center justify-center text-foreground animate-bounce"
        >
          <ArrowDown size={14} />
        </a>
      </div>
    </section>
  );
}
