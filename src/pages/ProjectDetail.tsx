import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import { PageTransition, FadeIn, SlideIn } from '@/components/PageTransition';
import { GlassCard, GlassCardLarge } from '@/components/GlassCard';
import { ScrambleText } from '@/components/ScrambleText';
import { ScrambleParagraph } from '@/components/ScrambleParagraph';

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
  image?: string;
  youtubeId?: string;
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
    image: '/projects/heart-risk/analysis.png',
    youtubeId: 'OCVLf9s7SJk',
  },
  'factguard-ai': {
    title: 'FactGuard AI — Misinformation Tackling AI',
    category: 'AI / Conversational',
    overview: 'A real-time fact-checking conversational AI that searches the web, evaluates source credibility, and leverages local Llama 3.1 8B inference to generate structured evidence-backed reports.',
    documentation: {
      context: 'With the rapid spread of digital misinformation, journalists, researchers, and general users require transparent, source-backed claim evaluation. FactGuard AI solves this by executing automated web searches and generating transparent, audit-ready reports.',
      approach: 'Designed an automated search-retrieval pipeline that ranks source relevance and credibility. Claim decomposition, credibility evaluation, and evidence extraction are offloaded to Llama 3.1 8B running locally on consumer hardware via Ollama.',
      implementation: 'Built a high-performance frontend with React, Vite, and TanStack Query. Integrated a Supabase Edge Function to choreograph Deno-based search calls, nomic-embed-text deduplication, and Llama 3.1 reasoning APIs. Fully secured using Postgres Row-Level Security (RLS).',
      architecture: 'User Submit → Dashboard Page → Supabase Edge Function → Web Search API → Source Evaluation (Ollama embeddings) → Evidence Analysis (Llama 3.1 8B) → RLS Database Write → React Dashboard Report.',
    },
    tech: [
      { name: 'React', usage: 'Modern frontend framework with a fully responsive, dark-mode native interface' },
      { name: 'TypeScript', usage: 'Ensures type-safe client data and reliable document structures' },
      { name: 'Ollama', usage: 'Hosts Llama 3.1 8B and nomic-embed-text locally on consumer hardware' },
      { name: 'Llama 3.1 8B', usage: 'Executes reasoning, claim decomposition, source ranking, and verdict synthesis' },
      { name: 'Supabase', usage: 'Postgres database, Row-Level Security, email/Google authentication, and Edge Functions' },
      { name: 'nomic-embed-text', usage: 'Generates high-quality text embeddings used for source de-duplication' },
      { name: 'Tailwind CSS', usage: 'Sleek dark-mode native interface utilizing semantic HSL design tokens' },
    ],
    githubUrl: 'https://github.com/Mohammed-Ateeq-nova',
    image: '/projects/factguard/report.png',
    youtubeId: 'klMG3hyQNNo',
  },
  'vidyaai': {
    title: 'VidyaAI — CBSE AI Learning System',
    category: 'AI / Education',
    overview: 'A premium AI-powered academic tutoring companion designed for students studying under the CBSE curriculum (Classes 1-10), delivering syllabus-aligned chat support, structured exam notes, and a zero-server client-side RAG document pipeline.',
    documentation: {
      context: 'Traditional general-purpose AI systems lack curriculum context and grading scoping, often offering overly complex or out-of-scope guidance for K-10 primary and secondary school tutoring. VidyaAI solves this by enforcing curriculum boundaries and NCERT references.',
      approach: 'Built a specialized triple-learning mode (Friendly Chat, Structured Study Notes, and Audio Overview) that dynamically scopes prompt generation. Offloaded retrieval grounding to browser-side PDF text extraction using pdfjs-dist, eliminating heavy server-side databases.',
      implementation: 'Developed a rich React and TypeScript client integrated with the high-throughput Groq LLaMA 3.3 70B API. Configured a dual-channel text-to-speech engine using Google Gemini 2.0 (oral script translation) and ElevenLabs (TTS voice synthesis) with browser-native Web Speech player fallback. Stored session summaries inside Postgres with Row-Level Security (RLS).',
      architecture: 'User Select → CBSE System Prompt Construct → Chapter File Upload (pdfjs-dist parse) → Groq LLaMA 3.3 70B API (SSE stream) → RLS Database Sync (Supabase PostgreSQL) → Gemini script gen → ElevenLabs audio compilation.',
    },
    tech: [
      { name: 'React & TypeScript', usage: 'Modern component architecture and strong types ensuring high code quality' },
      { name: 'Groq API', usage: 'High-throughput LLaMA 3.3 70B streaming for real-time tutoring chat' },
      { name: 'Google Gemini', usage: 'Generates conversational, mathematical-formula-free spoken scripts for synthesis' },
      { name: 'ElevenLabs', usage: 'High-fidelity audio synthesis providing natural educator spoken voice streams' },
      { name: 'pdfjs-dist', usage: 'Performs zero-cost client-side text scanning and textbook file parsing in-browser' },
      { name: 'Supabase', usage: 'Managed PostgreSQL database, Row-Level Security logs, and secure user Auth flow' },
      { name: 'Tailwind CSS', usage: 'Sleek responsive design integrated with accessible Shadcn component layer' },
    ],
    githubUrl: 'https://github.com/Mohammed-Ateeq-nova',
    image: '/projects/vidhya-ai/response.png',
    youtubeId: 'mAOCQmXceQg',
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
    image: '/projects/docchat/response.png',
    youtubeId: 'NidchVmHeNY',
  }
};

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 300);
    return () => clearTimeout(t);
  }, []);

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

  useEffect(() => {
    if (project && project.title && project.title !== 'Project Not Found') {
      document.title = `${project.title} — Mohammed Ateeq`;
      
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', project.overview);
      }
      
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) {
        ogTitle.setAttribute('content', `${project.title} — Mohammed Ateeq`);
      }
      
      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) {
        ogDesc.setAttribute('content', project.overview);
      }
    }
  }, [project]);

  return (
    <PageTransition className="page-container pt-32 overflow-x-hidden max-w-[100vw]">
      <style dangerouslySetInnerHTML={{ __html: `
        h1, h2, h3, h4, h5, h6 {
          max-width: 100% !important;
          overflow-wrap: break-word !important;
          word-break: break-word !important;
          white-space: normal !important;
        }
      `}} />
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
            <ScrambleText text={project.category || 'Project'} trigger={mounted} delay={0} />
          </span>
        </FadeIn>
        
        <FadeIn delay={0.2}>
          <h1 
            className="mb-6 dark:neon-text-cyan uppercase font-bold tracking-tight leading-tight select-none whitespace-normal break-words"
            style={{
              fontFamily: "'Audiowide', cursive",
              fontSize: 'clamp(28px, 5vw, 72px)',
              maxWidth: '100%',
              overflowWrap: 'break-word',
              wordBreak: 'break-word'
            }}
          >
            <ScrambleText text={project.title} trigger={mounted} delay={200} />
          </h1>
        </FadeIn>
        
        <FadeIn delay={0.3}>
          <ScrambleParagraph
            text={project.overview}
            className="text-xl text-muted-foreground max-w-3xl"
            trigger={mounted}
            wordStaggerMs={40}
          />
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

      {/* Project Hero Image / Video */}
      {(project.youtubeId || project.image) && (
        <section className="section-container mb-16">
          <FadeIn delay={0.5}>
            <div className="w-full aspect-[16/9] rounded-[24px] overflow-hidden border border-border/30 dark:border-border/10 shadow-[0_20px_50px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.2)] bg-card relative">
              {project.youtubeId ? (
                <iframe
                  src={`https://www.youtube.com/embed/${project.youtubeId}?autoplay=1&mute=1&loop=1&playlist=${project.youtubeId}&controls=1&rel=0&playsinline=1`}
                  title={`${project.title} video demonstration`}
                  className="w-full h-full absolute inset-0 border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                <img 
                  src={project.image} 
                  alt={`${project.title} preview`}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </FadeIn>
        </section>
      )}

      {/* Documentation Section */}
      <section className="section-container mb-24">
        <FadeIn>
          <ScrambleText text="Documentation" as="h2" className="text-display-sm mb-8 block" />
        </FadeIn>
        
        <SlideIn direction="up">
          <GlassCard hover={false} className="space-y-8">
            <div>
              <ScrambleText text="Context" as="h3" className="font-display font-semibold text-lg mb-3 dark:text-neon-cyan block" />
              <p className="text-muted-foreground leading-relaxed">
                {project.documentation.context}
              </p>
            </div>
            
            <div>
              <ScrambleText text="Approach" as="h3" className="font-display font-semibold text-lg mb-3 dark:text-neon-cyan block" />
              <p className="text-muted-foreground leading-relaxed">
                {project.documentation.approach}
              </p>
            </div>
            
            <div>
              <ScrambleText text="Implementation" as="h3" className="font-display font-semibold text-lg mb-3 dark:text-neon-cyan block" />
              <p className="text-muted-foreground leading-relaxed">
                {project.documentation.implementation}
              </p>
            </div>
            
            {project.documentation.architecture && (
              <div>
                <ScrambleText text="Architecture" as="h3" className="font-display font-semibold text-lg mb-3 dark:text-neon-cyan block" />
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
          <ScrambleText text="Technology Stack" as="h2" className="text-display-sm mb-8 block" />
        </FadeIn>
        
        <div className="flex flex-wrap gap-4">
          {project.tech.map((tech, index) => (
            <FadeIn key={tech.name} delay={0.05 * index} className="relative group">
              <span className="glass rounded-full px-6 py-3 font-display font-medium cursor-pointer transition-all duration-300 hover:scale-105 dark:hover:shadow-glow-cyan inline-block">
                {tech.name}
              </span>
              {/* Custom High-Performance Premium Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-72 glass-heavy p-4 rounded-xl opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 pointer-events-none transition-all duration-300 z-50 text-left border-0 shadow-lg">
                <div className="space-y-2">
                  <h4 className="font-display font-semibold dark:text-neon-cyan">
                    {tech.name}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {tech.usage}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* More Projects */}
      <section className="section-container pb-24">
        <FadeIn>
          <div className="flex justify-between items-center mb-8">
            <ScrambleText text="More Projects" as="h2" className="text-display-sm block" />
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
                    <div className="aspect-[4/3] rounded-lg mb-4 overflow-hidden border border-border/20 dark:border-border/10 bg-muted">
                      {proj.image ? (
                        <img 
                          src={proj.image} 
                          alt={proj.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full bg-muted" />
                      )}
                    </div>
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
