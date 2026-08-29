import createMiddleware from 'next-intl/middleware';
import {NextRequest, NextResponse} from 'next/server';
import {locales} from '@/config/routes';

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale: 'et',
  localePrefix: 'always',
  localeDetection: false
});

export default function middleware(request: NextRequest) {
  const response = intlMiddleware(request);
  const locale = request.nextUrl.pathname.split('/')[1] || 'et';
  response.headers.set('x-locale', locale);
  return response;
}

export const config = {
  matcher: ['/', '/(et|ru|en)/:path*']
};
