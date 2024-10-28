import { useState } from "react";
import MenuIcon from "./MenuIcon"; 

const __WITHOUT_ARROW_TYPES = [
  '__BLOCK_MENU__', 
  '__BLOCK_MENU_IMAGE__', 
  '__BLOCK_BRAND__', 
  '__BLOCK_MENU_IMAGE__',
];

export default function DynamicMenuItem(props) {
  const [ open, setOpen ] = useState(false);
  const { menu, parentItem, level, children, hasMenuChildren } = props;
  const { __key, name, url, type, open_new_window } = menu;

  let liClasses = [
    'menu-item', 
    `__level-${ level }`,
    `__item-key-${ __key }`, 
    `__item-type-${ type }`, 
    (__WITHOUT_ARROW_TYPES.includes(type) ? `__flat-child` : ''), 
    (open ? '__open' : ''), 
    menu?.custom_class,
  ];

  const arrow = (
    <>
      {
        (() => {
          if(__WITHOUT_ARROW_TYPES.includes(type)) return '';
          if(!hasMenuChildren) return '';

          return <div 
            className="__toggle-menu" 
            onClick={ e => setOpen(!open) }>
              <MenuIcon source={ 'arrow_next' } />
          </div>
        })()
      }
    </>
  )

  const image = (
    <>
      {
        (() => {
          const supportImageTypes = ['__BLOCK_BRAND_ITEM__', '__BLOCK_MENU_IMAGE_ITEM__']
          if(!supportImageTypes.includes(type)) return;
          return <img className="__image-item" src={ menu?.image } alt="#" />
        })()
      }
    </>
  )

  let customEventClick = {};
  if(level == 1 && hasMenuChildren == true) {
    customEventClick.onClick = e => {
      e.preventDefault();
      setOpen(!open);
    }
  }

  let linkAttributes = {};
  if(url) {
    linkAttributes.href = url;
  }

  if(open_new_window == true) { 
    linkAttributes.target = "_blank"; 
  }
  
  return <li className={ liClasses.join(' ') }>
    {/* { JSON.stringify(menu) } */}
    <a { ...linkAttributes } { ...customEventClick } >
      {/* { JSON.stringify(menu?.image) } */}
      { image }
      <span className="__name-item">{ name }</span>
    </a>
    { arrow }
    { children }
  </li>
}