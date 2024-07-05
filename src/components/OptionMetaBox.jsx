import { useEffect, useRef } from 'react';
import BoxNumber from './BoxNumber';
import ProductCard from './ProductCard';
import { useProductBuilderContext } from '../context/ProductBuilderContext';
import { useSpring, animated, config } from '@react-spring/web';
import useMeasure from "react-use-measure";

export default function OptionMetaBox({ boxOption, indexNum, onSelect, value, toggle, toggleTargetClick }) {
  const { userAddonSelected, clearAddon_Fn, currentStepNumber, setCurrentStepNumber, optionsSelected } = useProductBuilderContext();
  const { name, type, description, addons, options } = boxOption;
  const __icon_no_image = (<svg viewBox="0 0 24 24" width="40px" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M14.2647 15.9377L12.5473 14.2346C11.758 13.4519 11.3633 13.0605 10.9089 12.9137C10.5092 12.7845 10.079 12.7845 9.67922 12.9137C9.22485 13.0605 8.83017 13.4519 8.04082 14.2346L4.04193 18.2622M14.2647 15.9377L14.606 15.5991C15.412 14.7999 15.8149 14.4003 16.2773 14.2545C16.6839 14.1262 17.1208 14.1312 17.5244 14.2688C17.9832 14.4253 18.3769 14.834 19.1642 15.6515L20 16.5001M14.2647 15.9377L18.22 19.9628M12 4H7.2C6.07989 4 5.51984 4 5.09202 4.21799C4.7157 4.40973 4.40973 4.71569 4.21799 5.09202C4 5.51984 4 6.0799 4 7.2V16.8C4 17.4466 4 17.9066 4.04193 18.2622M4.04193 18.2622C4.07264 18.5226 4.12583 18.7271 4.21799 18.908C4.40973 19.2843 4.7157 19.5903 5.09202 19.782C5.51984 20 6.07989 20 7.2 20H16.8C17.9201 20 18.4802 20 18.908 19.782C19.2843 19.5903 19.5903 19.2843 19.782 18.908C20 18.4802 20 17.9201 20 16.8V12M16 3L18.5 5.5M18.5 5.5L21 8M18.5 5.5L21 3M18.5 5.5L16 8" stroke="#eee" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>)

  const boxRef = useRef();
  // const [boxRef, boxProperty] = useMeasure();
  const [measureRef, { height }] = useMeasure();
  const styles = useSpring({
    // config: config.stiff,
    from: {
      opacity: 0,
      height: 0
    },
    to: {
      opacity: toggle ? 1 : 0,
      height: toggle ? height : 0
    }
  });

  useEffect(() => {
    if(toggle == true && currentStepNumber > 1) {
      let extraTop = window?.__PB_EXTRA_TOP ?? -100;
      setTimeout(() => {
        window.scrollTo({
          top: (boxRef.current.offsetTop + extraTop),
          left: 0,
          behavior: 'smooth'
        });
      }, 400)
    }
  }, [toggle])

  useEffect(() => {
    if(!optionsSelected || optionsSelected.length == 0) return;
    if(currentStepNumber > optionsSelected.length) {
      // console.log(optionsSelected.length, currentStepNumber)
      setTimeout(() => {
        let elTop = document.querySelector('.product-builder__product-footer').offsetTop;
        let extraTop = window?.__PB_EXTRA_TOP ?? -100;
        window.scrollTo({
          top: (elTop + extraTop),
          left: 0,
          behavior: 'smooth'
        });
      }, 400)
    }
  }, [currentStepNumber])

  const __OPTION_TEMP = (
    <div className="__box-option__options">
      {
        options.map((o) => {
          const { __key, name, image } = o;
          const selected = (name == value ? '__selected' : '')
          return <div 
            key={ __key } 
            className={ ['variant-option-item', selected].join(' ') } 
            onClick={ e => onSelect(o) }>
            {
              image ? <img src={ image } alt={ `#${ name }` } /> : __icon_no_image
            }
            <h4>{ name }</h4>
          </div>
        })
      }
    </div>
  )

  const __ADDON_TEMP = (
    <div className="__box-option__addon">
      {/* { JSON.stringify(boxOption.addon_multiple) } */}
      <div className={ ['__clear-addon', (() => {
        let _found = userAddonSelected.find(a => a.optkey == boxOption.__key);
        return ''; // (_found ? '' : '__selected')
      })()].join(' ') } onClick={ e => {
        clearAddon_Fn(boxOption.__key);
        const __next = currentStepNumber + 1
        setCurrentStepNumber(__next)
      } }>
        None
      </div>
      {
        addons.map((a) => {
          const { __key, name, products } = a;
          return <div key={ __key } className="__box-option__addon-item">
            <h4 className="__addon-heading-tag">{ name }</h4>
            <div className="product-builder__product-card-list">
              {/* { boxOption.__key } { boxOption.name } */}
              {
                products.length > 0 && 
                products.map((__p) => { // #product
                  return __p.variants.map((__v) => { // #variant
                    const { id, displayName } = __v;
                    return <ProductCard 
                      optkey={ boxOption.__key } 
                      multiple={ boxOption?.addon_multiple ?? false }  
                      name={ displayName }  
                      key={ id } 
                      product={ __v } 
                      parent={ __p } />
                  })
                })
              }
            </div>
          </div>
        })
      }
    </div>
  )

  return <div className="__box-option" ref={ boxRef }> 
    <div className="__box-option__heading">
      <BoxNumber number={ indexNum } active={ ((__type) => {
        if(__type == 'options') {
          return (value ? true : false); 
        } else {
          let found = userAddonSelected.filter(s => s.optkey == boxOption.__key);
          if(found.length == 0) {
            return false
          } else {
            return true
          }
        }
      })(type) } />
      <h4 onClick={ toggleTargetClick }>
        { name }
        {/* { boxOption.type == 'addon' && boxOption?.addon_multiple == true ? <sup>multiple selection</sup> : '' } */}
      </h4>
      {
        // value && <span className="__value">{ value }</span>
      }
      {
        // userAddonSelected
        ((__type) => {
          if(__type == 'options') {
            return (value && <span className="__value" title={ value }>{ value }</span>)
          } else {
            let found = userAddonSelected.filter(s => s.optkey == boxOption.__key)
            if(found.length == 0) {
              return <span className="__value">No item</span>
            } else {
              let __string = found.map(s => s.title.replace('- Default Title', '') ).join(', ');
              return <span className="__value" title={ __string }>
                { found.length > 1 ? `${ found.length } items - ` : '' } { __string }
                </span>
            }
            // return JSON.stringify(found);
          }
        })(type)
      }
      {/* { JSON.stringify(userAddonSelected) } */}
    </div>
    <div style={{ position: `relative` }}>
      <animated.div style={{ overflow: "hidden", ...styles }}>
        <div ref={ measureRef } style={{ display: `inline-block`, width: `100%` }}>
          {
            // toggle && 
            ((__type) => {
              // __type: options, addon
              return (__type == 'options' ? __OPTION_TEMP : __ADDON_TEMP);
            })(type)
          }
        </div>
      </animated.div>
      
      {
        type == 'addon' && 
        toggle == true && 
        (boxOption?.addon_multiple && boxOption.addon_multiple == true) && 
        (() => {
          let found = userAddonSelected.filter(s => s.optkey == boxOption.__key);
          return (found.length > 0 ? true : false);
        })() &&
        <button 
          className="button __next-step"  
          type="button" 
          onClick={ e => {
          e.preventDefault();
          const __next = currentStepNumber + 1
          setCurrentStepNumber(__next)
        } }>Next Step</button>
      }
    </div>
    
  </div>
}