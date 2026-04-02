"use client";

import { useRef } from "react";
import type { ComponentType } from "react";
import { services } from "@/data";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { User } from "lucide-react";

interface ServiceCardProps {
  title: string;
  icon: ComponentType<{ className?: string }>;
  index: number;
}

function ServiceCard({ title, icon: Icon, index }: ServiceCardProps) {
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
            <Icon className="w-9 h-9 text-white" />
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
    <section id="about-section" className="w-full section-padding bg-base-100/70 backdrop-blur-sm max-w-7xl mx-auto">
      <div ref={sectionRef}>
        <div className="about-heading flex flex-col items-center justify-center text-center mb-16 gap-4">
          <div className="about-badge badge badge-outline badge-primary badge-lg gap-2 font-medium mb-2">
            <User className="w-4 h-4" />
            About Me
          </div>
          <h2 className="about-title text-3xl md:text-5xl font-bold tracking-tight text-base-content">
            Who I Am
          </h2>
        </div>

        <div className="about-description card bg-base-100 border border-base-300/50 p-8 sm:p-10 max-w-3xl mx-auto mb-16">
          <p className="text-base-content/70 text-[16px] leading-[1.8] text-center">
            I&apos;m a <span className="font-semibold text-base-content">Full-Stack &amp; Mobile Developer</span> with 2+ years of hands-on experience shipping production applications across web and mobile.
            I build with <span className="text-primary font-medium">React</span>, <span className="text-primary font-medium">React Native</span>, <span className="text-primary font-medium">Next.js</span>, and TypeScript on the frontend,
            and architect scalable APIs with <span className="text-primary font-medium">Node.js</span>, <span className="text-primary font-medium">NestJS</span>, and <span className="text-primary font-medium">Express</span> on the backend —
            backed by MongoDB, PostgreSQL, and Prisma.
            <span className="block mt-3">
              I care deeply about performance, clean code, and developer experience. Whether it&apos;s a pixel-perfect landing page, a complex dashboard, or a cross-platform mobile app — I turn ideas into fast, maintainable, and scalable products.
            </span>
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
