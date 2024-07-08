import QSingleChoice from "./QSingleChoice";

const __FIELDS__ = { QSingleChoice }

export default function DynamicField(props) {
  const Component = __FIELDS__[props.type];
  return <Component field={ props } />;
}