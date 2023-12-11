import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { COOKIE_KEYS } from '@business-layer/business-logic/configs/constants';
import { OFFICER_PAGES } from '@constants/officerPages';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';

const isTokenValid = (token: RequestCookie | undefined) =>
  token && typeof token.value === 'string' && token.value.length > 0;

export function middleware(request: NextRequest) {
  const cookie = request.cookies;
  const token = cookie.get(COOKIE_KEYS.ACCESS_TOKEN);
  const pathName = request.nextUrl.clone().pathname;

  console.log(pathName === OFFICER_PAGES.AUTH);
  console.log(pathName);

  if (
    pathName === OFFICER_PAGES.AUTH ||
    pathName.startsWith(OFFICER_PAGES.SOCIAL_AUTH)
  ) {
    if (isTokenValid(token)) {
      console.log('VALID TOKEN HERE: ');
      return NextResponse.redirect(
        new URL(OFFICER_PAGES.DASHBOARD, request.url)
      );
    }
    console.log('INVALID TOKEN HERE: ');
    return NextResponse.next();
  } else if (pathName.startsWith(OFFICER_PAGES.DASHBOARD)) {
    if (isTokenValid(token)) {
      console.log('VALID TOKEN: ');
      return NextResponse.next();
    }
    console.log('INVALID TOKEN: ');
    return NextResponse.redirect(new URL(OFFICER_PAGES.AUTH, request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
