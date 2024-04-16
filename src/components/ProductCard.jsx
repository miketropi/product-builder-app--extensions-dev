import { toPrice } from "../libs/helpers";

export default function ProductCard({ product, parent }) {
  const { id, title, displayName, price, image } = product;
  let __title = (title == 'Default Title' ? parent.title : displayName);

  return <div className="product-builder__product-card">
    <div className="__product-image">
      <img src={ image?.originalSrc } alt={ __title } />
    </div>
    <div>
      <h4 className="__product-title">{ __title }</h4>
      <div className="__product-price">{ toPrice(price) }</div>
    </div>
  </div>
}