import { useEffect, useCallback, useState } from "react";
import { toPrice } from "../libs/helpers";
import { useProductBuilderContext } from "../context/ProductBuilderContext";

export default function ProductCard({ product, parent }) {
  const { onPushAddonToCache_Fn, addOnCaching } = useProductBuilderContext();
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
      const { product: { variants, images, title } } = await res.json();
      let findItem = variants.find(__v => __v.id == product.id.replace('gid://shopify/ProductVariant/', ''));
      
      let __productDarta = {
        id: findItem.id,
        title: `${ title } - ${ findItem.title }`,
        price: findItem.price,
        thumb: ((_images) => {
          if(!findItem.image_id) return '';

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

  return <div className={ ['product-builder__product-card', (loading ? '__loading-effect' : '')].join(' ') }>
    <div className="__product-image">
      <img src={ productData.thumb } alt={ productData.title } />
    </div>
    <div>
      <h4 className="__product-title">{ productData.title }</h4>
      <div className="__product-price">{ toPrice(productData.price) }</div>
    </div>
  </div>
}