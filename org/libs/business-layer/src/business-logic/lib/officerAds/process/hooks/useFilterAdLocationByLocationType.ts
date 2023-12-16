// Import necessary modules and functions
import { useOfficerAdContext } from '../context/context';

type useFilterAdLocationByLocationTypeReturnType = {
  onSetLocationType: (locationType: string | null) => void;
};
export const useFilterAdLocationByLocationType =
  (): useFilterAdLocationByLocationTypeReturnType => {
    const { dispatch } = useOfficerAdContext();

    const onSetLocationType = (locationType: string | null): void => {
      dispatch({
        type: 'SET_LOCATION_TYPE_FILTER_AD_LOCATION',
        payload: locationType,
      });
    };

    return {
      onSetLocationType,
    };
  };
