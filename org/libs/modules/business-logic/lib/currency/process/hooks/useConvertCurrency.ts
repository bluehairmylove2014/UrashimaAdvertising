// Import necessary modules and functions
import { useCurrencyContext } from "../context/currencyContext";

type UseConvertCurrencyType = {
  onConvertNumberToCurrency: (amount: number) => string;
  onConvertCurrencyToNumber: (value: string) => number;
};
export const useConvertCurrency = (): UseConvertCurrencyType => {
  const { state } = useCurrencyContext();
  const format = state.format;

  const onConvertNumberToCurrency = (amount: number): string => {
    const formatter = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: format,
    });

    return state.rate !== -1 || format === "VND"
      ? formatter.format(format === "USD" ? amount * state.rate : amount)
      : "...";
  };
  const onConvertCurrencyToNumber = (value: string): number => {
    const currencySymbol = format === "VND" ? "₫" : "$";
    const numberValue = value.replace(currencySymbol, "").replace(/,/g, "");

    return parseFloat(numberValue);
  };

  return {
    onConvertNumberToCurrency,
    onConvertCurrencyToNumber,
  };
};
