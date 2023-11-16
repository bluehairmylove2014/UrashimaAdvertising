import { searchProductsUrl } from "../../config/apis";
import { Services } from "../../service";
import { searchProductResponseSchema } from "./schema";
import { searchProductParams, searchProductResponse } from "./type";

export * from "./type";
export class SearchService extends Services {
  abortController?: AbortController;

  searchProduct = async (
    params: searchProductParams
  ): Promise<searchProductResponse> => {
    this.abortController = new AbortController();
    try {
      const response = await this.fetchApi<
        typeof searchProductResponseSchema,
        searchProductResponse
      >({
        method: "GET",
        url: searchProductsUrl,
        schema: searchProductResponseSchema,
        params,
        signal: this.abortController.signal,
        transformResponse: (res) => res,
      });
      return response;
    } catch (error) {
      throw this.handleError(error);
    }
  };
}
