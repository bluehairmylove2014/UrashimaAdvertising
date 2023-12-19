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
  const response = NextResponse;

  if (
    pathName === OFFICER_PAGES.AUTH ||
    pathName.startsWith(OFFICER_PAGES.SOCIAL_AUTH)
  ) {
    if (isTokenValid(token)) {
      return response.redirect(new URL(OFFICER_PAGES.DASHBOARD, request.url));
    }
    return response.next();
  } else if (pathName === OFFICER_PAGES.ME) {
    return response.redirect(
      new URL(OFFICER_PAGES.PERSONAL_INFORMATION, request.url)
    );
  } else if (
    pathName.startsWith(OFFICER_PAGES.DASHBOARD) ||
    // pathName.startsWith(OFFICER_PAGES.ADS_BOARD) ||
    // pathName.startsWith(OFFICER_PAGES.ADS_BOARD_EDIT) ||
    pathName.startsWith(OFFICER_PAGES.ADS_LOCATION) ||
    pathName.startsWith(OFFICER_PAGES.APPROVE) ||
    pathName.startsWith(OFFICER_PAGES.PERSONAL_INFORMATION) ||
    pathName.startsWith(OFFICER_PAGES.CHANGE_PASSWORD) ||
    pathName.startsWith(OFFICER_PAGES.REPORT)
  ) {
    if (isTokenValid(token)) {
      return response.next();
    }
    return response.redirect(new URL(OFFICER_PAGES.AUTH, request.url));
  }
  return response.next();
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
