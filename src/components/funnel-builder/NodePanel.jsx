import { useFunnelBuilderContext } from '../../context/FunnelBuilderContext';
import useMeasure from 'react-use-measure'
import { useSpring, animated } from '@react-spring/web';
import { useEffect } from 'react';

export default function NodePanel({ node, children, style }) {
  const { id, type } = node;
  const { questionCurrentViewID, setSectionHeight } = useFunnelBuilderContext();
  const [ref, { width, height }] = useMeasure();
  // const props = useSpring({ opacity: (questionCurrentViewID == id ? 1 : 0) })

  useEffect(() => {
    if(id == questionCurrentViewID) {
      setSectionHeight(height)
    }
  }, [ref])

  return <div 
    ref={ ref }
    className={ ['node-panel-comp', `__node-id-${ id }`, `__type-${ type }`].join(' ') }>
    <animated.div style={ style }>
      {/* { JSON.stringify(node) } - { questionCurrentViewID } */}
      { children }
    </animated.div>
  </div>
}