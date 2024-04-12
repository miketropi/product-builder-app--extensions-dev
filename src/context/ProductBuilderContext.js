import { createContext, useContext, useState, useEffect, useRef } from "react";
import ProductBuilderApi from '../libs/api';
import { getShopifyProductJson } from '../libs/helpers';

const ProductBuilderContext = createContext(null);

const ProductBuilderProvider = ({ children, API_ENDPOINT, API_KEY, QUERY }) => {
  const { storeId, productId, productUrl } = QUERY;
  const API = useRef(null);
  const [ loadingInit, setLoadingInit ] = useState(true);
  const [ shopifyProductObject, setShopifyProductObject ] = useState(null);
  const [ productBuilderObject, setProductBuilderObject ] = useState(null);

  const __getProduct_Fn = async () => {
    const shopifyProductData = await getShopifyProductJson(productUrl);
    setShopifyProductObject(shopifyProductData);

    const productBuilderData = await API.current.getProduct(productId);
    setProductBuilderObject(productBuilderData);

    setLoadingInit(false);
  }

  useEffect(() => {
    API.current = new ProductBuilderApi(API_ENDPOINT, API_KEY, storeId);
    __getProduct_Fn();
  }, [])

  const value = {
    version: '1.0.0',
    API,
    loadingInit,
    shopifyProductObject,
    productBuilderObject,
  }

  return <ProductBuilderContext.Provider value={ value } >
    { children }
  </ProductBuilderContext.Provider>
}

const useProductBuilderContext = () => {
  return useContext(ProductBuilderContext);
}

export { ProductBuilderProvider, useProductBuilderContext }