import type { ReactNode } from "react";

interface SectionWrapperProps {
  children: ReactNode;
  id?: string;
  className?: string;
}

export default function SectionWrapper({
  children,
  id,
  className = "",
}: SectionWrapperProps) {
  return (
    <section
      className={`sm:px-16 px-6 sm:py-16 py-10 max-w-7xl mx-auto relative z-0 ${className}`}
    >
      {id && <span className="hash-span" id={id}>&nbsp;</span>}
      {children}
    </section>
  );
}
