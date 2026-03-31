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
import { Mail, Phone, MapPin, Send, MessageSquare, Github, Linkedin } from "lucide-react";

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

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      value: "mohamedhegazy19427@gmail.com",
      href: "mailto:mohamedhegazy19427@gmail.com",
      color: "text-primary",
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone",
      value: "+20 100 000 0000",
      color: "text-secondary",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Location",
      value: "Available for Remote Work | Egypt",
      color: "text-accent",
    },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="w-full section-padding bg-base-200/30 max-w-7xl mx-auto relative"
    >
      <div className="flex flex-col items-center justify-center text-center contact-header mb-16 gap-4">
        <div className="badge badge-outline badge-info badge-lg gap-2 font-medium mb-2">
          <MessageSquare className="w-4 h-4" />
          Get In Touch
        </div>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-base-content">
          Let&apos;s Work Together
        </h2>
        <p className="text-base-content/60 max-w-2xl text-base md:text-lg">
          Ready to bring your next project to life? Let&apos;s discuss how my expertise in full-stack development can help achieve your goals.
        </p>
      </div>

      <div className="contact-container grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-10 lg:gap-16 relative z-10 w-full mb-24 max-w-5xl mx-auto">
        {/* Contact Info column */}
        <div className="flex flex-col gap-5 w-full">
          {contactInfo.map((info, idx) => (
            <div
              key={idx}
              className="contact-info-card card bg-base-100 border border-base-300/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300 group cursor-default"
            >
              <div className="card-body p-5 flex-row items-center gap-4">
                <div className={`w-12 h-12 rounded-xl bg-base-200 flex items-center justify-center ${info.color} group-hover:scale-110 transition-transform duration-300`}>
                  {info.icon}
                </div>
                <div className="flex flex-col gap-0.5">
                  <h4 className="font-semibold text-base-content text-sm uppercase tracking-wider">
                    {info.title}
                  </h4>
                  {info.href ? (
                    <a
                      href={info.href}
                      className="text-base-content/60 hover:text-primary text-sm transition-colors"
                    >
                      {info.value}
                    </a>
                  ) : (
                    <span className="text-base-content/60 text-sm">{info.value}</span>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Social links card */}
          <div className="card bg-base-100 border border-base-300/50 mt-2">
            <div className="card-body p-5">
              <h4 className="font-semibold text-base-content text-sm uppercase tracking-wider mb-3">
                Follow Me
              </h4>
              <div className="flex gap-3">
                {[
                  { href: "https://github.com/mohamed-hegazy219427", icon: <Github className="w-5 h-5" />, label: "GitHub" },
                  { href: "https://www.linkedin.com/in/mohamed-hegazy-134109179/", icon: <Linkedin className="w-5 h-5" />, label: "LinkedIn" },
                  { href: "mailto:mohamedhegazy19427@gmail.com", icon: <Mail className="w-5 h-5" />, label: "Email" },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target={social.label !== "Email" ? "_blank" : undefined}
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
                      <span className="label-text text-sm font-medium">Your Name</span>
                    </Label>
                    <Input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="input input-bordered w-full bg-base-200/50 focus:input-primary transition-all duration-200"
                    />
                  </TextField>

                  <TextField isRequired>
                    <Label className="label">
                      <span className="label-text text-sm font-medium">Your Email</span>
                    </Label>
                    <Input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="input input-bordered w-full bg-base-200/50 focus:input-primary transition-all duration-200"
                    />
                  </TextField>
                </div>

                <TextField isRequired>
                  <Label className="label">
                    <span className="label-text text-sm font-medium">Subject</span>
                  </Label>
                  <Input
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="Project Inquiry"
                    className="input input-bordered w-full bg-base-200/50 focus:input-primary transition-all duration-200"
                  />
                </TextField>

                <TextField isRequired>
                  <Label className="label">
                    <span className="label-text text-sm font-medium">Your Message</span>
                  </Label>
                  <TextArea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Hi, I'd like to talk about..."
                    rows={5}
                    className="textarea textarea-bordered w-full bg-base-200/50 focus:textarea-primary resize-none transition-all duration-200"
                  />
                </TextField>

                {status === "success" && (
                  <div className="alert alert-success text-sm py-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-5 w-5" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    Thank you! Message sent successfully.
                  </div>
                )}
                {status === "error" && (
                  <div className="alert alert-error text-sm py-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-5 w-5" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    Failed to send message. Please try again.
                  </div>
                )}

                <AriaButton
                  type="submit"
                  isDisabled={loading}
                  className="btn btn-primary w-full gap-2 mt-2 font-semibold text-base shadow-lg hover:shadow-primary/25 transition-all duration-300"
                >
                  <Send className="w-4 h-4" />
                  {loading ? (
                    <span className="loading loading-spinner loading-sm" />
                  ) : null}
                  {loading ? "Sending..." : "Send Message"}
                </AriaButton>
              </Form>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full py-8 text-center flex flex-col items-center justify-center border-t border-base-300/30 gap-3">
        <h4 className="text-lg font-bold text-base-content">Mohamed Hegazy</h4>
        <p className="text-sm font-medium text-base-content/50">Software Engineer | MERN Developer</p>
        <p className="text-xs text-base-content/30 mt-4">
          &copy; {new Date().getFullYear()} Mohamed Hegazy. All rights reserved.
        </p>
      </footer>
    </section>
  );
}
