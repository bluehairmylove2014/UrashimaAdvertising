import { useViewLocationMapContext } from '../context';
import { useMemo } from 'react';

export const useGetIsSelecting = (): boolean => {
  const { state } = useViewLocationMapContext();
  return useMemo(() => state.isSelectingLocation, [state.isSelectingLocation]);
};
