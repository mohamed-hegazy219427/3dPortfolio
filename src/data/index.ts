import type { NavLink, Service, Technology, Experience, Testimonial, Project } from "@/types";
import {
  backend,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  Route,
  sequelize,
  bootstrap,
  mongoose,
  kareem,
  hussein,
  alaa,
  azony,
  ali,
  payload,
  freshCart,
  gpt3,
  fokir,
  weather,
  gameOver,
  gameReviews,
  Ifuture,
  yummy,
  bitc,
  forkify,
  shadcn,
  daisy,
  chackra,
  framerMotion,
  gsapIcon,
  nextjs,
  threejs,
  express,
  nest,
  prisma,
  sanity,
  travel,
} from "@/assets";

export const navLinks: NavLink[] = [
  { id: "about", title: "About" },
  { id: "work", title: "Work" },
  { id: "contact", title: "Contact" },
];

export const services: Service[] = [
  { title: "Frontend Developer", icon: web },
  { title: "Backend Developer", icon: backend },
];

export const technologies: Technology[] = [
  { name: "HTML 5", icon: html },
  { name: "CSS 3", icon: css },
  { name: "Bootstrap", icon: bootstrap },
  { name: "Tailwind CSS", icon: tailwind },
  { name: "Shadcn UI", icon: shadcn },
  { name: "Daisy UI", icon: daisy },
  { name: "Chakra UI", icon: chackra },
  { name: "JavaScript", icon: javascript },
  { name: "TypeScript", icon: typescript },
  { name: "React JS", icon: reactjs },
  { name: "Redux Toolkit", icon: redux },
  { name: "Next JS", icon: nextjs },
  { name: "GSAP", icon: gsapIcon },
  { name: "Framer Motion", icon: framerMotion },
  { name: "Three JS", icon: threejs },
  { name: "Node JS", icon: nodejs },
  { name: "Express JS", icon: express },
  { name: "Nest JS", icon: nest },
  { name: "MongoDB", icon: mongodb },
  { name: "Mongoose", icon: mongoose },
  { name: "Sequelize", icon: sequelize },
  { name: "Prisma", icon: prisma },
  { name: "Payload", icon: payload },
  { name: "Sanity", icon: sanity },
  { name: "git", icon: git },
  { name: "figma", icon: figma },
  { name: "docker", icon: docker },
];

export const experiences: Experience[] = [
  {
    title: "MERN Stack Internship",
    company_name: "Route",
    icon: Route,
    iconBg: "#383E56",
    date: "December 2022 - October 2023",
    points: [
      "Developing and maintaining web applications using React.js and other related technologies.",
      "Collaborating with the development team to design and implement web applications using MongoDB, Express.js, React, and Node.js",
      "Implementing responsive design and ensuring cross-browser compatibility.",
      "Writing clean, efficient, and maintainable code to contribute to the development of projects",
      "Learning and applying best practices in web development to enhance skills and knowledge",
      "Assisting in the deployment and maintenance of web applications",
      "Receiving mentorship and guidance from experienced developers to support professional growth and development.",
    ],
  },
  {
    title: "Frontend Developer",
    company_name: "Interactive Future",
    icon: Ifuture,
    iconBg: "#383E56",
    date: "April 2024 - January 2025",
    points: [
      "Collaborating with designers to translate visual designs into interactive web elements.",
      "Building user interfaces that are visually appealing and user-friendly.",
      "Writing clean, efficient, and maintainable code to contribute to the development of projects",
      "Integrating front-end components with back-end services and APIs.",
      "Conducting code reviews and providing constructive feedback to team members.",
      "Optimizing web performance to ensure fast loading times and smooth user experience.",
      "Integrating With Payload CMS and Other headless CMS in large scale projects.",
    ],
  },
  {
    title: "Full Stack Developer",
    company_name: "Business Integration (BITC)",
    icon: bitc,
    iconBg: "#383E56",
    date: "January 2025 - Present",
    points: [
      "Developed scalable full-stack web apps using MERN stack",
      "Built reusable front-end components and REST APIs",
      "Ensured code quality with testing and version control",
      "Reduced deployment time by 30% through CI/CD automation",
      "Enhanced performance of main app by 25% via frontend optimization",
    ],
  },
];

export const testimonials: Testimonial[] = [
  {
    testimonial:
      "I thought it was impossible to make a website as beautiful as our product, but Mohamed Hegazy proved me wrong.",
    name: "Ahmed Alaa",
    designation: "Section Head",
    company: "Outsuka Misr",
    image: alaa,
  },
  {
    testimonial:
      "I've never met a web developer who truly cares about their clients' success like Mohamed Hegazy does.",
    name: "Mahmoud Ali",
    designation: "QC Head",
    company: "Elsraa",
    image: ali,
  },
  {
    testimonial:
      "His expertise and creativity in web development not only met but exceeded our expectations.",
    name: "Abdullah Elazony",
    designation: "Odoo Consultant",
    company: "U Pharma",
    image: azony,
  },
  {
    testimonial:
      "After Mohamed Hegazy optimized our website, our traffic increased by 50%. We can't thank them enough!",
    name: "Kareem Mohamed",
    designation: "Odoo Consultant",
    company: "U Pharma",
    image: kareem,
  },
  {
    testimonial:
      "His technical proficiency and passion for coding have been instrumental in driving the success of our projects.",
    name: "Ahmed Hussein",
    designation: "QA Head",
    company: "Nerhadou",
    image: hussein,
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
    source_code_link: "https://github.com/MohamedHegazy2020/e-commerce-freshcart.git",
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
