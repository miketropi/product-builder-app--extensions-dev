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
              onBack_Fn();
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
                  let supportArrow = ['__BLOCK_MENU__', '__BLOCK_MENU_IMAGE__', '__BLOCK_BRAND__'].includes(item.type) ? false : true;
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
                      return <li className={ `__sub-item-type__${ __i?.type }` }>
                        <a href={ __i.url }>
                        <span className="__menu-item-name">{ __i.name }</span>
                        </a>
                        
                      </li>
                    })
                  }
                </ul>
              }

              {
                ['__BLOCK_MENU_IMAGE__'].includes(item.type) && 
                item?.children?.length > 0 && 
                <ul className={ `__sub-custom-type__${ item.type }` }>
                  {
                    item.children.map(__i => {
                      return <li className={ `__sub-item-type__${ __i?.type }` }>
                        <a href={ __i.url }>
                          <div class="__image">
                            <img src={ __i.image } />
                          </div>
                          <span className="__menu-item-name">{ __i.name }</span>
                        </a>
                        
                      </li>
                    })
                  }
                </ul>
              }
              
              {
                ['__BLOCK_BRAND__'].includes(item.type) && 
                item?.children?.length > 0 && 
                <ul className={ `__sub-custom-type__${ item.type }` }>
                  {
                    item.children.map(__i => {
                      return <li className={ `__sub-item-type__${ __i?.type }` }>
                        <a href={ __i.url }>
                          <div class="__image">
                            <img src={ __i.image } />
                          </div>
                          <span className="__menu-item-name">{ __i.name }</span>
                        </a>
                        
                      </li>
                    })
                  }
                </ul>
              }
            </li>
          })
        }

        {
          ['__MEGA__'].includes(parentItem?.type) && 
          parentItem?.config && 
          <li className={ ['__custom-menu-item', `__custom-type__${ parentItem?.type }`].join(' ') }>
            {/* { JSON.stringify(parentItem?.config) } */}
            <div class="__mobi-menu-custom-link">
              <a href={ parentItem?.config?.container_bottom_custom_url }>
                { parentItem?.config?.container_bottom_custom_text } 
                <span class="__menu-icon "><svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M419.3 264.8l-61.8 61.8L542.9 512 357.5 697.4l61.8 61.8L666.5 512z"></path></svg></span>
              </a>
            </div>
          </li>
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
                <div class="menu-builder-mobi__head">
                  <a href="/" class="menu-builder-mobi__logo">
                  <svg width="26" height="22" viewBox="0 0 26 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.2107 7.76356C22.0337 8.1548 23.5241 9.03596 24.5906 10.5603C26.1261 12.7568 26.4294 15.1611 25.3888 17.6386C24.3505 20.1103 22.4666 21.551 19.8488 21.9086C19.4035 21.9689 18.9514 21.9956 18.5016 21.9956C12.6008 22.0014 6.69997 21.9991 0.800312 21.9991C0.561304 21.9991 0.322296 21.9991 0.032555 21.9991C0.0201537 21.7263 0.00211533 21.5208 0.00211533 21.3153C-0.000139464 19.322 -0.00239426 17.3298 0.00211533 15.3364C0.00662491 13.0041 1.63684 11.3219 3.91869 11.3161C7.22647 11.3079 10.5331 11.3172 13.8409 11.3137C15.2524 11.3126 16.5185 10.7089 17.3606 9.60134C17.116 9.59089 16.9266 9.57464 16.7372 9.57464C12.4711 9.57348 8.20617 9.58045 3.94011 9.57C1.90516 9.56535 0.400086 8.28251 0.0539755 6.25781C-0.0204326 5.82477 0.00549751 5.372 0.00437012 4.92736C-0.00126686 3.32757 0.000987932 1.72546 0.000987932 0.0618192C0.217448 0.043244 0.396704 0.0153813 0.574832 0.0153813C4.9728 0.0118984 9.36965 0.0432441 13.7665 0.000288909C17.311 -0.0333786 20.2896 2.87944 20.302 6.66878C20.3031 7.01243 20.2468 7.35723 20.2107 7.76356ZM1.83188 20.0859C2.07201 20.0975 2.23887 20.1126 2.4046 20.1126C7.83639 20.1137 13.2682 20.1161 18.7 20.1091C19.1487 20.1091 19.6064 20.0812 20.0461 19.9918C22.5331 19.4799 24.2276 17.187 24.1295 14.5006C24.0393 12.0417 22.0923 9.92525 19.6413 9.62224C19.6256 9.63269 19.6053 9.63966 19.5951 9.65359C19.5613 9.69886 19.5264 9.74414 19.4982 9.7929C18.1273 12.1369 16.1194 13.2421 13.4565 13.2061C10.2806 13.1631 7.10358 13.1922 3.92771 13.198C2.77438 13.2003 1.88599 13.9352 1.84766 15.0416C1.79016 16.7017 1.83301 18.3654 1.83301 20.087L1.83188 20.0859ZM18.4756 7.68926C18.4193 6.87776 18.4508 6.15681 18.3065 5.47533C17.8556 3.3415 15.8905 1.88451 13.8792 1.89844C10.0461 1.9263 6.21294 1.90425 2.37979 1.90657C2.21632 1.90657 2.05172 1.92979 1.90741 1.9414C1.87359 2.01221 1.84315 2.04588 1.84315 2.07955C1.83526 3.1244 1.87246 4.17042 1.81497 5.21179C1.7338 6.67343 2.54327 7.71828 4.21858 7.70319C8.68983 7.66488 13.1622 7.69042 17.6335 7.69042C17.8556 7.69042 18.0777 7.69042 18.4734 7.69042L18.4756 7.68926Z" fill="#19242D"/>
                  </svg> 
                  <svg width="117" height="12" viewBox="0 0 117 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0.166992H4.33426C4.83774 0.166992 5.34121 0.204488 5.84469 0.27948C6.35911 0.343759 6.8188 0.483031 7.22377 0.697295C7.62874 0.900846 7.9571 1.1901 8.20883 1.56506C8.46057 1.94003 8.58644 2.43819 8.58644 3.05955C8.58644 3.70235 8.40037 4.238 8.02824 4.66653C7.66705 5.08435 7.18547 5.38432 6.58349 5.56644V5.59858C6.96656 5.65215 7.31133 5.75928 7.6178 5.91998C7.9352 6.06996 8.20336 6.26816 8.42226 6.51456C8.65211 6.75025 8.82723 7.02879 8.94763 7.35019C9.06802 7.67158 9.12822 8.01441 9.12822 8.37865C9.12822 8.97859 8.99688 9.48211 8.7342 9.88921C8.47152 10.2856 8.13222 10.607 7.7163 10.8534C7.30039 11.0998 6.82975 11.2766 6.30438 11.3837C5.78996 11.4908 5.27554 11.5444 4.76112 11.5444H0V0.166992ZM2.56116 4.71474H4.41635C4.61336 4.71474 4.8049 4.69332 4.99097 4.65046C5.18798 4.60761 5.3631 4.53797 5.51634 4.44156C5.66957 4.34514 5.78996 4.21658 5.87752 4.05588C5.97603 3.89518 6.02528 3.70235 6.02528 3.47737C6.02528 3.24168 5.97056 3.04884 5.86111 2.89886C5.7626 2.73816 5.63126 2.61496 5.46708 2.52925C5.30291 2.44355 5.11684 2.38462 4.90888 2.35248C4.70092 2.30963 4.49844 2.2882 4.30143 2.2882H2.56116V4.71474ZM2.56116 9.42319H4.85963C5.05664 9.42319 5.25365 9.40176 5.45067 9.35891C5.65862 9.31606 5.84469 9.24107 6.00887 9.13393C6.17304 9.0268 6.30438 8.88753 6.40289 8.71612C6.51234 8.54471 6.56707 8.3358 6.56707 8.0894C6.56707 7.82157 6.49592 7.6073 6.35364 7.44661C6.2223 7.2752 6.05265 7.14664 5.84469 7.06093C5.63673 6.97523 5.41236 6.9163 5.17157 6.88416C4.93077 6.85202 4.7064 6.83596 4.49844 6.83596H2.56116V9.42319Z" fill="#19242D"/>
                    <path d="M25.1635 7.15735C25.1635 7.83228 25.0595 8.45365 24.8515 9.02145C24.6436 9.58925 24.3317 10.0821 23.9157 10.4999C23.5108 10.9177 23.0018 11.2444 22.3889 11.4801C21.776 11.7158 21.07 11.8337 20.271 11.8337C19.4611 11.8337 18.7496 11.7158 18.1367 11.4801C17.5238 11.2444 17.0094 10.9177 16.5935 10.4999C16.1885 10.0821 15.882 9.58925 15.6741 9.02145C15.4661 8.45365 15.3621 7.83228 15.3621 7.15735V0.166992H17.9233V7.06093C17.9233 7.41447 17.978 7.74122 18.0875 8.04119C18.2079 8.34116 18.372 8.60363 18.58 8.82861C18.788 9.04287 19.0342 9.21428 19.3188 9.34284C19.6143 9.46069 19.9317 9.51961 20.271 9.51961C20.6103 9.51961 20.9222 9.46069 21.2068 9.34284C21.4914 9.21428 21.7377 9.04287 21.9456 8.82861C22.1536 8.60363 22.3123 8.34116 22.4217 8.04119C22.5421 7.74122 22.6023 7.41447 22.6023 7.06093V0.166992H25.1635V7.15735Z" fill="#19242D"/>
                    <path d="M32.2146 0.166992H34.7757V11.5444H32.2146V0.166992Z" fill="#19242D"/>
                    <path d="M41.9202 0.166992H44.4813V9.23035H49.226V11.5444H41.9202V0.166992Z" fill="#19242D"/>
                    <path d="M55.356 0.166992H59.1978C60.1281 0.166992 61.0092 0.268767 61.841 0.472318C62.6838 0.675869 63.4171 1.00798 64.041 1.46864C64.6649 1.9186 65.1574 2.50782 65.5186 3.23632C65.8907 3.96482 66.0768 4.84866 66.0768 5.88784C66.0768 6.80917 65.8962 7.62338 65.535 8.33045C65.1848 9.0268 64.7086 9.61603 64.1067 10.0981C63.5047 10.5695 62.8097 10.9284 62.0216 11.1748C61.2336 11.4212 60.4072 11.5444 59.5425 11.5444H55.356V0.166992ZM57.9172 9.23035H59.247C59.8381 9.23035 60.3853 9.17143 60.8888 9.05359C61.4032 8.93574 61.8465 8.7429 62.2186 8.47507C62.5908 8.19653 62.8808 7.83764 63.0888 7.3984C63.3077 6.94844 63.4171 6.40207 63.4171 5.75928C63.4171 5.20219 63.3077 4.7201 63.0888 4.313C62.8808 3.89518 62.5962 3.55236 62.235 3.28453C61.8739 3.0167 61.447 2.81851 60.9545 2.68995C60.4729 2.55068 59.9639 2.48104 59.4276 2.48104H57.9172V9.23035Z" fill="#19242D"/>
                    <path d="M72.5299 0.166992H76.4045L79.0805 7.59124H79.1134L81.8059 0.166992H85.664V11.5444H83.1029V2.81851H83.07L80.0163 11.5444H78.0626L75.1239 2.81851H75.0911V11.5444H72.5299V0.166992Z" fill="#19242D"/>
                    <path d="M96.5753 0.166992H98.6932L103.75 11.5444H100.86L99.8588 9.13393H95.344L94.3753 11.5444H91.5515L96.5753 0.166992ZM97.5604 3.47737L96.1484 7.01272H98.9887L97.5604 3.47737Z" fill="#19242D"/>
                    <path d="M110.377 2.38462H107.061V0.166992H116.255V2.38462H112.939V11.5444H110.377V2.38462Z" fill="#19242D"/>
                  </svg> 
                  </a>

                  <a href="#" class="menu-builder-mobi__close">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.833496 0.833008L19.1666 19.1662" stroke="#19242D" stroke-width="1.5"/>
                    <path d="M19.1665 0.833008L0.833434 19.1662" stroke="#19242D" stroke-width="1.5"/>
                  </svg> 
                  </a>
                </div>

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