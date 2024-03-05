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
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Frontend Developer",
    icon: web,
  },

  {
    title: "Backend Developer",
    icon: backend,
  },
];

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "Bootstrap",
    icon: bootstrap,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Redux Toolkit",
    icon: redux,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "Mongoose",
    icon: mongoose,
  },
  {
    name: "Sequelize",
    icon: sequelize,
  },

  {
    name: "git",
    icon: git,
  },
  {
    name: "figma",
    icon: figma,
  },
  {
    name: "docker",
    icon: docker,
  },
];

const experiences = [
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
];

const testimonials = [
  {
    testimonial:
      "I thought it was impossible to make a website as beautiful as our product, but mohamed hegazy proved me wrong.",
    name: "Ahmed Alaa",
    designation: "Section Head",
    company: "Outsuka Misr",
    image: alaa,
  },
  {
    testimonial:
      "I've never met a web developer who truly cares about their clients' success like mohamed hegazy does.",
    name: "Mahmoud Ali",
    designation: "Qc Head",
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
      "After mohamed hegazy optimized our website, our traffic increased by 50%. We can't thank them enough!",
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

const projects = [
  {
    name: "e-commerce-freshcart",
    description:
      "A React e-commerce website that lets users shop online for fresh and quality products. Users can filter, sort, search, and view products, add them to cart, create orders, make payments, and view their profile.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "restapi",
        color: "green-text-gradient",
      },
      {
        name: "Bootstrap",
        color: "pink-text-gradient",
      },
    ],
    image: "https://app.netlify.com/06dc8dda360a79a8ec50.webp",
    source_code_link:
      "https://github.com/MohamedHegazy2020/e-commerce-freshcart.git",
    live_demo: "https://mohamedhegazy-freshcart.netlify.app",
  },
  {
    name: "Yummy",
    description:
      "A website for food lovers to find, enjoy, and learn about foods and recipes from different cultures and cuisines. Users can filter, search, and view foods with details, videos, and ingredients. Users can also contact the website owner.",
    tags: [
      {
        name: "JQuery",
        color: "blue-text-gradient",
      },
      {
        name: "restapi",
        color: "green-text-gradient",
      },
      {
        name: "bootstrap",
        color: "pink-text-gradient",
      },
    ],
    image:
      "https://app.netlify.com/.netlify/images?url=https://d33wubrfki0l68.cloudfront.net/654c85f26795530008bf65a5/screenshot_2023-11-09-07-11-17-0000.png&fit=cover&h=500&w=800",
    source_code_link: "https://github.com/MohamedHegazy2020/Yummy.git",
    live_demo: "https://mohamedhegazy-yammy.netlify.app/",
  },
  {
    name: "GPT-3",
    description:
      "This React landing page project demonstrates my CSS and React skills while introducing GPT-3. Through modern UI/UX design, I aim to engage visitors with seamless navigation and captivating animations. The integration of GPT-3 showcases its capabilities, highlighting my expertise in frontend development and design. With a focus on responsive design,      ",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },

      {
        name: "css",
        color: "pink-text-gradient",
      },
    ],
    image:
      "https://app.netlify.com/.netlify/images?url=https://d33wubrfki0l68.cloudfront.net/65e6747c9136c02c67529945/screenshot_2024-03-05-01-26-31-0000.webp&fit=cover&h=500&w=800",
    live_demo: "https://mohamed-hegazy-gpt3.netlify.app",
    source_code_link: "https://github.com/MohamedHegazy2020/gpt3_msh.git",
  },
  {
    name: "Fokir",
    description:
      "The landing page is designed to showcase the developer’s skills, services, projects, and achievements in web development. The page aims to attract potential clients, employers, or collaborators who are looking for a professional and creative web developer.      ",
    tags: [
      {
        name: "html",
        color: "blue-text-gradient",
      },
      {
        name: "js",
        color: "green-text-gradient",
      },
      {
        name: "bootarap",
        color: "pink-text-gradient",
      },
      {
        name: "css",
        color: "pink-text-gradient",
      },
    ],
    image:
      "https://app.netlify.com/.netlify/images?url=https://d33wubrfki0l68.cloudfront.net/654c97956125b7000847ccd0/screenshot_2023-11-09-08-26-08-0000.png&fit=cover&h=500&w=800",
    live_demo: "https://mohamedhegazy-fokir.netlify.app",
    source_code_link: "https://github.com/MohamedHegazy2020/Fokir.git",
  },
  {
    name: "weather-app",
    description:
      "A weather website that provides 3-day forecasting with city search. Uses HTML, CSS , Bootstrap , and JavaScript. Integrates data from Weather API using fetch API. Provides humidity, wind speed, and UV index.    ",
    tags: [
      {
        name: "html",
        color: "blue-text-gradient",
      },
      {
        name: "js",
        color: "green-text-gradient",
      },
      {
        name: "restapi",
        color: "green-text-gradient",
      },
      {
        name: "bootstrap",
        color: "pink-text-gradient",
      },

      {
        name: "css",
        color: "pink-text-gradient",
      },
    ],
    image:
      "https://app.netlify.com/.netlify/images?url=https://d33wubrfki0l68.cloudfront.net/654cb5bb97bf550007d6bcbe/screenshot_2023-11-09-10-34-44-0000.png&fit=cover&h=500&w=800",
    live_demo: "https://mohamedhegazy-weather-app.netlify.app",
    source_code_link: "https://github.com/MohamedHegazy2020/weather-app.git",
  },
  // {
  //   name: "game-over",
  //   description:
  //     "A React website for game exploration could have a recommendation engine that suggests games based on user preferences. Users can filter and sort games based on various criteria and explore them in a fun and interactive way.    ",
  //   tags: [
  //     {
  //       name: "react",
  //       color: "blue-text-gradient",
  //     },

  //     {
  //       name: "restapi",
  //       color: "green-text-gradient",
  //     },
  //     {
  //       name: "bootstrap",
  //       color: "pink-text-gradient",
  //     },

  //     {
  //       name: "css",
  //       color: "pink-text-gradient",
  //     },
  //   ],
  //   image:
  //     "https://app.netlify.com/.netlify/images?url=https://d33wubrfki0l68.cloudfront.net/64c326acb700cd2bfa1693cd/screenshot_2023-07-28-02-24-13-0000.png&fit=cover&h=500&w=800",
  //   live_demo: "https://mohamedhegazy-gameover.netlify.app",
  //   source_code_link: "https://github.com/MohamedHegazy2020/game-over.git",
  // },
  // {
  //   name: "game-reviews",
  //   description:
  //     "A website for game lovers to explore, review, and rate games from various genres and platforms. Users can filter, search, and view games with ratings, reviews, screenshots, and trailers. Users can also create profiles and favorite games.      ",
  //   tags: [
  //     {
  //       name: "html",
  //       color: "blue-text-gradient",
  //     },
  //     {
  //       name: "js",
  //       color: "green-text-gradient",
  //     },
  //     {
  //       name: "restapi",
  //       color: "green-text-gradient",
  //     },
  //     {
  //       name: "bootstrap",
  //       color: "pink-text-gradient",
  //     },
  //     {
  //       name: "css",
  //       color: "pink-text-gradient",
  //     },
  //   ],
  //   image:
  //     "https://app.netlify.com/.netlify/images?url=https://d33wubrfki0l68.cloudfront.net/654c7d937fa51d00087dcbfe/screenshot_2023-11-09-06-35-10-0000.png&fit=cover&h=500&w=800",
  //   live_demo: "https://mohamedhegazy-game-review.netlify",
  //   source_code_link: "https://github.com/MohamedHegazy2020/game-reviews.git",
  // },
];

export { services, technologies, experiences, testimonials, projects };
