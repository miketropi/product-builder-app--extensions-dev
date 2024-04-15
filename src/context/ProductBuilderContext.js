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
  const [ optionsAvailable, setOptionsAvailable ] = useState(null);
  const [ variantObjectCurrent, setVariantObjectCurrent ] = useState(null);
  const [ optionsSelected, setOptionsSelected ] = useState([]);

  const __getProduct_Fn = async () => {
    const shopifyProductData = await getShopifyProductJson(productUrl);
    setShopifyProductObject(shopifyProductData);

    const productBuilderData = await API.current.getProduct(productId);
    setProductBuilderObject(productBuilderData);
    
    if(productBuilderData?.builder_design_data) {
      let productBuilderData__FilterAvailable = productBuilderData.builder_design_data.reduce((accumulator, currentValue) => {
        if(currentValue.builderData.__options.length > 0) {
          accumulator.push(currentValue)
        }
        return accumulator;
      }, []); 
      
      setOptionsAvailable(productBuilderData__FilterAvailable);
      if(productBuilderData__FilterAvailable.length > 0) {
        setVariantObjectCurrent(productBuilderData__FilterAvailable[0]);
      }
    }

    setLoadingInit(false);
  }

  useEffect(() => {
    API.current = new ProductBuilderApi(API_ENDPOINT, API_KEY, storeId);
    __getProduct_Fn();
  }, [])

  useEffect(() => {
    if(!variantObjectCurrent) return;
    const optionsTemp = [...variantObjectCurrent.builderData.__options].map((_o) => {
      const { __key, name, type } = _o;
      return {
        __key: __key, 
        name: name,
        type: type,
        value: ''
      }
    })
    setOptionsSelected(optionsTemp);
  }, [variantObjectCurrent])

  const onUpdateOptions_Fn = (__key, value) => {
    let __optionsSelected = [...optionsSelected];
    let __foundIndex = __optionsSelected.findIndex(o => o.__key == __key);
    __optionsSelected[__foundIndex].value = value;
    setOptionsSelected(__optionsSelected);
  }

  const onUpadteVariantObjectCurrent_Fn = (vObj) => {
    setVariantObjectCurrent(vObj)
  }
    
  const value = {
    version: '1.0.0',
    API,
    loadingInit,
    shopifyProductObject,
    productBuilderObject,
    variantObjectCurrent,
    optionsAvailable,
    optionsSelected,
    onUpadteVariantObjectCurrent_Fn,
    onUpdateOptions_Fn,
  }

  return <ProductBuilderContext.Provider value={ value } >
    { JSON.stringify(optionsSelected) }
    { children } 
  </ProductBuilderContext.Provider>   
}

const useProductBuilderContext = () => {
  return useContext(ProductBuilderContext);
}

export { ProductBuilderProvider, useProductBuilderContext }