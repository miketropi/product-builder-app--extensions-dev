import { createContext, useContext, useEffect, useState, useCallback } from "react";

const FunnelBuilderContext = createContext(null);

const FunnelBuilderContextProvider = ({ children }) => {
  const value = {}

  return <FunnelBuilderContext.Provider value={ value } >
    { children }
  </FunnelBuilderContext.Provider>
}

const useFunnelBuilderContext = () => {
  return useContext(FunnelBuilderContext);
}

export { FunnelBuilderContextProvider, useFunnelBuilderContext }