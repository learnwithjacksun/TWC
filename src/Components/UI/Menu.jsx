import { Link } from "react-router-dom";
import Icon from "./Icon";
// import toast from "react-hot-toast";
import Prop from 'prop-types'
import { navlinks } from "../../Constants/data";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";


const Menu = ({ toggleMenu }) => {
    
    const { user, logout } = useAuth()
    
    const handleLogout = () => {
        toast.promise(
            logout(),
            {
                loading: "Logging Out...",
                success: "Logged Out!",
                error: (err) => {
                    console.log(err);
                    return "Failed!"
                }
            }
        )
        toggleMenu()
    }

  return (
    <>
      <div className="fixed inset-0 flex justify-end">
        <div
          onClick={toggleMenu}
          className="absolute inset-0 bg-[rgba(0,0,0,0.5)] -z-10"
        ></div>
        <div className="z-10 bg-light min-h-screen w-[70%] z-20 md:w-[30%] rounded-tl-[2em] rounded-bl-[2em] p-4 flex flex-col gap-4 border-l border-line">
          <div className="flex justify-end">
            <div
              onClick={toggleMenu}
              className="h-11 w-11 flex-center text-sub bg-lighter border border-line rounded-full"
            >
              <Icon>close</Icon>
            </div>
          </div>

          <ul className="flex flex-col gap-2">
            {navlinks.map((x, y) => (
              <li key={y}>
                <Link
                  to={x.url}
                  onClick={toggleMenu}
                  className="flex items-center gap-4 hover:bg-lighter p-2 rounded-full"
                >
                  <div className="bg-light shadow-lg text-sub flex-center h-10 w-10 rounded-full">
                    <Icon styles="text-[1.3em]">{x.icon}</Icon>
                  </div>
                  <span>{x.label}</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-2 ms-0 mt-auto mb-20">
            {!user && (
              <Link
                to="/register"
                onClick={toggleMenu}
                className="flex-1 btn-primary min-h-12 rounded-full"
              >
                <Icon>person_add</Icon>
                <span>Create Account</span>
              </Link>
            )}
            <Link
              to="/upload"
              onClick={toggleMenu}
              className="flex-1 btn min-h-12 border border-line text-sub rounded-full"
            >
              <Icon>add</Icon>
              <span>Add Project</span>
            </Link>
            {user && (
              <button
                onClick={handleLogout}
                className="flex-1 btn text-white bg-red-600 min-h-12 rounded-full"
              >
                <Icon>logout</Icon>
                <span>Logout</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

Menu.propTypes = {
    toggleMenu: Prop.func
}

export default Menu;
