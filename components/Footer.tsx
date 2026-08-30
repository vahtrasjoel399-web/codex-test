import Link from 'next/link';
import {getTranslations} from 'next-intl/server';
import {ArrowUpRight} from 'lucide-react';
import {brand, uiCopy} from '@/content/site-copy';
import {routeHref, type Locale} from '@/config/routes';

export async function Footer({locale}: {locale: Locale}) {
  const t = await getTranslations({locale});
  const columns = [
    ['catering', 'menus', 'references', 'how-to-order', 'contact'],
    ['bakery', 'bread', 'pastry', 'cakes', 'custom-cakes'],
    ['references', 'pricing', 'delivery', 'how-to-order', 'faq', 'contact']
  ];
  const labels = (await import('@/config/routes')).routeById;
  return (
    <footer className="site-footer" id="site-footer">
      <div className="footer-top">
        <p className="footer-statement">{t('footerNote')}</p>
        <a className="footer-arrow" href="tel:+37255510414" aria-label={t('navQuote')}><ArrowUpRight /></a>
      </div>
      <div className="footer-grid">
        {columns.map((column, index) => (
          <div className="footer-column" key={column[0]}>
            <span>0{index + 1}</span>
            {column.map((id) => <Link href={routeHref(locale, id)} key={id}>{labels[id].titles[locale]}</Link>)}
          </div>
        ))}
      </div>
      <div className="footer-meta">
        <div><strong>{t('footerVisit')}</strong><br/>{brand.address}<br/>{t('footerHours')}</div>
        <div><strong>{t('footerContact')}</strong><br/><a href={`tel:${brand.phone.replace(/\s/g, '')}`}>{brand.phone}</a><br/><a href={`mailto:${brand.email}`}>{brand.email}</a></div>
        <div><strong>{uiCopy[locale].open}</strong><br/>{t('footerReg')}<br/>© {new Date().getFullYear()} Vara</div>
      </div>
      <p className="footer-photo-note">{t('photoDisclaimer')}</p>
      <div className="footer-legal"><Link href={routeHref(locale, 'privacy')}>{labels.privacy.titles[locale]}</Link><Link href={routeHref(locale, 'terms')}>{labels.terms.titles[locale]}</Link><Link href={routeHref(locale, 'cookies')}>{labels.cookies.titles[locale]}</Link></div>
    </footer>
  );
}
