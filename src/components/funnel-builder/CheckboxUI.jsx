export default function CheckboxUI({ label, checked, onChange }) {
  
  return <div 
    className={ ['checkbox-ui checkbox-ui-component', (checked ? '__checked' : '')].join(' ') } 
    onClick={ e => onChange(!checked) }>
    <div className={ ['checkbox-ui__fake-handle'].join(' ') }></div>
    <div className='checkbox-ui__label'>{ label }</div>
  </div>
}