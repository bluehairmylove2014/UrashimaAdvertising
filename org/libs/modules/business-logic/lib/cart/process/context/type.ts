import { ICart } from "../../../../../services/entities";

export interface CartState {
  cart: ICart | null;
  accessToken: string | null;
}

type DeleteItemPayload = { productId: number; quantity?: number };

export type CartAction =
  | {
      type: "SET_CART_ACTION";
      payload: CartState["cart"];
    }
  | {
      type: "SET_TOKEN_ACTION";
      payload: CartState["accessToken"];
    }
  | {
      type: "DELETE_ACTION";
      payload: DeleteItemPayload;
    };

export type CartContextType = {
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
};
