import { useState, useEffect, useRef } from 'react';
import { useProductBuilderContext } from '../../context/ProductBuilderContext';

const ChevronDown = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 5.5L8 10.5L13 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function ProductVariantOptionsV2({ options }) {
  const { variantObjectCurrent, onUpadteVariantObjectCurrent_Fn } = useProductBuilderContext();
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    function handleOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  const current = options.find(o => o.id === variantObjectCurrent.id) || options[0];

  return (
    <div className="pb2__variant-options" ref={ref}>
      <label className="pb2__variant-label">SELECT VARIANT *</label>
      <div className={['pb2__variant-dropdown', open ? '__open' : ''].join(' ')}>
        <button
          type="button"
          className="pb2__dropdown-trigger"
          onClick={() => setOpen(o => !o)}>
          <span>{current?.title}</span>
          <span className="pb2__variant-chevron" aria-hidden="true"><ChevronDown /></span>
        </button>

        {open && (
          <div className="pb2__dropdown-list">
            {options.map(o => (
              <div
                key={o.id}
                className={['pb2__dropdown-item', o.id === variantObjectCurrent.id ? '__selected' : ''].join(' ')}
                onClick={() => { onUpadteVariantObjectCurrent_Fn(o); setOpen(false); }}>
                {o.title}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
