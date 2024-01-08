import { useViewLocationMapContext } from '../context';

type useSetCoordReturnType = {
  setCoord: (lat: number, long: number) => void;
};
export const useSetCoord = (): useSetCoordReturnType => {
  const { dispatch } = useViewLocationMapContext();

  const setCoord = (lat: number, long: number): void => {
    dispatch({
      type: 'SET_COORD',
      payload: [lat, long],
    });
  };

  return {
    setCoord,
  };
};
