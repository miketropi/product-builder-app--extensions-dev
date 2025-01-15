import { useEffect, useCallback, useState } from "react";
import { toPrice } from "../libs/helpers";
import { useProductBuilderContext } from "../context/ProductBuilderContext"; 

export default function ProductCard({ optkey, product, parent, multiple }) {
  const { onPushAddonToCache_Fn, addOnCaching, addonSelected, onAddonSelected_Fn, userAddonSelected, onGetProductVariantByID_Fn } = useProductBuilderContext();
  const { id, title, displayName, price, image } = product;
  let __title = (title == 'Default Title' ? parent.title : displayName);

  const [ loading, setLoading ] = useState(false);
  const [ productData, setProductData ] = useState({
    id: product.id,
    title: __title,
    price: price,
    thumb: image?.originalSrc,
  });

  useEffect(() => {
    const __getVariantData = async () => {
      const cacheFound = [...addOnCaching].find(c => c.id == product.id.replace('gid://shopify/ProductVariant/', ''));
      if(cacheFound) {
        setProductData(cacheFound)
        return;
      }

      setLoading(true);
      // let vID = product.id.split('/').at(-1);
      let productVariantData = await onGetProductVariantByID_Fn(`${ product.id }`);
      if(!productVariantData || productVariantData == null) {
        setProductData({...productData, unavailable: true});
        return;
      } else {
        const { id, image, price, sku, title } = productVariantData;
        const idNumber = id.replace('gid://shopify/ProductVariant/', '');
        let __title = (title == 'Default Title' ? parent.title : title);
        let __productData = {
          id: idNumber,
          title: `${ __title }`,
          price: price?.amount,
          thumb: image?.url,
        }

        setProductData(__productData);
        onPushAddonToCache_Fn(__productData);
        
        setLoading(false);
      }
      return;
    }

    __getVariantData();
  }, [parent])

  return <div 
    className={ [
      'product-builder__product-card', 
      ( productData?.unavailable == true ? '__hidden' : ''),
      (loading ? '__loading-effect' : ''), 
      // (addonSelected.includes(productData.id) ? '__selected' : ''),
      (() => {
        let f = userAddonSelected.find(a => (a.id == productData.id && a.optkey == optkey));
        return (f ? '__selected' : ''); 
      })()
    ].join(' ') }
    onClick={ e => {
      onAddonSelected_Fn(productData.id, price, optkey, productData.title, multiple);
    } }
    >
    <div className="__product-image">
      <img src={ productData.thumb } alt={ productData.title } />
    </div>
    <div>
      <h4 className="__product-title">{ productData.title }</h4>
      <div className="__product-price">{ toPrice(productData.price) }</div>
    </div>
  </div>
}