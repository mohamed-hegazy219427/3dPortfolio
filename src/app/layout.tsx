import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mohamedhegazy.netlify.app"),
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
  title: "Mohamed Hegazy | Full-Stack & Mobile Developer",
  description:
    "Full-Stack & Mobile Developer specializing in React, React Native, Next.js, NestJS, and Node.js. Based in Cairo, Egypt — open to remote. Explore my projects and experience.",
  keywords: [
    "Mohamed Hegazy",
    "Full Stack Developer",
    "React Developer",
    "React Native Developer",
    "Next.js Developer",
    "NestJS",
    "Node.js",
    "Mobile Developer",
    "Web Developer Egypt",
    "Portfolio",
    "TypeScript",
    "Cairo Developer",
  ],
  authors: [{ name: "Mohamed Hegazy" }],
  creator: "Mohamed Hegazy",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mohamedhegazy.netlify.app",
    title: "Mohamed Hegazy | Full-Stack & Mobile Developer",
    description:
      "Full-Stack & Mobile Developer specializing in React, React Native, Next.js, and NestJS. Based in Cairo, Egypt — open to remote.",
    siteName: "Mohamed Hegazy Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Mohamed Hegazy — Full-Stack & Mobile Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohamed Hegazy | Full-Stack & Mobile Developer",
    description:
      "Full-Stack & Mobile Developer — React, React Native, Next.js, NestJS. Open to remote.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://mohamedhegazy.netlify.app",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.variable} suppressHydrationWarning>
      <head>
        <link
          rel="preconnect"
          href="https://avatars.githubusercontent.com"
          crossOrigin="anonymous"
        />
      </head>
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
