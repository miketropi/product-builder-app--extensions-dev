export default function ButtonAddToCart({ onClick, disable }) {
  const __iconATC = (
  <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 14C6 14.1978 5.94135 14.3911 5.83147 14.5556C5.72159 14.72 5.56541 14.8482 5.38268 14.9239C5.19996 14.9996 4.99889 15.0194 4.80491 14.9808C4.61093 14.9422 4.43275 14.847 4.29289 14.7071C4.15304 14.5673 4.0578 14.3891 4.01921 14.1951C3.98063 14.0011 4.00043 13.8 4.07612 13.6173C4.15181 13.4346 4.27998 13.2784 4.44443 13.1685C4.60888 13.0587 4.80222 13 5 13C5.26522 13 5.51957 13.1054 5.70711 13.2929C5.89464 13.4804 6 13.7348 6 14ZM11.5 13C11.3022 13 11.1089 13.0587 10.9444 13.1685C10.78 13.2784 10.6518 13.4346 10.5761 13.6173C10.5004 13.8 10.4806 14.0011 10.5192 14.1951C10.5578 14.3891 10.653 14.5673 10.7929 14.7071C10.9327 14.847 11.1109 14.9422 11.3049 14.9808C11.4989 15.0194 11.7 14.9996 11.8827 14.9239C12.0654 14.8482 12.2216 14.72 12.3315 14.5556C12.4414 14.3911 12.5 14.1978 12.5 14C12.5 13.7348 12.3946 13.4804 12.2071 13.2929C12.0196 13.1054 11.7652 13 11.5 13ZM14.3375 5.1375L12.6875 10.9125C12.5969 11.2256 12.4072 11.5008 12.1469 11.6969C11.8866 11.893 11.5697 11.9993 11.2437 12H5.25625C4.93034 11.9993 4.61345 11.893 4.35312 11.6969C4.0928 11.5008 3.9031 11.2256 3.8125 10.9125L2.1625 5.14375V5.13125L1.55 3H0.5C0.367392 3 0.240215 2.94732 0.146447 2.85355C0.0526784 2.75979 0 2.63261 0 2.5C0 2.36739 0.0526784 2.24021 0.146447 2.14645C0.240215 2.05268 0.367392 2 0.5 2H1.55C1.76719 2.00079 1.97829 2.07182 2.15177 2.2025C2.32525 2.33317 2.4518 2.51647 2.5125 2.725L3.01875 4.5H13.8562C13.9337 4.49992 14.0101 4.51783 14.0794 4.55232C14.1488 4.58681 14.2092 4.63694 14.2558 4.69875C14.3025 4.76056 14.3342 4.83237 14.3483 4.90851C14.3625 4.98465 14.3588 5.06304 14.3375 5.1375ZM13.1938 5.5H3.30625L4.775 10.6375C4.8049 10.742 4.86805 10.834 4.95489 10.8994C5.04173 10.9648 5.14753 11.0001 5.25625 11H11.2437C11.3525 11.0001 11.4583 10.9648 11.5451 10.8994C11.6319 10.834 11.6951 10.742 11.725 10.6375L13.1938 5.5Z" fill="white"/>
  </svg>
  )
  return <button 
    className={ ['button product-builder__button-add-to-cart', (disable ? '__disable' : '')].join(' ') } 
    onClick={ onClick }>
    Add To Cart { __iconATC }
  </button>
}