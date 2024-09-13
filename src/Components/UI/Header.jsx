import { Link, useLocation } from "react-router-dom";
import Icon from "./Icon";
import Brand from "./Brand";
import useMenu from "../../Hooks/useMenu";
import useAuth from "../../Hooks/useAuth";
const Header = () => {
const {toggleMenu}= useMenu()

  const { pathname } = useLocation();

  const isRegisterPage = pathname === "/register";
  const linkPath = isRegisterPage ? "/login" : "/register";
  const linkText = isRegisterPage ? "Login" : "Sign Up";
  const linkIcon = isRegisterPage ? "login" : "person_add";

const {user} = useAuth()
  return (
    <>
      <header className="line">
        <nav className="main h-[80px] flex justify-between items-center">
          <Brand />

          <div className="flex items-center md:gap-6 gap-2">
            <div
              className="flex-center cursor-default h-11 w-11 rounded-full"
            >
              <Icon styles="text-sub">
                dark_mode
              </Icon>
            </div>

            {!user && (
              <div className="hidden md:block">
                <Link
                  to={linkPath}
                  className="btn-primary h-11 rounded-full px-6 flex items-center gap-2"
                >
                  <Icon styles="text-[1.5em]">{linkIcon}</Icon>
                  <span>{linkText}</span>
                </Link>
              </div>
            )}

            <div
              onClick={toggleMenu}
              className="flex-center bg-lighter cursor-default h-11 w-11 rounded-full"
            >
              <Icon>menu</Icon>
            </div>
          </div>
        </nav>
      </header>

    </>
  );
};

export default Header;
