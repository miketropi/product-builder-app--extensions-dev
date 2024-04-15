import { useProductBuilderContext } from '../context/ProductBuilderContext';

export default function ProductHeading() {
  const { shopifyProductObject } = useProductBuilderContext();
  return <div className="product-builder__product-heading">
    <h2 className="__product-title">{ shopifyProductObject.product.title }</h2>
    <p>{ shopifyProductObject.product.body_html }</p>
  </div>
}