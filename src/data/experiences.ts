// Shared experience data — importable by both server and client components

export interface ExperienceListItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  num: string;
}

export const experiencesList: ExperienceListItem[] = [
  {
    id: 'drdo-rci',
    role: 'Software Development Intern',
    company: 'DRDO — Research Centre Imarat (RCI)',
    location: 'Hyderabad, India',
    period: 'Jul 2025 – Sep 2025',
    num: '01',
  },
  {
    id: 'sri-datta-freelance',
    role: 'Freelance Web Developer',
    company: 'Sri Datta Electronics',
    location: 'Hyderabad, India',
    period: 'May 2025 – Jun 2025',
    num: '02',
  },
];

export interface ExperienceDetailData {
  role: string;
  company: string;
  location: string;
  period: string;
  overview: string;
  responsibilities: string[];
  achievements: string[];
  technologies: string[];
}

export const experienceDetailData: Record<string, ExperienceDetailData> = {
  'drdo-rci': {
    role: 'Software Development Intern',
    company: 'DRDO — Research Centre Imarat (RCI)',
    location: 'Hyderabad, India',
    period: 'Jul 2025 – Sep 2025',
    overview: 'Hands-on experience contributing to defense software projects at DRDO-RCI, with measurable impact in protocol optimization and system reliability. Built C-based data acquisition systems and diagnostic tools with real-time monitoring capabilities.',
    responsibilities: [
      'Engineered a C-based data acquisition system interfacing with RS-422 and MIL-STD-1553 hardware for reliable real-time data capture',
      'Built a WinAPI-based GUI enabling real-time hardware diagnostics with sub-second response times',
      'Improved protocol compliance and reduced communication errors by 35% through close hardware integration',
    ],
    achievements: [
      'Reduced communication errors by 35% through optimized protocol integration',
      'Achieved sub-second diagnostic response times with efficient event-driven architecture',
      'Mastered RS-422 and MIL-STD-1553 communication protocols for defense-grade systems',
    ],
    technologies: ['C', 'WinAPI', 'RS-422', 'MIL-STD-1553', 'Data Acquisition', 'Real-Time Systems'],
  },
  'sri-datta-freelance': {
    role: 'Freelance Web Developer',
    company: 'Sri Datta Electronics',
    location: 'Hyderabad, India',
    period: 'May 2025 – Jun 2025',
    overview: 'Built a complete marketing and product catalog website for Sri Datta Electronics, a company providing innovative telemetry solutions for defense, aerospace, and industrial sectors. The platform significantly improved their digital presence and client acquisition.',
    responsibilities: [
      'Designed and developed a product-centric marketing website with interactive catalog',
      'Integrated Firebase contact forms and Google Maps API for client communication',
      'Implemented responsive, SEO-optimized design for cross-device performance',
      'Created modern UI animations with TypeScript for polished user experience',
    ],
    achievements: [
      'Increased client leads by 35% through the interactive product catalog',
      'Achieved 95% form deliverability with Firebase integration, reducing support queries by 25%',
      'Improved mobile conversion by 20% with responsive Next.js implementation',
    ],
    technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Firebase', 'Google Maps API', 'SEO'],
  },
};
