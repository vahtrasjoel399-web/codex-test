import type {MetadataRoute} from 'next';
import {locales, routeEntries, routeHref} from '@/config/routes';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://vara.ee';
  return routeEntries.flatMap((entry) => locales.map((locale) => ({url:`${base}${routeHref(locale,entry.id)}`,lastModified:new Date('2026-08-28'),changeFrequency: entry.id === 'home' ? 'weekly' as const : entry.section === 'journal' ? 'monthly' as const : 'monthly' as const,priority:entry.id === 'home'?1:entry.section==='catering'?0.9:0.7,alternates:{languages:Object.fromEntries(locales.map((lang)=>[lang,`${base}${routeHref(lang,entry.id)}`]))}})));
}
