import { useProductBuilderContext } from '../context/ProductBuilderContext';

export default function ProductBuilderApp() {
  const { version } = useProductBuilderContext();
  return <div>Hello world...! { version }</div>
}