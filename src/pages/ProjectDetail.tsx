import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import { PageTransition, FadeIn, SlideIn } from '@/components/PageTransition';
import { GlassCard, GlassCardLarge } from '@/components/GlassCard';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';

interface TechItem {
  name: string;
  usage: string;
}

interface ProjectData {
  title: string;
  category: string;
  overview: string;
  documentation: {
    context: string;
    approach: string;
    implementation: string;
    architecture?: string;
  };
  tech: TechItem[];
  liveUrl?: string;
  githubUrl?: string;
}

const projectData: Record<string, ProjectData> = {
  'heart-risk-detection': {
    title: 'Contactless Heart Risk Detection System',
    category: 'AI / Healthcare',
    overview: 'A real-time camera-based heart risk detection and monitoring system that captures physiological signals from facial video streams and uses deep learning to predict cardiac risk without any physical contact.',
    documentation: {
      context: 'Traditional heart risk assessment requires clinical equipment and physical contact, making it inaccessible for continuous monitoring. This project addresses the need for non-invasive, real-time cardiac health assessment using just a standard camera.',
      approach: 'Leveraged remote photoplethysmography (rPPG) to extract vital signs from facial video. Trained an LSTM-based deep learning model on customized ECG data to enable heart risk prediction from PPG signals extracted via pyVHR and OpenCV.',
      implementation: 'Built the signal extraction pipeline using pyVHR and OpenCV for real-time facial video processing. Developed a TensorFlow-based LSTM model trained on customized ECG datasets. Created a React dashboard integrated with Firebase for storing, monitoring, and visualizing heart health metrics in real time.',
      architecture: 'Camera feed → pyVHR signal extraction → OpenCV preprocessing → TensorFlow LSTM prediction → Firebase storage → React dashboard visualization. The system processes video frames in real-time and provides continuous risk assessment updates.',
    },
    tech: [
      { name: 'Python', usage: 'Core backend for signal processing pipeline and model training' },
      { name: 'TensorFlow', usage: 'Trained the LSTM model for heart risk prediction from PPG signals' },
      { name: 'pyVHR', usage: 'Extracted remote photoplethysmography signals from facial video streams' },
      { name: 'OpenCV', usage: 'Real-time facial detection and video frame preprocessing' },
      { name: 'React', usage: 'Built the monitoring dashboard with real-time data visualization' },
      { name: 'Firebase', usage: 'Stored health metrics and provided real-time database sync' },
    ],
    githubUrl: 'https://github.com/Mohammed-Ateeq-nova',
  },
  'face-liveness-detection': {
    title: 'Face Liveness Detection System',
    category: 'Machine Learning',
    overview: 'A browser-based face liveness detection system that runs entirely client-side, enabling real-time liveness classification without any server dependencies for maximum privacy and minimal latency.',
    documentation: {
      context: 'Face recognition systems are vulnerable to spoofing attacks using photos, videos, or masks. Liveness detection adds a critical security layer, and running it in-browser removes server dependency, reducing latency and improving privacy.',
      approach: 'Fine-tuned a MobileNetV3 model for binary liveness classification (real vs. spoofed). Optimized the model for browser deployment using ONNX format, enabling real-time inference directly in the user\'s browser.',
      implementation: 'Trained and fine-tuned the MobileNetV3 architecture using TensorFlow for real-time liveness classification. Converted the model to ONNX format and deployed it in-browser using ONNX.js, achieving low-latency interactive inference without any server-side processing.',
    },
    tech: [
      { name: 'TensorFlow', usage: 'Trained and fine-tuned MobileNetV3 for liveness classification' },
      { name: 'MobileNetV3', usage: 'Lightweight architecture enabling real-time browser inference' },
      { name: 'ONNX.js', usage: 'Deployed the model client-side for serverless, low-latency inference' },
      { name: 'TensorFlow.js', usage: 'Model conversion and browser-compatible tensor operations' },
    ],
    githubUrl: 'https://github.com/Mohammed-Ateeq-nova',
  },
  'docchat-ai': {
    title: 'DocChat AI',
    category: 'AI / Web App',
    overview: 'A RAG-based document-aware AI chat application that enables intelligent, contextual conversations about uploaded documents using Google Gemini API with secure authentication and document management.',
    documentation: {
      context: 'Working with large documents often requires searching through pages to find relevant information. DocChat AI solves this by enabling natural language queries against uploaded documents, providing contextual answers with source references.',
      approach: 'Implemented a Retrieval-Augmented Generation (RAG) pipeline using Google Gemini API. Documents are parsed, chunked, and indexed to enable intelligent context-aware responses. Built on Supabase for secure authentication and data persistence.',
      implementation: 'Built the frontend with React and TypeScript, integrated PDF.js for document parsing and in-browser viewing. Used Supabase Auth for secure user management and Supabase Edge Functions for server-side RAG processing with Google Gemini API. Styled with Tailwind CSS for a clean, responsive interface.',
    },
    tech: [
      { name: 'React', usage: 'Built the chat interface and document management UI' },
      { name: 'TypeScript', usage: 'Type-safe codebase ensuring reliable document processing' },
      { name: 'Google Gemini API', usage: 'Powered the RAG-based conversational AI engine' },
      { name: 'Supabase', usage: 'Authentication, database, and Edge Functions for server-side logic' },
      { name: 'PDF.js', usage: 'Client-side document parsing and in-browser PDF viewing' },
      { name: 'Tailwind CSS', usage: 'Responsive, utility-first styling for the chat interface' },
    ],
    githubUrl: 'https://github.com/Mohammed-Ateeq-nova',
  },
  'sri-datta-electronics': {
    title: 'Sri Datta Electronics — Marketing Platform',
    category: 'Freelance / Web',
    overview: 'A product marketing and catalog-based web platform built for Sri Datta Electronics, an industrial solutions company, resulting in a 35% increase in client leads through modern UI, SEO optimization, and integrated communication tools.',
    documentation: {
      context: 'Sri Datta Electronics needed a professional web presence to showcase their telemetry solutions for defense, aerospace, and industrial sectors. The existing outreach was limited, and client communication was inefficient.',
      approach: 'Built a product-centric marketing platform with an interactive catalog, integrated Firebase contact forms for reliable communication, and Google Maps API for location visibility. Focused on SEO and responsive design for maximum reach.',
      implementation: 'Developed with React and Next.js for server-side rendering and SEO benefits. Integrated Firebase contact forms achieving 95% deliverability, reducing support queries by 25%. Created modern UI animations with TypeScript and implemented responsive design improving mobile conversion by 20%.',
      architecture: 'Next.js SSR → React component library → Firebase Backend (forms, analytics) → Google Maps API. SEO-optimized with meta tags, structured data, and responsive images.',
    },
    tech: [
      { name: 'React', usage: 'Component-based UI with interactive product catalog' },
      { name: 'Next.js', usage: 'Server-side rendering for SEO and fast initial page loads' },
      { name: 'TypeScript', usage: 'Type-safe codebase with modern UI animation logic' },
      { name: 'Firebase', usage: 'Contact forms with 95% deliverability and real-time analytics' },
      { name: 'Tailwind CSS', usage: 'Responsive design improving mobile conversion by 20%' },
    ],
    liveUrl: 'https://www.sridattaelectronics.com',
    githubUrl: 'https://github.com/Mohammed-Ateeq-nova',
  },
};

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const project = projectData[id || ''] || {
    title: 'Project Not Found',
    category: '',
    overview: 'This project does not exist.',
    documentation: {
      context: '',
      approach: '',
      implementation: '',
    },
    tech: [],
  };

  return (
    <PageTransition className="page-container pt-32">
      {/* Back Navigation */}
      <div className="section-container mb-8">
        <FadeIn>
          <Link
            to="/#projects"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-display"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>
        </FadeIn>
      </div>

      {/* Header */}
      <section className="section-container mb-16">
        <FadeIn delay={0.1}>
          <span className="inline-block px-4 py-2 mb-6 text-xs font-display font-medium tracking-widest uppercase glass rounded-full">
            {project.category}
          </span>
        </FadeIn>
        
        <FadeIn delay={0.2}>
          <h1 className="text-display-lg mb-6 dark:neon-text-cyan">{project.title}</h1>
        </FadeIn>
        
        <FadeIn delay={0.3}>
          <p className="text-xl text-muted-foreground max-w-3xl">
            {project.overview}
          </p>
        </FadeIn>
        
        {/* Action Buttons */}
        <FadeIn delay={0.4}>
          <div className="flex flex-wrap gap-4 mt-8">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="glass rounded-full px-6 py-3 font-display font-medium inline-flex items-center gap-2 group hover:scale-105 transition-transform"
              >
                Live Demo
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-foreground dark:border-neon-cyan rounded-full px-6 py-3 font-display font-medium inline-flex items-center gap-2 hover:bg-foreground hover:text-background dark:hover:bg-neon-cyan transition-colors"
              >
                <Github className="w-4 h-4" />
                View Code
              </a>
            )}
          </div>
        </FadeIn>
      </section>

      {/* Documentation Section */}
      <section className="section-container mb-24">
        <FadeIn>
          <h2 className="text-display-sm mb-8">Documentation</h2>
        </FadeIn>
        
        <SlideIn direction="up">
          <GlassCard hover={false} className="space-y-8">
            <div>
              <h3 className="font-display font-semibold text-lg mb-3 dark:text-neon-cyan">
                Context
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {project.documentation.context}
              </p>
            </div>
            
            <div>
              <h3 className="font-display font-semibold text-lg mb-3 dark:text-neon-cyan">
                Approach
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {project.documentation.approach}
              </p>
            </div>
            
            <div>
              <h3 className="font-display font-semibold text-lg mb-3 dark:text-neon-cyan">
                Implementation
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {project.documentation.implementation}
              </p>
            </div>
            
            {project.documentation.architecture && (
              <div>
                <h3 className="font-display font-semibold text-lg mb-3 dark:text-neon-cyan">
                  Architecture
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {project.documentation.architecture}
                </p>
              </div>
            )}
          </GlassCard>
        </SlideIn>
      </section>

      {/* Tech Stack */}
      <section className="section-container mb-24">
        <FadeIn>
          <h2 className="text-display-sm mb-8">Technology Stack</h2>
        </FadeIn>
        
        <div className="flex flex-wrap gap-4">
          {project.tech.map((tech, index) => (
            <FadeIn key={tech.name} delay={0.05 * index}>
              <HoverCard openDelay={200} closeDelay={100}>
                <HoverCardTrigger asChild>
                  <span className="glass rounded-full px-6 py-3 font-display font-medium cursor-pointer transition-all duration-300 hover:scale-105 dark:hover:shadow-glow-cyan inline-block">
                    {tech.name}
                  </span>
                </HoverCardTrigger>
                <HoverCardContent 
                  className="glass-heavy w-72 border-0 p-4"
                  sideOffset={8}
                >
                  <div className="space-y-2">
                    <h4 className="font-display font-semibold dark:text-neon-cyan">
                      {tech.name}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {tech.usage}
                    </p>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* More Projects */}
      <section className="section-container pb-24">
        <FadeIn>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-display-sm">More Projects</h2>
            <Link
              to="/#projects"
              className="text-muted-foreground hover:text-foreground transition-colors font-display"
            >
              View All →
            </Link>
          </div>
        </FadeIn>
        
        <div className="grid md:grid-cols-3 gap-6">
          {Object.entries(projectData)
            .filter(([key]) => key !== id)
            .slice(0, 3)
            .map(([key, proj], index) => (
              <FadeIn key={key} delay={0.1 * index}>
                <Link to={`/projects/${key}`}>
                  <GlassCard className="group">
                    <div className="aspect-[4/3] bg-muted rounded-lg mb-4" />
                    <span className="text-xs font-display uppercase tracking-widest text-muted-foreground mb-1 block">
                      {proj.category}
                    </span>
                    <h3 className="font-display font-semibold group-hover:dark:text-neon-cyan transition-colors">
                      {proj.title}
                    </h3>
                  </GlassCard>
                </Link>
              </FadeIn>
            ))}
        </div>
      </section>
    </PageTransition>
  );
};

export default ProjectDetail;
