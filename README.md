# Mohamed Hegazy — Portfolio

> Full-Stack & Mobile Developer portfolio built with **Next.js 15**, **React Three Fiber**, **GSAP**, **DaisyUI v5**, and **React Aria**.

---

## Live Demo

🔗 [mohamedhegazy.dev](https://mohamedhegazy.dev)

---

## Features

- **3D Star Field** — multi-layer WebGL starfield with mouse parallax, shared across all sections, fully theme-aware (dark/light colors via DaisyUI CSS variables)
- **3D Earth Globe** — auto-rotating GLTF Earth in the Contact section powered by React Three Fiber
- **GSAP Animations** — scroll-triggered clip-path reveals, timeline draws, staggered entrances, and counter animations on every section
- **DaisyUI Theming** — light/dark theme with custom OKLCH token overrides; DaisyUI swap toggle with zero hydration mismatch
- **Accessible Forms** — React Aria Components (TextField, Button, Form, Dialog) for full WAI-ARIA compliance
- **Fully Responsive** — mobile-first layout, collapsible navbar with React Aria Dialog, fluid typography
- **100% TypeScript** — strict typing across all components and data shapes

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router), React 19 |
| Styling | Tailwind CSS v4, DaisyUI v5 |
| 3D / WebGL | React Three Fiber, React Three Drei, Three.js |
| Animation | GSAP 3, ScrollTrigger, ScrollToPlugin, @gsap/react |
| Accessibility | React Aria Components |
| Icons | Lucide React |
| Font | Poppins via next/font |
| Theme | next-themes (`data-theme` attribute) |
| Language | TypeScript |

---

## Sections

| Section | Highlights |
|---|---|
| **Hero** | Clip-path text reveal, elastic avatar spring, animated stats counter, mouse-parallax star field, smooth scroll indicator |
| **About** | 3D tilt service cards (mouse-driven rotateX/Y) — React · React Native · Backend · DevOps |
| **Skills** | 6 category cards with 30+ skill badges, GSAP stagger entrance |
| **Experience** | Scroll-scrubbed timeline line draw, alternating card entrances, company logos |
| **Projects** | Image clip-path reveal, hover overlay with GitHub / Live Demo action buttons |
| **Testimonials** | 3D rotateY card entrance, 5-star ratings, real client testimonials |
| **Contact** | React Aria form, 3D rotating Earth globe, WhatsApp / LinkedIn / GitHub / Email links |

---

## Getting Started

```bash
# Install dependencies
npm install

# Start development server (port 3200)
npm run dev

# Production build
npm run build

# Lint — zero warnings policy
npm run lint
```

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx        # Root layout: Poppins font, ThemeProvider, SEO metadata
│   ├── page.tsx          # Home page: assembles all sections + fixed star field
│   └── globals.css       # Tailwind v4, DaisyUI plugin, custom utilities & theme tokens
├── assets/               # Images, tech icons, company logos, testimonial photos
├── data/index.ts         # All portfolio content — edit here to update any section
├── types/index.ts        # TypeScript interfaces for all data shapes
├── lib/
│   ├── gsap.ts           # GSAP + ScrollTrigger + ScrollToPlugin registration
│   └── utils.ts          # cn() classname helper
└── components/
    ├── layout/Navbar.tsx          # Fixed navbar, scroll blur, mobile Dialog, DaisyUI theme toggle
    ├── canvas/
    │   ├── Stars.tsx              # Multi-layer star field with mouse parallax & theme-aware colors
    │   ├── Earth.tsx              # GLTF Earth with OrbitControls auto-rotate
    │   └── Ball.tsx               # Floating 3D tech icon ball
    └── sections/
        ├── Hero.tsx               # Hero with GSAP timeline + GitHub avatar
        ├── About.tsx              # Overview + 3D tilt service cards
        ├── Tech.tsx               # Skill categories grid
        ├── Experience.tsx         # Career timeline
        ├── Works.tsx              # Project showcase
        ├── Testimonials.tsx       # Client testimonials
        └── Contact.tsx            # Contact form + 3D Earth + social links
```

---

## Updating Content

All portfolio data lives in **`src/data/index.ts`** — experiences, projects, testimonials, technologies, and services. Edit that one file to update any section without touching component code.

---

## Contact

**Mohamed Hegazy** — Full-Stack & Mobile Developer

| | |
|---|---|
| Email | [mohamedhegazy19427@gmail.com](mailto:mohamedhegazy19427@gmail.com) |
| LinkedIn | [linkedin.com/in/mohamed-hegazy-134109179](https://www.linkedin.com/in/mohamed-hegazy-134109179/) |
| GitHub | [github.com/mohamed-hegazy219427](https://github.com/mohamed-hegazy219427) |
| WhatsApp | [+20 112 579 8366](https://wa.me/201125798366) |

---

© 2025 Mohamed Hegazy. All rights reserved.
