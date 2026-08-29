import {notFound} from 'next/navigation';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages, setRequestLocale} from 'next-intl/server';
import {Header} from '@/components/Header';
import {Footer} from '@/components/Footer';
import {MobileBar} from '@/components/MobileBar';
import {MotionProvider} from '@/components/Motion';
import {locales, type Locale} from '@/config/routes';

export function generateStaticParams() {return locales.map((locale) => ({locale}));}

export default async function LocaleLayout({children, params}: {children: React.ReactNode; params: {locale: string}}) {
  if (!locales.includes(params.locale as Locale)) notFound();
  const locale = params.locale as Locale;
  setRequestLocale(locale);
  const messages = await getMessages();
  return <NextIntlClientProvider messages={messages}><MotionProvider><a className="skip-link" href="#content">{messages.skip as string}</a><Header locale={locale}/><main id="content">{children}</main><Footer locale={locale}/><MobileBar locale={locale}/></MotionProvider></NextIntlClientProvider>;
}
