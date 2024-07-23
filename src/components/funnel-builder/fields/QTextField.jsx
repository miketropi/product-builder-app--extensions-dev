export default function QTextField({ field }) {
  const { __key, help_text, value, require, onChange, placeholder } = field;

  return <div className={ ['q-field q-field__textfield'].join(' ') }>
    {/* { JSON.stringify(field) } */}
    <div>
      <input 
        className="__textfield-handle"
        type="text" 
        value={ value } 
        placeholder={ placeholder } 
        onChange={ (e) => {
          onChange(e.target.value);
        } } />
    </div>
    {
      help_text ? <small dangerouslySetInnerHTML={{ __html: help_text }}></small> : ''
    }
  </div>
}