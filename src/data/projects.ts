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
  liveUrlLabel?: string;
  extensionUrl?: string;
  githubUrl?: string;
  image?: string;
  youtubeId?: string;
}

export const projectData: Record<string, ProjectData> = {
  'blast-radius': {
    title: 'Graph-Powered npm Vulnerability Triage & Reachability Analysis',
    category: 'Security / Graph Database',
    overview: 'A connected-data vulnerability triage platform built for the FalkorDB Hackathon 2026. Transforms flat npm dependency trees into a property graph stored in FalkorDB, using Cypher traversals and static AST import analysis to prove whether vulnerable transitive packages are actually reachable from code entry points.',
    documentation: {
      context: 'Modern JavaScript and TypeScript applications routinely pull in thousands of transitive dependencies. Standard Software Composition Analysis (SCA) scanners generate flat, decontextualized alert avalanches that fail to indicate whether vulnerable code is actually imported or reached. This causes severe alert fatigue and leads teams into breaking, blind upgrades.',
      approach: 'Unified three distinct layers into a single property graph: package manifest dependencies (DEPENDS_ON), source code imports and entry point paths (IMPORTS, REACHES), and OSV security advisories (AFFECTS). Implemented four mutually exclusive evidence tiers (confirmed_entry_path, imported_only, transitive_dependency_only, no_path_found) evaluated via Cypher graph queries to compute deterministic risk scores.',
      implementation: 'Engineered an asynchronous FastAPI (Python 3.11+) backend communicating with FalkorDB over the low-latency Redis protocol. Integrated the live OSV.dev batch REST API with offline fixture fallback, an AST/regex static import scanner, and a dependency-free SemVer 2.0.0 evaluator for calculating upgrade compatibility costs (patch, minor, major). Built a dark-mode security operations console in React 19, TypeScript, and Vite 6 backed by a 168-test automated pytest suite.',
      architecture: 'Local npm Project → AST Import Scanner & Lockfile Parser → OSV.dev Advisory Ingestion → FalkorDB Graph (RedisGraph Protocol) → Cypher Reachability Traversal → Deterministic Risk Engine → SemVer Remediation Planner & Unified Diff Proposal → React 19 Security Operations Console.',
    },
    tech: [
      { name: 'FalkorDB', usage: 'High-throughput graph database queried via Cypher to trace multi-hop reachability paths from code entry points to packages' },
      { name: 'Python & FastAPI', usage: 'High-performance asynchronous backend service managing AST scanning, advisory ingestion, and graph sync' },
      { name: 'OSV.dev REST API', usage: 'Batch vulnerability intelligence provider querying real-time CVE and GHSA security advisories' },
      { name: 'React 19', usage: 'Modern frontend console with interactive evidence graphs, risk-tier filters, and reviewable patch diffs' },
      { name: 'TypeScript', usage: 'Strict type safety across the remediation engine, graph schemas, and dashboard state management' },
      { name: 'SemVer 2.0.0 Engine', usage: 'Custom dependency-free version evaluator verifying that upgrade proposals exit advisory ranges' },
      { name: 'Pytest (168 Tests)', usage: 'Comprehensive test suite verifying lockfile parsing, Cypher idempotency, and graph directionality' },
    ],
    githubUrl: 'https://github.com/Mohammed-Ateeq-nova/blastradius',
    image: '/projects/blastradius/02-evidence-graph.png',
    youtubeId: 'rxqzdjaQP8k',
  },
  'livestream-translator': {
    title: 'Browser-Native Real-Time Speech Translation',
    category: 'Audio Engineering / AI',
    overview: 'A high-performance Chrome Manifest V3 browser extension and companion guide that captures tab and microphone audio, executes client-side Voice Activity Detection (VAD), and streams overlapping audio to Groq Whisper and Qwen models for low-latency live captions and browser speech synthesis.',
    documentation: {
      context: 'Cross-language livestreams, webinars, and virtual meetings frequently lack real-time captions or rely on heavy external desktop tools with high latency, cloud lock-in, and privacy concerns. LiveStream Translator brings live multilingual translation directly inside the browser without requiring a proprietary backend server.',
      approach: 'Leveraged Chrome Offscreen documents and the Web Audio API to create a resilient audio pipeline with alternating, overlapping MediaRecorder windows (WebM/Opus). Filtered silence and background music using a custom client-side VAD before dispatching audio to Groq Whisper Large v3 Turbo and Qwen chat-completions with rolling context deduplication.',
      implementation: 'Engineered a clean Chrome Manifest V3 architecture with pure JavaScript ES modules (zero runtime npm dependencies). Built an in-page draggable subtitle overlay with dynamic font controls, fullscreen support, and SpeechSynthesis voiceover. Implemented a proactive dual-API-key manager that tracks sliding-window request rates and handles HTTP 429 backoff gracefully.',
      architecture: 'Chrome tabCapture → Web Audio API Graph & Analyser → Client VAD Speech Filter → Dual Overlapping MediaRecorders → Background Service Worker → Groq Whisper Large v3 Turbo (STT) → Rolling Context Buffer → Groq Qwen (Translation) → In-Page Draggable Overlay & Web Speech TTS.',
    },
    tech: [
      { name: 'Chrome Manifest V3', usage: 'Modular extension architecture with offscreen audio capture, background service worker, and content scripts' },
      { name: 'Web Audio API', usage: 'Captures tab and mic streams, maintains user-audible playback, and drives real-time audio visualization' },
      { name: 'Groq Whisper Large v3', usage: 'Sub-second speech-to-text inference transcribing audio chunks via multipart API requests' },
      { name: 'Groq Qwen Model', usage: 'Context-aware multilingual translation model maintaining sentence continuity using a rolling buffer' },
      { name: 'Custom Client VAD', usage: 'Analyzes RMS energy, zero-crossing rates, and speech-frequency bands to filter silence and music' },
      { name: 'Web Speech Synthesis', usage: 'Browser-native text-to-speech engine providing spoken voiceover translation without cloud fees' },
      { name: 'JavaScript ES Modules', usage: 'Zero-framework vanilla implementation adhering to strict CSP security and low memory overhead' },
    ],
    liveUrl: 'https://livestream-translator-guide.vercel.app/',
    liveUrlLabel: 'Setup Guide & Site',
    extensionUrl: 'https://chromewebstore.google.com/detail/livestream-translator/ihnifoicfanhjfekbfmjaahoiijmocbp?pli=1',
    image: '/projects/LiveStream-Translator/translation.png',
    youtubeId: 'nPjI5kyOUBw',
  },
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
