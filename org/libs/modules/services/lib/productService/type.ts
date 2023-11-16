import { IProduct, IProductDetail } from "../../entities";

export type getProductParams = {
  productId: string;
};
export type getProductResponse = IProductDetail | null;
export type getHotProductResponse = IProduct[];
