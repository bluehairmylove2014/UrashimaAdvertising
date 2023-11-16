import { getCouponUrl } from "../../config/apis";
import { Services } from "../../service";
import { getCouponResponseSchema } from "./schema";
import { getCouponResponse } from "./type";

export * from "./type";
export class CouponService extends Services {
  abortController?: AbortController;

  getCoupon = async (couponCode: string): Promise<getCouponResponse> => {
    this.abortController = new AbortController();
    try {
      const response = await this.fetchApi<
        typeof getCouponResponseSchema,
        getCouponResponse
      >({
        method: "GET",
        url: getCouponUrl,
        schema: getCouponResponseSchema,
        params: {
          couponCode,
        },
        signal: this.abortController.signal,
        transformResponse: (res) => res,
      });
      return response;
    } catch (error) {
      throw this.handleError(error);
    }
  };
}
