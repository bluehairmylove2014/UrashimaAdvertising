// Importing necessary modules and functions
import { useState } from "react";
import { AddToCartParams, AxiosError } from "../../../../../services";
import { debouncePromise } from "../../../../helper";
import { useUpdateCartMutation } from "../../fetching/mutation";
import { useCartContext } from "../context";
import { getCartLocalStorage } from "../helper/localStorageHelper";
import { useGetCart } from "./useGetCart";
import { useLocalCartAction } from "./useLocalCartAction";

const debounceDelayTime = 500;

const successMsg = "Đã thêm sản phẩm vào giỏ hàng";
const errorMsg = "Thất bại! Vui lòng thử lại sau...";

type UseAddToCartType = {
  onAddToCart: (params: AddToCartParams, debounce?: boolean) => Promise<string>;
  isLoading: boolean;
};
export const useAddToCart = (): UseAddToCartType => {
  const { state } = useCartContext();
  // const addToCartMutation = useAddToCartMutation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setCart, addToCart } = useLocalCartAction();
  const { onGetCart } = useGetCart();
  const updateCartMutation = useUpdateCartMutation();

  const addToCartProcess = (params: AddToCartParams): Promise<string> => {
    return new Promise(
      (resolve, reject: (error: Error | AxiosError) => void) => {
        if (!state.accessToken) {
          // NOT LOGGED IN
          // Add to cart under LocalStorage & context
          setIsLoading(false);
          resolve(successMsg);
        } else {
          // LOGGED IN
          // Add to cart on server
          // Update cart first to change the interface first
          const localCart = getCartLocalStorage();
          if (localCart?.items?.length) {
            // Check if there is a cart in LocalStorage yet
            // If there is and the cart currently has products then
            // update the cart in the database with this cart
            // Get the new cart with the added product from LocalStorage
            updateCartMutation
              .mutateAsync({
                accessToken: state.accessToken,
                cart: localCart,
              })
              .then((data) => {
                resolve(successMsg);
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
                reject(new Error(errorMsg));
              })
              .finally(() => {
                setIsLoading(false);
              });
          } else {
            setIsLoading(false);
            console.error("Error add item to cart in local");
            reject(new Error(errorMsg));
          }
        }
      }
    );
  };

  const addToCartWithDebounce = debouncePromise<string, AddToCartParams>(
    (params: AddToCartParams): Promise<string> => {
      return addToCartProcess(params);
    },
    debounceDelayTime
  );
  const onAddToCart = (
    params: AddToCartParams,
    debounce?: boolean
  ): Promise<string> => {
    setIsLoading(true);
    addToCart(params.item, params.quantity); // UPDATE UI + CART LOCAL STORAGE
    return debounce ? addToCartWithDebounce(params) : addToCartProcess(params);
  };

  return {
    onAddToCart,
    isLoading,
  };
};
