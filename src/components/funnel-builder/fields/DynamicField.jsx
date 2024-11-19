import QSingleChoice from "./QSingleChoice";
import QMultipleChoice from "./QMultipleChoice";
import QTextField from './QTextField';
import QCollectionChoice from "./QCollectionChoice";
import QTagChoice from "./QTagChoice";

const __FIELDS__ = { QSingleChoice, QTextField, QMultipleChoice, QCollectionChoice, QTagChoice }

export default function DynamicField(props) {
  const Component = __FIELDS__[props.type];
  return <>
    {/* { console.log('DynamicField', props) } */} 
    <Component field={ props } />
  </>;
}