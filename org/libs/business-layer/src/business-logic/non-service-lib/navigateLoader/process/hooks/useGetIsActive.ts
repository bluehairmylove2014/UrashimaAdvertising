import { useNavigateLoaderContext } from '../context';
import { useMemo } from 'react';

export const useGetIsActive = (): boolean => {
  const { state } = useNavigateLoaderContext();
  return useMemo(() => state.isActive, [state.isActive]);
};
