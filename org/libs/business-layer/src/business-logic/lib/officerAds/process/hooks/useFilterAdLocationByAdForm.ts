// Import necessary modules and functions
import { useOfficerAdContext } from '../context/context';

type useFilterAdLocationByAdFormReturnType = {
  onSetAdForm: (adForm: string | null) => void;
};
export const useFilterAdLocationByAdForm =
  (): useFilterAdLocationByAdFormReturnType => {
    const { dispatch } = useOfficerAdContext();

    const onSetAdForm = (adForm: string | null): void => {
      dispatch({
        type: 'SET_ADS_FORM_FILTER_AD_LOCATION',
        payload: adForm,
      });
    };

    return {
      onSetAdForm,
    };
  };
