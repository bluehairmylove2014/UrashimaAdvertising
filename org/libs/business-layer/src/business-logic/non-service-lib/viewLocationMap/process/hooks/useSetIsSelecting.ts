import { useViewLocationMapContext } from '../context';

type useSetIsSelectingReturnType = {
  setIsSelecting: (isSelecting: boolean) => void;
};
export const useSetIsSelecting = (): useSetIsSelectingReturnType => {
  const { dispatch } = useViewLocationMapContext();

  const setIsSelecting = (isSelecting: boolean): void => {
    dispatch({
      type: 'SET_IS_SELECTING',
      payload: isSelecting,
    });
  };

  return {
    setIsSelecting,
  };
};
