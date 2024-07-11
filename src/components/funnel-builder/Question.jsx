import { useCallback, Fragment } from "react";
import { useFunnelBuilderContext } from "../../context/FunnelBuilderContext";
import DynamicField from './fields/DynamicField'
import useMeasure from 'react-use-measure'
import { useSpring, animated } from '@react-spring/web';

const __PREV_ICON = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M20 12H4M4 12L10 6M4 12L10 18" stroke="black" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/> </svg>`;
const __NEXT_ICON = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M4 12H20M20 12L14 6M20 12L14 18" stroke="black" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/> </svg>`;

export default function Question({ q }) { 
  const { historyPassedSteps, questionCurrentViewID, fn } = useFunnelBuilderContext();
  const { onUpdateFunnelField, canNextStep, onNextStep, canPrevStep, onPrevStep } = fn;
  const [ref, { width }] = useMeasure();
  const { __key, question, content, field } = q;
  const { required } = field;
  const props = useSpring({ opacity: (questionCurrentViewID == __key ? 1 : 0) })
  

  return <>
    <div ref={ ref }>
      <animated.div style={props}>
        <div  className="question-frame">
          <h4 className="question-text">{ question }</h4>
          {
            content && 
            <div 
              className="question-content" 
              dangerouslySetInnerHTML={{ __html: content }}></div>
          }
          {
            field && 
            <div className="question-field">
              <DynamicField 
                { ...field  } 
                onChange={ v => {
                  onUpdateFunnelField(__key, v);
                } } />
            </div>
          }

          <div className="action-buttons">
            <div 
              onClick={ onPrevStep } 
              className={ ['__prev __action', canPrevStep() ? '' : '__disable'].join(' ') }>
              <span className="__icon" dangerouslySetInnerHTML={{ __html: __PREV_ICON }}></span>
              Previous
            </div>
            <div 
              onClick={ onNextStep } 
              className={ ['__next __action', canNextStep() ? '' : '__disable'].join(' ') }>
              Next 
              <span className="__icon" dangerouslySetInnerHTML={{ __html: __NEXT_ICON }}></span>
            </div>
          </div>
        </div>
      </animated.div>
    </div>
  </>
}