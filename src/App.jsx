import { Route, Routes, useLocation } from "react-router-dom";
import {
  Chatroom,
  Home,
  Leaderboard,
  Login,
  Notfound,
  Preview,
  Profile,
  Projects,
  Register,
  Upload,
} from "./Components/Screens";
import MenuProvider from "./Contexts/MenuProvider";
import { Toaster } from "react-hot-toast";
import AuthProvider from "./Contexts/AuthProvider";
import ProtectedRoutes from "./Components/ProtectedRoutes";
import { AnimatePresence } from "framer-motion";

const App = () => {
  const location = useLocation();
  return (
    <>
      <Toaster />
      <AuthProvider>
        <MenuProvider>
          <AnimatePresence mode="wait">
            <Routes key={location.pathname} location={location}>
              <Route index element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/chatroom" element={<Chatroom />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="*" element={<Notfound />} />
              <Route element={<ProtectedRoutes />}>
                <Route path="/profile" element={<Profile />} />
                <Route path="/upload" element={<Upload />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/projects/:id" element={<Preview />} />
              </Route>
            </Routes>
          </AnimatePresence>
        </MenuProvider>
      </AuthProvider>
    </>
  );
};

export default App;
