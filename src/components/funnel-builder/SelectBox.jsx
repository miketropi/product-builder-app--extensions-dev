import { useState, useEffect, useCallback } from 'react';
import CheckboxUI from './CheckboxUI';

const CardItem = ({ title, desc, image, onClick, selected }) => {
  return <div 
    className={ ['card-item-comp', (selected ? '__selected' : '')].join(' ') } 
    onClick={ onClick }>
    {
      selected ? <span className="__tag-selected">Selected</span> : ''
    }
    <img src={ image } alt={ title } />
    <h4>{ title }</h4>
    <p dangerouslySetInnerHTML={{ __html: desc }}></p>
  </div>
}

const BlockItem = ({ title, image, onClick, selected }) => {
  return <div
    className={ ['block-item-comp', (selected ? '__selected' : '')].join(' ') } 
    onClick={ onClick } >
    <img src={ image } alt={ title } />
    <h4>{ title }</h4>
  </div>
}

const ImageItem = ({ title, image, onClick, selected }) => {
  return <div
    className={ ['image-item-comp', (selected ? '__selected' : '')].join(' ') } 
    onClick={ onClick } >
    {
      selected ? <span className="__tag-selected">Selected</span> : ''
    }
    <img src={ image } alt={ title } />
  </div>
}

export default function SelectBox({ options, multiple, value, onChange, template }) {
  const [ __value, set__Value ] = useState([]);

  const isSelected_Fn = useCallback((oValue) => {
    return __value.includes(oValue)
  }, [__value]);

  useEffect(() => {
    let v = Array.isArray(value) ? value : [value];
    set__Value(v); 
  }, [value])

  const onChange_Fn = (checked, v) => {
    let __newValue = [...__value];

    if(checked === true) {
      if(multiple == true) {  __newValue.push(v); } 
      else { __newValue = [v]; }
    } else {
      let __index = __newValue.indexOf(v);
      __newValue.splice(__index, 1);
    }
    
    set__Value(__newValue);
    onChange(multiple ? __newValue : __newValue.join(','));
  }

  const __templates = {
    default: () => {
      return <>
        {
          options.map((o) => {
            const { __key, label, disable } = o;
            const selected = isSelected_Fn(o.value);

            return <li className={ ['__o-item', (disable == true ? '__disable' : '')].join(' ') } key={ __key }>
              <CheckboxUI 
                label={ label } 
                checked={ selected }  
                onChange={ v => { onChange_Fn(v, o.value) } } 
              />
            </li>
          })
        }
      </>
    },
    card: () => {
      return <>
        {
          options.map((o) => {
            const { __key, label, disable, extra__cart_title, extra__cart_desc, extra__cart_image } = o;
            const selected = isSelected_Fn(o.value);

            return <li className={ ['__card-item', (disable == true ? '__disable' : '')].join(' ') } key={ __key }>
              <CardItem 
                title={ extra__cart_title } 
                desc={ extra__cart_desc } 
                image={ extra__cart_image } 
                selected={ selected }
                onClick={ e => {
                  // console.log(!selected, o.value)
                  onChange_Fn(!selected, o.value)
                } } />
            </li>
          })
        }
      </>
    },
    block: () => {
      return <>
        {
          options.map((o) => {
            const { __key, label, disable, extra__block_text, extra__block_image } = o;
            const selected = isSelected_Fn(o.value);

            return <li className={ ['__block-item', (disable == true ? '__disable' : '')].join(' ') } key={ __key }>
              {/* { JSON.stringify(o) } */}
              <BlockItem 
                title={ extra__block_text } 
                image={ extra__block_image } 
                selected={ selected }
                onClick={ e => {
                  // console.log(!selected, o.value)
                  onChange_Fn(!selected, o.value)
                } } />
            </li>
          })
        }
      </>
    },
    image: () => {
      return <>
        {
          options.map((o) => {
            const { __key, label, disable, extra__image_url } = o;
            const selected = isSelected_Fn(o.value);

            return <li className={ ['__image-item', (disable == true ? '__disable' : '')].join(' ') } key={ __key }>
              {/* { JSON.stringify(o) } */}
              <ImageItem 
                title={ label }
                image={ extra__image_url } 
                selected={ selected } 
                onClick={ e => onChange_Fn(!selected, o.value) } />
            </li>
          })
        }
      </>
    }
  }

  return <ul className={ ['select-box-component', `__temp__${ template }`].join(' ') }>
    {/* { template } */}
    { __templates[template]() }
  </ul>
}