import { Metadata } from 'next';
import BlogClient from './BlogClient';

export const metadata: Metadata = {
  title: 'Technical Writing & Articles | Mohammed Ateeq',
  description: 'Explore technical insights, architectural case studies, and engineering articles on AI models, RAG pipelines, signal processing, and full-stack development by Mohammed Ateeq.',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'Technical Writing & Articles | Mohammed Ateeq',
    description: 'Explore technical insights, architectural case studies, and engineering articles on AI models, RAG pipelines, signal processing, and full-stack development by Mohammed Ateeq.',
    url: 'https://www.mohdateeqnova.in/blog',
    type: 'website',
  },
};

export default function BlogPage() {
  return <BlogClient />;
}
