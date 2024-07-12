import { useFunnelBuilderContext } from '../../context/FunnelBuilderContext';
import NodePanel from './NodePanel';
import Question from './Question';

export default function FunnelApp() {
  const { initLoading, funnelData, funnelFieldData, historyPassedSteps } = useFunnelBuilderContext();
  
  return <div className="funnel-app-container">
    {
      (() => {
        if(initLoading == true) {
          return <div className="__loading">Loading...!</div>
        }
        const nodes = funnelData?.funnel_connectors?.nodes;
        const { questions } = funnelData;

        return <div className="question-container">
          {/* <div>Edges</div>
          <pre dangerouslySetInnerHTML={{__html: JSON.stringify(funnelData?.funnel_connectors?.edges, null, "\t") }}></pre>
          <pre dangerouslySetInnerHTML={{__html: JSON.stringify(funnelData?.funnel_connectors?.nodes, null, "\t") }}></pre>
          <pre dangerouslySetInnerHTML={{__html: JSON.stringify(funnelFieldData, null, "\t") }}></pre>
           */}
          {
            nodes.map(n => {
              const { id, data, type } = n;
              const __childrenByType = {
                StartNode: () => <>Start...!</>,
                QuestionNode: () => {
                  const { question_key } = data;
                  const q = questions.find(_q => _q.__key === question_key);
                  return <Question key={ q.__key } q={ q } />
                },
                RedirectNode: () => {

                }
              }
              return <NodePanel key={ id } node={ n }>
                { __childrenByType[type](n) }
              </NodePanel>
            })
          }
          {/* {
            questions.map((q) => {
              const { __key } = q;
              q.value = funnelFieldData.find(f => f.__key === __key)?.value;
              
              return <Question key={ __key } q={ q } />
            })
          } */}
        </div>
      })()
    }
  </div>
}