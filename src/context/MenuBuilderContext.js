import { createContext, useContext, useState, useEffect, useRef } from "react";
import ProductBuilderApi from '../libs/api';
import { deepSearch_API } from '../libs/helpers';

const MenuBuilderContext = createContext(null);

const MenuBuilderContext_Provider = ({ children, menuId, storeId, API_ENDPOINT, API_KEY }) => {
  const API = useRef(null);
  const [menuData, setMenuData] = useState(null);
  const [mobiMenuData, setMobiMenuData] = useState(null);
  const [mobiItemsCurrent, setMobiItemsCurrent] = useState(null);
  const [jumpDeep, setJumpDeep] = useState([]);
  const [parentItem, setParentItem] = useState(null);

  const fixDataMenu = (menuData) => {
    let megaShopItem = menuData.find(i => i.type == '__MEGASHOP__');
    if(megaShopItem) {
      let _index = menuData.indexOf(megaShopItem);
      menuData.splice(_index, 1);

      if(megaShopItem.children && megaShopItem.children.length > 0) {
        return megaShopItem.children.concat(menuData);
      } else {
        return menuData;
      }
    } else {
      return menuData;
    }
    
  }

  const getMenuData = async (_id) => {
    const res = await API.current.getMenu(_id);
    if(res == false) {
      return;
    }

    const { builder_data } = res;
    setMenuData(builder_data);

    let mobiMenuData = fixDataMenu([...builder_data]);
    setMobiMenuData(mobiMenuData);
    setMobiItemsCurrent(mobiMenuData)
  }

  useEffect(() => {
    API.current = new ProductBuilderApi(API_ENDPOINT, API_KEY, storeId);
    getMenuData(menuId);
  }, [])

  const onJumpMobiNav_Fn = (id) => {
    const found = deepSearch_API(mobiMenuData, id);
    const { parentNode, node } = found.hook();
    setParentItem(found);
    setMobiItemsCurrent(found.children);
    setJumpDeep([...jumpDeep, id]);
  }

  const onBack_Fn = () => {
    let _jumpDeep = [...jumpDeep];
    let last = _jumpDeep.slice(-1)[0];
    _jumpDeep.splice((_jumpDeep.length - 1), 1);

    const found = deepSearch_API(mobiMenuData, last);
    const { parentNode, node } = found.hook();
    
    setJumpDeep(_jumpDeep);
    if(_jumpDeep.length == 0) {
      setParentItem(null);
      setMobiItemsCurrent(mobiMenuData);
    } else {
      setParentItem(deepSearch_API(mobiMenuData, _jumpDeep[_jumpDeep.length - 1]));
      setMobiItemsCurrent(parentNode);
    }
    // setMobiItemsCurrent( (_jumpDeep.length > 0 ? parentNode : mobiMenuData) );
  }

  const value = {
    version: '1.0.0',
    menuId,
    API_ENDPOINT, API_KEY,
    menuData,
    mobiMenuData, setMobiMenuData,
    mobiItemsCurrent, setMobiItemsCurrent,
    jumpDeep, setJumpDeep,
    parentItem, setParentItem,
    onBack_Fn,
    onJumpMobiNav_Fn,
  }

  return <MenuBuilderContext.Provider value={ value }>
    { children }
  </MenuBuilderContext.Provider>
}

const useMenuBuilderContext = () => {
  return useContext(MenuBuilderContext);
}

export { MenuBuilderContext_Provider, useMenuBuilderContext }