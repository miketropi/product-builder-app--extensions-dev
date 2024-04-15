import { Fragment } from 'react'; 
import { useProductBuilderContext } from '../context/ProductBuilderContext';
import ProductImages from './ProductImages';
import ProductOptionMeta from './ProductOptionMeta';
import ProductHeading from './ProductHeading';
import ProductVariantOptions from './ProductVariantOptions';

export default function ProductBuilderApp() {
  const { 
    loadingInit, 
    shopifyProductObject,
    productBuilderObject, 
    optionsAvailable } = useProductBuilderContext();

  const loadingTemplate = (
    <div>Loading...</div>
  )

  const productBuilderTemplate = (
    <div className="product-builder-container">
      { console.log(productBuilderObject, shopifyProductObject) }
      <ProductImages images={ shopifyProductObject?.product?.images } />
      <div className="product-builder__product-meta">
        <ProductHeading />
        {
          optionsAvailable && 
          <>
            <ProductVariantOptions options={ optionsAvailable } />
            <ProductOptionMeta />
          </>
        }
      </div>
    </div>
  )

  return <div id="PRODUCT_BUILDER_APP" className="product-builder-app">
    {
      ((__loading) => {
        return (__loading == true ? loadingTemplate : productBuilderTemplate);
      })(loadingInit)
    }
  </div>
}