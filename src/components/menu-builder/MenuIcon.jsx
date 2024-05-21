const __ICONS = {
  'HB': `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.88 0H0.12C0.054 0 0 0.0613636 0 0.136364V1.22727C0 1.30227 0.054 1.36364 0.12 1.36364H11.88C11.946 1.36364 12 1.30227 12 1.22727V0.136364C12 0.0613636 11.946 0 11.88 0ZM11.88 10.6364H0.12C0.054 10.6364 0 10.6977 0 10.7727V11.8636C0 11.9386 0.054 12 0.12 12H11.88C11.946 12 12 11.9386 12 11.8636V10.7727C12 10.6977 11.946 10.6364 11.88 10.6364ZM11.88 5.31818H0.12C0.054 5.31818 0 5.37955 0 5.45455V6.54545C0 6.62045 0.054 6.68182 0.12 6.68182H11.88C11.946 6.68182 12 6.62045 12 6.54545V5.45455C12 5.37955 11.946 5.31818 11.88 5.31818Z"/> </svg>`,
  'arrow_down': `<svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 2.5L6 7.5L11 2.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  'arrow_next': `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 16L13 10L7 4" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  'arrow_back': `<svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 1L1 7L7 13" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  'menu_toggle': `<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" class="icon icon-hamburger" fill="none" viewBox="0 0 18 16"><path d="M1 .5a.5.5 0 100 1h15.71a.5.5 0 000-1H1zM.5 8a.5.5 0 01.5-.5h15.71a.5.5 0 010 1H1A.5.5 0 01.5 8zm0 7a.5.5 0 01.5-.5h15.71a.5.5 0 010 1H1a.5.5 0 01-.5-.5z" fill="currentColor"></path></svg>`,
  'menu_close': `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.833496 0.833008L19.1666 19.1662" stroke="#19242D" stroke-width="1.5"/><path d="M19.1665 0.833008L0.833434 19.1662" stroke="#19242D" stroke-width="1.5"/></svg>`,
  
}

export default function MenuIcon ({ source, className, onClick }) {
  return <span 
    onClick={ onClick } 
    className={ ['__menu-icon', className].join(' ') } 
    dangerouslySetInnerHTML={{__html: __ICONS[source]}}></span>
}