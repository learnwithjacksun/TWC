import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import { account, databases } from "../Lib/appwriteConfig";
import { ID } from "appwrite";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [data, setData] = useState(null);

  const navigate = useNavigate();

  const register = async (name, email, gender, role, password) => {
    try {
      await account.create(ID.unique(), email, password, name);
      await account.createEmailPasswordSession(email, password);
      const res = await account.get();
      console.log(res);
      setUser(res);
      await addUserData(res.$id, role, gender, name, email);
      await getUserData(res.$id);
      navigate("/profile");
    } catch (error) {
      console.log("Register User", error);
      throw new Error(error.message);
    }
  };

  const login = async (email, password) => {
    try {
      await account.createEmailPasswordSession(email, password);
      const res = await account.get();
      console.log(res);
      setUser(res);
      await getUserData(res.$id);
      navigate("/profile");
    } catch (error) {
      console.log("Login User", error);
      throw new Error(error.message);
    }
  };

  const logout = async () => {
    try {
      await account.deleteSession("current");
        setUser(null);
        navigate("/login");
    } catch (error) {
      console.log("Logout User", error);
      throw new Error(error.message);
    }
  };

  const addUserData = async (id, role, gender, name, email) => {
    try {
      const res = await databases.createDocument("twcdb", "users", id, {
        name,
        email,
        role,
        gender,
      });
      console.log(res);
    } catch (error) {
      console.log("Add User Data", error);
      throw new Error(error.message);
    }
  };

  const getUserData = async (id) => {
    try {
      const res = await databases.getDocument("twcdb", "users", id);
      console.log(res);
      setData(res);
    } catch (error) {
      console.log("Get User Data:", error);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await account.get();
        if (res) {
          setUser(res);
          getUserData(res.$id);
        }
      } catch (error) {
        console.log("Check Auth:", error);
      }
    };
    checkAuth();
  }, []);
  return (
    <>
      <AuthContext.Provider value={{ register, login, logout, data, user, getUserData }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
