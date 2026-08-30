import {Phone} from 'lucide-react';
import {getTranslations} from 'next-intl/server';
import {type Locale} from '@/config/routes';

export async function MobileBar({locale}: {locale: Locale}) {
  const t = await getTranslations({locale});
  return <div className="mobile-bar"><a href="tel:+3725032485"><Phone size={17}/>{t('mobileCall')}</a><a href="tel:+3725032485">{t('navQuote')}</a></div>;
}
