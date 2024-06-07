import { useEffect, useCallback, useState } from "react";
import { toPrice } from "../libs/helpers";
import { useProductBuilderContext } from "../context/ProductBuilderContext";

export default function ProductCard({ optkey, product, parent, multiple }) {
  const { onPushAddonToCache_Fn, addOnCaching, addonSelected, onAddonSelected_Fn, userAddonSelected } = useProductBuilderContext();
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
      let product_json_url = `/products/${ parent.handle }.json`;
      const res = await fetch(product_json_url)
      const { product: { variants, images, image, title } } = await res.json();
      let findItem = variants.find(__v => __v.id == product.id.replace('gid://shopify/ProductVariant/', ''));
      
      let __productDarta = {
        id: findItem.id,
        title: `${ title } - ${ findItem.title }`,
        price: findItem.price,
        thumb: ((_images) => {
          if(!findItem.image_id) return image?.src;

          let found = _images.find(i => i.id == findItem.image_id );
          return (found ? found.src : '')
        })(images),
      }

      setProductData(__productDarta);
      onPushAddonToCache_Fn(__productDarta);
      
      setLoading(false);
    }

    __getVariantData();
  }, [parent])

  return <div 
    className={ [
      'product-builder__product-card', 
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