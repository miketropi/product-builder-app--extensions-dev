import CheckboxUI from '../CheckboxUI';

export default function QSingleChoice({ field }) {
  const { __key, help_text, value, option_ui, options, require } = field;

  const optionTemplate = {
    default: () => {
      return <div className={ ['__options', `__o_ui-${ option_ui }`].join(' ') }>
        <ul className="__o-list">
          {
            options.map((o) => {
              console.log(o)
              const { __key, label, value } = o;
              return <li className="__o-item" key={ __key }>
                <CheckboxUI label={ label } checked={ false } onChange={ e => {} } />
              </li>
            })
          }
        </ul>
      </div>
    } 
  }

  return <div className={ ['q-field q-field__single-choice', `__ui-${ option_ui }`].join(' ') }>
    {/* { JSON.stringify(field) } */}
    { optionTemplate[option_ui]() }
  </div>
}