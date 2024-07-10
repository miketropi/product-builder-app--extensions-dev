import { createContext, useContext, useEffect, useState, useCallback, useRef } from "react";
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

  const onUpdateFunnelField = (qKey, value) => {
    const __funnelFieldData = [...funnelFieldData];
    let __found = __funnelFieldData.findIndex(f => f.__key == qKey);

    __funnelFieldData[__found] = { ...__funnelFieldData[__found], value: value }
    setFunnelFieldData(__funnelFieldData);
  }

  const findNextStep = (qKey, handle) => {
    let Edges = funnelData?.funnel_connectors?.edges;
    let found = Edges.find(e => e.source == qKey && e.sourceHandle == handle);
    console.log(found);
    return found;
  }

  const onNextStep = () => {
    const found = funnelFieldData.find(f => f.__key == questionCurrentViewID);
    const type = onCheckTypeFunnel(found?.__key);

    const actionByType = {
      QuestionNode: () => {
        const { __key, value, required } = found;
        const edge = findNextStep(__key, value);
        setQuestionCurrentViewID(edge?.target);
      },
      RedirectNode: () => {
        console.log(found);
      }
    }

    actionByType[type]();
  }

  const onPrevStep = () => {

  }

  const canNextStep = () => {
    // funnelData?.funnel_connectors?.nodes
    const found = funnelFieldData.find(f => f.__key == questionCurrentViewID);
    const type = onCheckTypeFunnel(found?.__key);

    if(type != 'QuestionNode') return false;

    if(found.required == true && found.value == '') { return false; } 
    else { return true; }
  }

  const value = {
    initLoading, setInitLoading,
    funnelData, setFunnelData,
    funnelFieldData, setFunnelFieldData,
    questionCurrentViewID, setQuestionCurrentViewID,
    historyPassedSteps, setHistoryPassedSteps,
    fn: {
      onUpdateFunnelField,
      onNextStep,
      onPrevStep,
      canNextStep,
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