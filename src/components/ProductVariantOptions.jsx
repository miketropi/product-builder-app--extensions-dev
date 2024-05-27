import { useProductBuilderContext } from "../context/ProductBuilderContext";

export default function ProductVariantOptions({ options }) {
  const { variantObjectCurrent, shopifyProductObject, onUpadteVariantObjectCurrent_Fn } = useProductBuilderContext();

  return <div className="__variant-options __box-option">
    <div className="__box-option__heading">
      <h4>Select Variant*</h4>
    </div>
    <div className="__box-option__options">
      {
        options.map((v) => {
          const { id, title, image } = v;
          let __classSelected = variantObjectCurrent.id == id ? '__selected' : '';
          return <div 
            key={ id } 
            className={ ['variant-option-item', __classSelected].join(' ') } 
            onClick={ e => { onUpadteVariantObjectCurrent_Fn(v) } }>
            <img src={ (() => {
              let __id = parseInt(id.replace('gid://shopify/ProductVariant/', ''));
              const found = shopifyProductObject?.product?.images.find(__i => __i.variant_ids.includes(__id));
              return found ? found?.src : image?.url;
            })() } alt={ title } />
            <h4>{ title }</h4>
          </div>
        })
      }
    </div>
  </div>
}