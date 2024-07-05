import { createRoot } from 'react-dom/client';
import { FunnelBuilderContextProvider } from './context/FunnelBuilderContext';
import FunnelApp from './components/funnel-builder/FunnelApp';

const ENDPOINT = process.env.MIX_ENDPOINT;
const API_KEY = process.env.MIX_API_KEY;

((w) => {
  'use strict';
  
  const init = () => {
    const $el = document.getElementById('__FUNNEL_BUILDER_APP__');
    if(!$el) return;

    const root = createRoot($el);
    root.render(<FunnelBuilderContextProvider>
      <FunnelApp />
    </FunnelBuilderContextProvider>);
  }

  document.addEventListener('DOMContentLoaded', () => {
    init();
  })
})(window)