import React from "react";
import { withTokenFromContext } from "../../../../configs/withContext";
import { ContextProvider } from "./ContextProvider";

export type UserProviderType = {
  children: React.ReactNode;
};
const EnhancedProvider = withTokenFromContext(ContextProvider);
export const UserProvider: React.FC<UserProviderType> = ({ children }) => {
  return <EnhancedProvider>{children}</EnhancedProvider>;
};
