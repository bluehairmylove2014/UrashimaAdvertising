import React from 'react';
import { useContext } from 'react';
import { AdsContextType } from './type';

export const AdsContext = React.createContext<AdsContextType>({
  state: {
    adsData: undefined,
  },
  dispatch: () => undefined,
});

export const useAdsContext = () => {
  const context = useContext(AdsContext);
  if (context === undefined) {
    throw new Error('useAdsContext must be used within a AdsProvider');
  }
  return context;
};
