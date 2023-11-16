import { ICart } from "../../../../../services/entities";
import { LOCAL_STORAGE_KEYS } from "../../../../configs/constants";

// This function will get the cart from localStorage
export const getCartLocalStorage = (): ICart | null => {
  if (typeof window !== "undefined") {
    const storedValue = localStorage.getItem(LOCAL_STORAGE_KEYS.CART_ADDRESS);
    return storedValue ? JSON.parse(storedValue) : null;
  }
  return null;
};

// This function will save the cart to localStorage
export const setCartLocalStorage = (cart: ICart | null): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(LOCAL_STORAGE_KEYS.CART_ADDRESS, JSON.stringify(cart));
  }
};

// This function will delete the cart from localStorage
export const deleteCartLocalStorage = (): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.CART_ADDRESS);
  }
};
