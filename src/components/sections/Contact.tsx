"use client";

import { useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Send } from "lucide-react";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState<FormState>({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  useGSAP(() => {
    gsap.from(".contact-header", {
      y: 30,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".contact-header",
        start: "top 85%",
      },
    });

    gsap.from(".contact-info-card", {
      x: -40,
      opacity: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".contact-container",
        start: "top 80%",
      },
    });

    gsap.from(".contact-form-card", {
      x: 40,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".contact-container",
        start: "top 80%",
      },
    });
  }, { scope: sectionRef });

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
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
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
    <section 
      id="contact" 
      ref={sectionRef} 
      className="w-full pt-24 pb-12 bg-background max-w-7xl mx-auto px-6 border-t border-border/40 mt-12 relative"
    >
      <div className="flex flex-col items-center justify-center text-center contact-header mb-16 gap-4">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
          Let&apos;s Work Together
        </h2>
        <p className="text-muted-foreground max-w-2xl text-base md:text-lg">
          Ready to bring your next project to life? Let&apos;s discuss how my expertise in full-stack development and modern architecture can help achieve your goals.
        </p>
      </div>

      <div className="contact-container grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-10 lg:gap-16 relative z-10 w-full mb-24 max-w-5xl mx-auto">
        
        {/* Contact Info column */}
        <div className="flex flex-col gap-6 w-full">
          <Card className="contact-info-card border border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden hover:border-border transition-colors group">
            <CardContent className="p-6 flex items-start gap-4">
              <Mail className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors mt-1" />
              <div className="flex flex-col gap-1">
                <h4 className="font-semibold text-foreground text-base">Email</h4>
                <a href="mailto:mohamedhesam2000@example.com" className="text-muted-foreground hover:text-foreground text-sm">mohamedhesam2000@example.com</a>
              </div>
            </CardContent>
          </Card>

          <Card className="contact-info-card border border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden hover:border-border transition-colors group">
            <CardContent className="p-6 flex items-start gap-4">
              <Phone className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors mt-1" />
              <div className="flex flex-col gap-1">
                <h4 className="font-semibold text-foreground text-base">Phone</h4>
                <span className="text-muted-foreground text-sm">+20 100 000 0000</span>
              </div>
            </CardContent>
          </Card>

          <Card className="contact-info-card border border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden hover:border-border transition-colors group">
            <CardContent className="p-6 flex items-start gap-4">
              <MapPin className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors mt-1" />
              <div className="flex flex-col gap-1">
                <h4 className="font-semibold text-foreground text-base">Location</h4>
                <span className="text-muted-foreground text-sm">Available for Remote Work | Egypt</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Form column */}
        <div className="w-full">
          <Card className="contact-form-card border border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden">
            <CardContent className="p-6 sm:p-8">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-foreground">Send a Message</h3>
              </div>
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="name" className="text-foreground text-sm">Your Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                      className="bg-background/80 border-border"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="email" className="text-foreground text-sm">Your Email</Label>
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                      className="bg-background/80 border-border"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="subject" className="text-foreground text-sm">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="Project Inquiry"
                    required
                    className="bg-background/80 border-border"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="message" className="text-foreground text-sm">Your Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Hi, I'd like to talk about..."
                    required
                    rows={5}
                    className="bg-background/80 border-border resize-none"
                  />
                </div>

                {status === "success" && (
                  <p className="text-green-500 text-sm">Thank you! message sent successfully.</p>
                )}
                {status === "error" && (
                  <p className="text-red-500 text-sm">Failed to send message. Please try again.</p>
                )}

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-foreground text-background font-semibold hover:bg-foreground/90 py-5 h-auto text-sm flex items-center gap-2 mt-2"
                >
                  <Send className="w-4 h-4" />
                  {loading ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      <footer className="w-full py-8 text-center flex flex-col items-center justify-center border-t border-border/30 gap-3">
        <h4 className="text-lg font-bold text-foreground">Mohamed Hegazy</h4>
        <p className="text-sm font-medium text-muted-foreground">Software Engineer | MERN Developer</p>
        <p className="text-xs text-muted-foreground/60 mt-4">
          &copy; {new Date().getFullYear()} Mohamed Hegazy. All rights reserved.
        </p>
      </footer>
    </section>
  );
}
