import { useProductBuilderContext } from '../../context/ProductBuilderContext';
import OptionMetaBoxV2 from './OptionMetaBoxV2';

export default function ProductOptionMetaV2() {
  const {
    variantObjectCurrent,
    optionsSelected,
    currentStepNumber,
    setCurrentStepNumber,
    onUpdateOptions_Fn,
  } = useProductBuilderContext();

  return (
    <div className="pb2__option-meta">
      {variantObjectCurrent?.builderData?.__options?.map((o, i) => {
        const { __key } = o;
        const value = optionsSelected.find(s => s.__key === __key)?.value;
        const num = i + 1;

        return (
          <OptionMetaBoxV2
            key={__key}
            boxOption={o}
            indexNum={num}
            value={value}
            toggle={currentStepNumber === num}
            toggleTargetClick={() => setCurrentStepNumber(num)}
            onSelect={(item) => {
              onUpdateOptions_Fn(__key, item.name);
              setCurrentStepNumber(currentStepNumber + 1);
            }}
          />
        );
      })}
    </div>
  );
}
