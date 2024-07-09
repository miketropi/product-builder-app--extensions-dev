import { useState, useEffect, useCallback } from 'react';
import CheckboxUI from './CheckboxUI';

export default function SelectBox({ options, multiple, value, onChange, template }) {

  const isSelected_Fn = useCallback((oValue) => {
    let _v = Array.isArray(value) ? value : [value];
    return _v.includes(oValue)
  }, [value]);

  return <div className="select-box-component">
    {
      options.map((o) => {
        const { __key, label } = o;
        const selected = isSelected_Fn( o.value);

        return <li className="__o-item" key={ __key }>
          <CheckboxUI label={ label } checked={ selected } onChange={ onChange } />
        </li>
      })
    }
  </div>
}