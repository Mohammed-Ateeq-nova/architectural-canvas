// Shared project data — importable by both server and client components

interface TechItem {
  name: string;
  usage: string;
}

export interface ProjectData {
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

export const projectData: Record<string, ProjectData> = {
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
