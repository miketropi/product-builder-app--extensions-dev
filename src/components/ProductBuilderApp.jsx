import { Fragment } from 'react'; 
import { useProductBuilderContext } from '../context/ProductBuilderContext';
import ProductImages from './ProductImages';
import ProductOptionMeta from './ProductOptionMeta';
import ProductHeading from './ProductHeading';
import ProductVariantOptions from './ProductVariantOptions';
import ProductFooter from './ProductFooter';

export default function ProductBuilderApp() {
  const { 
    loadingInit, 
    shopifyProductObject,
    productBuilderObject, 
    optionsAvailable } = useProductBuilderContext();

  const loadingTemplate = (
    <div className="product-builder-container __skeleton-container">
      <div className="product-builder__product-image">
        <img style={{ maxWidth: '100%' }} src={ window.__P_fimage } />
      </div>
      <div className="product-builder__product-meta">
        <div className="product-builder__product-heading">
          <h2>{ window.__P_title }</h2>
          <p dangerouslySetInnerHTML={{__html: window.__P_content}} ></p>
        </div>

        <div className="__variant-options __box-option">
          <div className="__box-option__heading">
            <span className="__box-number">1</span><h4><div className="__skeleton-line skeleton-box" style={{ width: '20%' }}></div></h4>
          </div>
        </div>

        <div className="__variant-options __box-option">
          <div className="__box-option__heading">
            <span className="__box-number">2</span><h4><div className="__skeleton-line skeleton-box" style={{ width: '30%' }}></div></h4>
          </div>
        </div>

        <div className="__variant-options __box-option">
          <div className="__box-option__heading">
            <span className="__box-number">3</span><h4><div className="__skeleton-line skeleton-box" style={{ width: '20%' }}></div></h4>
          </div>
        </div>


        <div className="__skeleton-line skeleton-box" style={{ width: '30%', marginTop: '3em' }}></div>
        <div className="__skeleton-heading-line skeleton-box" style={{ marginBottom: '2em' }}></div>
      </div>
    </div>
  )

  const productBuilderTemplate = (
    <div className="product-builder-container">
      {/* { console.log(productBuilderObject, shopifyProductObject) } */}
      <ProductImages images={ shopifyProductObject?.product?.images } />
      <div className="product-builder__product-meta">
        <ProductHeading />
        {
          optionsAvailable && 
          <>
            { 
              optionsAvailable.length > 1 &&
              <ProductVariantOptions options={ optionsAvailable } />
            }
            <ProductOptionMeta />
            <ProductFooter />
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