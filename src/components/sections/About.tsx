"use client";

import { useRef } from "react";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import { services } from "@/data";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { User, Sparkles } from "lucide-react";

interface ServiceCardProps {
  title: string;
  icon: StaticImageData | string;
  index: number;
}

function ServiceCard({ title, icon, index }: ServiceCardProps) {
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

  const gradients = [
    "from-blue-500 to-cyan-400",
    "from-purple-500 to-pink-400",
    "from-amber-500 to-orange-400",
    "from-emerald-500 to-teal-400",
  ];

  return (
    <div
      className="service-card w-full sm:w-[250px]"
      style={{ opacity: 0 }}
      data-index={index}
    >
      <div
        ref={cardRef}
        className="w-full p-px rounded-2xl card-hover-lift"
        style={{ transformStyle: "preserve-3d", perspective: "600px" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="card bg-base-200/50 border border-base-300/50 hover:border-primary/20 rounded-2xl py-8 px-10 min-h-[260px] flex justify-evenly items-center flex-col transition-all duration-300 group">
          <div className={`w-16 h-16 rounded-2xl bg-linear-to-br ${gradients[index % gradients.length]} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-300`}>
            <Image
              src={icon}
              alt={title}
              width={36}
              height={36}
              className="object-contain brightness-0 invert"
            />
          </div>
          <h3 className="text-base-content text-lg font-bold text-center mt-4">
            {title}
          </h3>
        </div>
      </div>
    </div>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Header entrance
    const headerTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".about-heading",
        start: "top 85%",
      },
    });
    headerTl
      .fromTo(".about-badge", { opacity: 0, y: 20, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.5 })
      .fromTo(".about-title", { opacity: 0, y: 30, clipPath: "inset(100% 0% 0% 0%)" }, { opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)", duration: 0.6 }, "-=0.3");

    gsap.fromTo(".about-description", {
      y: 40,
      opacity: 0,
    }, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".about-description",
        start: "top 85%",
      },
    });

    gsap.utils.toArray<HTMLElement>(".service-card").forEach((card, i) => {
      gsap.to(card, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        delay: i * 0.12,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: card,
          start: "top 90%",
        },
      });
      gsap.set(card, { y: 50, scale: 0.9 });
    });
  }, { scope: sectionRef });

  return (
    <section id="about-section" className="w-full section-padding bg-base-200/30 max-w-7xl mx-auto">
      <div ref={sectionRef}>
        <div className="about-heading flex flex-col items-center justify-center text-center mb-16 gap-4">
          <div className="about-badge badge badge-outline badge-primary badge-lg gap-2 font-medium mb-2">
            <User className="w-4 h-4" />
            About Me
          </div>
          <h2 className="about-title text-3xl md:text-5xl font-bold tracking-tight text-base-content">
            Overview
          </h2>
        </div>

        <div className="about-description card bg-base-100 border border-base-300/50 p-8 sm:p-10 max-w-3xl mx-auto mb-16">
          <p className="text-base-content/70 text-[16px] leading-[1.8] text-center">
            I am a <span className="font-semibold text-base-content">MERN stack developer</span> with a passion for web development. I create
            attractive and user-friendly web pages using HTML, CSS,
            JavaScript, and frameworks such as <span className="text-primary font-medium">React</span>, <span className="text-primary font-medium">Next.js</span>, and TailwindCSS.
            I implement complex functionality using TypeScript and ES6 features.
            On the back end, I design and consume RESTful APIs using <span className="text-primary font-medium">Express</span>,{" "}
            <span className="text-primary font-medium">NestJS</span>, and Node.js with relational and non-relational
            databases. I follow best practices to ensure quality and maintainability.
          </p>
        </div>

        <div className="flex justify-center flex-wrap gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              index={index}
              title={service.title}
              icon={service.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
