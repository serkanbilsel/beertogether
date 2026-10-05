import { MetadataRoute } from 'next';
import { INITIAL_EVENTS } from '@/lib/mockData';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://beertogether.app';
  const locales = ['tr', 'en', 'es', 'ja', 'ar', 'it'];

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
  ];

  // Add multi-language root paths
  for (const loc of locales) {
    staticRoutes.push({
      url: `${baseUrl}/${loc}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    });
  }

  // Add public events with multi-language URLs
  const eventRoutes: MetadataRoute.Sitemap = INITIAL_EVENTS.filter(
    (e) => e.visibility === 'public'
  ).flatMap((e) => [
    {
      url: `${baseUrl}/e/${e.slug}`,
      lastModified: new Date(e.updated_at || e.created_at),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...locales.map((loc) => ({
      url: `${baseUrl}/${loc}/e/${e.slug}`,
      lastModified: new Date(e.updated_at || e.created_at),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
  ]);

  return [...staticRoutes, ...eventRoutes];
}
