import { SearchService } from '@modules/services';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../constants';
import { searchProductParams } from '@modules/services/lib/searchService/type';

const searchService = new SearchService();
export const useSearchProductQuery = (params: searchProductParams) => {
  return useQuery([QUERY_KEYS.SEARCH_PRODUCT, params], () =>
    searchService.searchProduct(params)
  );
};
