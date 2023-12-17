// Import necessary modules and functions
import { useOfficerAdContext } from '../context/context';

type useSearchAdLocationReturnType = {
  onSetSearchKey: (searchKey: string) => void;
};
export const useSearchAdLocation = (): useSearchAdLocationReturnType => {
  const { dispatch } = useOfficerAdContext();

  const onSetSearchKey = (searchKey: string): void => {
    dispatch({
      type: 'SET_SEARCH_KEY_FILTER_AD_LOCATION',
      payload: !searchKey || searchKey.length === 0 ? null : searchKey,
    });
  };

  return {
    onSetSearchKey,
  };
};
