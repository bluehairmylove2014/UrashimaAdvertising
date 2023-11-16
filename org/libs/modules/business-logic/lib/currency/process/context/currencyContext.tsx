import React from "react";
import { useContext } from "react";
import { CurrencyContextType } from "./type";

export const CurrencyContext = React.createContext<CurrencyContextType>({
  state: {
    rate: 1,
    format: "VND",
  },
  dispatch: () => undefined,
});

export const useCurrencyContext = () => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error(
      "useCurrencyContext must be used within a CurrencyProvider"
    );
  }
  return context;
};
