import { useViewLocationMapContext } from '../context';
import { useMemo } from 'react';

export const useGetCoord = (): number[] => {
  const { state } = useViewLocationMapContext();
  return useMemo(() => state.coord, [state.coord]);
};
