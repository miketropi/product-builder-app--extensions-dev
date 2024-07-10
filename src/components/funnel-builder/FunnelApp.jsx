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
          <div>Edges</div>
          <pre dangerouslySetInnerHTML={{__html: JSON.stringify(funnelData?.funnel_connectors?.edges, null, "\t") }}></pre>
          <pre dangerouslySetInnerHTML={{__html: JSON.stringify(funnelData?.funnel_connectors?.nodes, null, "\t") }}></pre>
          <pre dangerouslySetInnerHTML={{__html: JSON.stringify(funnelFieldData, null, "\t") }}></pre>
          
          {
            questions.map((q) => {
              const { __key } = q;
              q.value = funnelFieldData.find(f => f.__key === __key)?.value;
              
              return <Question key={ __key } q={ q } />
            })
          }
        </div>
      })()
    }
  </div>
}