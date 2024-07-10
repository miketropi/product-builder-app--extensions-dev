import SelectBox from '../SelectBox';

export default function QSingleChoice({ field }) {
  const { __key, help_text, value, option_ui, options, require, onChange } = field;
  
  const optionTemplate = {
    default: () => {
      return <div className={ ['__options', `__o_ui-${ option_ui }`].join(' ') }>
        <SelectBox 
          options={ options } 
          multiple={ false }
          value={ value }
          onChange={ onChange }
          template={ option_ui }
        />
        {
          help_text ? <small dangerouslySetInnerHTML={{ __html: help_text }}></small> : ''
        }
      </div>
    } 
  }

  return <div className={ ['q-field q-field__single-choice', `__ui-${ option_ui }`].join(' ') }>
    {/* { JSON.stringify(field) } */}
    { optionTemplate[option_ui]() }
  </div>
}