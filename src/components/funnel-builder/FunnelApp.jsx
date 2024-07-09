import { useFunnelBuilderContext } from '../../context/FunnelBuilderContext';
import Question from './Question';

export default function FunnelApp() {
  const { initLoading, funnelData, funnelFieldData } = useFunnelBuilderContext();
  
  return <div className="funnel-app-container">
    {
      (() => {
        if(initLoading == true) {
          return <div className="__loading">Loading...!</div>
        }
        
        const { questions } = funnelData;
        return <div className="question-container">
          { JSON.stringify(funnelFieldData) }
          {
            questions.map((q) => {
              const { __key } = q;
              return <Question key={ __key } q={ q } />
            })
          }
        </div>
      })()
    }
  </div>
}