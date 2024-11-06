import { useState, useEffect } from 'react';
import SelectBox from '../SelectBox';
import { useFunnelBuilderContext } from '../../../context/FunnelBuilderContext';
import Loading from '../../Loading';

export default function QTagChoice({ field }) {
  const { fn } = useFunnelBuilderContext();
  const { onFunnelOptionsFilter, onAddFilterData, onRemoveFilterData, onNextStep } = fn;
  const [loading, setLoading] = useState(true);
  const { __key, help_text, value, require, onChange, option_style, __qkey } = field;
  const [options, setOptions] = useState([]);
  // console.log('option_style', option_style)
  let option_ui = option_style;

  const checkOptions = async (o) => {
    const res = await onFunnelOptionsFilter(field);
    // console.log(res);

    const oReady = res.filter(__o => {
      return  __o?.disable !== true
    });

    if(!oReady || oReady.length == 0) {
      onNextStep(); 
    }

    setOptions(oReady); 
    setLoading(false);
  }
  
  useEffect(() => {
    // console.log(field?.__qkey)
    // checkOptions(field.options);
  }, [field])

  useEffect(() => {
    // console.log(field?.__qkey);
    checkOptions(field.options);
  }, [])
  
  return <div className={ ['q-field q-field__tag-choice', `__ui-${ option_ui }`].join(' ') }>
    {/* { JSON.stringify(field) } */}
    <div className={ ['__options', `__o_ui-${ option_ui }`].join(' ') }>
    {
      (loading == true) ? <Loading /> : <>
        <SelectBox 
          options={ options } 
          multiple={ true }
          value={ value }
          onChange={ v => {
            let firstValue = v.shift();
            onChange(firstValue)
            onAddFilterData({
              __key: __qkey,
              type: 'tag',
              value: firstValue,
            })
          } }
          template={ option_ui }
        />
        {
          help_text ? <small dangerouslySetInnerHTML={{ __html: help_text }}></small> : ''
        }
      </>
    }
    </div>
  </div>
}