import { ICart, IProduct } from "../../entities";

export type MessageResponse = {
  message: string;
};
export type AddToCartParams = {
  accessToken?: string | null;
  item: IProduct;
  quantity: number;
};
export type AddToCartResponse = MessageResponse;

export type GetCartParams = string;
export type GetCartResponse = ICart;

export type UpdateCartParams = {
  accessToken?: string | null;
  cart: ICart;
};
export type UpdateCartResponse = MessageResponse;

export type DecreaseItemQuantityParams = {
  accessToken?: string | null;
  productId: number;
  quantity: number;
};
export type DeleteFromCartParams = {
  accessToken?: string | null;
  productId: number;
};
export type DeleteFromCartResponse = MessageResponse;

export type ClearCartParams = {
  accessToken: string | null;
};
export type ClearCartResponse = MessageResponse;
