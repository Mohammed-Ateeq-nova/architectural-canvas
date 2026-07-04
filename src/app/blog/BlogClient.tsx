"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Calendar, Clock, ArrowUpRight } from 'lucide-react';
import { PageTransition, FadeIn, SlideIn } from '@/components/PageTransition';
import { GlassCardLarge } from '@/components/GlassCard';
import { ScrambleText } from '@/components/ScrambleText';
import { ScrambleParagraph } from '@/components/ScrambleParagraph';

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
}

const mockPosts: BlogPost[] = [
  {
    slug: 'optimizing-rag-pipelines-production',
    title: 'Optimizing RAG Pipelines: Chunking Strategies and Vector Database Indexing',
    excerpt: 'An in-depth exploration of retrieval-augmented generation. Learn how chunk sizes, overlap strategies, and modern embedding models directly impact query relevance and LLM synthesis accuracy.',
    date: 'Jun 28, 2026',
    readTime: '6 min read',
    category: 'AI / RAG',
    tags: ['RAG', 'Vector Database', 'LLM', 'Embeddings'],
  },
  {
    slug: 'camera-based-rppg-telemetry',
    title: 'Understanding rPPG: Extracting Physiological Vital Signs from Webcam Feeds',
    excerpt: 'How remote photoplethysmography (rPPG) detects subtle blood flow variations in the skin. We break down the mathematical filters and deep learning architectures used to monitor heart rates contactlessly.',
    date: 'May 15, 2026',
    readTime: '8 min read',
    category: 'Computer Vision',
    tags: ['rPPG', 'Computer Vision', 'OpenCV', 'Signal Processing'],
  },
  {
    slug: 'migrating-to-nextjs-app-router',
    title: 'Migrating High-Performance React WebGL Apps to Next.js App Router',
    excerpt: 'Best practices for bringing React Three Fiber canvas configurations into Next.js. How to resolve hydration conflicts, optimize code splitting, and achieve 100/100 Core Web Vitals.',
    date: 'Apr 22, 2026',
    readTime: '5 min read',
    category: 'Web Dev',
    tags: ['Next.js', 'React Three Fiber', 'SEO', 'Performance'],
  },
];

export default function BlogClient() {
  const [mounted, setMounted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    setMounted(true);
  }, []);

  const categories = ['All', ...Array.from(new Set(mockPosts.map((post) => post.category)))];

  const filteredPosts = selectedCategory === 'All'
    ? mockPosts
    : mockPosts.filter((post) => post.category === selectedCategory);

  return (
    <PageTransition className="page-container pt-32 overflow-x-hidden max-w-[100vw]">
      {/* Back Navigation */}
      <div className="section-container mb-8">
        <FadeIn>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-display"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </FadeIn>
      </div>

      {/* Header */}
      <section className="section-container mb-12">
        <FadeIn delay={0.1}>
          <span className="inline-block px-4 py-2 mb-6 text-xs font-display font-medium tracking-widest uppercase glass rounded-full">
            <ScrambleText text="Writing" trigger={mounted} />
          </span>
        </FadeIn>
        
        <FadeIn delay={0.2}>
          <h1 
            className="mb-6 dark:neon-text-cyan uppercase font-bold tracking-tight leading-tight select-none"
            style={{
              fontFamily: "'Audiowide', cursive",
              fontSize: 'clamp(32px, 5vw, 64px)',
            }}
          >
            <ScrambleText text="Technical Insights" trigger={mounted} delay={200} />
          </h1>
        </FadeIn>

        <FadeIn delay={0.3}>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed font-medium">
            Thought leadership, architectural breakdowns, and hands-on developer guides covering artificial intelligence, software engineering, and core technology systems.
          </p>
        </FadeIn>
      </section>

      {/* Categories Filter */}
      <section className="section-container mb-12">
        <FadeIn delay={0.4}>
          <div className="flex flex-wrap gap-2 border-b border-border/20 pb-6">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 text-xs font-display font-medium tracking-wider uppercase rounded-full transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-foreground text-background dark:bg-neon-cyan dark:text-black font-bold'
                    : 'glass hover:bg-muted'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* Blog Posts List */}
      <section className="section-container pb-24">
        <div className="space-y-8">
          {filteredPosts.map((post, index) => (
            <SlideIn key={post.slug} direction="up" delay={0.1 * index}>
              <div className="group relative block w-full text-left pointer-events-auto cursor-pointer">
                <GlassCardLarge className="p-8 md:p-10 hover:shadow-[0_25px_60px_-10px_rgba(0,229,255,0.08)] transition-all duration-500 hover:border-[#00e5ff]/20">
                  <div className="flex flex-wrap items-center gap-4 text-xs font-display text-muted-foreground mb-4">
                    <span className="px-2.5 py-1 bg-secondary/50 rounded text-[10px] text-foreground font-semibold uppercase tracking-wider">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{post.date}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-border" />
                    <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{post.readTime}</span>
                  </div>

                  <h3 className="text-xl md:text-2xl font-bold font-display uppercase tracking-wide group-hover:dark:text-neon-cyan transition-colors leading-snug mb-4">
                    {post.title}
                  </h3>

                  <p className="text-sm md:text-base text-muted-foreground/80 leading-relaxed mb-6 font-medium max-w-4xl">
                    {post.excerpt}
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border/10 pt-4">
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span key={tag} className="text-[10px] font-sans font-medium px-2 py-0.5 bg-[#00e5ff]/5 border border-[#00e5ff]/10 text-muted-foreground rounded">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className="inline-flex items-center gap-2 text-xs md:text-sm font-bold text-[#00e5ff] uppercase tracking-wider">
                      <span>Read Post</span>
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </div>
                  </div>
                </GlassCardLarge>
              </div>
            </SlideIn>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
