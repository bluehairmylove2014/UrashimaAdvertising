// Import necessary modules and functions
import { AxiosError, getCouponResponse } from "../../../../../services";
import { useGetCouponMutation } from "../../fetching/mutation";

type useGetCouponType = {
  onGetCoupon: ({ coupon }: { coupon: string }) => Promise<getCouponResponse>;
  isLoading: boolean;
};
export const useGetCoupon = (): useGetCouponType => {
  const getCouponMutation = useGetCouponMutation();

  const onGetCoupon = ({
    coupon,
  }: {
    coupon: string;
  }): Promise<getCouponResponse> => {
    return new Promise(
      (resolve, reject: (error: Error | AxiosError) => void) => {
        getCouponMutation
          .mutateAsync(coupon)
          .then((data) => {
            resolve(data);
          })
          .catch((err: AxiosError | Error) => {
            reject(err);
          });
      }
    );
  };

  return {
    onGetCoupon,
    isLoading: getCouponMutation.isLoading,
  };
};
