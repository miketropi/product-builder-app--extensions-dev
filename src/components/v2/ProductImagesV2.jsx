import { useState } from 'react';

const THUMB_LIMIT = 3;

export default function ProductImagesV2({ images }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [thumbOffset, setThumbOffset] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="pb2__image-col">
        <div className="__product-images-v2">
          <div className="__main-image">
            <img src={window.__P_fimage} alt="" />
          </div>
        </div>
      </div>
    );
  }

  const showThumbs = images.length > 1;
  const maxOffset = Math.max(0, images.length - THUMB_LIMIT);
  const visibleThumbs = images.slice(thumbOffset, thumbOffset + THUMB_LIMIT);

  function prevThumbs() {
    setThumbOffset(o => Math.max(0, o - 1));
  }

  function nextThumbs() {
    setThumbOffset(o => Math.min(maxOffset, o + 1));
  }

  function selectThumb(globalIndex) {
    setActiveIndex(globalIndex);
    // keep the selected thumb visible
    if (globalIndex < thumbOffset) setThumbOffset(globalIndex);
    else if (globalIndex >= thumbOffset + THUMB_LIMIT) setThumbOffset(globalIndex - THUMB_LIMIT + 1);
  }

  return (
    <div className="pb2__image-col">
      <div className="__product-images-v2">
        <div className="__main-image">
          <img src={images[activeIndex].src} alt={images[activeIndex].alt || ''} />
        </div>

        {showThumbs && (
          <div className="__thumb-nav">
            <button
              className="__thumb-arrow"
              onClick={prevThumbs}
              disabled={thumbOffset === 0}
              aria-label="Previous images">
              &#8249;
            </button>

            <div className="__thumb-row">
              {visibleThumbs.map((img, i) => {
                const globalIndex = thumbOffset + i;
                return (
                  <div
                    key={img.id}
                    className={['__thumb-item', activeIndex === globalIndex ? '__active' : ''].join(' ')}
                    onClick={() => selectThumb(globalIndex)}>
                    <img src={img.src} alt={img.alt || ''} loading="lazy" />
                  </div>
                );
              })}
            </div>

            <button
              className="__thumb-arrow"
              onClick={nextThumbs}
              disabled={thumbOffset >= maxOffset}
              aria-label="Next images">
              &#8250;
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
