import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.mohdateeqnova.in';
  
  // Real routes configured inside Next.js App Router
  const routes = [
    '',
    '/projects/heart-risk-detection',
    '/projects/factguard-ai',
    '/projects/vidyaai',
    '/projects/docchat-ai',
    '/experience/drdo-rci',
    '/experience/sri-datta-freelance',
    '/blog',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: route === '' ? 1.0 : 0.8,
  }));
}
