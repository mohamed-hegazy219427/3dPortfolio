"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { Link as AriaLink } from "react-aria-components";
import {
  Github,
  Linkedin,
  Mail,
  Zap,
  Download,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { navItems } from "@/data";

const GITHUB_AVATAR = "https://avatars.githubusercontent.com/u/48334725";

// Skip "Home" (index 0) — that's the Hero itself. Map the rest to scroll targets.
// "about-section" is the About component which sits below the Hero but has no nav item.
const SECTIONS = [
  { id: "about-section", label: "About" },
  ...navItems.slice(1).map((item) => ({ id: item.id, label: item.title })),
];

function getNextIdx(): number {
  const viewportMid = window.innerHeight * 0.4;
  for (let i = SECTIONS.length - 1; i >= 0; i--) {
    const el = document.getElementById(SECTIONS[i].id);
    if (el && el.getBoundingClientRect().top <= viewportMid) return i + 1;
  }
  return 0;
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [nextIdx, setNextIdx] = useState(0);

  // Sync next destination label on scroll
  useEffect(() => {
    const update = () => setNextIdx(getNextIdx());
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  const atEnd = nextIdx >= SECTIONS.length;
  const nextLabel = atEnd ? "Back to top" : SECTIONS[nextIdx].label;

  const handleScrollClick = () => {
    if (atEnd) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      document
        .getElementById(SECTIONS[nextIdx].id)
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // Stagger-reveal the badge
      tl.fromTo(
        ".hero-badge",
        { opacity: 0, y: 30, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6 },
      )
        // Title lines with clip-path reveal
        .fromTo(
          ".hero-title-line",
          { opacity: 0, y: 60, clipPath: "inset(100% 0% 0% 0%)" },
          {
            opacity: 1,
            y: 0,
            clipPath: "inset(0% 0% -20% 0%)",
            duration: 0.8,
            stagger: 0.15,
            onComplete: () => {
              gsap.set(".hero-title-line", { clearProps: "clipPath" });
            },
          },
          "-=0.3",
        )
        // Description fade-up
        .fromTo(
          ".hero-desc",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4",
        )
        // CTA buttons stagger
        .fromTo(
          ".hero-cta",
          { opacity: 0, y: 20, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1 },
          "-=0.3",
        )
        // Social icons pop in
        .fromTo(
          ".hero-social",
          { opacity: 0, scale: 0, rotate: -180 },
          {
            opacity: 1,
            scale: 1,
            rotate: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: "back.out(1.7)",
          },
          "-=0.3",
        )
        // Stats counter entrance
        .fromTo(
          ".hero-stat",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
          "-=0.3",
        )
        // Avatar entrance with spring
        .fromTo(
          ".hero-avatar",
          { opacity: 0, scale: 0.6, rotate: -5 },
          {
            opacity: 1,
            scale: 1,
            rotate: 0,
            duration: 1,
            ease: "elastic.out(1, 0.5)",
          },
          0.3,
        )
        // Avatar glow pulse
        .fromTo(
          ".hero-avatar-glow",
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 1, ease: "power2.out" },
          0.5,
        )
        // Availability badge
        .fromTo(
          ".hero-available-badge",
          { opacity: 0, x: 20, scale: 0.8 },
          { opacity: 1, x: 0, scale: 1, duration: 0.5, ease: "back.out(2)" },
          "-=0.4",
        )
        // Scroll indicator
        .fromTo(
          ".hero-scroll",
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.2",
        );

      // Parallax on avatar when scrolling
      gsap.to(".hero-avatar", {
        y: -60,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      // Stat counter animation
      const statValues = [
        { target: 15, suffix: "+" },
        { target: 2, suffix: "+" },
        { target: 30, suffix: "%" },
      ];
      document
        .querySelectorAll<HTMLSpanElement>(".hero-stat-value")
        .forEach((el, i) => {
          const { target, suffix } = statValues[i];
          gsap.fromTo(
            { val: 0 },
            { val: target },
            {
              val: target,
              duration: 2,
              delay: 0.8 + i * 0.15,
              ease: "power2.out",
              onUpdate() {
                const obj = this.targets()[0] as { val: number };
                el.textContent = `${Math.round(obj.val)}${suffix}`;
              },
            },
          );
        });
    },
    { scope: containerRef },
  );

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative w-full min-h-screen mx-auto flex flex-col justify-center overflow-hidden pt-20 sm:pt-24"
    >
      {/* Ambient gradient blobs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary/8 rounded-full blur-[130px] pointer-events-none z-1" />
      <div className="absolute top-[15%] right-[8%] w-[280px] h-[280px] bg-secondary/6 rounded-full blur-[100px] pointer-events-none z-1" />
      <div className="absolute bottom-[15%] left-[4%] w-[180px] h-[180px] bg-accent/6 rounded-full blur-[80px] pointer-events-none z-1" />

      {/* Bottom blend — fades stars into the next section */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-linear-to-t from-base-100 via-base-100/60 to-transparent pointer-events-none z-2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full flex flex-col-reverse lg:flex-row items-center gap-6 sm:gap-10 lg:gap-20 z-10 relative pb-20 lg:pb-0">
        {/* Left Content */}
        <div className="flex-[1.2] flex flex-col items-start gap-4 sm:gap-6 w-full">
          <div className="hero-badge badge badge-outline badge-lg gap-2 px-4 py-3 font-medium">
            <Zap size={14} className="text-primary" />
            <span>Available for Work</span>
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-base-content leading-[1.1]">
              <span className="hero-title-line block overflow-hidden">
                Hi, I&apos;m
              </span>
              <span className="hero-title-line block ">
                <span className="bg-linear-to-r from-primary via-secondary to-accent bg-clip-text text-transparent inline-block pb-2">
                  Mohamed Hegazy
                </span>
              </span>
              <span className="hero-title-line block overflow-hidden text-xl sm:text-3xl lg:text-4xl font-semibold text-base-content/70 mt-1">
                Full-Stack &amp; Mobile Developer
              </span>
            </h1>
          </div>

          <p className="hero-desc text-base sm:text-lg text-base-content/60 font-medium max-w-xl leading-relaxed">
            I build{" "}
            <span className="text-base-content font-semibold">
              fast, scalable, and beautiful
            </span>{" "}
            web &amp; mobile applications using the MERN stack, React Native,
            and modern tooling.
            <span className="text-sm sm:text-base font-normal mt-2 block opacity-80">
              From pixel-perfect UIs to robust REST APIs — I ship
              production-ready products that users love.
            </span>
          </p>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-2">
            <a
              href="/Mohamed_Hegazy_CV.pdf"
              download="Mohamed_Hegazy_CV.pdf"
              className="hero-cta btn btn-primary btn-md sm:btn-lg rounded-full shadow-lg px-6 sm:px-8 font-semibold hover:shadow-primary/25 hover:shadow-xl transition-all duration-300 animate-pulse-glow"
            >
              <Download size={16} />
              Download CV
            </a>
            <AriaLink
              href="#works"
              className="hero-cta btn btn-outline btn-md sm:btn-lg rounded-full px-6 sm:px-8 font-semibold hover:btn-primary transition-all duration-300"
            >
              View My Work
            </AriaLink>

            <div className="flex items-center gap-2 ml-2">
              {[
                {
                  href: "https://github.com/mohamed-hegazy219427",
                  icon: <Github size={20} />,
                  label: "GitHub",
                },
                {
                  href: "https://www.linkedin.com/in/mohamed-hegazy-134109179/",
                  icon: <Linkedin size={20} />,
                  label: "LinkedIn",
                },
                {
                  href: "mailto:mohamedhegazy19427@gmail.com",
                  icon: <Mail size={20} />,
                  label: "Email",
                },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.label !== "Email" ? "_blank" : undefined}
                  rel="noreferrer"
                  className="hero-social btn btn-ghost btn-circle border border-base-300 text-base-content/70 hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all duration-300"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-6 sm:gap-10 mt-6 sm:mt-10 pt-6 sm:pt-10 border-t border-base-300/50 w-full">
            {[
              { value: "15+", label: "Projects Shipped" },
              { value: "2+", label: "Years Exp" },
              { value: "30%", label: "Perf Boost" },
            ].map((stat) => (
              <div key={stat.label} className="hero-stat flex flex-col gap-1">
                <span className="hero-stat-value text-3xl font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent inline-block">
                  {stat.value}
                </span>
                <span className="text-sm font-medium text-base-content/50">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Content — Avatar */}
        <div className="hero-avatar flex-1 flex justify-center lg:justify-end w-full relative mt-4 sm:mt-0">
          <div className="relative w-52 h-52 sm:w-72 sm:h-72 md:w-[360px] md:h-[360px] lg:w-[420px] lg:h-[420px]">
            <div className="hero-avatar-glow absolute inset-0 rounded-full bg-linear-to-br from-primary/20 via-secondary/20 to-accent/20 blur-2xl animate-float" />
            <div className="absolute inset-4 bg-base-200 rounded-full overflow-hidden flex items-center justify-center shadow-2xl ring-1 ring-base-300/50">
              <Image
                src={GITHUB_AVATAR}
                alt="Mohamed Hegazy"
                fill
                className="object-cover"
                priority
              />
            </div>
            {/* Orbiting ring decoration */}
            <div className="absolute inset-0 rounded-full border border-dashed border-base-300/30 animate-[spin_20s_linear_infinite]" />
            <div className="absolute -inset-4 rounded-full border border-dashed border-base-300/15 animate-[spin_30s_linear_infinite_reverse]" />

            <div className="hero-available-badge absolute bottom-4 right-4 sm:bottom-10 sm:right-10 px-4 py-2 bg-base-100/80 backdrop-blur-xl border border-base-300/50 rounded-full flex items-center gap-2 shadow-lg">
              <span className="w-2.5 h-2.5 rounded-full bg-success shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse" />
              <span className="text-xs font-semibold text-base-content">
                Available for hire
              </span>
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="hero-scroll fixed bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 group z-20 px-6 pb-2 pt-1 cursor-pointer select-none"
        aria-label={`Navigate to ${nextLabel}`}
        onClick={handleScrollClick}
      >
        <span className="text-[10px] font-semibold text-base-content/40 uppercase tracking-[0.2em] group-hover:text-primary transition-colors duration-300">
          {nextLabel}
        </span>
        <div className="w-8 h-8 rounded-full border-2 border-base-content/25 group-hover:border-primary transition-colors duration-300 flex items-center justify-center group-hover:shadow-[0_0_12px] group-hover:shadow-primary/30">
          {atEnd ? (
            <ChevronUp className="w-4 h-4 text-primary animate-bounce" />
          ) : (
            <ChevronDown className="w-4 h-4 text-primary animate-bounce" />
          )}
        </div>
      </button>
    </section>
  );
}
