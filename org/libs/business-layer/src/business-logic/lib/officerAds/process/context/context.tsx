import React from 'react';
import { useContext } from 'react';
import { OfficerAdContextType } from './type';

export const OfficerAdContext = React.createContext<OfficerAdContextType>({
  state: {
    adLocations: null,
    adLocationsDetail: null,
  },
  dispatch: () => undefined,
});

export const useOfficerAdContext = () => {
  const context = useContext(OfficerAdContext);
  if (context === undefined) {
    throw new Error(
      'useOfficerAdContext must be used within a OfficerAdProvider'
    );
  }
  return context;
};
