import { useProductBuilderContext } from '../../context/ProductBuilderContext';
import ButtonAddToCartV2 from './ButtonAddToCartV2';
import { toPrice } from '../../libs/helpers';

export default function ProductFooterV2() {
  const {
    variantObjectCurrent,
    addToCartEnable,
    shopifyProductObject,
    onAddToCart_Fn,
    userAddonSelected,
  } = useProductBuilderContext();

  const currentVariant = (() => {
    const numericId = parseInt(variantObjectCurrent.id.replace('gid://shopify/ProductVariant/', ''));
    return shopifyProductObject.product.variants.find(v => v.id === numericId);
  })();

  const totalPrice = (() => {
    const main = parseFloat(currentVariant.price);
    const addons = userAddonSelected.reduce((sum, a) => sum + parseFloat(a.price), 0);
    return toPrice(main + addons);
  })();

  return (
    <div className="pb2__footer">
      <div className="pb2__price-row">
        <span className="pb2__price">{totalPrice}</span>
      </div>

      <ButtonAddToCartV2
        disable={!addToCartEnable}
        onClick={() => onAddToCart_Fn()}
      />
    </div>
  );
}
