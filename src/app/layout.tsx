import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
  title: "Mohamed Hegazy | MERN Stack Developer",
  description:
    "Full-stack MERN developer specializing in React, Next.js, Node.js, and modern web technologies. Explore my portfolio, projects, and experience.",
  keywords: [
    "Mohamed Hegazy",
    "MERN Stack",
    "Frontend Developer",
    "React Developer",
    "Next.js",
    "Portfolio",
    "Web Developer Egypt",
  ],
  authors: [{ name: "Mohamed Hegazy" }],
  creator: "Mohamed Hegazy",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mohamedhegazy.dev",
    title: "Mohamed Hegazy | MERN Stack Developer",
    description:
      "Full-stack MERN developer specializing in React, Next.js, Node.js, and modern web technologies.",
    siteName: "Mohamed Hegazy Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Mohamed Hegazy Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohamed Hegazy | MERN Stack Developer",
    description: "Full-stack MERN developer portfolio.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://mohamedhegazy.dev",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.variable} suppressHydrationWarning>
      <body
        className={`${poppins.className} bg-base-100 text-base-content antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="system"
          enableSystem
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
