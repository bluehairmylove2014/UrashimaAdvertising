// Import necessary modules and functions
import { IProduct } from '@modules/services/entities';
import { useGetHotProductQuery } from '../../fetching/query';

type useGetHotProductType = IProduct[] | undefined;
export const useGetHotProduct = (): useGetHotProductType => {
  const { data } = useGetHotProductQuery();
  return data;
};
