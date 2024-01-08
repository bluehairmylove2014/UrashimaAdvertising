import {
  COOKIE_KEYS,
  LOCAL_STORAGE_KEYS,
} from '@business-layer/business-logic/configs/constants';
import Cookies from 'js-cookie';
import { regionsType } from '../context';

export function setRegionsToCookie(regions: regionsType): void {
  if (!regions) deleteRegionsFromCookie();
  else {
    const regionsCookieFormat = regions.join('|');
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(
        LOCAL_STORAGE_KEYS.REGIONS,
        encodeURIComponent(regionsCookieFormat)
      );
    }
    // Cookies.set(COOKIE_KEYS.REGIONS, encodeURIComponent(regionsCookieFormat), {
    //   expires: undefined,
    // });
  }
}

export function getRegionsFromCookie(): string | null {
  // const regions = Cookies.get(COOKIE_KEYS.REGIONS);
  if (typeof window !== 'undefined') {
    const data = window.localStorage.getItem(LOCAL_STORAGE_KEYS.REGIONS);
    return data ? decodeURIComponent(data) : null;
  } else {
    return null;
  }
}

export function deleteRegionsFromCookie(): void {
  // Cookies.remove(COOKIE_KEYS.REGIONS);
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem(LOCAL_STORAGE_KEYS.REGIONS);
  }
}
