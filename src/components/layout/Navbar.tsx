"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "@/lib/gsap";
import { Menu, X } from "lucide-react";
import { useTheme } from "next-themes";
import {
  Button as AriaButton,
  Link as AriaLink,
  Dialog,
  DialogTrigger,
  Modal,
  ModalOverlay,
} from "react-aria-components";

function ModeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <label
      className="swap swap-rotate btn btn-ghost btn-circle btn-sm"
      aria-label="Toggle theme"
      title="Toggle theme"
    >
      <input
        type="checkbox"
        className="theme-controller sr-only"
        checked={isDark}
        onChange={() => setTheme(isDark ? "light" : "dark")}
      />
      {/* Sun — visible when dark (swap-on = checked) */}
      <svg
        className="swap-on h-5 w-5 fill-current"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
      </svg>
      {/* Moon — visible when light (swap-off = unchecked) */}
      <svg
        className="swap-off h-5 w-5 fill-current"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
      </svg>
    </label>
  );
}

const navItems = [
  { id: "about", title: "Home" },
  { id: "tech", title: "Skills" },
  { id: "experience", title: "Experience" },
  { id: "works", title: "Projects" },
  { id: "testimonials", title: "Reviews" },
  { id: "contact", title: "Contact" },
];

export default function Navbar() {
  const [active, setActive] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useGSAP(() => {
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
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.06, delay: 0.5, ease: "power2.out" },
    );

    ScrollTrigger.create({
      start: "top -80",
      onUpdate: () => {
        if (!navRef.current) return;
        const scrolled = window.scrollY > 50;
        if (scrolled) {
          navRef.current.classList.add("bg-base-100/80", "backdrop-blur-xl", "shadow-sm");
        } else {
          navRef.current.classList.remove("bg-base-100/80", "backdrop-blur-xl", "shadow-sm");
        }
      },
    });
  }, { scope: navRef });

  const handleNavClick = useCallback((title: string) => {
    setActive(title);
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
          <span className="bg-linear-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">MH</span>
          <span className="text-base-content/40 font-normal ml-1">|</span>
          <span className="text-sm font-medium text-base-content/60 ml-1">Portfolio</span>
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
                  onClick={() => handleNavClick(link.title)}
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
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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
                              onClick={() => handleNavClick(link.title)}
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
