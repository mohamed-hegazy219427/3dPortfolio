"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { logo, menu, close } from "@/assets";
import { navLinks } from "@/data";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "@/lib/gsap";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

function ModeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={() => setTheme(theme === "dark" || !theme ? "light" : "dark")}
      className="rounded-full w-9 h-9"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

export default function Navbar() {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from(navRef.current, {
      y: -50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    });

    ScrollTrigger.create({
      start: "top -80",
      onUpdate: () => {
        if (!navRef.current) return;
        const scrolled = window.scrollY > 50;
        if (scrolled) {
          navRef.current.classList.add("bg-background/80", "backdrop-blur-md", "border-b", "border-border/40");
        } else {
          navRef.current.classList.remove("bg-background/80", "backdrop-blur-md", "border-b", "border-border/40");
        }
      },
    });
  }, { scope: navRef });

  const customLinks = [
    { id: "about", title: "Home" },
    { id: "tech", title: "Skills" },
    { id: "experience", title: "Experience" },
    { id: "works", title: "Projects" },
    { id: "contact", title: "Contact" },
  ];

  return (
    <nav
      ref={navRef}
      className="fixed top-0 z-50 w-full transition-all duration-300 py-4"
    >
      <div className="max-w-7xl mx-auto px-6 w-full flex justify-between items-center">
        <a
          href="#"
          className="flex items-center gap-2"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <p className="text-foreground text-[18px] font-bold cursor-pointer tracking-tight">
            Mohamed Hegazy
          </p>
        </a>

        {/* Desktop nav */}
        <div className="hidden sm:flex items-center gap-8">
          <ul className="list-none flex flex-row gap-8">
            {customLinks.map((link) => (
              <li
                key={link.id}
                className={`${
                  active === link.title ? "text-foreground font-semibold" : "text-muted-foreground font-medium"
                } hover:text-foreground text-[14px] cursor-pointer transition-colors`}
                onClick={() => setActive(link.title)}
              >
                <a href={`#${link.id}`}>{link.title}</a>
              </li>
            ))}
          </ul>
          <ModeToggle />
        </div>

        {/* Mobile nav */}
        <div className="sm:hidden flex flex-1 justify-end items-center gap-4">
          <ModeToggle />
          <button
            onClick={() => setToggle(!toggle)}
            className="cursor-pointer text-foreground"
            aria-label="Toggle menu"
          >
            <Image
              src={toggle ? close : menu}
              alt="menu"
              width={24}
              height={24}
              className="object-contain invert dark:invert-0"
            />
          </button>

          {toggle && (
            <div className="p-6 bg-popover/90 backdrop-blur-xl absolute top-16 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl border border-border shadow-md">
              <ul className="list-none flex justify-end items-start flex-col gap-4">
                {customLinks.map((link) => (
                  <li
                    key={link.id}
                    className={`${
                      active === link.title ? "text-foreground" : "text-muted-foreground"
                    } font-medium cursor-pointer text-[14px] transition-colors`}
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
