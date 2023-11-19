"use client";
import React from "react";
import { providerConfig } from "../configs";
import QueryProvider from "./ReactQueryProvider";

type BusinessLogicProviderType = {
  children: React.ReactNode;
};
export const BusinessLogicProvider: React.FC<BusinessLogicProviderType> = ({
  children,
}) => {
  // Create an array includes active providers
  const activeProviders = providerConfig.filter((config) => config.isActive);
  // Wrap children inside active provider
  const renderProviders = (children: React.ReactNode) => {
    return activeProviders.reduce((prevChildren, config) => {
      const Provider = config.provider;
      return <Provider>{prevChildren}</Provider>;
    }, children);
  };

  return <QueryProvider>{renderProviders(children)}</QueryProvider>;
};
