import { createContext, useContext, useState, useEffect, useRef, useCallback } from "react";
import ProductBuilderApi from '../libs/api';
import { getShopifyProductJson, addToCart, renderContents } from '../libs/helpers';

const ProductBuilderContext = createContext(null);
const __ADDON_MULTIPLE_SUPPORT = false;

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
  const [ addOnCaching, setAddOncaching ] = useState([]);
  const [ addToCartLoading, setAddToCartLoading ] = useState(false);
  const [ addonSelected, setAddonSelected ] = useState([]);
  const [ addonWithPrice, setAddonWithPrice ] = useState([]);
  const [ userAddonSelected, setUserAddonSelected ] = useState([]);

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

  const onAddToCart_Fn = async () => {
    const { id } = variantObjectCurrent;
    // 'cart-notification-product,cart-notification-button,cart-icon-bubble'
    setAddToCartLoading(true);
    let mainProduc = {
      id: id.replace('gid://shopify/ProductVariant/', ''),
      quantity: 1,
      properties: (() => {
        let obj = {}
        optionsSelected.forEach(o => { 
          obj[o.name] = o.value
        })
        return obj;
      })()
    };
    
    let cartDataSend = {
      items: [
        // main product
        mainProduc,

        // push addons
        ...userAddonSelected.map(a => { 
          return {
            id: a.id,
            quantity: 1,
          }
        })
      ],
      sections: (() => {
        // return 'cart-notification-product,cart-notification-button,cart-icon-bubble';
        return window.__PBA_ADD_TO_CART_SECTIONS ?? ''
      })()
    } 

    const res = await addToCart(cartDataSend); 
    setAddToCartLoading(false);
    if(res?.sections) {
      renderContents(res.sections);
      // document.querySelector('#cart-notification').classList.add('active');
    }

    // Create the event
    let event = new CustomEvent("PBA::AFTER_AJAX_ADD_TO_CART", { detail: res });
    document.dispatchEvent(event);
  }

  const onPushAddonToCache_Fn = useCallback((item) => {
    // addOnCaching.push(item);
    setAddOncaching(prevState => [...prevState, item])
  }, [addOnCaching]);


  const onAddonSelected_Fn = (id, price, optkey) => { 
    // userAddonSelected, setUserAddonSelected
    let __userAddonSelected = [...userAddonSelected];
    let __foundIndex = __userAddonSelected.findIndex(a => (a.id == id && a.optkey == optkey));

    if(__foundIndex == -1) {
      // add if not found
      if(__ADDON_MULTIPLE_SUPPORT) {
        __userAddonSelected.push({ id, price, optkey });
      } else {
        let __foundOptkeyItemIndex = __userAddonSelected.findIndex(a => (a.optkey == optkey));
        if(__foundOptkeyItemIndex == -1) {
          __userAddonSelected.push({ id, price, optkey });
        } else {
          __userAddonSelected[__foundOptkeyItemIndex].id = id;
          __userAddonSelected[__foundOptkeyItemIndex].price = price;
        }
      }
      
    } else {
      // remove if exists
      __userAddonSelected.splice(__foundIndex, 1); 
    }
    setUserAddonSelected(__userAddonSelected);
    return;
  }

  const clearAddon_Fn = (optkey) => {
    let __userAddonSelected = [...userAddonSelected];
    let addonByOptkey = __userAddonSelected.filter(a => (a.optkey == optkey));

    if(addonByOptkey.length > 0) {
      addonByOptkey.forEach(item => {
        let __fIndex = __userAddonSelected.findIndex(a => (a.id == item.id && a.optkey == item.optkey));
        __userAddonSelected.splice(__fIndex, 1);
      })
    }

    setUserAddonSelected(__userAddonSelected);
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
    addOnCaching,
    addToCartLoading,
    addonSelected,
    addonWithPrice,
    userAddonSelected, setUserAddonSelected,
    onUpadteVariantObjectCurrent_Fn,
    onUpdateOptions_Fn,
    onAddToCart_Fn,
    onPushAddonToCache_Fn,
    onAddonSelected_Fn,
    clearAddon_Fn,
  }

  return <ProductBuilderContext.Provider value={ value } >
    {/* { JSON.stringify(addOnCaching) } */}
    { children } 
  </ProductBuilderContext.Provider>   
}

const useProductBuilderContext = () => {
  return useContext(ProductBuilderContext);
}

export { ProductBuilderProvider, useProductBuilderContext }