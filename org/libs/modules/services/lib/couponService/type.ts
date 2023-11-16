import { ICoupon } from "../../entities/coupon";

export type getCouponResponse = {
  message: string;
} & Pick<ICoupon, "couponDiscount">;
