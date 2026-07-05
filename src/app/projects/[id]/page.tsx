import { Metadata } from 'next';
import { projectData } from '@/data/projects';
import ProjectDetailClient from '../ProjectDetailClient';

export async function generateStaticParams() {
  return Object.keys(projectData).map((id) => ({
    id,
  }));
}

interface PageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const project = projectData[params.id];
  if (!project) {
    return {
      title: 'Project Not Found | Mohammed Ateeq',
      description: 'The requested project could not be found.',
    };
  }

  return {
    title: `${project.title} — Mohammed Ateeq`,
    description: project.overview,
    alternates: {
      canonical: `/projects/${params.id}`,
    },
    openGraph: {
      title: `${project.title} — Mohammed Ateeq`,
      description: project.overview,
      url: `https://www.mohdateeqnova.in/projects/${params.id}`,
      type: 'website',
      images: project.image ? [{ url: project.image }] : [],
    },
  };
}

export default function ProjectPage({ params }: PageProps) {
  return <ProjectDetailClient id={params.id} />;
}
