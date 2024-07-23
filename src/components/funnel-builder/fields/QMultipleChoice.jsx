import SelectBox from '../SelectBox';

export default function QMultipleChoice({ field }) {
  const { __key, help_text, value, option_ui, options, require, onChange } = field;

  return <div className={ ['q-field q-field__multiple-choice', `__ui-${ option_ui }`].join(' ') }>
    <div className={ ['__options', `__o_ui-${ option_ui }`].join(' ') }>
      <SelectBox 
        options={ options } 
        multiple={ true }
        value={ value }
        onChange={ onChange } 
        template={ option_ui }
      /> 
      {
        help_text ? <small dangerouslySetInnerHTML={{ __html: help_text }}></small> : ''
      }
    </div>
  </div>
}