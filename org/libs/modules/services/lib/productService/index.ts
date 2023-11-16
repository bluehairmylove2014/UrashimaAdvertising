import { getHotProductUrl, getProductUrl } from "../../config/apis";
import { Services } from "../../service";
import {
  getHotProductResponseSchema,
  getProductResponseSchema,
} from "./schema";
import {
  getHotProductResponse,
  getProductParams,
  getProductResponse,
} from "./type";

export * from "./type";
export class ProductService extends Services {
  abortController?: AbortController;

  getProduct = async ({
    productId,
  }: getProductParams): Promise<getProductResponse> => {
    this.abortController = new AbortController();
    try {
      if (typeof productId === "string" && productId.length > 0) {
        const response = await this.fetchApi<
          typeof getProductResponseSchema,
          getProductResponse
        >({
          method: "GET",
          url: getProductUrl,
          schema: getProductResponseSchema,
          params: {
            productId,
          },
          signal: this.abortController.signal,
          transformResponse: (res) => res,
        });
        return response;
      } else {
        throw new Error("Invalid product ID");
      }
    } catch (error) {
      throw this.handleError(error);
    }
  };
  getHotProduct = async (): Promise<getHotProductResponse> => {
    this.abortController = new AbortController();
    try {
      const response = await this.fetchApi<
        typeof getHotProductResponseSchema,
        getHotProductResponse
      >({
        method: "GET",
        url: getHotProductUrl,
        schema: getHotProductResponseSchema,
        signal: this.abortController.signal,
        transformResponse: (res) => res,
      });

      return response;
    } catch (error) {
      throw this.handleError(error);
    }
  };
}
