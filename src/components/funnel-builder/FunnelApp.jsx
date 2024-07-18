import { useEffect, useState } from 'react';
import { useFunnelBuilderContext } from '../../context/FunnelBuilderContext';
import NodePanel from './NodePanel';
import Question from './Question';
import { animated, useTransition, useSpringRef } from '@react-spring/web';

const TransitionNodes = (props) => {
  const { funnelData, funnelFieldData, questionCurrentViewID, historyPassedSteps, sectionHeight } = useFunnelBuilderContext();
  const { nodes } = props;
  const { questions } = funnelData;
  const [ currentViewIndex, setCurrentViewIndex ] = useState(0);
  const transRef = useSpringRef()

  useEffect(() => {
    let __index = nodes.findIndex(n => (n.id == questionCurrentViewID));
    setCurrentViewIndex(__index)
  }, [questionCurrentViewID]);

  const transitions = useTransition(currentViewIndex, {
    // ref: transRef,
    from: { opacity: 0, transform: 'translate3d(100%,0,0)' },
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
    leave: { opacity: 0, transform: 'translate3d(-50%,0,0)' },
  });

  return <div className="transition-nodes" style={{ minHeight: `${ sectionHeight }px` }}>
    {
      transitions((style, i) => {
        let n = nodes[i];
        const { id, data, type } = n;
        const __childrenByType = {
          StartNode: () => <>Start...!</>,
          QuestionNode: () => {
            const { question_key } = data;
            const q = questions.find(_q => _q.__key === question_key);
            return <Question key={ q.__key } q={ q } />
          },
          RedirectNode: () => {
            return <>
              { JSON.stringify(data) }
            </>
          }
        }

        return <div className="transition-node-item">
          <NodePanel key={ id } node={ n } style={ style }>
            { __childrenByType[type](n) }
            {/* Hello { id } */}
          </NodePanel>
        </div>
      })
    }
  </div>
}

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
          <pre dangerouslySetInnerHTML={{__html: JSON.stringify(funnelData?.funnel_connectors?.nodes, null, "\t") }}></pre> */}
          <pre dangerouslySetInnerHTML={{__html: JSON.stringify(funnelFieldData, null, "\t") }}></pre>
          
          <TransitionNodes nodes={ nodes } />
          {/* {
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
                  return <>
                    { JSON.stringify(data) }
                  </>
                }
              }
              return <NodePanel key={ id } node={ n }>
                { __childrenByType[type](n) }
              </NodePanel>
            })
          } */}
        </div> 
      })()
    }
  </div>
}