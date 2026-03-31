"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import SectionWrapper from "@/components/SectionWrapper";
import { services } from "@/data";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "@/lib/gsap";

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
      rotateY: x * 20,
      rotateX: -y * 20,
      duration: 0.3,
      ease: "power2.out",
      transformPerspective: 500,
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
      className={`service-card xs:w-[250px] w-full`}
      style={{ opacity: 0 }}
      data-index={index}
    >
      <div
        ref={cardRef}
        className="w-full green-pink-gradient p-px rounded-[20px] shadow-card"
        style={{ transformStyle: "preserve-3d", perspective: "500px" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col">
          <Image
            src={icon}
            alt={title}
            width={64}
            height={64}
            className="object-contain"
          />
          <h3 className="text-white text-[20px] font-bold text-center">
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
    gsap.from(".about-heading", {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".about-heading",
        start: "top 85%",
      },
    });

    gsap.from(".about-description", {
      y: 40,
      opacity: 0,
      duration: 0.8,
      delay: 0.2,
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
        duration: 0.6,
        delay: i * 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top 90%",
        },
      });
      gsap.set(card, { y: 60 });
    });
  }, { scope: sectionRef });

  return (
    <SectionWrapper id="about">
      <div ref={sectionRef}>
        <div className="about-heading">
          <p className="sm:text-[18px] text-[14px] text-secondary uppercase tracking-wider">
            Introduction
          </p>
          <h2 className="text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]">
            Overview.
          </h2>
        </div>

        <p className="about-description mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]">
          I am a MERN stack developer with a passion for web development. I can
          create attractive and user-friendly web pages using HTML, CSS,
          JavaScript, and frameworks such as React, Bootstrap, and TailwindCSS.
          I implement complex functionality using TypeScript and ES6 features.
          On the back end, I design and consume RESTful APIs using Express,
          NestJS, and Node.js. I work with relational and non-relational
          databases using MySQL, Sequelize, MongoDB, and Mongoose. I use Git and
          GitHub to manage version control and collaborate with other developers,
          following best practices to ensure quality and maintainability.
        </p>

        <div className="mt-20 flex justify-start flex-wrap gap-10">
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
    </SectionWrapper>
  );
}
