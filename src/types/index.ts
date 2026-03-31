import type { StaticImageData } from "next/image";

export interface NavLink {
  id: string;
  title: string;
}

export interface Service {
  title: string;
  icon: StaticImageData | string;
}

export interface Technology {
  name: string;
  icon: StaticImageData | string;
}

export interface ExperiencePoint {
  text: string;
}

export interface Experience {
  title: string;
  company_name: string;
  icon: StaticImageData | string;
  iconBg: string;
  date: string;
  points: string[];
}

export interface Testimonial {
  testimonial: string;
  name: string;
  designation: string;
  company: string;
  image: StaticImageData | string;
}

export interface ProjectTag {
  name: string;
  color: string;
}

export interface Project {
  name: string;
  description: string;
  tags: ProjectTag[];
  image: StaticImageData | string;
  source_code_link: string;
  live_demo: string;
}

export interface JSONPlaceholderUser {
  id: number;
  name: string;
  email: string;
  address: {
    city: string;
  };
  company: {
    name: string;
    bs: string;
  };
}
