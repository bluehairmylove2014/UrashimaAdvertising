// Import necessary modules and functions
import { IProduct } from '@modules/services/entities';
import { AxiosError } from '../../../../../services';
import { useGetProductQuery } from '../../fetching/query';
import { setRateCookie } from '../helper/rateCookieHelper';

type UseGetProductType = IProduct | undefined;
export const useGetProduct = ({
  productId,
}: {
  productId: string;
}): UseGetProductType => {
  const { data } = useGetProductQuery(productId);
  return data;
};
