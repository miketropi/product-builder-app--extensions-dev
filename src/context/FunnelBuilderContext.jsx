import { createContext, useContext, useEffect, useState, useCallback, useRef, useMemo } from "react";
import FunnelApi from '../libs/FunnelApi';
import FunnelProxyApi from "../libs/FunnelProxyApi";

const FunnelBuilderContext = createContext(null);

const FunnelBuilderContextProvider = (props) => {
  const { children, storeId, funnelId, ENDPOINT, API_KEY } = props;
  const API = useRef(null);
  const ProxyApi = useRef(null);
  const [ initLoading, setInitLoading ] = useState(true);
  const [ funnelData, setFunnelData ] = useState(null);
  const [ funnelFieldData, setFunnelFieldData ] = useState([]);
  const [ questionCurrentViewID, setQuestionCurrentViewID ] = useState(null);
  const [ historyPassedSteps, setHistoryPassedSteps ] = useState([]);
  const [ sectionHeight, setSectionHeight ] = useState(0);
  const [ effectDirection, setEffectDirection ] = useState('__NEXT__');
  const [ funnelFilterData, setFunnelFilterData ] = useState({
    filters: [],
  });

  useEffect(() => {
    API.current = new FunnelApi(storeId);
    ProxyApi.current = new FunnelProxyApi();
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

    if(res?.collection_object_default) {
      if(res?.collection_object_default?.handle) {
        onAddFilterData({
          __key: 'init_key__collection_default',
          type: 'collection',
          value: res?.collection_object_default?.handle,
        })
      }
    }

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
    // console.log('__found', __found, __funnelFieldData[__found], value)
    setFunnelFieldData(__funnelFieldData);
    if(cb) cb.call('', qKey, value, __funnelFieldData) 
  }

  const findNextStep = (qKey, handle) => {
    
    // console.log('findNextStep', qKey, handle); return; 
    let Edges = funnelData?.funnel_connectors?.edges;
    // console.log('findNextStep', Edges.find(e => e.source == qKey)); return;

    let found = Edges.find(e => e.source == qKey && e.sourceHandle == handle); 
    if(found) return found;

    // console.log('findNextStep', found);
    let foundOnlySource = null;

    // if(Array.isArray(handle)) {
    //   foundOnlySource = Edges.find(e => e.source == qKey); 
    // }

    foundOnlySource = Edges.find(e => e.source == qKey); 
    
    // console.log([qKey, handle, found, foundOnlySource]) 
    // console.log(found);
    return foundOnlySource;
  }

  const onNextStep = () => {
    setEffectDirection('__NEXT__');
    // console.log(questionCurrentViewID); return;
    // console.log(questionCurrentViewID); return;
    // console.log('questionCurrentViewID', questionCurrentViewID);
    nodeActionController(questionCurrentViewID, { 
      QuestionNode: (node) => { // console.log('onNextStep', node);
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

  const onFunnelOptionsFilter = async (field = {}) => {
    const res = await ProxyApi.current.funnelOptionsFilter({
      ...funnelFilterData,
      field,
    });

    return res;
  }

  /**
   * 
   * @param {*} field 
    {
      __key: '123',
      type: '',
      value: '',
    }
   */
  const onAddFilterData = (field) => {
    let __funnelFilterData = {...funnelFilterData}
    let __filters = [...__funnelFilterData.filters];
    const { __key, type, value } = field;
    let foundIndex = __filters.findIndex(item => (item.__key == __key));

    if(foundIndex === -1) {
      // not exist
      __filters.push(field);
    } else {
      __filters[foundIndex].value = value;
    }

    __funnelFilterData.filters = __filters;
    setFunnelFilterData(__funnelFilterData);
  }

  const onRemoveFilterData = (field) => {
    const { __key, type, value } = field;
    let __funnelFilterData = {...funnelFilterData}
    let __filters = [...__funnelFilterData.filters];
    let foundIndex = __filters.findIndex(item => (item.__key == __key));

    __filters.splice(foundIndex, 1);
    __funnelFilterData.filters = __filters;
    setFunnelFilterData(__funnelFilterData);
  }

  const value = {
    initLoading, setInitLoading,
    funnelData, setFunnelData,
    funnelFieldData, setFunnelFieldData,
    questionCurrentViewID, setQuestionCurrentViewID,
    historyPassedSteps, setHistoryPassedSteps,
    sectionHeight, setSectionHeight,
    effectDirection, setEffectDirection,
    funnelFilterData, setFunnelFilterData,
    fn: {
      onUpdateFunnelField,
      onNextStep,
      onPrevStep,
      canNextStep,
      canPrevStep,

      onFunnelOptionsFilter,
      onAddFilterData,
      onRemoveFilterData,
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