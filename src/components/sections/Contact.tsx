"use client";

import { useRef, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import SectionWrapper from "@/components/SectionWrapper";
import { gsap } from "@/lib/gsap";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const EarthCanvas = dynamic(() => import("@/components/canvas/Earth"), {
  ssr: false,
  loading: () => (
    <div className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px] flex items-center justify-center">
      <div className="canvas-load" />
    </div>
  ),
});

interface FormState {
  name: string;
  email: string;
  message: string;
}

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState<FormState>({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-form-panel", {
        x: -100,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".contact-form-panel",
          start: "top 80%",
        },
      });
      gsap.from(".contact-earth-panel", {
        x: 100,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".contact-earth-panel",
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        const data = await res.json();
        console.error("Contact error:", data.error);
        setStatus("error");
      }
    } catch (err) {
      console.error("Submit error:", err);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SectionWrapper id="contact">
      <div ref={sectionRef}>
        <p className="sm:text-[18px] text-[14px] text-secondary uppercase tracking-wider">
          Get in touch
        </p>
        <h2 className="text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]">
          Contact.
        </h2>

        <div className="xl:mt-12 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden mt-8">
          <div className="contact-form-panel flex-[0.75] bg-black-100 p-8 rounded-2xl">
            <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <Label htmlFor="name" className="text-white font-medium">
                  Your Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="What's your name?"
                  required
                  className="bg-tertiary border-border text-white placeholder:text-secondary py-4 px-6 rounded-lg h-auto"
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="email" className="text-white font-medium">
                  Your Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="What's your email?"
                  required
                  className="bg-tertiary border-border text-white placeholder:text-secondary py-4 px-6 rounded-lg h-auto"
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="message" className="text-white font-medium">
                  Your Message
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="What do you want to say?"
                  required
                  rows={7}
                  className="bg-tertiary border-border text-white placeholder:text-secondary py-4 px-6 rounded-lg resize-none"
                />
              </div>

              {status === "success" && (
                <p className="text-green-400 text-sm">
                  Thank you! I will get back to you as soon as possible.
                </p>
              )}
              {status === "error" && (
                <p className="text-red-400 text-sm">
                  Something went wrong. Please try again.
                </p>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="bg-tertiary text-white font-bold shadow-md shadow-primary rounded-xl w-fit px-8 py-3 h-auto hover:bg-[#915eff] transition-colors"
              >
                {loading ? "Sending..." : "Send"}
              </Button>
            </form>
          </div>

          <div className="contact-earth-panel xl:flex-1 xl:h-auto md:h-[550px] h-[350px]">
            <EarthCanvas />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
