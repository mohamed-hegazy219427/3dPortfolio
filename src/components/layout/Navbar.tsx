"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "@/lib/gsap";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import {
  Button as AriaButton,
  Link as AriaLink,
  Dialog,
  DialogTrigger,
  Modal,
  ModalOverlay,
} from "react-aria-components";
import { navItems } from "@/data";

function ModeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      className="btn btn-ghost btn-circle btn-sm"
      aria-label="Toggle theme"
      title="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
}

export default function Navbar() {
  const [active, setActive] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  // Scroll spy — sync active with the section currently in view
  useEffect(() => {
    const update = () => {
      const mid = window.innerHeight * 0.4;
      let current = "";
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top <= mid) current = item.title;
      }
      setActive(current);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useGSAP(
    () => {
      // Nav entrance
      gsap.fromTo(
        navRef.current,
        { y: -60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.2 },
      );

      // Nav items stagger
      gsap.fromTo(
        ".nav-item",
        { opacity: 0, y: -15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.06,
          delay: 0.5,
          ease: "power2.out",
        },
      );

      ScrollTrigger.create({
        start: "top -80",
        onUpdate: () => {
          if (!navRef.current) return;
          const scrolled = window.scrollY > 50;
          if (scrolled) {
            navRef.current.classList.add(
              "bg-base-100/80",
              "backdrop-blur-xl",
              "shadow-sm",
            );
          } else {
            navRef.current.classList.remove(
              "bg-base-100/80",
              "backdrop-blur-xl",
              "shadow-sm",
            );
          }
        },
      });
    },
    { scope: navRef },
  );

  const handleNavClick = useCallback(() => {
    setMobileOpen(false);
  }, []);

  return (
    <nav
      ref={navRef}
      className="navbar fixed top-0 z-50 transition-all duration-300 px-6 lg:px-10"
    >
      <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
        {/* Logo */}
        <AriaLink
          href="#"
          className="text-base-content text-lg font-bold cursor-pointer tracking-tight hover:opacity-80 transition-opacity"
          onPress={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <span className="bg-linear-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            MH
          </span>
          <span className="text-base-content/40 font-normal ml-1">|</span>
          <span className="text-sm font-medium text-base-content/60 ml-1">
            Portfolio
          </span>
        </AriaLink>

        {/* Desktop nav */}
        <div className="hidden sm:flex items-center gap-1">
          <ul className="menu menu-horizontal px-1 gap-1">
            {navItems.map((link) => (
              <li key={link.id} className="nav-item">
                <a
                  href={`#${link.id}`}
                  className={`text-sm font-medium rounded-btn transition-all duration-200 ${
                    active === link.title
                      ? "text-primary font-semibold bg-primary/10"
                      : "text-base-content/70 hover:text-base-content hover:bg-base-200/50"
                  }`}
                  onClick={() => handleNavClick()}
                >
                  {link.title}
                </a>
              </li>
            ))}
          </ul>
          <div className="divider divider-horizontal mx-1 h-6 self-center" />
          <ModeToggle />
        </div>

        {/* Mobile nav */}
        <div className="sm:hidden flex items-center gap-2">
          <ModeToggle />
          <DialogTrigger>
            <AriaButton
              onPress={() => setMobileOpen(!mobileOpen)}
              className="btn btn-ghost btn-circle btn-sm"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </AriaButton>
            {mobileOpen && (
              <ModalOverlay
                isDismissable
                className="fixed inset-0 z-40 bg-base-300/40 backdrop-blur-sm animate-in fade-in"
                onOpenChange={(isOpen) => setMobileOpen(isOpen)}
              >
                <Modal className="fixed top-16 right-4 left-4 z-50 bg-base-100 rounded-box shadow-2xl border border-base-300/50 p-6 animate-in slide-in-from-top-2">
                  <Dialog className="outline-none">
                    {() => (
                      <ul className="menu gap-1">
                        {navItems.map((link) => (
                          <li key={link.id}>
                            <a
                              href={`#${link.id}`}
                              className={`text-base font-medium rounded-btn ${
                                active === link.title
                                  ? "text-primary font-semibold bg-primary/10"
                                  : "text-base-content/70"
                              }`}
                              onClick={() => handleNavClick()}
                            >
                              {link.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </Dialog>
                </Modal>
              </ModalOverlay>
            )}
          </DialogTrigger>
        </div>
      </div>
    </nav>
  );
}
