import { Fragment } from "react";
import { useMenuBuilderContext } from "../../context/MenuBuilderContext";
import MenuIcon from "./MenuIcon";
import MenuMobi from "./MenuMobi";

export default function MenuBuilderApp() {
  const { version, menuData } = useMenuBuilderContext();

  const renderMenu = (menu, lv = null, __parent_item) => {
    lv = (lv === null) ? 0 : lv += 1;
    let classesUl = (lv == 0 ? ['menu-builder'] : [
      'menu-builder__sub', 
      `sub-lv__${ lv }`, 
      (__parent_item?.type ? `__type${ __parent_item.type }` : '')]);
    
    let __li = (
      <>
        {
          __parent_item?.type && __parent_item.type == '__MEGASHOP_SUBITEM__' && 
          <div 
            className="__menu-item-banner" 
            style={{ background: `url(${ __parent_item.config.background_image }) no-repeat center center / cover, #333` }}>
            <div className="__menu-item-banner__entry">
              <div className="__parent-name">{ __parent_item.name }</div>
              <div className="__custom-link">
                <a href={ __parent_item.config.custom_url }>{ __parent_item.config.custom_text }</a>
              </div>
            </div>
          </div>
        }
        {
          menu.map((item, __i_index) => {
            const { __key, name, url, children, type, icon } = item;
            const size = (item?.config?.containerSize ? `__size-${ item.config.containerSize }` : '');
            
            let liClasses = [
              '__menu-item', 
              `__item-lv-${ lv }`, 
              size,
              (item.type ? `__menu-item_type__${ type }` : ''),
            ];

            return <li className={ liClasses.join(' ') } key={ __key } data-id={ __key }>
              <a href={ url }>
                { icon ? <MenuIcon source={ icon } /> : '' } 
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
                  { children && children.length > 0 ? <MenuIcon className={ 'dropdown-icon' } source={ 'arrow_down' } /> : '' } 
                  {/* { ['__BLOCK_BRAND__'].includes(type) ? <u>Brand Element (⚠️ Not showing on front-end)</u> : '' } */}
                </span>
              </a>
              { (children && children.length > 0) && renderMenu(children, lv, item) }
            </li>
          })
        }
      </>
    ) 

    const containerStyle = {};
    if(__parent_item?.config?.container_padding) {
      containerStyle.padding = __parent_item?.config?.container_padding;
    }

    let __ul = (<ul className={ classesUl.join(' ') }> 
      { 
        __parent_item?.config?.container == true 
          ? <div className="__container-item">
              <div className="__container-item-inner" style={ containerStyle }>{ __li }</div>
              {
                __parent_item?.config?.container_bottom_custom_text && 
                <div className="__container-item__button-custom-link">
                  <a href={ __parent_item?.config?.container_bottom_custom_url }>
                    { __parent_item.config.container_bottom_custom_text }
                    <MenuIcon source={ 'arrow_next' } />
                  </a>
                </div>
              }
            </div> 
          : __li 
      }
    </ul>)

    return __ul;
  }

  return <div className="menu-builder-container">
    { (menuData && menuData.length > 0) && renderMenu(menuData) }
    <a href="#" class="menu-builder-mobi__open">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"> 
        <path d="M11.88 0H0.12C0.054 0 0 0.0613636 0 0.136364V1.22727C0 1.30227 0.054 1.36364 0.12 1.36364H11.88C11.946 1.36364 12 1.30227 12 1.22727V0.136364C12 0.0613636 11.946 0 11.88 0ZM11.88 10.6364H0.12C0.054 10.6364 0 10.6977 0 10.7727V11.8636C0 11.9386 0.054 12 0.12 12H11.88C11.946 12 12 11.9386 12 11.8636V10.7727C12 10.6977 11.946 10.6364 11.88 10.6364ZM11.88 5.31818H0.12C0.054 5.31818 0 5.37955 0 5.45455V6.54545C0 6.62045 0.054 6.68182 0.12 6.68182H11.88C11.946 6.68182 12 6.62045 12 6.54545V5.45455C12 5.37955 11.946 5.31818 11.88 5.31818Z"></path>
      </svg>
    </a>
    <MenuMobi />
  </div>
}