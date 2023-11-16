import { IProduct } from "../../entities";

export type searchProductParams = {
  name?: string;
  minBudget?: number;
  maxBudget?: number;
  category?: string;
  sortBy?: string;
  page?: number;
};
export type searchProductResponse = IProduct[];
