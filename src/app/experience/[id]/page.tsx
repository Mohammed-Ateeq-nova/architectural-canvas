import { Metadata } from 'next';
import { experienceDetailData } from '@/data/experiences';
import ExperienceDetailClient from '../ExperienceDetailClient';

export async function generateStaticParams() {
  return Object.keys(experienceDetailData).map((id) => ({
    id,
  }));
}

interface PageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const experience = experienceDetailData[params.id];
  if (!experience) {
    return {
      title: 'Experience Not Found | Mohammed Ateeq',
      description: 'The requested experience could not be found.',
    };
  }

  const pageTitle = `${experience.role} at ${experience.company} — Mohammed Ateeq`;

  return {
    title: pageTitle,
    description: experience.overview,
    alternates: {
      canonical: `/experience/${params.id}`,
    },
    openGraph: {
      title: pageTitle,
      description: experience.overview,
      url: `https://www.mohdateeqnova.in/experience/${params.id}`,
      type: 'website',
    },
  };
}

export default function ExperiencePage({ params }: PageProps) {
  return <ExperienceDetailClient id={params.id} />;
}
