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
                <a href={ __parent_item.config.custom_url }>
                  { __parent_item.config.custom_text }
                  <MenuIcon source={ 'arrow_next' } />
                </a>
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
              (children && children.length > 0 ? `__has-children` : ''),
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
      {
        __parent_item?.type && __parent_item.type == '__MEGASHOP__' && 
        <li className="__menu-item __menu-item-type__custom-html"></li> 
      }
    </ul>)

    return __ul;
  }

  return <div className="menu-builder-container">
    { (menuData && menuData.length > 0) && renderMenu(menuData) }
    <a href="#" className="menu-builder-mobi__open">
      <MenuIcon source={ 'menu_toggle' } /> 
    </a>
    <MenuMobi />
  </div>
}