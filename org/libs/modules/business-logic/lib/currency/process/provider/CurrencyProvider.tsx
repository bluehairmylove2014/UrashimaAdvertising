import React from "react";
import { ContextProvider } from "./ContextProvider";

export type CurrencyProviderType = {
  children: React.ReactNode;
};
export const CurrencyProvider: React.FC<CurrencyProviderType> = ({
  children,
}) => {
  return <ContextProvider>{children}</ContextProvider>;
};
