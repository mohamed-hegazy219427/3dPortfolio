"use client";

import { useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import {
  TextField,
  Label,
  Input,
  TextArea,
  Button as AriaButton,
  Form,
} from "react-aria-components";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageSquare,
  Github,
  Linkedin,
  ArrowUpRight,
} from "lucide-react";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  useGSAP(
    () => {
      // Header entrance
      const headerTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".contact-header",
          start: "top 85%",
        },
      });
      headerTl
        .fromTo(
          ".contact-badge-el",
          { opacity: 0, y: 20, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5 },
        )
        .fromTo(
          ".contact-title",
          { opacity: 0, y: 30, clipPath: "inset(100% 0% 0% 0%)" },
          { opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)", duration: 0.6 },
          "-=0.3",
        )
        .fromTo(
          ".contact-subtitle",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.3",
        );

      // Info cards slide in from left
      gsap.utils
        .toArray<HTMLElement>(".contact-info-card")
        .forEach((card, i) => {
          gsap.fromTo(
            card,
            { opacity: 0, x: -40, scale: 0.95 },
            {
              opacity: 1,
              x: 0,
              scale: 1,
              duration: 0.6,
              delay: i * 0.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: ".contact-container",
                start: "top 80%",
              },
            },
          );
        });

      // Form card slide in from right
      gsap.fromTo(
        ".contact-form-card",
        { opacity: 0, x: 40, scale: 0.95 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-container",
            start: "top 80%",
          },
        },
      );

      // Form fields stagger
      gsap.fromTo(
        ".contact-field",
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".contact-form-card",
            start: "top 78%",
          },
        },
      );

      // Footer entrance
      gsap.fromTo(
        ".contact-footer",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".contact-footer",
            start: "top 95%",
          },
        },
      );
    },
    { scope: sectionRef },
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
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

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      value: "mohamedhegazy19427@gmail.com",
      href: "mailto:mohamedhegazy19427@gmail.com",
      gradient: "from-blue-500 to-cyan-400",
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone",
      value: "+20 112 579 8366",
      href: "tel:+201125798366",
      gradient: "from-purple-500 to-pink-400",
    },
    {
      icon: <WhatsAppIcon className="w-6 h-6" />,
      title: "WhatsApp",
      value: "+20 112 579 8366",
      href: "https://wa.me/201125798366",
      gradient: "from-green-500 to-emerald-400",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Location",
      value: "Cairo, Egypt · Open to Remote",
      gradient: "from-amber-500 to-orange-400",
    },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="w-full section-padding bg-base-200/30 max-w-7xl mx-auto relative"
    >
      {/* Background decoration */}
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-info/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="flex flex-col items-center justify-center text-center contact-header mb-16 gap-4 relative z-10">
        <div className="contact-badge-el badge badge-outline badge-info badge-lg gap-2 font-medium mb-2">
          <MessageSquare className="w-4 h-4" />
          Get In Touch
        </div>
        <h2 className="contact-title text-3xl md:text-5xl font-bold tracking-tight text-base-content">
          Let&apos;s Work Together
        </h2>
        <p className="contact-subtitle text-base-content/60 max-w-2xl text-base md:text-lg">
          Ready to bring your next project to life? Let&apos;s discuss how my
          expertise in full-stack development can help achieve your goals.
        </p>
      </div>

      <div className="contact-container grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-10 lg:gap-16 relative z-10 w-full mb-24 max-w-5xl mx-auto">
        {/* Contact Info column */}
        <div className="flex flex-col gap-5 w-full">
          {contactInfo.map((info, idx) => (
            <div
              key={idx}
              className="contact-info-card card bg-base-100 border border-base-300/50 hover:border-primary/20 hover:shadow-lg transition-all duration-300 group cursor-default card-hover-lift"
            >
              <div className="card-body p-5 flex-row items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-xl bg-linear-to-br ${info.gradient} flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                >
                  {info.icon}
                </div>
                <div className="flex flex-col gap-0.5">
                  <h4 className="font-semibold text-base-content text-sm uppercase tracking-wider">
                    {info.title}
                  </h4>
                  {info.href ? (
                    <a
                      href={info.href}
                      target="_blank"
                      className="text-base-content/60 hover:text-primary text-sm transition-colors"
                    >
                      {info.value}
                    </a>
                  ) : (
                    <span className="text-base-content/60 text-sm">
                      {info.value}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Social links card */}
          <div className="contact-info-card card bg-base-100 border border-base-300/50 mt-2">
            <div className="card-body p-5">
              <h4 className="font-semibold text-base-content text-sm uppercase tracking-wider mb-3">
                Follow Me
              </h4>
              <div className="flex gap-3 flex-wrap">
                {[
                  {
                    href: "https://github.com/mohamed-hegazy219427",
                    icon: <Github className="w-5 h-5" />,
                    label: "GitHub",
                    external: true,
                  },
                  {
                    href: "https://www.linkedin.com/in/mohamed-hegazy-134109179/",
                    icon: <Linkedin className="w-5 h-5" />,
                    label: "LinkedIn",
                    external: true,
                  },
                  {
                    href: "mailto:mohamedhegazy19427@gmail.com",
                    icon: <Mail className="w-5 h-5" />,
                    label: "Email",
                    external: false,
                  },
                  {
                    href: "https://wa.me/201125798366",
                    icon: <WhatsAppIcon className="w-5 h-5" />,
                    label: "WhatsApp",
                    external: true,
                  },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target={social.external ? "_blank" : undefined}
                    rel="noreferrer"
                    className="btn btn-square btn-ghost border border-base-300 hover:btn-primary hover:border-primary transition-all duration-300"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Form column — React Aria components */}
        <div className="w-full">
          <div className="contact-form-card card bg-base-100 border border-base-300/50 shadow-sm">
            <div className="card-body p-6 sm:p-8">
              <h3 className="text-xl font-bold text-base-content mb-6 flex items-center gap-2">
                <Send className="w-5 h-5 text-primary" />
                Send a Message
              </h3>

              <Form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <TextField isRequired>
                    <Label className="label">
                      <span className="label-text text-sm font-medium">
                        Your Name
                      </span>
                    </Label>
                    <Input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="contact-field input input-bordered w-full bg-base-200/50 focus:input-primary transition-all duration-200"
                    />
                  </TextField>

                  <TextField isRequired>
                    <Label className="label">
                      <span className="label-text text-sm font-medium">
                        Your Email
                      </span>
                    </Label>
                    <Input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="contact-field input input-bordered w-full bg-base-200/50 focus:input-primary transition-all duration-200"
                    />
                  </TextField>
                </div>

                <TextField isRequired>
                  <Label className="label">
                    <span className="label-text text-sm font-medium">
                      Subject
                    </span>
                  </Label>
                  <Input
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="Project Inquiry"
                    className="contact-field input input-bordered w-full bg-base-200/50 focus:input-primary transition-all duration-200"
                  />
                </TextField>

                <TextField isRequired>
                  <Label className="label">
                    <span className="label-text text-sm font-medium">
                      Your Message
                    </span>
                  </Label>
                  <TextArea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Hi, I'd like to talk about..."
                    rows={5}
                    className="contact-field textarea textarea-bordered w-full bg-base-200/50 focus:textarea-primary resize-none transition-all duration-200"
                  />
                </TextField>

                {status === "success" && (
                  <div className="alert alert-success text-sm py-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="stroke-current shrink-0 h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Thank you! Message sent successfully.
                  </div>
                )}
                {status === "error" && (
                  <div className="alert alert-error text-sm py-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="stroke-current shrink-0 h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Failed to send message. Please try again.
                  </div>
                )}

                <AriaButton
                  type="submit"
                  isDisabled={loading}
                  className="btn btn-primary w-full gap-2 mt-2 font-semibold text-base shadow-lg hover:shadow-primary/25 transition-all duration-300 group"
                >
                  <Send className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                  {loading ? (
                    <span className="loading loading-spinner loading-sm" />
                  ) : null}
                  {loading ? "Sending..." : "Send Message"}
                  <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -ml-2 group-hover:ml-0 transition-all duration-300" />
                </AriaButton>
              </Form>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="contact-footer w-full py-8 text-center flex flex-col items-center justify-center border-t border-base-300/30 gap-3">
        <h4 className="text-lg font-bold text-base-content">Mohamed Hegazy</h4>
        <p className="text-sm font-medium text-base-content/50">
          Software Engineer | MERN Developer
        </p>
        <p className="text-xs text-base-content/30 mt-4">
          &copy; {new Date().getFullYear()} Mohamed Hegazy. All rights reserved.
        </p>
      </footer>
    </section>
  );
}
