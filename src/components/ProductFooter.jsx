import { useProductBuilderContext } from "../context/ProductBuilderContext";
import ButtonAddToCart from "./ButtonAddToCart";
import { toPrice } from '../libs/helpers';

export default function ProductFooter() {
  const { variantObjectCurrent, addToCartEnable, shopifyProductObject, onAddToCart_Fn, addonWithPrice } = useProductBuilderContext();
  return <div className="product-builder__product-footer">
    <div className="product-builder__product-price">
      {/* { toPrice(variantObjectCurrent.price) } */}
      {/* { JSON.stringify(variantObjectCurrent) } */}
      {/* { JSON.stringify(addonWithPrice) } */}
      {
        (() => {
          const currentID = parseInt(variantObjectCurrent.id.replace('gid://shopify/ProductVariant/', ''));
          const found = shopifyProductObject.product.variants.find(v => v.id === currentID);

          let mainPrice = parseFloat(found.price);
          let totalAddOnPrice = addonWithPrice.map(i => parseFloat(i.price) ).reduce((a, b) => a + b, 0)
          return toPrice(mainPrice + totalAddOnPrice);
        })()
      }
    </div>
    <div className="product-builder__buttons">
      <ButtonAddToCart disable={ !addToCartEnable } onClick={ e => onAddToCart_Fn() } />
    </div>
  </div>
}