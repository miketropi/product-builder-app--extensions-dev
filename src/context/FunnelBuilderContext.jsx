import { createContext, useContext, useEffect, useState, useCallback, useRef, useMemo } from "react";
import FunnelApi from '../libs/FunnelApi';

const FunnelBuilderContext = createContext(null);

const FunnelBuilderContextProvider = (props) => {
  const { children, storeId, funnelId, ENDPOINT, API_KEY } = props;
  const API = useRef(null);
  const [ initLoading, setInitLoading ] = useState(true);
  const [ funnelData, setFunnelData ] = useState(null);
  const [ funnelFieldData, setFunnelFieldData ] = useState([]);
  const [ questionCurrentViewID, setQuestionCurrentViewID ] = useState(null);
  const [ historyPassedSteps, setHistoryPassedSteps ] = useState([]);
  const [ sectionHeight, setSectionHeight ] = useState(0);
  const [ effectDirection, setEffectDirection ] = useState('__NEXT__')

  useEffect(() => {
    API.current = new FunnelApi(storeId);
    init();
  }, [])

  const init = async () => {
    await getFunnel(funnelId)
    setInitLoading(false);
  }

  const buildFieldDataInit = (questions) => {
    return questions.map(q => {
      const { __key, question, field } = q;
      return {
        __key,
        question,
        value: (field?.value ?? ''),
        required: (field?.required ?? false),
      }
    })
  }

  const getFunnel = async (fid) => {
    const res = await API.current.getItem(fid);
    setFunnelData(res);
    setFunnelFieldData(buildFieldDataInit(res.questions));

    let firstQuestionID = res?.funnel_connectors?.edges.find(i => i.source == '__START__')?.target;
    setQuestionCurrentViewID(firstQuestionID);
  }

  const onCheckTypeFunnel = (id) => {
    const nodes = funnelData?.funnel_connectors?.nodes;
    const found = nodes.find(n => n.id == id);
    return found?.type;
  }

  const getNodeItem = (nodeID) => {
    const nodes = funnelData?.funnel_connectors?.nodes;
    const node = nodes.find(n => n.id == nodeID);
    return node;
  }

  const onUpdateFunnelField = (qKey, value, cb) => {
    const __funnelFieldData = [...funnelFieldData];
    let __found = __funnelFieldData.findIndex(f => f.__key == qKey);

    __funnelFieldData[__found] = { ...__funnelFieldData[__found], value: value }
    setFunnelFieldData(__funnelFieldData);

    if(cb) cb.call(qKey, value, __funnelFieldData)
  }

  const findNextStep = (qKey, handle) => {
    // console.log(qKey, handle); return;
    let Edges = funnelData?.funnel_connectors?.edges;
    let found = Edges.find(e => e.source == qKey && e.sourceHandle == handle);
    let foundOnlySource = Edges.find(e => e.source == qKey);
    // console.log(found);
    return found ? found : foundOnlySource;
  }

  const onNextStep = () => {
    setEffectDirection('__NEXT__');
    // console.log(questionCurrentViewID); return;
    // console.log(questionCurrentViewID); return;

    nodeActionController(questionCurrentViewID, {
      QuestionNode: (node) => {
        const found = funnelFieldData.find(f => f.__key == questionCurrentViewID);
        const { __key, value, required } = found;
        const edge = findNextStep(__key, value);
        // console.log(edge); return;
        setQuestionCurrentViewID(edge?.target);
        setHistoryPassedSteps([...historyPassedSteps, questionCurrentViewID])
      }, 
      RedirectNode: (node) => {
        // ???
      }
    })

  }

  const onPrevStep = () => {
    setEffectDirection('__PRIV__');

    let __historyPassedSteps = [...historyPassedSteps];
    const lastID = __historyPassedSteps.pop();
    setQuestionCurrentViewID(lastID);
    setHistoryPassedSteps(__historyPassedSteps);
  }

  const nodeActionController = (nodeID, handleType) => {
    // console.log(nodeID, handleType)
    const node = getNodeItem(nodeID); // node type

    if(handleType[node?.type]) {
      return handleType[node?.type](node);
    } else {
      console.error(`Type: ${ node?.type } not support!!!`);
    }
  }

  const canNextStep = () => {
    return nodeActionController(questionCurrentViewID, {
      QuestionNode: (node) => {
        const { id } = node;
        const found = funnelFieldData.find(f => f.__key == id);
        if(found.required == true && found.value == '') { return false; } 
        else { return true; }
      },
      RedirectNode: (node) => {
        // console.log(node?.data);
        return false;
      }
    })
  }

  const canPrevStep = () => {
    if(historyPassedSteps.length > 0) {
      return true;
    }

    return false;
  }

  const value = {
    initLoading, setInitLoading,
    funnelData, setFunnelData,
    funnelFieldData, setFunnelFieldData,
    questionCurrentViewID, setQuestionCurrentViewID,
    historyPassedSteps, setHistoryPassedSteps,
    sectionHeight, setSectionHeight,
    effectDirection, setEffectDirection,
    fn: {
      onUpdateFunnelField,
      onNextStep,
      onPrevStep,
      canNextStep,
      canPrevStep,
    }
  }

  return <FunnelBuilderContext.Provider value={ value } >
    { children }
  </FunnelBuilderContext.Provider>
}

const useFunnelBuilderContext = () => {
  return useContext(FunnelBuilderContext);
}

export { FunnelBuilderContextProvider, useFunnelBuilderContext }