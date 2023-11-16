// Importing necessary modules and functions
import { ICartItem } from "../../../../../services/entities";
import { useCartContext } from "../context";
type useGetCartItemsType = ICartItem[] | null;
export const useGetCartItems = (): useGetCartItemsType => {
  const { state } = useCartContext();
  return state.cart ? state.cart.items : null;
};
