import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {setRequestLocale} from 'next-intl/server';
import {PageRenderer} from '@/components/PageTemplates';
import {alternatesFor, findRoute, locales, routeEntries, routeHref, type Locale} from '@/config/routes';
import {brand, pageCopy} from '@/content/site-copy';

type Params = {locale: Locale; slug: string[]};

export function generateStaticParams() {
  return locales.flatMap((locale) => routeEntries.filter((entry) => entry.id !== 'home').map((entry) => ({locale, slug: entry.paths[locale].split('/')})));
}

export function generateMetadata({params}: {params: Params}): Metadata {
  const entry = findRoute(params.locale, params.slug);
  if (!entry) return {};
  const copy = pageCopy(entry, params.locale);
  return {
    title: entry.titles[params.locale],
    description: copy.meta,
    alternates: {canonical: routeHref(params.locale, entry.id), languages: alternatesFor(entry)},
    openGraph: {title: entry.titles[params.locale], description: copy.meta, images: [entry.section === 'bakery' ? '/images/product-tray.png' : '/images/catering-table.png']}
  };
}

export default function ContentPage({params}: {params: Params}) {
  const entry = findRoute(params.locale, params.slug);
  if (!entry) notFound();
  setRequestLocale(params.locale);
  const crumbs = [{name:'Vara',item:`/${params.locale}`},{name:entry.titles[params.locale],item:routeHref(params.locale,entry.id)}];
  const schemas: Record<string, unknown>[] = [{"@context":"https://schema.org","@type":"BreadcrumbList",itemListElement:crumbs.map((crumb,index)=>({"@type":"ListItem",position:index+1,name:crumb.name,item:crumb.item}))}];
  if (entry.section === 'catering' || entry.section === 'menus') schemas.push({"@context":"https://schema.org","@type":"Service",name:entry.titles[params.locale],provider:{"@type":"FoodEstablishment",name:brand.legalName},areaServed:'Tallinn'});
  if (entry.section === 'bakery' && entry.template === 'service-detail') schemas.push({"@context":"https://schema.org","@type":"Product",name:entry.titles[params.locale],brand:{"@type":"Brand",name:'Vara'},offers:{"@type":"Offer",priceCurrency:'EUR',availability:'https://schema.org/PreOrder'}});
  if (entry.section === 'journal') schemas.push({"@context":"https://schema.org","@type":"Article",headline:entry.titles[params.locale],datePublished:'2026-08-28',author:{"@type":"Organization",name:brand.legalName}});
  return <>{schemas.map((schema,index)=><script key={index} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/>)}<PageRenderer entry={entry} locale={params.locale}/></>;
}
