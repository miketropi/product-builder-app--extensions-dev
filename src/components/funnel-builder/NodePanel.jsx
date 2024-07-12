import { useFunnelBuilderContext } from '../../context/FunnelBuilderContext';
import useMeasure from 'react-use-measure'
import { useSpring, animated } from '@react-spring/web';

export default function NodePanel({ node, children }) {
  const { id, type } = node;
  const { questionCurrentViewID } = useFunnelBuilderContext();
  const [ref, { width }] = useMeasure();
  const props = useSpring({ opacity: (questionCurrentViewID == id ? 1 : 0) })

  return <div 
    ref={ ref }
    className={ ['node-panel-comp', `__node-id-${ id }`, `__type-${ type }`].join(' ') }>
    <animated.div style={ props }>
      { children }
    </animated.div>
  </div>
}