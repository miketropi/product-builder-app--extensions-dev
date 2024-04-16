import { useProductBuilderContext } from "../context/ProductBuilderContext";
import ButtonAddToCart from "./ButtonAddToCart";
import { toPrice } from '../libs/helpers';

export default function ProductFooter() {
  const { variantObjectCurrent, addToCartEnable, onAddToCart_Fn } = useProductBuilderContext();
  return <div className="product-builder__product-footer">
    <div className="product-builder__product-price">
      { toPrice(variantObjectCurrent.price) }
    </div>
    <div className="product-builder__buttons">
      <ButtonAddToCart disable={ !addToCartEnable } onClick={ e => onAddToCart_Fn() } />
    </div>
  </div>
}