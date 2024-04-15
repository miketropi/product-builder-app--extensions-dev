import { useProductBuilderContext } from "../context/ProductBuilderContext";
import OptionMetaBox from "./OptionMetaBox";

export default function ProductOptionMeta() {
  const { 
    variantObjectCurrent, 
    optionsSelected, 
    onUpdateOptions_Fn } = useProductBuilderContext();
  return <div className="__product-option-meta">
    {
      variantObjectCurrent && variantObjectCurrent?.builderData?.__options && 
      variantObjectCurrent?.builderData?.__options.map((o, __o_index) => {
        const { __key } = o;
        const value = optionsSelected.find(__i => __i.__key === __key)?.value;
        return <OptionMetaBox 
          key={ __key } 
          boxOption={ o } 
          indexNum={ __o_index + 1 }
          value={ value }
          onSelect={ item => {
            onUpdateOptions_Fn(__key, item.name)
          } } />
      })
    }
  </div>
}