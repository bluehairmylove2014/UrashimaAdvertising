// Import necessary modules and functions
import { AxiosError } from "../../../../../services";
import { ICart } from "../../../../../services/entities";
import { useGetCartMutation } from "../../fetching/mutation";
import { useCartContext } from "../context";
import { getCartLocalStorage } from "../helper/localStorageHelper";
import { useLocalCartAction } from "./useLocalCartAction";

type UseGetCartType = {
  onGetCart: (token?: string | null) => Promise<ICart | null>;
  isLoading: boolean;
};
export const useGetCart = (): UseGetCartType => {
  const { state, dispatch } = useCartContext();
  const getCartMutation = useGetCartMutation();
  const { setCart } = useLocalCartAction();

  const onGetCart = (token?: string | null): Promise<ICart | null> => {
    return new Promise(
      (resolve, reject: (error: Error | AxiosError) => void) => {
        const accessToken = token ? token : state.accessToken;
        if (accessToken) {
          // If token exists, call server to get cart
          getCartMutation
            .mutateAsync(accessToken)
            .then((data) => {
              data && setCart(data);
              resolve(data);
            })
            .catch((err: AxiosError | Error) => {
              reject(err);
            });
        } else {
          // If not, get cart from localStorage
          const cart = getCartLocalStorage();
          // Update cart in context
          dispatch({
            type: "SET_CART_ACTION",
            payload: cart,
          });

          resolve(cart);
        }
      }
    );
  };

  return {
    onGetCart,
    isLoading: getCartMutation.isLoading,
  };
};
