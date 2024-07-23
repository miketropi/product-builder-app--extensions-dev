import { useEffect } from "react";
import { useFunnelBuilderContext } from "../../context/FunnelBuilderContext";
import useCountdown from "../../libs/useHooks/useCountdown";

export default function RedirectNode({ nodeData }) {
  const counter = useCountdown(5);
  const { redirect_url } = nodeData;
  const { funnelFieldData } = useFunnelBuilderContext();

  const makeRedirectUrl = () => {
    let __redirect_url = redirect_url;
    funnelFieldData.forEach(f => {
      let __v = (Array.isArray(f.value) ? f.value.join(',') : f.value);
      __redirect_url = __redirect_url.replaceAll(`[value]${ f.__key }[/value]`, __v);
    })

    return __redirect_url;
  }

  useEffect(() => {
    if(counter <= 0) {
      // alert(makeRedirectUrl())
      window.location.href = makeRedirectUrl();
    }
  }, [counter])

  return <div className="redirect-node-comp" style={{ padding: `3em 0` }} > 
    <h2>Thank You!</h2>
    <p>Redirected after { counter }s...</p> 
    <button className="button-redirect-now" onClick={ e => {
      e.preventDefault();
      window.location.href = makeRedirectUrl();
    } }>Redirect Now</button>
  </div>
}