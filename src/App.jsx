import { Route, Routes } from "react-router-dom";
import { Home, Login, Profile, Register, Upload } from "./Components/Screens";
import MenuProvider from "./Contexts/MenuProvider";
import { Toaster } from "react-hot-toast";
import AuthProvider from "./Contexts/AuthProvider";
import ProtectedRoutes from "./Components/ProtectedRoutes";

const App = () => {
  return (
    <>
      <Toaster />
      <AuthProvider>
        <MenuProvider>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/upload" element={<Upload />} />
            </Route>
          </Routes>
        </MenuProvider>
      </AuthProvider>
    </>
  );
};

export default App;
