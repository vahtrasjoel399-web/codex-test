import type {Metadata} from 'next';
import {headers} from 'next/headers';
import '@fontsource-variable/unbounded';
import '@fontsource/ibm-plex-sans/400.css';
import '@fontsource/ibm-plex-sans/600.css';
import {getSiteUrl} from '@/config/site';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: {default: 'Vara Pagarikoda', template: '%s · Vara'},
  description: 'Hommikul küpsetatud pagaritooted ja täpne toitlustus Tallinnas.',
  icons: {icon: '/icon.svg'}
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  const locale = headers().get('x-next-intl-locale') ?? 'et';
  return <html lang={locale}><body>{children}</body></html>;
}
