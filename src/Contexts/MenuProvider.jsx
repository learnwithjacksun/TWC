import Prop from 'prop-types'
import { createContext, useState } from "react";

export const MenuContext = createContext()

const MenuProvider = ({ children }) => {
    const [menu, setMenu] = useState(false)
    
    const toggleMenu = () => {
        setMenu(prev => !prev)
    }
  return (
      <>
          <MenuContext.Provider value={{menu, toggleMenu, setMenu}}>
              {children}
      </MenuContext.Provider>
      </>
  )
}

MenuProvider.propTypes = {
    children: Prop.node.isRequired
}

export default MenuProvider