// ./app/sitemap.ts
import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://tripleonebookings.com'
  return [
    { url: `${base}/`, lastModified: '2026-06-28T17:05:31+00:00', priority: 1 },
    { url: `${base}/hotels`, lastModified: new Date(), priority: 0.8 },
    { url: `${base}/booking`, lastModified: new Date(), priority: 0.8 },
    { url: `${base}/contact`, lastModified: new Date(), priority: 0.5 },
    { url: `${base}/blog/supernova-noida-complete-guide`, lastModified: '2025-07-09', priority: 0.7 },
    { url: `${base}/blog/supernova-3815`, lastModified: '2025-07-09', priority: 0.7 },
  ]
}
