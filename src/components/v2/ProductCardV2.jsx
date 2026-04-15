import { useEffect, useState } from 'react';
import { toPrice } from '../../libs/helpers';
import { useProductBuilderContext } from '../../context/ProductBuilderContext';

export default function ProductCardV2({ optkey, product, parent, multiple }) {
  const {
    onPushAddonToCache_Fn,
    addOnCaching,
    onAddonSelected_Fn,
    userAddonSelected,
    onGetProductVariantByID_Fn,
  } = useProductBuilderContext();

  const { id, title, displayName, price, image } = product;
  const __defaultTitle = title === 'Default Title' ? parent.title : displayName;

  const [loading, setLoading] = useState(false);
  const [productData, setProductData] = useState({
    id: product.id,
    title: __defaultTitle,
    price: price,
    thumb: image?.originalSrc,
  });

  useEffect(() => {
    const __load = async () => {
      const cacheFound = [...addOnCaching].find(
        c => c.id === product.id.replace('gid://shopify/ProductVariant/', '')
      );
      if (cacheFound) {
        setProductData(cacheFound);
        return;
      }

      setLoading(true);
      const variantData = await onGetProductVariantByID_Fn(product.id);
      if (!variantData) {
        setProductData(prev => ({ ...prev, unavailable: true }));
        return;
      }

      const { id, image, price, title } = variantData;
      const idNumber = id.replace('gid://shopify/ProductVariant/', '');
      const resolvedTitle = title === 'Default Title' ? parent.title : title;
      const data = {
        id: idNumber,
        title: resolvedTitle,
        price: price?.amount,
        thumb: image?.url,
      };

      setProductData(data);
      onPushAddonToCache_Fn(data);
      setLoading(false);
    };

    __load();
  }, [parent]);

  const isSelected = !!userAddonSelected.find(a => a.id === productData.id && a.optkey === optkey);

  return (
    <div
      className={[
        'pb2__product-card',
        productData?.unavailable ? '__hidden' : '',
        loading ? '__loading-effect' : '',
        isSelected ? '__selected' : '',
      ].join(' ')}
      onClick={() => onAddonSelected_Fn(productData.id, price, optkey, productData.title, multiple)}>
      <div className="__img">
        {productData.thumb && <img src={productData.thumb} alt={productData.title} loading="lazy" />}
      </div>
      <div>
        <p className="__title">{productData.title}</p>
        <p className="__price">{toPrice(productData.price)}</p>
      </div>
    </div>
  );
}
