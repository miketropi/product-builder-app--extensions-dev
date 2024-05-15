import { createContext, useContext, useState, useEffect, useRef } from "react";
import ProductBuilderApi from '../libs/api';

const MenuBuilderContext = createContext(null);

const MenuBuilderContext_Provider = ({ children, menuId, storeId, API_ENDPOINT, API_KEY }) => {
  const API = useRef(null);
  const [menuData, setMenuData] = useState(null);

  const getMenuData = async (_id) => {
    const res = await API.current.getMenu(_id);
    if(res == false) {
      return;
    }

    const { builder_data } = res;
    setMenuData(builder_data)
  }

  useEffect(() => {
    API.current = new ProductBuilderApi(API_ENDPOINT, API_KEY, storeId);
    getMenuData(menuId)
  }, [])

  const value = {
    version: '1.0.0',
    menuId,
    API_ENDPOINT, API_KEY,
    menuData,
  }

  return <MenuBuilderContext.Provider value={ value }>
    { children }
  </MenuBuilderContext.Provider>
}

const useMenuBuilderContext = () => {
  return useContext(MenuBuilderContext);
}

export { MenuBuilderContext_Provider, useMenuBuilderContext }