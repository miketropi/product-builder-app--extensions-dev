import { createRoot } from 'react-dom/client';
import { ProductBuilderProvider } from './context/ProductBuilderContext';
import ProductBuilderApp from './components/ProductBuilderApp';

const ENDPOINT = 'https://shopify-dev.beplusprojects.com/api/';
const API_KEY = 'API-7fe65d4d3bbf95285235f51e4183207387b5169f';

((w) => {
  'use strict';
  const ROOT_ELEM = document.querySelector('#__PRODUCT_BUILDER_APP__');
  if(!ROOT_ELEM) return;

  const ProductBuilderInit = () => {
    const { storeId, productId, productUrl } = ROOT_ELEM.dataset;
    const root = createRoot(ROOT_ELEM);
    root.render(<ProductBuilderProvider 
      API_ENDPOINT={ ENDPOINT } 
      API_KEY={ API_KEY } 
      QUERY={{ storeId, productId, productUrl }}>
      <ProductBuilderApp />
    </ProductBuilderProvider>);
  }

  document.addEventListener('DOMContentLoaded', e => {
    ProductBuilderInit();
  });

})(window)