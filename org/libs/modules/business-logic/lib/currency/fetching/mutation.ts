import { CurrencyService } from "../../../../services";
import { useMutation } from "@tanstack/react-query";
import { mutationConfig } from "../../../configs";

const currencyService = new CurrencyService();

export const useGetCurrencyRateMutation = () => {
  return useMutation(currencyService.getCurrencyRate, {
    retry: mutationConfig.RETRY,
  });
};
