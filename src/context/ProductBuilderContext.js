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
  const [ currentStepNumber, setCurrentStepNumber ] = useState(1);
  const [ addToCartEnable, setAddToCartEnable ] = useState(false);

  const __getProduct_Fn = async () => {
    const shopifyProductData = await getShopifyProductJson(productUrl);
    setShopifyProductObject(shopifyProductData);

    const productBuilderData = await API.current.getProduct(productId);
    const productVariantsPrice = window[`__P_${ productId }`];
    if(productBuilderData && productBuilderData?.builder_design_data) {
      productBuilderData?.builder_design_data.map(__i => {
        __i.__price_symbol = productVariantsPrice[`${ __i.id }`]
        return __i;
      })
    }
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

  useEffect(() => {
    // console.log(optionsSelected)
    let btnAddToCart__Enable = true;
    optionsSelected
      .filter(({ type }) => {
        return type == 'options'
      })
      .forEach((__o) => {
        if(!__o.value || __o.value == '') {
          btnAddToCart__Enable = false;
          return false
        }
      })

    setAddToCartEnable(prevState => {
      return btnAddToCart__Enable;
    });
  }, [optionsSelected])

  const onUpdateOptions_Fn = (__key, value) => {
    let __optionsSelected = [...optionsSelected];
    let __foundIndex = __optionsSelected.findIndex(o => o.__key == __key);
    __optionsSelected[__foundIndex].value = value;
    setOptionsSelected(__optionsSelected);
  }

  const onUpadteVariantObjectCurrent_Fn = (vObj) => {
    setVariantObjectCurrent(vObj);
    setCurrentStepNumber(1)
  }

  const onAddToCart_Fn = () => {
    console.log(optionsSelected);
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
    currentStepNumber,
    setCurrentStepNumber, 
    addToCartEnable,
    onUpadteVariantObjectCurrent_Fn,
    onUpdateOptions_Fn,
    onAddToCart_Fn,
  }

  return <ProductBuilderContext.Provider value={ value } >
    { children } 
  </ProductBuilderContext.Provider>   
}

const useProductBuilderContext = () => {
  return useContext(ProductBuilderContext);
}

export { ProductBuilderProvider, useProductBuilderContext }