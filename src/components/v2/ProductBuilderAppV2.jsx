import { useProductBuilderContext } from '../../context/ProductBuilderContext';
import ProductImagesV2 from './ProductImagesV2';
import ProductHeadingV2 from './ProductHeadingV2';
import ProductVariantOptionsV2 from './ProductVariantOptionsV2';
import ProductOptionMetaV2 from './ProductOptionMetaV2';
import ProductFooterV2 from './ProductFooterV2';

// ─── Skeleton shown while data loads ───────────────────────────────────────

function LoadingSkeletonV2() {
  const moniker      = (window.__P_moniker || '').trim();
  const vendor       = (window.__P_vendor  || '').trim();
  const fullTitle    = (window.__P_title   || '').trim();
  const prodFirst    = fullTitle.split(' ')[0];
  const displayTitle = moniker ? fullTitle.replace(prodFirst, '').trim() : fullTitle;

  return (
    <div className="pb2-container pb2__skeleton-container">
      {/* Image column — real image shown immediately */}
      <div className="pb2__image-col">
        <div className="__product-images-v2">
          <div className="__main-image">
            <img src={window.__P_fimage} alt={fullTitle} />
          </div>
        </div>
      </div>

      {/* Meta column */}
      <div className="pb2__meta-col">
        {/* Real heading data */}
        <div className="pb2__heading">
          {vendor && <div className="pb2__vendor">{vendor}</div>}
          {moniker && <div className="pb2__moniker">{moniker}</div>}
          <h1 className={!moniker ? 'pb2__title--full' : ''}>{displayTitle}</h1>
          {window.__P_sku && <div className="pb2__sku">SKU {window.__P_sku}</div>}
        </div>

        {/* Step rows — real structure, skeleton line inside h4 */}
        <div className="pb2__option-meta">
          {[1, 2, 3].map(i => (
            <div key={i} className="pb2__option-box">
              <div className="pb2__option-box__heading">
                <span className="pb2__step-num">{i}</span>
                <h4><span className="pb2__skel skeleton-box pb2__skel-label" style={{ width: `${18 + i * 9}%` }} /></h4>
              </div>
            </div>
          ))}
        </div>

        <div className="pb2__skel skeleton-box pb2__skel-price" />
        <div className="pb2__skel skeleton-box pb2__skel-atc" />
      </div>
    </div>
  );
}

// ─── Main app ───────────────────────────────────────────────────────────────

export default function ProductBuilderAppV2() {
  const { loadingInit, shopifyProductObject, optionsAvailable } = useProductBuilderContext();

  return (
    <div id="PRODUCT_BUILDER_V2_APP" className="pb2-app">
      {loadingInit ? (
        <LoadingSkeletonV2 />
      ) : (
        <div className="pb2-container">
          <ProductImagesV2 images={shopifyProductObject?.product?.images ?? []} />

          <div className="pb2__meta-col">
            <ProductHeadingV2 />

            {optionsAvailable && (
              <>
                {optionsAvailable.length > 1 && (
                  <ProductVariantOptionsV2 options={optionsAvailable} />
                )}
                <ProductOptionMetaV2 />
                <ProductFooterV2 />
              </>
            )}

            {/* Mount point for Liquid-rendered feature boxes (between ATC and accordions) */}
            <div id="pb2-feature-boxes-mount" />

            {/* Mount point for Liquid-rendered accordion tabs */}
            <div id="pb2-accordion-mount" />
          </div>
        </div>
      )}
    </div>
  );
}
