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
    overview: 'Contributed to defense-grade software and simulation systems at DRDO-RCI across computer vision, sensor fusion, and embedded communication protocols. Built edge-quantized vision models cutting inference latency under 15 ms, developed MATLAB/Simulink multi-sensor trajectory simulations reaching sub-meter 3D RMSE, and engineered C/WinAPI telemetry software over RS-422 and MIL-STD-1553 reducing error rates by 35%.',
    responsibilities: [
      '**Real-time Sign Board Classification and Translation (Python, OpenCV, TensorFlow, YOLO Nano):** Built a real-time roadside sign board classification and translation system in Python, using lightweight quantized vision models on edge hardware to cut inference latency to under 15 ms per frame.',
      '**OCR & Multi-Class Script Recognition:** Engineered OCR and script-recognition pipelines that detect multi-class local scripts with over 98% precision and recall under motion blur, low light, and physical distortion.',
      '**Sensor Processing & Trajectory Prediction Simulation (MATLAB, Simulink):** Built a multi-sensor signal processing simulation in MATLAB and Simulink that ingests telemetry, radar tracking, and altimeter data across aerospace protocols, reaching sub-meter spatial RMSE in real-time 3D tracking.',
      '**Dynamic Target Tracking & Latency Reduction:** Implemented machine-learning trajectory prediction for dynamic target tracking, cutting state-estimation latency by 45% while keeping detection probability above 99% under heavy noise.',
      '**Hardware Protocol Software (C, RS-422, MIL-STD-1553):** Wrote C software that talks to hardware over RS-422 and MIL-STD-1553. Systematic testing and tight hardware-software integration cut communication errors by 35% and improved protocol compliance.',
      '**WinAPI Real-Time Telemetry Dashboard:** Built a WinAPI dashboard that graphs incoming data in real time, eliminating manual log inspection, and overhauled data handling, synchronization, and error handling in the existing codebase.',
    ],
    achievements: [
      'Cut edge vision inference latency to under 15 ms per frame using lightweight quantized YOLO Nano models on constrained hardware',
      'Attained >98% precision and recall across multi-class local script recognition under motion blur, low light, and physical distortion',
      'Reached sub-meter spatial RMSE in real-time 3D tracking by fusing telemetry, radar tracking, and altimeter data in MATLAB & Simulink',
      'Reduced state-estimation latency by 45% with ML trajectory prediction while sustaining >99% detection probability in high-noise environments',
      'Decreased communication errors by 35% and enhanced protocol compliance across RS-422 and MIL-STD-1553 buses',
      'Eliminated manual log inspection for engineering teams by building a responsive WinAPI real-time data graphing interface',
    ],
    technologies: [
      'Python',
      'OpenCV',
      'TensorFlow',
      'YOLO Nano',
      'MATLAB',
      'Simulink',
      'C',
      'WinAPI',
      'RS-422',
      'MIL-STD-1553',
      'Sensor Fusion',
      'Edge ML',
      'Real-Time Systems',
    ],
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
