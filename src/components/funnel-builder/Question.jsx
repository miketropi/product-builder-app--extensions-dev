import { useCallback, Fragment, useEffect, useState } from "react";
import { useFunnelBuilderContext } from "../../context/FunnelBuilderContext";
import DynamicField from './fields/DynamicField'

const __PREV_ICON = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M20 12H4M4 12L10 6M4 12L10 18" stroke="black" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/> </svg>`;
const __NEXT_ICON = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M4 12H20M20 12L14 6M20 12L14 18" stroke="black" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/> </svg>`;
const __ARROW_BACK = `<svg width="6" height="12" viewBox="0 0 6 12" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M5.33962 -2.33402e-07L2.62268e-07 6L5.33962 12L6 11.2474L1.33019 6L6 0.75265L5.33962 -2.33402e-07Z" fill="#747474"/> </svg>`;

export default function Question({ q }) { 
  const { funnelFieldData, historyPassedSteps, questionCurrentViewID, fn, newHistoryState } = useFunnelBuilderContext();
  const { 
    onUpdateFunnelField, 
    canNextStep, 
    onNextStep, 
    canPrevStep, 
    onPrevStep,
    onPushHistory,
    onBackHisttory, } = fn;
  const { __key, question, content, field } = q;
  const { required } = field;  
  const [ __value, set__Value ] = useState('');

  useEffect(() => {
    if(__value && ['QSingleChoice', 'QCollectionChoice', 'QTagChoice'].includes(field?.type)) {
      onNextStep();
    } 
  }, [__value]); 

  useEffect(() => {
    // if(questionCurrentViewID != __key) return;

    // if(['QSingleChoice'].includes(field?.type)) {
    //   if(canNextStep()) { onNextStep() }
    // } 
  }, [funnelFieldData])

  return <>
    <div  className="question-frame">
      {/* { JSON.stringify(newHistoryState) } */}
      <div className="q-heading">
        <div className="q-heading__back">
          {
            newHistoryState.length > 0 && <a 
              className="q-heading__back-action"
              href="#" 
              onClick={ e => {  
                e.preventDefault(); 
                onBackHisttory() 
              } }
            >
              <span dangerouslySetInnerHTML={{__html: __ARROW_BACK}}></span>
              Back
            </a>
          }
        </div>
        <h4 className="q-heading__question-text question-text">{ question }</h4>
        <div className="q-heading__empty"></div>
      </div>
      {
        content && 
        <div 
          className="question-content" 
          dangerouslySetInnerHTML={{ __html: content }}></div>
      }
      {
        field && 
        <div className="question-field">
          {/* { funnelFieldData.find(f => f.__key == __key)?.value } */}
          <DynamicField 
            { ...(() => {
              return { ...field, value: funnelFieldData.find(f => f.__key == __key)?.value, __qkey: q.__key }
            })() } 
            onChange={ v => {
              // console.log('-- update --', v);
              onUpdateFunnelField(__key, v);
              set__Value(v); 
            } } />
        </div>
      }

      {/* <div className="action-buttons">
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
      </div> */}
    </div>
  </>
}