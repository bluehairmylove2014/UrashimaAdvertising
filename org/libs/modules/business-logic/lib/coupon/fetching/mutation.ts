import { CouponService } from '@modules/services';
import { useMutation } from '@tanstack/react-query';
import { mutationConfig } from '@modules/business-logic/configs';

const couponService = new CouponService();

export const useGetCouponMutation = () => {
  return useMutation(couponService.getCoupon, {
    retry: mutationConfig.RETRY,
  });
};
