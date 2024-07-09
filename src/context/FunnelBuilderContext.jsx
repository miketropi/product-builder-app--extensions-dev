import { createContext, useContext, useEffect, useState, useCallback, useRef } from "react";
import FunnelApi from '../libs/FunnelApi';

const FunnelBuilderContext = createContext(null);

const FunnelBuilderContextProvider = (props) => {
  const { children, storeId, funnelId, ENDPOINT, API_KEY } = props;
  const API = useRef(null);
  const [ initLoading, setInitLoading ] = useState(true);
  const [ funnelData, setFunnelData ] = useState(null);
  const [ funnelFieldData, setFunnelFieldData ] = useState({});

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
      }
    })
  }

  const getFunnel = async (fid) => {
    const res = await API.current.getItem(fid);
    setFunnelData(res);
    setFunnelFieldData(buildFieldDataInit(res.questions));
  }

  const value = {
    initLoading, setInitLoading,
    funnelData, setFunnelData,
    funnelFieldData, setFunnelFieldData,
  }

  return <FunnelBuilderContext.Provider value={ value } >
    { children }
  </FunnelBuilderContext.Provider>
}

const useFunnelBuilderContext = () => {
  return useContext(FunnelBuilderContext);
}

export { FunnelBuilderContextProvider, useFunnelBuilderContext }