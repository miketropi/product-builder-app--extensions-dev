export default function BoxNumber({ number, active }) {
  const activeIcon = (<svg viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M7.82857 0.176471C7.6 -0.0588235 7.25714 -0.0588235 7.02857 0.176471L2.74286 4.58823L0.971428 2.76471C0.742857 2.52941 0.4 2.52941 0.171429 2.76471C-0.0571429 3 -0.0571429 3.35294 0.171429 3.58824L2.34286 5.82353C2.45714 5.94118 2.57143 6 2.74286 6C2.91429 6 3.02857 5.94118 3.14286 5.82353L7.82857 1C8.05714 0.764706 8.05714 0.411765 7.82857 0.176471Z" fill="#006875"/> </svg>)

  return <span className="__box-number">
    { active ? activeIcon : number }
  </span>
} 