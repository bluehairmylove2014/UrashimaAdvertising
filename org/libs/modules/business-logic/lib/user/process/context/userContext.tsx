import React from "react";
import { useContext } from "react";
import { UserContextType } from "./type";

export const UserContext = React.createContext<UserContextType>({
  state: {
    userData: undefined,
    accessToken: null,
  },
  dispatch: () => undefined,
});

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useCartContext must be used within a UserProvider");
  }
  return context;
};
