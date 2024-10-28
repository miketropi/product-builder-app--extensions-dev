import { useEffect, useState } from "react";
import { useFunnelBuilderContext } from "../../context/FunnelBuilderContext";
import useCountdown from "../../libs/useHooks/useCountdown";
import Loading from '../Loading';

export default function RedirectNode({ nodeData }) {
  const [ loading, setLoading ] = useState(true);
  const { redirect_url } = nodeData;
  const { fn, funnelFieldData, funnelFilterData } = useFunnelBuilderContext();
  const { filters } = funnelFilterData;
  const { onFunnelOptionsFilter } = fn;
  const [ redirectUrl, setRedirectUrl ] = useState('');
  const counter = useCountdown(5);

  const makeRedirectUrl = () => { 
    let __redirect_url = redirect_url;
    let collection_default = filters.find(i => i.__key === 'init_key__collection_default');

    [...funnelFieldData, { __key: '__collection_default_handle', value: collection_default?.value }].forEach(f => {
      
      let __v = (Array.isArray(f.value) ? f.value.join(',') : f.value);
      __redirect_url = __redirect_url.replaceAll(`[value]${ f.__key }[/value]`, __v.replaceAll('Brand_', ''));
    })

    return __redirect_url;
  }

  useEffect(() => {
    if(counter <= 0) {
      window.location.href = redirectUrl;
    }
  }, [counter])

  const getProductByFilter = async () => {
    const res = await onFunnelOptionsFilter({
      type: 'GetProductsByFilter'
    });

    if(res && res.length == 1) {
      setRedirectUrl(`/products/${ res[0]?.node?.handle }?fs=1`); 
    }
  }

  useEffect(() => {
    // console.log(field?.__qkey);
    setRedirectUrl(makeRedirectUrl());

    if(filters.length > 0) {
      getProductByFilter();
    }
  }, [])

  return <div className="redirect-node-comp" style={{ padding: `3em 0` }} > 
    <h2>Thank You!</h2>
    <p>Redirected after { counter }s...</p> 
    <button className="button-redirect-now" onClick={ e => {
      e.preventDefault();
      window.location.href = makeRedirectUrl();
    } }>Redirect Now</button>
  </div>
}