import { useCallback } from "react";
import DynamicField from './fields/DynamicField'

export default function Question({ q, onAnswer, onNext }) {
  const { __key, question, content, field } = q;
  return <div className="question-frame">
    <h4 className="question-text">{ question }</h4>
    {
      content && <div className="question-content" dangerouslySetInnerHTML={{ __html: content }}></div>
    }
    {
      field && <div className="question-field">
        <DynamicField { ...field } />
      </div>
    }
  </div>
}