// Import necessary modules and functions
import { AxiosError } from "../../../../../services";
import { useGetCurrencyRateMutation } from "../../fetching/mutation";
import { currencyFormatType } from "../context";
import { useCurrencyContext } from "../context/currencyContext";
import { setRateCookie } from "../helper/rateCookieHelper";

type UseChangeCurrencyFormatType = {
  onChangeCurrencyFormat: (format: currencyFormatType) => Promise<number>;
  isLoading: boolean;
};
export const useChangeCurrencyFormat = (): UseChangeCurrencyFormatType => {
  const { state, dispatch } = useCurrencyContext();
  const getCurrencyRateMutation = useGetCurrencyRateMutation();

  const onChangeCurrencyFormat = (
    format: currencyFormatType
  ): Promise<number> => {
    return new Promise(
      (resolve, reject: (error: Error | AxiosError) => void) => {
        dispatch({
          type: "SET_CURRENCY_FORMAT",
          payload: format,
        });
        if (format === "USD") {
          if (state.rate === -1) {
            getCurrencyRateMutation
              .mutateAsync({ format })
              .then((data) => {
                // If there is no error, clear the cart locally as well
                const vndToUsdRate = data.rates.USD / data.rates.VND;
                setRateCookie(vndToUsdRate);
                dispatch({
                  type: "SET_CURRENCY_RATE",
                  payload: vndToUsdRate,
                });
                resolve(vndToUsdRate);
              })
              .catch((error: AxiosError | Error) => {
                reject(error);
              });
          } else {
            dispatch({
              type: "SET_CURRENCY_RATE",
              payload: state.rate,
            });
            resolve(state.rate);
          }
        } else {
          resolve(1);
        }
      }
    );
  };

  return {
    onChangeCurrencyFormat,
    isLoading: getCurrencyRateMutation.isLoading,
  };
};
