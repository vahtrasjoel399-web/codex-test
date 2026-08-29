import type {Metadata} from 'next';
import {setRequestLocale} from 'next-intl/server';
import {PageRenderer} from '@/components/PageTemplates';
import {alternatesFor, locales, routeById, type Locale} from '@/config/routes';
import {uiCopy, brand} from '@/content/site-copy';

export function generateStaticParams() {return locales.map((locale) => ({locale}));}

export function generateMetadata({params}: {params: {locale: Locale}}): Metadata {
  const entry = routeById.home;
  return {title: entry.titles[params.locale], description: uiCopy[params.locale].homeIntro, alternates: {languages: alternatesFor(entry)}, openGraph: {title: entry.titles[params.locale], description: uiCopy[params.locale].homeIntro, images: ['/images/bakery-morning.png']}};
}

export default function Home({params}: {params: {locale: Locale}}) {
  setRequestLocale(params.locale);
  const data = {"@context":"https://schema.org","@type":["Bakery","LocalBusiness"],name:brand.legalName,address:{"@type":"PostalAddress",streetAddress:'Tööstuse 47d',postalCode:'10416',addressLocality:'Tallinn',addressCountry:'EE'},telephone:brand.phone,email:brand.email,priceRange:'€€',areaServed:'Tallinn',description:uiCopy[params.locale].homeIntro};
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(data)}}/><PageRenderer entry={routeById.home} locale={params.locale}/></>;
}
