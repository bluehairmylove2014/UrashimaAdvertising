// Import necessary modules and functions
import { useState } from "react";
import {
  AxiosError,
  DecreaseItemQuantityParams,
} from "../../../../../services";
import { debouncePromise } from "../../../../helper";
import {
  useDecreaseItemQuantityMutation,
  useDeleteFromCartMutation,
} from "../../fetching/mutation";
import { useCartContext } from "../context";
import { useGetCart } from "./useGetCart";
import { useLocalCartAction } from "./useLocalCartAction";

const debounceDelayTime = 500;
type UseDeleteFromType = {
  onDecreaseItem: (params: DecreaseItemQuantityParams) => Promise<string>;
  onDeleteItem: (productID: number) => Promise<string>;
  isLoading: boolean;
};
export const useDeleteFromCart = (): UseDeleteFromType => {
  const { state, dispatch } = useCartContext();
  const deleteFromCartMutation = useDeleteFromCartMutation();
  const decreaseItemQuantityMutation = useDecreaseItemQuantityMutation();
  const {
    deleteFromCartLocalStorage,
    setCart,
    decreaseItemQuantityLocalStorage,
  } = useLocalCartAction();
  const { onGetCart } = useGetCart();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onDecreaseItemQuantity = debouncePromise<
    string,
    DecreaseItemQuantityParams
  >((params: DecreaseItemQuantityParams): Promise<string> => {
    return new Promise(
      (resolve, reject: (error: Error | AxiosError) => void) => {
        const targetProduct = state.cart?.items?.find(
          (ci) => ci.item.productId === params.productId
        );
        if (targetProduct && targetProduct.quantity > params.quantity) {
          if (state.accessToken) {
            decreaseItemQuantityMutation
              .mutateAsync({
                accessToken: state.accessToken,
                productId: params.productId,
                quantity: params.quantity,
              })
              .then((data) => {
                decreaseItemQuantityLocalStorage(
                  params.productId,
                  params.quantity
                );
                resolve(data.message);
              })
              .catch((error: AxiosError | Error) => {
                // If error, update state according to local

                onGetCart()
                  .then((cartData) => {
                    // This hook automatically updates state and local storage
                  })
                  .catch((err) => {
                    console.error("Get refresh cart error: ", err);
                    // If error, clear the entire cart
                    setCart({
                      items: [],
                    });
                  });
                reject(error);
              })
              .finally(() => {
                setIsLoading(false);
              });
          } else {
            decreaseItemQuantityLocalStorage(params.productId, params.quantity);
            setIsLoading(false);
            resolve("Đã giảm số lượng thành công");
          }
        } else {
          onDeleteItem(params.productId)
            .then((data) => resolve(data))
            .catch((err) => reject(err))
            .finally(() => {
              setIsLoading(false);
            });
        }
      }
    );
  }, debounceDelayTime);
  const onDeleteItem = (productID: number): Promise<string> => {
    return new Promise(
      (resolve, reject: (error: Error | AxiosError) => void) => {
        setIsLoading(true);
        dispatch({
          type: "DELETE_ACTION",
          payload: {
            productId: productID,
          },
        });

        if (state.accessToken) {
          deleteFromCartMutation
            .mutateAsync({
              accessToken: state.accessToken,
              productId: productID,
            })
            .then((data) => {
              deleteFromCartLocalStorage(productID);
              resolve(data.message);
            })
            .catch((error: AxiosError | Error) => {
              // If error, update state according to local

              onGetCart()
                .then((cartData) => {
                  // This hook automatically updates state and localStorage
                })
                .catch((err) => {
                  console.error("Get refresh cart error: ", err);
                  // If error, clear the entire cart
                  setCart({
                    items: [],
                  });
                });
              reject(error);
            })
            .finally(() => {
              setIsLoading(false);
            });
        } else {
          deleteFromCartLocalStorage(productID);
          setIsLoading(false);
          resolve("Đã xoá sản phẩm khỏi giỏ hàng");
        }
      }
    );
  };

  return {
    onDecreaseItem: (params: DecreaseItemQuantityParams): Promise<string> => {
      setIsLoading(true);
      dispatch({
        type: "DELETE_ACTION",
        payload: {
          productId: params.productId,
          quantity: params.quantity,
        },
      });
      return onDecreaseItemQuantity(params);
    },
    onDeleteItem,
    isLoading,
  };
};
