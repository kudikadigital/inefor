export interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  schedule: string;
  area: "tech" | "admin";
  badge?: string;
  price?: string;
  image?: string; 
  syllabus?: string[];
  prerequisites?: string[];
  objectives?: string[];
  targetAudience?: string[];
}

export interface Training {
  id: string;
  title: string;
  acronym: string;
  description: string;
  duration: string;
  certifier?: string;
  color: string;
  image?: string;
  schedule?: string;
  price?: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  description: string;
  type: "workshop" | "conference" | "seminar";
  registrationOpen: boolean;
  time?: string;
  location?: string;
  spots?: number;
  price?: string;
}

export interface ScheduledCourse {
  id: string;
  courseTitle: string;
  startDate: string;
  schedule: string;
  spots: number;
  area: "tech" | "admin";
  modality: "Presencial" | "Online" | "Híbrido";
  price: string;
}

export interface Service {
  id: string;
  number: string;
  title: string;
  desc: string;
  longDesc?: string;
  features: string[];
  deliverables?: string[];
  price: string;
  bar: string;
  glow: string;
  dot: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
  badge?: string;
  comingSoon?: boolean;
}
