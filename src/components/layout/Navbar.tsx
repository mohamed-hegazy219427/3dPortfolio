"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { logo, menu, close } from "@/assets";
import { navLinks } from "@/data";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "@/lib/gsap";

export default function Navbar() {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(navRef.current, {
        y: -100,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      ScrollTrigger.create({
        start: "top -80",
        onUpdate: () => {
          if (!navRef.current) return;
          const scrolled = window.scrollY > 80;
          navRef.current.style.backdropFilter = scrolled ? "blur(12px)" : "none";
          navRef.current.style.backgroundColor = scrolled
            ? "rgba(5, 8, 22, 0.85)"
            : "transparent";
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <nav
      ref={navRef}
      className="sm:px-16 px-6 w-full flex items-center py-5 fixed top-0 z-20 transition-colors duration-300 bg-primary"
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <a
          href="#"
          className="flex items-center gap-2"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <Image
            src={logo}
            alt="logo"
            width={36}
            height={36}
            className="object-contain"
          />
          <p className="text-white text-[18px] font-bold cursor-pointer">
            Mohamed Hegazy&nbsp;
            <span className="sm:block hidden">| MERN Stack Developer</span>
          </p>
        </a>

        {/* Desktop nav */}
        <ul className="list-none hidden sm:flex flex-row gap-10">
          {navLinks.map((link) => (
            <li
              key={link.id}
              className={`${
                active === link.title ? "text-white" : "text-secondary"
              } hover:text-white text-[18px] font-medium cursor-pointer transition-colors`}
              onClick={() => setActive(link.title)}
            >
              <a href={`#${link.id}`}>{link.title}</a>
            </li>
          ))}
        </ul>

        {/* Mobile nav */}
        <div className="sm:hidden flex flex-1 justify-end items-center">
          <button
            onClick={() => setToggle(!toggle)}
            className="cursor-pointer"
            aria-label="Toggle menu"
          >
            <Image
              src={toggle ? close : menu}
              alt="menu"
              width={28}
              height={28}
              className="object-contain"
            />
          </button>

          {toggle && (
            <div className="p-6 bg-[#1d1836] absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl border border-border">
              <ul className="list-none flex justify-end items-start flex-col gap-4">
                {navLinks.map((link) => (
                  <li
                    key={link.id}
                    className={`${
                      active === link.title ? "text-white" : "text-secondary"
                    } font-medium cursor-pointer text-[16px] transition-colors`}
                    onClick={() => {
                      setToggle(false);
                      setActive(link.title);
                    }}
                  >
                    <a href={`#${link.id}`}>{link.title}</a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
