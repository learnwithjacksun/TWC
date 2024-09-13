import { useContext } from "react"
import { MenuContext } from "../Contexts/MenuProvider"
const useMenu = () => {
    const { menu, toggleMenu, setMenu } = useContext(MenuContext)

    return { menu, toggleMenu, setMenu }
}

export default useMenu