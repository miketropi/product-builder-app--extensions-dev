import { useProductBuilderContext } from '../../context/ProductBuilderContext';

export default function ProductHeadingV2() {
  const { shopifyProductObject, variantObjectCurrent } = useProductBuilderContext();

  const moniker    = (window.__P_moniker    || '').trim();
  const vendor     = (window.__P_vendor     || '').trim();
  const vendorUrl  = (window.__P_vendor_url || '').trim();
  const fullTitle  = shopifyProductObject.product.title || '';

  // If a moniker exists, strip the first word (the brand prefix) from the title
  const prodTitleFirst = fullTitle.split(' ')[0];
  const displayTitle = moniker
    ? fullTitle.replace(prodTitleFirst, '').trim()
    : fullTitle;

  const numericId = parseInt(variantObjectCurrent.id.replace('gid://shopify/ProductVariant/', ''));
  const currentVariant = shopifyProductObject.product.variants.find(v => v.id === numericId);
  const sku = currentVariant?.sku || '';

  return (
    <div className="pb2__heading">
      {vendor && (
        <div className="pb2__vendor">
          {vendorUrl
            ? <a href={vendorUrl} className="pb2__vendor-link">{vendor}</a>
            : vendor}
        </div>
      )}

      {moniker && <div className="pb2__moniker">{moniker}</div>}

      <h1 className={!moniker ? 'pb2__title--full' : ''}>{displayTitle}</h1>

      {sku && <div className="pb2__sku">SKU {sku}</div>}
    </div>
  );
}
