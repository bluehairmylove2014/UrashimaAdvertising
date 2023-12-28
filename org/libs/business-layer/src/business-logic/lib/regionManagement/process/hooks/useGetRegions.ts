import { regionsType, useRegionManagementContext } from '../context';

export const useGetRegions = (): regionsType => {
  const { state } = useRegionManagementContext();
  return state.regions;
};
