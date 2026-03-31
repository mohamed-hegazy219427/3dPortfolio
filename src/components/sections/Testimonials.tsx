"use client";

import { useRef } from "react";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { testimonials as localTestimonials } from "@/data";
import type { Testimonial } from "@/types";
import { MessageSquareQuote, Star, Quote } from "lucide-react";

function TestimonialCard({ item, index }: { item: Testimonial; index: number }) {
  const isStaticImage = typeof item.image !== "string";

  return (
    <div
      className={`testimonial-card card bg-base-100 border border-base-300/50 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 flex-1 min-w-[300px] max-w-[400px] card-hover-lift`}
    >
      <div className="card-body p-8 flex flex-col justify-between">
        {/* Quote icon */}
        <div className="mb-4">
          <Quote className="w-8 h-8 text-primary/20" />
        </div>

        {/* Testimonial text */}
        <p className="text-base-content/70 text-[15px] leading-relaxed flex-grow mb-6">
          {item.testimonial}
        </p>

        {/* Stars */}
        <div className="flex gap-1 mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-warning text-warning" />
          ))}
        </div>

        {/* Author */}
        <div className="flex items-center gap-3 pt-4 border-t border-base-300/50">
          <div className="avatar">
            <div className="w-11 h-11 rounded-full ring-2 ring-primary/20 ring-offset-2 ring-offset-base-100">
              {isStaticImage ? (
                <Image
                  src={item.image as StaticImageData}
                  alt={item.name}
                  width={44}
                  height={44}
                  className="rounded-full object-cover"
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.image as string}
                  alt={item.name}
                  width={44}
                  height={44}
                  className="rounded-full object-cover"
                />
              )}
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-base-content text-sm">
              {item.name}
            </span>
            <span className="text-xs text-base-content/50">
              {item.designation}, {item.company}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Header entrance
    const headerTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".testimonials-header",
        start: "top 85%",
      },
    });
    headerTl
      .fromTo(".testimonials-badge", { opacity: 0, y: 20, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.5 })
      .fromTo(".testimonials-title", { opacity: 0, y: 30, clipPath: "inset(100% 0% 0% 0%)" }, { opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)", duration: 0.6 }, "-=0.3")
      .fromTo(".testimonials-subtitle", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.3");

    // Cards stagger
    gsap.utils.toArray<HTMLElement>(".testimonial-card").forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 50, scale: 0.93, rotateY: i % 2 === 0 ? -5 : 5 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateY: 0,
          duration: 0.7,
          delay: i * 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".testimonials-container",
            start: "top 82%",
          },
        },
      );
    });
  }, { scope: sectionRef });

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="w-full section-padding bg-base-200/30 max-w-7xl mx-auto relative"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="flex flex-col items-center justify-center text-center testimonials-header mb-16 gap-4 relative z-10">
        <div className="testimonials-badge badge badge-outline badge-warning badge-lg gap-2 font-medium mb-2">
          <MessageSquareQuote className="w-4 h-4" />
          Testimonials
        </div>
        <h2 className="testimonials-title text-3xl md:text-5xl font-bold tracking-tight text-base-content">
          What People Say
        </h2>
        <p className="testimonials-subtitle text-base-content/60 max-w-2xl text-base md:text-lg">
          Hear from colleagues and clients about working together on impactful projects.
        </p>
      </div>

      <div className="testimonials-container flex flex-wrap gap-7 justify-center relative z-10">
        {localTestimonials.map((testimonial, index) => (
          <TestimonialCard key={index} item={testimonial} index={index} />
        ))}
      </div>
    </section>
  );
}
