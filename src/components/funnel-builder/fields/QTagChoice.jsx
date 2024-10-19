import { useState, useEffect } from 'react';
import SelectBox from '../SelectBox';
import { useFunnelBuilderContext } from '../../../context/FunnelBuilderContext';
import Loading from '../../Loading';

export default function QTagChoice({ field }) {
  const { fn } = useFunnelBuilderContext();
  const { onFunnelOptionsFilter, onAddFilterData, onRemoveFilterData } = fn;
  const [loading, setLoading] = useState(true);
  const { __key, help_text, value, require, onChange, __qkey } = field;
  const [options, setOptions] = useState([]);
  let option_ui = 'default';

  const checkOptions = async (o) => {
    const res = await onFunnelOptionsFilter(field);
    // console.log(res);
    setOptions(res); 
    setLoading(false);
    // setOptions(res);  
    // setLoading(false);
  }
  
  useEffect(() => {
    checkOptions(field.options);
  }, [field])
  
  return <div className={ ['q-field q-field__tag-choice', `__ui-${ option_ui }`].join(' ') }>
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