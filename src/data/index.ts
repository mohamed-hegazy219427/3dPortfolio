import type {
  Service,
  Experience,
  Testimonial,
  Project,
} from "@/types";
import {
  freshCart,
  gpt3,
  fokir,
  weather,
  gameOver,
  gameReviews,
  yummy,
  forkify,
  travel,
} from "@/assets";
import { SiReact, SiNodedotjs, SiDocker } from "react-icons/si";
import {
  BookOpen,
  Sparkles,
  Building2,
  ConciergeBell,
  Smartphone,
} from "lucide-react";

export const navItems = [
  { id: "about",        title: "Home" },
  { id: "tech",         title: "Skills" },
  { id: "experience",   title: "Experience" },
  { id: "works",        title: "Projects" },
  { id: "testimonials", title: "Reviews" },
  { id: "contact",      title: "Contact" },
];

export const services: Service[] = [
  { title: "React Developer", icon: SiReact },
  { title: "React Native Developer", icon: Smartphone },
  { title: "Backend Developer", icon: SiNodedotjs },
  { title: "DevOps Engineer", icon: SiDocker },
];

export const experiences: Experience[] = [
  {
    title: "MERN Stack Internship",
    company_name: "Route",
    icon: BookOpen,
    iconBg: "#383E56",
    date: "December 2022 - October 2023",
    points: [
      "Built and maintained full-stack web applications using React.js, Node.js, Express, and MongoDB across multiple team projects.",
      "Delivered responsive, cross-browser-compatible UIs by applying mobile-first design principles and semantic HTML.",
      "Wrote modular, reusable code following component-driven architecture, reducing duplication across shared UI elements.",
      "Participated in code reviews, absorbing feedback from senior engineers to quickly level up in production-quality standards.",
      "Assisted in deploying and monitoring applications on cloud environments, gaining hands-on experience with release workflows.",
    ],
  },
  {
    title: "Frontend Developer",
    company_name: "Interactive Future",
    icon: Sparkles,
    iconBg: "#383E56",
    date: "April 2024 - January 2025",
    points: [
      "Translated Figma designs into pixel-perfect, interactive interfaces, bridging the gap between design and engineering on multiple client projects.",
      "Integrated Payload CMS and other headless CMS platforms into large-scale applications, enabling non-technical teams to manage content independently.",
      "Connected frontend components to RESTful back-end services and third-party APIs, delivering seamless data flows across the stack.",
      "Led frontend performance audits, applying lazy loading, code splitting, and asset optimization techniques to measurably improve load times.",
      "Conducted code reviews and mentored junior contributors, establishing consistent coding standards across the team.",
    ],
  },
  {
    title: "Full Stack Developer",
    company_name: "Business Integration (BITC)",
    icon: Building2,
    iconBg: "#383E56",
    date: "January 2025 - Present",
    points: [
      "Engineered scalable full-stack web applications using the MERN stack, supporting enterprise-level business integration workflows.",
      "Designed and delivered reusable component libraries and RESTful APIs consumed across multiple internal products.",
      "Reduced deployment time by 30% by implementing CI/CD pipelines with automated testing and containerized builds.",
      "Boosted main application performance by 25% through frontend optimization — code splitting, memoization, and render-cycle analysis.",
      "Championed code quality through peer reviews, test coverage requirements, and Git-flow branching conventions.",
    ],
  },
  {
    title: "Full Stack Developer",
    company_name: "Guestna",
    icon: ConciergeBell,
    iconBg: "#1a1a2e",
    date: "2025 - Present",
    points: [
      "Architected a full-stack hospitality platform with Next.js 15 (App Router) on the frontend and a NestJS REST API on the backend, serving real-time guest management workflows.",
      "Built a modular NestJS server with decorators, guards, interceptors, and pipes following SOLID principles — ensuring a clean, maintainable codebase ready to scale.",
      "Implemented secure JWT authentication, role-based access control (RBAC), and refresh-token rotation to protect guest and admin data.",
      "Designed and integrated a relational database layer using Prisma ORM, with optimized queries that reduced average API response time by 40%.",
      "Developed reusable, accessible React components with TypeScript and Tailwind CSS, delivering a pixel-perfect UI that matches design specs across all screen sizes.",
      "Integrated third-party booking and notification services, enabling automated guest confirmations and real-time status updates.",
    ],
  },
];

export const testimonials: Testimonial[] = [
  {
    testimonial:
      "Mohamed built the Muze Network mobile app for us using React Native and delivered a polished, performant experience on both iOS and Android. His communication throughout the project was excellent — he understood our vision from day one.",
    name: "Omar Haddad",
    designation: "Product Manager",
    company: "Syiam",
  },
  {
    testimonial:
      "Mohamed's React Native work on Muze was outstanding. He structured the codebase cleanly, handled real-time data efficiently, and shipped features ahead of schedule. We'd work with him again without hesitation.",
    name: "Lina Shawabkeh",
    designation: "CTO",
    company: "Syiam",
  },
  {
    testimonial:
      "Mohamed joined BITC and immediately hit the ground running. He built full-stack features across our MERN-based platform, wrote clean REST APIs, and helped reduce our deployment time by 30% through CI/CD automation.",
    name: "Mostafa Rabie",
    designation: "Engineering Manager",
    company: "Business Integration (BITC)",
  },
  {
    testimonial:
      "His frontend optimization work at BITC was a game-changer — page performance improved by 25% through smart code splitting, memoization, and render analysis. Mohamed takes ownership and delivers results.",
    name: "Youssef Gamal",
    designation: "Tech Lead",
    company: "Business Integration (BITC)",
  },
];

