'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useEffect, useMemo, useState} from 'react';
import {ArrowUpRight, Instagram, Menu, X} from 'lucide-react';
import {useTranslations} from 'next-intl';
import {bakeryIds, findRoute, locales, navIds, routeById, routeHref, type Locale} from '@/config/routes';
import {brand} from '@/content/site-copy';

type NavId = (typeof navIds)[number];

const navMenuIds: Record<NavId, readonly string[]> = {
  catering: ['menus', 'references', 'how-to-order', 'contact'],
  bakery: [...bakeryIds, 'custom-cakes'],
  references: ['case-conference', 'case-office', 'case-wedding', 'case-family'],
  pricing: ['how-to-order', 'faq', 'contact']
};

const navFeatured: Record<NavId, string> = {
  catering: 'menus',
  bakery: 'custom-cakes',
  references: 'case-wedding',
  pricing: 'how-to-order'
};

export function Header({locale}: {locale: Locale}) {
  const t = useTranslations();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    let previous = window.scrollY;
    const onScroll = () => {
      const current = window.scrollY;
      setSolid(current > 80);
      setHidden(current > previous && current > 180 && !open);
      previous = current;
    };
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, [open]);

  useEffect(() => {
    document.body.classList.toggle('menu-open', open);
    return () => document.body.classList.remove('menu-open');
  }, [open]);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [open]);

  const current = useMemo(() => {
    const pieces = pathname.split('/').filter(Boolean);
    return findRoute(locale, pieces.slice(1));
  }, [locale, pathname]);

  const switchHref = (next: Locale) => current ? routeHref(next, current.id) : `/${next}`;
  const navKey = (id: string) => `nav${id.charAt(0).toUpperCase()}${id.slice(1)}` as 'navCatering';

  return (
    <header className={`site-header ${solid ? 'is-solid' : ''} ${hidden ? 'is-hidden' : ''}`}>
      <Link href={`/${locale}`} className="wordmark" aria-label="Vara home">VARA<span>°04</span></Link>
      <nav className="desktop-nav" aria-label="Primary">
        {navIds.map((id) => {
          const menuIds = navMenuIds[id];
          return (
            <div className="nav-item has-mega" key={id}>
              <Link href={routeHref(locale, id)}>{t(navKey(id))}<span aria-hidden="true">＋</span></Link>
              <MegaMenu locale={locale} ids={menuIds} parentId={id} />
            </div>
          );
        })}
      </nav>
      <div className="header-actions">
        <div className="language-row" aria-label={t('navLanguage')}>
          {locales.map((item) => <Link className={item === locale ? 'active' : ''} href={switchHref(item)} key={item}>{item}</Link>)}
        </div>
        <a className="header-quote" href="tel:+3725032485">{t('navQuote')}<ArrowUpRight size={16}/></a>
        <button type="button" className="menu-toggle" onClick={() => setOpen((value) => !value)} aria-label={open ? t('navClose') : t('navOpen')} aria-expanded={open} aria-controls="mobile-menu">
          <span className="sr-only">{open ? t('navClose') : t('navOpen')}</span>{open ? <X /> : <Menu />}
        </button>
      </div>
      <div className={`mobile-menu ${open ? 'is-open' : ''}`} id="mobile-menu">
        <nav aria-label="Mobile">
          {navIds.map((id, index) => (
            <Link style={{transitionDelay: `${index * 60}ms`}} onClick={() => setOpen(false)} href={routeHref(locale, id)} key={id}>
              <span>0{index + 1}</span>{t(navKey(id))}
            </Link>
          ))}
          <Link style={{transitionDelay: `${navIds.length * 60}ms`}} onClick={() => setOpen(false)} href={routeHref(locale, 'contact')}><span>0{navIds.length + 1}</span>{routeById.contact.titles[locale]}</Link>
        </nav>
        <div className="mobile-menu-foot">
          <div className="language-row" aria-label={t('navLanguage')}>{locales.map((item) => <Link onClick={() => setOpen(false)} className={item === locale ? 'active' : ''} href={switchHref(item)} key={item}>{item}</Link>)}</div>
          <div className="mobile-menu-contacts"><a href={brand.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={19}/></a><a href="tel:+3725032485">{brand.phone}</a></div>
        </div>
      </div>
    </header>
  );
}

function MegaMenu({locale, ids, parentId}: {locale: Locale; ids: readonly string[]; parentId: NavId}) {
  const t = useTranslations();
  const featured = navFeatured[parentId];
  return (
    <div className="mega-menu">
      <div className="mega-list">
        <div className="micro-label">{routeById[parentId].titles[locale]}</div>
        {ids.map((id, index) => <Link href={routeHref(locale, id)} key={id}><span>0{index + 1}</span>{routeById[id].titles[locale]}<ArrowUpRight size={17}/></Link>)}
      </div>
      <Link className="mega-feature" href={routeHref(locale, featured)}>
        <div className={`mega-thumb ${parentId}`} />
        <span>{parentId === 'bakery' || parentId === 'catering' ? t('navProduct') : t('navFeatured')}</span>
        <strong>{routeById[featured].titles[locale]}</strong>
      </Link>
    </div>
  );
}
