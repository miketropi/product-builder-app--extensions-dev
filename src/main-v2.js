import { createRoot } from 'react-dom/client';
import { ProductBuilderProvider } from './context/ProductBuilderContext';
import ProductBuilderAppV2 from './components/v2/ProductBuilderAppV2';

const ENDPOINT = process.env.MIX_ENDPOINT;
const API_KEY = process.env.MIX_API_KEY;

((w) => {
  'use strict';

  const ProductBuilderV2Init = () => {
    const ROOT_ELEM = document.querySelector('#__PRODUCT_BUILDER_V2_APP__');
    if (!ROOT_ELEM) return;

    const { storeId, productId, productUrl } = ROOT_ELEM.dataset;
    const root = createRoot(ROOT_ELEM);
    root.render(
      <ProductBuilderProvider
        API_ENDPOINT={ENDPOINT}
        API_KEY={API_KEY}
        QUERY={{ storeId, productId, productUrl }}>
        <ProductBuilderAppV2 />
      </ProductBuilderProvider>
    );
  }

  document.addEventListener('DOMContentLoaded', e => {
    ProductBuilderV2Init();
  });

})(window);
