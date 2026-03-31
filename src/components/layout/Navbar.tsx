"use client";

import { useState, useRef, useCallback } from "react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "@/lib/gsap";
import { Moon, Sun, Menu, X } from "lucide-react";
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
  const { theme, setTheme } = useTheme();
  return (
    <AriaButton
      onPress={() => setTheme(theme === "dark" || !theme ? "light" : "dark")}
      className="btn btn-ghost btn-circle btn-sm swap swap-rotate"
      aria-label="Toggle theme"
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </AriaButton>
  );
}

const navItems = [
  { id: "about", title: "Home" },
  { id: "tech", title: "Skills" },
  { id: "experience", title: "Experience" },
  { id: "works", title: "Projects" },
  { id: "contact", title: "Contact" },
];

export default function Navbar() {
  const [active, setActive] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
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
          Mohamed Hegazy
        </AriaLink>

        {/* Desktop nav */}
        <div className="hidden sm:flex items-center gap-1">
          <ul className="menu menu-horizontal px-1 gap-1">
            {navItems.map((link) => (
              <li key={link.id}>
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
