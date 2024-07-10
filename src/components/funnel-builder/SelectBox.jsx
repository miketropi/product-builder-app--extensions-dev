import { useState, useEffect, useCallback } from 'react';
import CheckboxUI from './CheckboxUI';

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

  return <div className="select-box-component">
    {
      options.map((o) => {
        const { __key, label } = o;
        const selected = isSelected_Fn(o.value);

        return <li className="__o-item" key={ __key }>
          <CheckboxUI 
            label={ label } 
            checked={ selected } 
            onChange={ v => { onChange_Fn(v, o.value) } } 
          />
        </li>
      })
    }
  </div>
}