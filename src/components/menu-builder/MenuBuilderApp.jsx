import { useMenuBuilderContext } from "../../context/MenuBuilderContext"

export default function MenuBuilderApp() {
  const { version, menuData } = useMenuBuilderContext();

  return <div>
    { JSON.stringify(menuData) }
  </div>
}