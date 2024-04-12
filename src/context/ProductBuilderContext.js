import { createContext, useContext, useState, useEffect } from "react";

const ProductBuilderContext = createContext(null);

const ProductBuilderProvider = ({ children, API_ENDPOINT, API_KEY }) => {

  const value = {
    version: '1.0.0'
  }

  return <ProductBuilderContext.Provider value={ value } >
    { children }
  </ProductBuilderContext.Provider>
}

const useProductBuilderContext = () => {
  return useContext(ProductBuilderContext);
}

export { ProductBuilderProvider, useProductBuilderContext }