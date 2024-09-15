import { Link, useLocation } from "react-router-dom";
import Icon from "./Icon";
import Brand from "./Brand";
import useMenu from "../../Hooks/useMenu";
import useAuth from "../../Hooks/useAuth";
import useTheme from "../../Hooks/useTheme";
import { storage } from "../../Lib/appwriteConfig";

const Header = () => {
  const { toggleMenu } = useMenu();

  const { pathname } = useLocation();

  const isRegisterPage = pathname === "/register";
  const linkPath = isRegisterPage ? "/login" : "/register";
  const linkText = isRegisterPage ? "Login" : "Sign Up";
  const linkIcon = isRegisterPage ? "login" : "person_add";

  const { user, data } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();

  const imageUrl = data?.image? storage.getFileView("images", data?.image): null;

  return (
    <>
      <header className="line">
        <nav className="main h-[80px] flex justify-between items-center">
          <Brand />

          <div className="flex items-center md:gap-6 gap-2">
            <div
              onClick={toggleDarkMode}
              className="flex-center cursor-default h-11 w-11 rounded-full"
            >
              <Icon styles="text-sub">
                {darkMode ? "dark_mode" : "light_mode"}
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

            {user && (
              <Link
                to="/profile"
                className="h-10 w-10 rounded-full bg-blue-400 overflow-hidden"
              >
                <img
                  src={`${
                    data?.image
                      ? imageUrl
                      : `https://api.dicebear.com/9.x/adventurer/svg?seed=${data?.name}`
                  }`}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              </Link>
            )}

            <div
              onClick={toggleMenu}
              className="flex-center bg-lighter cursor-default h-11 w-11 rounded-full"
            >
              <Icon>drag_handle</Icon>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
