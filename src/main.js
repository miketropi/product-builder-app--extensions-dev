import { createRoot } from 'react-dom/client';
import { ProductBuilderProvider } from './context/ProductBuilderContext';
import ProductBuilderApp from './components/ProductBuilderApp';

import { MenuBuilderContext_Provider } from './context/MenuBuilderContext';
import MenuBuilderApp from './components/menu-builder/MenuBuilderApp';

const ENDPOINT = process.env.MIX_ENDPOINT;
const API_KEY = process.env.MIX_API_KEY;

((w) => {
  'use strict';
  
  const ProductBuilderInit = () => {
    const ROOT_ELEM = document.querySelector('#__PRODUCT_BUILDER_APP__');
    if(!ROOT_ELEM) return;

    const { storeId, productId, productUrl } = ROOT_ELEM.dataset;
    const root = createRoot(ROOT_ELEM);
    root.render(<ProductBuilderProvider 
      API_ENDPOINT={ ENDPOINT } 
      API_KEY={ API_KEY } 
      QUERY={{ storeId, productId, productUrl }}>
      <ProductBuilderApp />
    </ProductBuilderProvider>);
  }

  const MenuBuilderInit = () => {
    const ROOT_ELEM = document.querySelector('#__MENU_BUILDER_APP__');
    if(!ROOT_ELEM) return;

    const { storeId, menuId } = ROOT_ELEM.dataset;
    const root = createRoot(ROOT_ELEM);
    root.render(<MenuBuilderContext_Provider 
      API_ENDPOINT={ ENDPOINT } 
      API_KEY={ API_KEY } 
      menuId={ menuId }
      storeId={ storeId }>
      <MenuBuilderApp />
    </MenuBuilderContext_Provider>);
  }

  document.addEventListener('DOMContentLoaded', e => {
    ProductBuilderInit();
    MenuBuilderInit();
  });

})(window)