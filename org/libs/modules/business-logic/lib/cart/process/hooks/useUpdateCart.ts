// Importing necessary modules and functions
import { useUpdateCartMutation } from "../../fetching/mutation";
import { useCartContext } from "../context";
import { AxiosError, UpdateCartParams } from "../../../../../services";
import { useLocalCartAction } from "./useLocalCartAction";
import { setCartLocalStorage } from "../helper/localStorageHelper";
import { useGetCart } from "./useGetCart";

type UseGetCartType = {
  onUpdateCart: (cartData: UpdateCartParams) => Promise<string>;
  isLoading: boolean;
};
export const useUpdateCart = (): UseGetCartType => {
  const { state, dispatch } = useCartContext();
  const updateCartMutation = useUpdateCartMutation();
  const { setCart } = useLocalCartAction();
  const { onGetCart } = useGetCart();

  const onUpdateCart = (cartData: UpdateCartParams): Promise<string> => {
    return new Promise(
      (resolve, reject: (error: Error | AxiosError) => void) => {
        dispatch({
          type: "SET_CART_ACTION",
          payload: cartData.cart,
        });

        if (state.accessToken) {
          updateCartMutation
            .mutateAsync(cartData)
            .then((data) => {
              setCartLocalStorage(cartData.cart);
              resolve(data.message);
            })
            .catch((error: AxiosError | Error) => {
              // If an error occurs, call the api to get the cart to update the cart
              onGetCart()
                .then((cartData) => {
                  // This hook automatically updates the state and LocalStorage
                })
                .catch((err) => {
                  console.error("Get refresh cart error: ", err);
                  // If there is an error, clear the entire cart
                  setCart({
                    items: [],
                  });
                });
              reject(error);
            });
        } else {
          setCartLocalStorage(cartData.cart);
          resolve("Update cart success");
        }
      }
    );
  };

  return {
    onUpdateCart,
    isLoading: updateCartMutation.isLoading,
  };
};
