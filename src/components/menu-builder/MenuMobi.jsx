import { useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { useMenuBuilderContext } from "../../context/MenuBuilderContext";
import MenuIcon from "./MenuIcon";

export default function MenuMobi() {
  const { 
    mobiMenuData, 
    mobiItemsCurrent, 
    setMobiItemsCurrent, 
    jumpDeep, 
    onJumpMobiNav_Fn, 
    onBack_Fn,
    parentItem } = useMenuBuilderContext();
  const wrapEl = useRef(null);

  useEffect(() => {
    wrapEl.current = document.createElement('div');
    document.body.appendChild(wrapEl.current);
  }, [])

  const renderMenuMobi = (menu, lv = null, __parent_item) => {
    lv = (lv === null) ? 0 : lv += 1;
    let classesUl = (lv == 0 ? ['menu-builder-mobi'] : [
      'menu-builder-mobi__sub', 
      `mobi-sub-lv__${ lv }`, 
      (__parent_item?.type ? `__mobi-type${ __parent_item.type }` : '')]);

    let __li = (
      <>
        {
          jumpDeep.length > 0 && 
          <li className="__menu-item __back-item">
            <a href="#" onClick={ e => {
              e.preventDefault();
              onBack_Fn()
            } }><MenuIcon source={ 'arrow_back' } /> Back</a>
            {/* { JSON.stringify(jumpDeep) }
            { console.log(parentItem) } */}
          </li>
        }
        {
          ['__MEGASHOP_SUBITEM__'].includes(parentItem?.type) && 
          parentItem?.config && 
          <li className={ ['__custom-menu-item', `__custom-type__${ parentItem?.type }`].join(' ') }>
            {/* { JSON.stringify(parentItem?.config) } */}
            <div className="__mobi-menu-banner" style={{ background: `url(${ parentItem?.config?.background_image }) no-repeat, center center / cover, #333` }}>
              <h4>{ parentItem?.name }</h4>
              {
                parentItem?.config?.custom_text && 
                <a href={ parentItem?.config?.custom_url }>
                  { parentItem?.config?.custom_text }
                </a>
              }
            </div>
          </li>
        }
        {
          menu.map((item, __i_index) => {
            const { __key, name, url, children, type, icon } = item;
            let liClasses = [
              '__menu-item', 
              `__item-lv-${ lv }`, 
              (item.type ? `__mobi-menu-item_type__${ type }` : ''),
            ];

            return <li className={ liClasses.join(' ') } key={ __key } data-id={ __key }>
              <a href={ url }>
                { 
                  ['__BLOCK_BRAND_ITEM__', '__BLOCK_MENU_IMAGE_ITEM__'].includes(type) && item?.image &&
                  <div className={ ((__type) => {
                    let __c = {
                      '__BLOCK_BRAND_ITEM__': '__brand-image',
                      '__BLOCK_MENU_IMAGE_ITEM__': '__image',
                    }
                    return __c[__type];
                  })(type) }>
                    <img src={ item.image } />
                  </div> 
                }
                <span className="__menu-item-name">
                  { name }
                </span>
              </a>
              { children && children.length > 0 
                ? (() => {
                  let supportArrow = ['__BLOCK_MENU__'].includes(item.type) ? false : true;
                  return supportArrow && 
                        <MenuIcon  
                          onClick={ e => {
                            onJumpMobiNav_Fn(__key)
                          } } 
                          className={ 'dropdown-icon' } 
                          source={ 'arrow_next' } 
                        />
                })() 
                : '' 
              }
              {/* { (children && children.length > 0) && renderMenuMobi(children, lv, item) } */}

              {
                ['__BLOCK_MENU__'].includes(item.type) && 
                item?.children?.length > 0 && 
                <ul className={ `__sub-custom-type__${ item.type }` }>
                  {
                    item.children.map(__i => {
                      return <li className={ `__sub-item-type__${ __i?.type }` }>{ __i.name }</li>
                    })
                  }
                </ul>
              }
            </li>
          })
        }
      </>
    )

    let __ul = (
      <ul className={ classesUl.join(' ') }>    
        { __li }
      </ul>
    )

    return __ul
  }

  return <>
    {
      wrapEl?.current && 
      ReactDOM.createPortal(
        <>
          { 
            (mobiItemsCurrent && mobiItemsCurrent.length > 0) && 
            <div className="menu-builder-mobi-container">
              <div className="menu-builder-mobi__inner">
                <div className="menu-builder-mobi__nav">
                  { renderMenuMobi(mobiItemsCurrent) }
                </div>
              </div>
            </div> 
          }
        </>,
        wrapEl.current
      )
    }
  </>;
}