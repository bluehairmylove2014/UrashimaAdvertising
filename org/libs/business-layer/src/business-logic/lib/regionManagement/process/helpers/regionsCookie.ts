import { COOKIE_KEYS } from '@business-layer/business-logic/configs/constants';
import Cookies from 'js-cookie';
import { regionsType } from '../context';

export function setRegionsToCookie(regions: regionsType): void {
  if (!regions) deleteRegionsFromCookie();
  else {
    const regionsCookieFormat = regions.join('|');
    Cookies.set(COOKIE_KEYS.REGIONS, encodeURIComponent(regionsCookieFormat), {
      expires: undefined,
    });
  }
}

export function getRegionsFromCookie(): string | null {
  const regions = Cookies.get(COOKIE_KEYS.REGIONS);
  return regions ? decodeURIComponent(regions) : null;
}

export function deleteRegionsFromCookie(): void {
  Cookies.remove(COOKIE_KEYS.REGIONS);
}
