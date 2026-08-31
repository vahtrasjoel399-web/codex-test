import Link from 'next/link';
import {getTranslations} from 'next-intl/server';
import {ArrowUpRight, Instagram} from 'lucide-react';
import {brand, uiCopy} from '@/content/site-copy';
import {routeById, routeHref, type Locale} from '@/config/routes';

export async function Footer({locale}: {locale: Locale}) {
  const t = await getTranslations({locale});
  const columns = [
    {
      label: t('footerOrder'),
      links: ['catering', 'menus', 'pricing', 'how-to-order', 'contact']
    },
    {
      label: t('footerCatalog'),
      links: ['bakery', 'bread', 'pastry', 'cakes', 'gluten-free', 'custom-cakes']
    },
    {
      label: t('footerInfo'),
      links: ['references', 'gallery', 'faq', 'journal']
    }
  ];
  return (
    <footer className="site-footer" id="site-footer">
      <div className="footer-top">
        <p className="footer-statement">{t('footerNote')}</p>
        <a className="footer-arrow" href="tel:+3725032485" aria-label={t('navQuote')}><ArrowUpRight /></a>
      </div>
      <div className="footer-grid">
        {columns.map(({label, links}, index) => (
          <nav className="footer-column" aria-label={label} key={label}>
            <div className="footer-column-head"><span>0{index + 1}</span><strong>{label}</strong></div>
            <div className="footer-links">
              {links.map((id) => <Link href={routeHref(locale, id)} key={id}>{routeById[id].titles[locale]}</Link>)}
            </div>
          </nav>
        ))}
      </div>
      <div className="footer-meta">
        <div><strong>{t('footerVisit')}</strong><br/>{brand.address}<br/>{t('footerHours')}</div>
        <div><strong>{t('footerContact')}</strong><br/><a href={`tel:${brand.phone.replace(/\s/g, '')}`}>{brand.phone}</a><br/><a href={`mailto:${brand.email}`}>{brand.email}</a><br/><a className="instagram-link" href={brand.instagram} target="_blank" rel="noreferrer"><Instagram size={15}/>@juliaklein_ou</a></div>
        <div><strong>{uiCopy[locale].open}</strong><br/>{t('footerReg')}<br/>© {new Date().getFullYear()} Vara</div>
      </div>
      <p className="footer-photo-note">{t('photoDisclaimer')}</p>
      <div className="footer-legal"><Link href={routeHref(locale, 'privacy')}>{routeById.privacy.titles[locale]}</Link><Link href={routeHref(locale, 'terms')}>{routeById.terms.titles[locale]}</Link><Link href={routeHref(locale, 'cookies')}>{routeById.cookies.titles[locale]}</Link></div>
    </footer>
  );
}
