import { COOKIE_KEY } from '@modules/business-logic/configs/constants';

const expireTime = 12; //Hour

export function setRateCookie(value: number, hours?: number): void {
  if (typeof document !== 'undefined') {
    const mainExpireTime = hours ? hours : expireTime;
    let expires = '';
    const date = new Date();

    // hours * 60 * 60 * 1000: convert to milisecond
    date.setTime(date.getTime() + mainExpireTime * 60 * 60 * 1000);
    expires = '; expires=' + date.toUTCString();
    document.cookie = COOKIE_KEY.CURRENCY_RATE + '=' + (value || '') + expires;
  }
}

export function getRateCookie(): number | null {
  if (typeof document !== 'undefined') {
    const nameEQ = COOKIE_KEY.CURRENCY_RATE + '=';
    const cookieArr = document.cookie.split(';');
    let result = null;
    cookieArr.forEach((cookie) => {
      const c = cookie.trim();
      if (c.indexOf(nameEQ) === 0) {
        result = c.substring(nameEQ.length, c.length);
      }
    });

    return result;
  }
  return null;
}

export function deleteRateCookie(): void {
  setRateCookie(-1, -1);
}