export const projects: Project[] = [
  {
    name: "Travel App",
    description:
      "A modern, responsive travel booking web application built with Next.js, Tailwind CSS, and TypeScript. Demonstrates advanced front-end engineering skills including component-driven development, performance optimization, and SEO best practices.",
    tags: [
      { name: "nextjs", color: "blue-text-gradient" },
      { name: "typescript", color: "green-text-gradient" },
      { name: "tailwind", color: "pink-text-gradient" },
    ],
    image: travel,
    live_demo: "https://mohamedhegazy-travel.netlify.app",
    source_code_link: "https://github.com/mohamed-hegazy219427/travel_app.git",
  },
  {
    name: "GPT-3",
    description:
      "A React landing page that demonstrates CSS and React skills while showcasing GPT-3. Features modern UI/UX design with seamless navigation and captivating animations. Highlights frontend development expertise and responsive design.",
    tags: [
      { name: "react", color: "blue-text-gradient" },
      { name: "css", color: "pink-text-gradient" },
    ],
    image: gpt3,
    live_demo: "https://mohamedhegazy-gpt3.netlify.app",
    source_code_link: "https://github.com/MohamedHegazy2020/gpt3_msh.git",
  },
  {
    name: "game-over",
    description:
      "A React website for game exploration with a recommendation engine that suggests games based on user preferences. Users can filter and sort games based on various criteria.",
    tags: [
      { name: "react", color: "blue-text-gradient" },
      { name: "restapi", color: "green-text-gradient" },
      { name: "bootstrap", color: "pink-text-gradient" },
    ],
    image: gameOver,
    live_demo: "https://mohamedhegazy-game-over.netlify.app",
    source_code_link: "https://github.com/MohamedHegazy2020/game-over.git",
  },
  {
    name: "e-commerce-freshcart",
    description:
      "A React e-commerce website that lets users shop online for fresh and quality products. Users can filter, sort, search, add products to cart, create orders, and make payments.",
    tags: [
      { name: "react", color: "blue-text-gradient" },
      { name: "restapi", color: "green-text-gradient" },
      { name: "Bootstrap", color: "pink-text-gradient" },
    ],
    image: freshCart,
    source_code_link:
      "https://github.com/MohamedHegazy2020/e-commerce-freshcart.git",
    live_demo: "https://mohamedhegazy-freshcart.netlify.app",
  },
  {
    name: "Yummy",
    description:
      "A website for food lovers to find, enjoy, and learn about foods and recipes from different cultures and cuisines. Users can filter, search, and view foods with details, videos, and ingredients.",
    tags: [
      { name: "JQuery", color: "blue-text-gradient" },
      { name: "restapi", color: "green-text-gradient" },
      { name: "bootstrap", color: "pink-text-gradient" },
    ],
    image: yummy,
    source_code_link: "https://github.com/MohamedHegazy2020/Yummy.git",
    live_demo: "https://mohamedhegazy-yummy.netlify.app",
  },
  {
    name: "Fokir",
    description:
      "A landing page designed to showcase the developer's skills, services, projects, and achievements in web development. Aims to attract potential clients, employers, or collaborators.",
    tags: [
      { name: "html", color: "blue-text-gradient" },
      { name: "js", color: "green-text-gradient" },
      { name: "bootstrap", color: "pink-text-gradient" },
      { name: "css", color: "pink-text-gradient" },
    ],
    image: fokir,
    live_demo: "https://mohamedhegazy-fokir.netlify.app",
    source_code_link: "https://github.com/MohamedHegazy2020/Fokir.git",
  },
  {
    name: "Forkify",
    description:
      "A web application built with MVC architecture. Allows users to search for recipes, view detailed information, save favorite recipes, and add new recipes.",
    tags: [
      { name: "html", color: "blue-text-gradient" },
      { name: "js", color: "green-text-gradient" },
      { name: "restapi", color: "green-text-gradient" },
      { name: "sass", color: "pink-text-gradient" },
    ],
    image: forkify,
    source_code_link: "https://github.com/MohamedHegazy2020/Forkify.git",
    live_demo: "https://mohamedhegazy-forkify.netlify.app",
  },
  {
    name: "weather-app",
    description:
      "A weather website that provides 3-day forecasting with city search. Integrates Weather API data using fetch API and displays humidity, wind speed, and UV index.",
    tags: [
      { name: "html", color: "blue-text-gradient" },
      { name: "js", color: "green-text-gradient" },
      { name: "restapi", color: "green-text-gradient" },
      { name: "bootstrap", color: "pink-text-gradient" },
      { name: "css", color: "pink-text-gradient" },
    ],
    image: weather,
    live_demo: "https://mohamedhegazy-weather-app.netlify.app",
    source_code_link: "https://github.com/MohamedHegazy2020/weather-app.git",
  },
  {
    name: "game-reviews",
    description:
      "A website for game lovers to explore, review, and rate games from various genres and platforms. Users can filter, search, and view games with ratings, reviews, screenshots, and trailers.",
    tags: [
      { name: "html", color: "blue-text-gradient" },
      { name: "js", color: "green-text-gradient" },
      { name: "restapi", color: "green-text-gradient" },
      { name: "bootstrap", color: "pink-text-gradient" },
      { name: "css", color: "pink-text-gradient" },
    ],
    image: gameReviews,
    live_demo: "https://mohamedhegazy-game-reviews.netlify.app/",
    source_code_link: "https://github.com/MohamedHegazy2020/game-reviews.git",
  },
];
