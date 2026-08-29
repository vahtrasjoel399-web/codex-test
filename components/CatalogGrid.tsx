'use client';

import {useState} from 'react';
import Link from 'next/link';
import Image, {type StaticImageData} from 'next/image';
import {motion} from 'motion/react';
import {ArrowUpRight} from 'lucide-react';
import {routeById, routeHref, type Locale} from '@/config/routes';

type Card = {id: string; code: string; meta: Record<Locale, string>; group?: string};

export function CatalogGrid({items, locale, image, filters}: {items: Card[]; locale: Locale; image: StaticImageData; filters?: {value: string; label: string}[]}) {
  const [active, setActive] = useState('all');
  const visible = active === 'all' ? items : items.filter((item) => item.group === active);
  return (
    <>
      {filters && <div className="catalog-filters" role="toolbar">{filters.map((filter) => <button onClick={() => setActive(filter.value)} className={active === filter.value ? 'active' : ''} key={filter.value}>{active === filter.value && <motion.i layoutId="filter-mark"/>}{filter.label}</button>)}</div>}
      <motion.div className="catalog-grid" layout>
        {visible.map((item, index) => (
          <motion.article className={`catalog-card card-${index % 3}`} layout key={item.id} initial={{opacity: 0}} animate={{opacity: 1}} transition={{type: 'spring', stiffness: 260, damping: 30, mass: 0.9}}>
            <Link href={routeHref(locale, item.id)}>
              <div className="catalog-image"><Image src={image} alt={routeById[item.id].titles[locale]} fill sizes="(max-width: 768px) 90vw, 33vw" placeholder="blur" style={{objectPosition: `${35 + (index % 3) * 25}% center`}} /></div>
              <div className="card-code">{item.code}</div>
              <h2>{routeById[item.id].titles[locale]}</h2>
              <p>{item.meta[locale]}</p>
              <ArrowUpRight aria-hidden="true" />
            </Link>
          </motion.article>
        ))}
      </motion.div>
    </>
  );
}
