import { useNavigateLoaderContext } from '../context';

type useSetIsActiveReturnType = {
  setIsActive: (isActive: boolean) => void;
};
export const useSetIsActive = (): useSetIsActiveReturnType => {
  const { dispatch } = useNavigateLoaderContext();

  const setIsActive = (isActive: boolean): void => {
    dispatch({
      type: 'SET_IS_ACTIVE',
      payload: isActive,
    });
  };

  return {
    setIsActive,
  };
};
