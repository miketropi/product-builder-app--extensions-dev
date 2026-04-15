import { useEffect, useRef } from 'react';
import { useProductBuilderContext } from '../../context/ProductBuilderContext';
import { useSpring, animated } from '@react-spring/web';
import useMeasure from 'react-use-measure';
import ProductCardV2 from './ProductCardV2';

const NoImageIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.2647 15.9377L12.5473 14.2346C11.758 13.4519 11.3633 13.0605 10.9089 12.9137C10.5092 12.7845 10.079 12.7845 9.67922 12.9137C9.22485 13.0605 8.83017 13.4519 8.04082 14.2346L4.04193 18.2622M14.2647 15.9377L14.606 15.5991C15.412 14.7999 15.8149 14.4003 16.2773 14.2545C16.6839 14.1262 17.1208 14.1312 17.5244 14.2688C17.9832 14.4253 18.3769 14.834 19.1642 15.6515L20 16.5001M14.2647 15.9377L18.22 19.9628M12 4H7.2C6.07989 4 5.51984 4 5.09202 4.21799C4.7157 4.40973 4.40973 4.71569 4.21799 5.09202C4 5.51984 4 6.0799 4 7.2V16.8C4 17.4466 4 17.9066 4.04193 18.2622M4.04193 18.2622C4.07264 18.5226 4.12583 18.7271 4.21799 18.908C4.40973 19.2843 4.7157 19.5903 5.09202 19.782C5.51984 20 6.07989 20 7.2 20H16.8C17.9201 20 18.4802 20 18.908 19.782C19.2843 19.5903 19.5903 19.2843 19.782 18.908C20 18.4802 20 17.9201 20 16.8V12M16 3L18.5 5.5M18.5 5.5L21 8M18.5 5.5L21 3M18.5 5.5L16 8"
      stroke="#ccc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.82857 0.176471C7.6 -0.0588235 7.25714 -0.0588235 7.02857 0.176471L2.74286 4.58823L0.971428 2.76471C0.742857 2.52941 0.4 2.52941 0.171429 2.76471C-0.0571429 3 -0.0571429 3.35294 0.171429 3.58824L2.34286 5.82353C2.45714 5.94118 2.57143 6 2.74286 6C2.91429 6 3.02857 5.94118 3.14286 5.82353L7.82857 1C8.05714 0.764706 8.05714 0.411765 7.82857 0.176471Z" fill="white"/>
  </svg>
);

const ChevronIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 5.5L8 10.5L13 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function OptionMetaBoxV2({ boxOption, indexNum, onSelect, value, toggle, toggleTargetClick }) {
  const {
    userAddonSelected,
    clearAddon_Fn,
    currentStepNumber,
    setCurrentStepNumber,
    optionsSelected,
  } = useProductBuilderContext();

  const { name, type, options, addons } = boxOption;
  const boxRef = useRef();
  const [measureRef, { height }] = useMeasure();

  const styles = useSpring({
    from: { opacity: 0, height: 0 },
    to: { opacity: toggle ? 1 : 0, height: toggle ? height : 0 },
  });

  // Scroll to this step when it opens
  useEffect(() => {
    if (toggle && currentStepNumber > 1) {
      const extraTop = window?.__PB_EXTRA_TOP ?? -100;
      setTimeout(() => {
        window.scrollTo({
          top: boxRef.current.offsetTop + extraTop,
          left: 0,
          behavior: 'smooth',
        });
      }, 400);
    }
  }, [toggle]);

  // Scroll to footer when all steps done
  useEffect(() => {
    if (!optionsSelected || optionsSelected.length === 0) return;
    if (currentStepNumber > optionsSelected.length) {
      setTimeout(() => {
        const footer = document.querySelector('.pb2__footer');
        if (!footer) return;
        const extraTop = window?.__PB_EXTRA_TOP ?? -100;
        window.scrollTo({ top: footer.offsetTop + extraTop, left: 0, behavior: 'smooth' });
      }, 400);
    }
  }, [currentStepNumber]);

  // Determine done state
  const isDone = (() => {
    if (type === 'options') return !!value;
    return userAddonSelected.some(s => s.optkey === boxOption.__key);
  })();

  // Label shown in header for current selection
  const selectionLabel = (() => {
    if (type === 'options') {
      return value ? <span className="pb2__selected-value">{value}</span> : null;
    }
    const found = userAddonSelected.filter(s => s.optkey === boxOption.__key);
    if (found.length === 0) return <span className="pb2__selected-value" style={{ opacity: 0.5 }}>None</span>;
    const label = found.map(s => s.title.replace('- Default Title', '')).join(', ');
    return (
      <span className="pb2__selected-value" title={label}>
        {found.length > 1 ? `${found.length} items` : label}
      </span>
    );
  })();

  const OptionCards = (
    <div className="pb2__option-box__options">
      {options.map((o) => {
        const { __key, name, image } = o;
        const isSelected = name === value;
        return (
          <div
            key={__key}
            className={['pb2-option-item', isSelected ? '__selected' : ''].join(' ')}
            onClick={() => onSelect(o)}>
            {image ? <img src={image} alt={name} loading="lazy" /> : <NoImageIcon />}
            <h4>{name}</h4>
          </div>
        );
      })}
    </div>
  );

  const AddonCards = (
    <div className="pb2__option-box__addon">
      <div
        className="pb2__clear-none"
        onClick={() => {
          clearAddon_Fn(boxOption.__key);
          setCurrentStepNumber(currentStepNumber + 1);
        }}>
        None
      </div>
      {addons.map((a) => {
        const { __key, name, products } = a;
        return (
          <div key={__key}>
            <span className="pb2__addon-group-label">{name}</span>
            <div className="pb2__card-list">
              {products.length > 0 && products.map((p) =>
                p.variants.map((v) => (
                  <ProductCardV2
                    key={v.id}
                    optkey={boxOption.__key}
                    multiple={boxOption?.addon_multiple ?? false}
                    product={v}
                    parent={p}
                  />
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="pb2__option-box" ref={boxRef}>
      <div className={['pb2__option-box__heading', toggle ? '__active' : ''].join(' ')} onClick={toggleTargetClick}>
        <span className={['pb2__step-num', isDone ? '__done' : ''].join(' ')}>
          {isDone ? <CheckIcon /> : indexNum}
        </span>
        <h4>{name}</h4>
        {selectionLabel}
        <span className={['pb2__chevron', toggle ? '__open' : ''].join(' ')} aria-hidden="true">
          <ChevronIcon />
        </span>
      </div>

      <div style={{ position: 'relative' }}>
        <animated.div style={{ overflow: 'hidden', ...styles }}>
          <div ref={measureRef} style={{ display: 'inline-block', width: '100%' }}>
            {type === 'options' ? OptionCards : AddonCards}
          </div>
        </animated.div>

        {type === 'addon' &&
          toggle &&
          boxOption?.addon_multiple === true &&
          userAddonSelected.some(s => s.optkey === boxOption.__key) && (
            <button
              className="pb2__next-step-btn"
              type="button"
              onClick={() => setCurrentStepNumber(currentStepNumber + 1)}>
              Next Step
            </button>
          )}
      </div>
    </div>
  );
}
