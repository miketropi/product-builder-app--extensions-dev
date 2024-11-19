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
    <h2>Thank you for sharing your preferences!</h2>
    <p>We're curating a special selection of products just for you.</p>
    <div className="r__spacing"></div>
    <Loading />
    <div className="r__spacing"></div>
    <p>You'll be redirected in { counter } seconds</p> 
    <button className="button-redirect-now" onClick={ e => {
      e.preventDefault();
      window.location.href = makeRedirectUrl();
    } }>See Results</button>
    {/* <a href="#" className="r__start-again" onClick={ e => {
      e.preventDefault();
      location.reload();
    } }><StartAgainIcon /> Start again</a> */}
  </div>
}

const StartAgainIcon = () => {
  return <div dangerouslySetInnerHTML={{__html: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M8 16C5.76667 16 3.875 15.225 2.325 13.675C0.775 12.125 0 10.2333 0 8C0 5.76667 0.775 3.875 2.325 2.325C3.875 0.775 5.76667 0 8 0C9.15 0 10.25 0.237333 11.3 0.712C12.35 1.18667 13.25 1.866 14 2.75V0H16V7H9V5H13.2C12.6667 4.06667 11.9377 3.33333 11.013 2.8C10.0883 2.26667 9.084 2 8 2C6.33333 2 4.91667 2.58333 3.75 3.75C2.58333 4.91667 2 6.33333 2 8C2 9.66667 2.58333 11.0833 3.75 12.25C4.91667 13.4167 6.33333 14 8 14C9.28333 14 10.4417 13.6333 11.475 12.9C12.5083 12.1667 13.2333 11.2 13.65 10H15.75C15.2833 11.7667 14.3333 13.2083 12.9 14.325C11.4667 15.4417 9.83333 16 8 16Z" fill="#666666"/> </svg>`}}></div>
}