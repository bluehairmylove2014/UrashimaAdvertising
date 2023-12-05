import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { COOKIE_KEYS } from '@business-layer/business-logic/configs/constants';

export function middleware(request: NextRequest) {
  const cookie = request.cookies;
  const token = cookie.get(COOKIE_KEYS.ACCESS_TOKEN);

  if (!token || !token.value || !token.value.length) {
    return NextResponse.redirect(new URL('https://auth.urashima-ads.com'));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/'],
};
