import { useProductBuilderContext } from '../context/ProductBuilderContext';
import ProductImages from './ProductImages';
import ProductOptions from './ProductOptions';
import ProductHeading from './ProductHeading';

export default function ProductBuilderApp() {
  const { 
    loadingInit, 
    shopifyProductObject,
    productBuilderObject, } = useProductBuilderContext();

  const loadingTemplate = (
    <div>Loading...</div>
  )

  const productBuilderTemplate = (
    <div className="product-builder-container">
      { console.log(productBuilderObject, shopifyProductObject) }
      <ProductImages images={ shopifyProductObject?.product?.images } />
      <div className="product-builder__product-meta">
        <ProductHeading />
        <ProductOptions options={ productBuilderObject?.builder_design_data } />
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