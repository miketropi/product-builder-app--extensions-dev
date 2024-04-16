import { useProductBuilderContext } from "../context/ProductBuilderContext";
import OptionMetaBox from "./OptionMetaBox";

export default function ProductOptionMeta() {
  const { 
    variantObjectCurrent, 
    optionsSelected, 
    currentStepNumber, 
    setCurrentStepNumber, 
    onUpdateOptions_Fn } = useProductBuilderContext();
  return <div className="__product-option-meta">
    {
      variantObjectCurrent && variantObjectCurrent?.builderData?.__options && 
      variantObjectCurrent?.builderData?.__options.map((o, __o_index) => {
        const { __key } = o;
        const value = optionsSelected.find(__i => __i.__key === __key)?.value;
        let num = __o_index + 1;
        return <OptionMetaBox 
          key={ __key } 
          boxOption={ o } 
          indexNum={ num }
          value={ value }
          toggle={ (currentStepNumber == num ? true : false) }
          toggleTargetClick={ e => {
            setCurrentStepNumber(num);
          } }
          onSelect={ item => {
            onUpdateOptions_Fn(__key, item.name);
            
            const __next = currentStepNumber + 1
            setCurrentStepNumber(__next)
          } } />
      })
    }
  </div>
}