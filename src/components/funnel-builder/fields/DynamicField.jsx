import QSingleChoice from "./QSingleChoice";
import QMultipleChoice from "./QMultipleChoice";
import QTextField from './QTextField';

const __FIELDS__ = { QSingleChoice, QTextField, QMultipleChoice }

export default function DynamicField(props) {
  const Component = __FIELDS__[props.type];
  return <Component field={ props } />;
}