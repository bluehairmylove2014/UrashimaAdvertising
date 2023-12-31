import { regionsType, useRegionManagementContext } from '../context';
import { setRegionsToCookie } from '../helpers/regionsCookie';

type useSetRegionsReturnType = {
  setRegions: (regions: regionsType) => void;
};
export const useSetRegions = (): useSetRegionsReturnType => {
  const { dispatch } = useRegionManagementContext();

  const setRegions = (regions: regionsType): void => {
    dispatch({
      type: 'SET_REGIONS',
      payload: regions,
    });
    setRegionsToCookie(regions);
  };

  return {
    setRegions,
  };
};
