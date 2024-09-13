import { useContext } from "react"
import { AuthContext } from "../Contexts/AuthProvider"

const useAuth = () => {
const {login, logout, register, data, user} = useContext(AuthContext)

  return{login, logout, register, data, user}
}

export default useAuth