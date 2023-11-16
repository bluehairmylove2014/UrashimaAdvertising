/* eslint-disable react-hooks/exhaustive-deps */
import React, { useReducer } from "react";
import { CurrencyContext } from "../context/currencyContext";
import { currencyReducer } from "../context/reducer";
import { getFormatCookie } from "../helper/formatCookieHelper";
import { getRateCookie } from "../helper/rateCookieHelper";
import { currencyFormatType } from "../context";

type ContextProviderType = {
  children: React.ReactNode;
};
export const ContextProvider: React.FC<ContextProviderType> = ({
  children,
}) => {
  const defaultCurrencyFormat = (getFormatCookie() ||
    "VND") as currencyFormatType;
  const defaultCurrencyRate = getRateCookie() || -1;
  const [state, dispatch] = useReducer(currencyReducer, {
    rate: defaultCurrencyRate,
    format: defaultCurrencyFormat,
  });

  return (
    <CurrencyContext.Provider value={{ state, dispatch }}>
      {children}
    </CurrencyContext.Provider>
  );
};
