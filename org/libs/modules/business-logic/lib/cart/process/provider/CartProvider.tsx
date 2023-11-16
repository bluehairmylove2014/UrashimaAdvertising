import React from "react";
import { withTokenFromContext } from "../../../../configs/withContext";
import { ContextProvider } from "./ContextProvider";

export type CartProviderType = {
  children: React.ReactNode;
};
const EnhancedProvider = withTokenFromContext(ContextProvider);
export const CartProvider: React.FC<CartProviderType> = ({ children }) => {
  return <EnhancedProvider>{children}</EnhancedProvider>;
};
