// Import necessary modules and functions
import { IProduct } from '@modules/services/entities';
import { useSearchProductQuery } from '../../fetching/query';
import { searchProductParams } from '@modules/services/lib/searchService/type';

type useSearchProductReturnType = IProduct[] | undefined;
export const useSearchProduct = (
  params: searchProductParams
): useSearchProductReturnType => {
  const { data } = useSearchProductQuery(params);
  return data;
};
