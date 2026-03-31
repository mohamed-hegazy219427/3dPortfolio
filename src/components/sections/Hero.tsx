"use client";

import { useRef } from "react";
import Image from "next/image";
import { creator } from "@/assets";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { Button as AriaButton, Link as AriaLink } from "react-aria-components";
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
      className="relative w-full min-h-screen mx-auto flex flex-col justify-center overflow-hidden bg-base-100 pt-24"
    >
      {/* Background gradient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20 z-10">
        {/* Left Content */}
        <div className="flex-[1.2] flex flex-col items-start gap-6 w-full">
          <div className="hero-badge badge badge-outline badge-lg gap-2 px-4 py-3 font-medium">
            <Zap size={14} className="text-primary" />
            <span>Available for Work</span>
          </div>

          <div className="hero-title flex flex-col gap-2">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-base-content leading-[1.1]">
              Hello, I&apos;m
              <br />
              <span className="gradient-text">Mohamed Hegazy</span>
            </h1>
          </div>

          <p className="hero-desc text-lg sm:text-xl text-base-content/60 font-medium max-w-xl leading-relaxed">
            MERN Stack Developer crafting digital experiences with{" "}
            <span className="text-base-content font-semibold">2+ years</span> of
            expertise.
            <br className="hidden sm:block" />
            <span className="text-base sm:text-lg font-normal mt-2 block opacity-80">
              Specializing in full-stack development, modern web practices, and
              scalable solutions that drive business growth.
            </span>
          </p>

          <div className="hero-actions flex flex-wrap items-center gap-4 mt-2">
            <AriaLink
              href="#"
              className="btn btn-primary btn-lg rounded-full shadow-lg px-8 font-semibold hover:shadow-primary/25 hover:shadow-xl transition-all duration-300"
            >
              Download Resume
            </AriaLink>
            <AriaLink
              href="#works"
              className="btn btn-outline btn-lg rounded-full px-8 font-semibold hover:btn-primary transition-all duration-300"
            >
              View My Work
            </AriaLink>

            <div className="flex items-center gap-2 ml-2">
              {[
                { href: "https://github.com/mohamed-hegazy219427", icon: <Github size={20} />, label: "GitHub" },
                { href: "https://www.linkedin.com/in/mohamed-hegazy-134109179/", icon: <Linkedin size={20} />, label: "LinkedIn" },
                { href: "mailto:mohamedhegazy19427@gmail.com", icon: <Mail size={20} />, label: "Email" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.label !== "Email" ? "_blank" : undefined}
                  rel="noreferrer"
                  className="btn btn-ghost btn-circle border border-base-300 text-base-content/70 hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all duration-300"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="hero-stats flex items-center gap-10 mt-10 pt-10 border-t border-base-300/50 w-full">
            {[
              { value: "10+", label: "Projects" },
              { value: "2+", label: "Years Exp" },
              { value: "100%", label: "Client Satisfaction" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1">
                <span className="text-3xl font-bold text-base-content">{stat.value}</span>
                <span className="text-sm font-medium text-base-content/50">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Content — Avatar */}
        <div className="hero-image flex-1 flex justify-center lg:justify-end w-full relative">
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-[450px] md:h-[450px]">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 blur-2xl animate-float" />
            <div className="absolute inset-4 bg-base-200 rounded-full overflow-hidden flex items-center justify-center shadow-2xl ring-1 ring-base-300/50">
              <Image
                src={creator}
                alt="Mohamed Hegazy"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute bottom-4 right-4 sm:bottom-10 sm:right-10 px-4 py-2 bg-base-100/80 backdrop-blur-xl border border-base-300/50 rounded-full flex items-center gap-2 shadow-lg">
              <span className="w-2.5 h-2.5 rounded-full bg-success shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse" />
              <span className="text-xs font-semibold text-base-content">
                Available for hire
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
        <span className="text-[10px] font-medium text-base-content/50 uppercase tracking-widest">
          Scroll to explore
        </span>
        <a
          href="#tech"
          className="w-8 h-8 rounded-full border border-base-300 flex items-center justify-center text-base-content/70 hover:border-primary hover:text-primary animate-bounce transition-colors"
        >
          <ArrowDown size={14} />
        </a>
      </div>
    </section>
  );
}
