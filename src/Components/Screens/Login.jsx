import { Link } from "react-router-dom";
import Heading from "../UI/Heading";
import Layout from "../UI/Layout";
import Input from "../UI/Input";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAuth from "../../Hooks/useAuth";
import Modal from "../UI/Modal";
import Icon from "../UI/Icon";


const Login = () => {
  const {login, user} = useAuth()
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email) {
      toast.error("Email is required!");
    } else if (!form.password) {
      toast.error("Password is required!");
    } else if (form.password.length < 8) {
      toast.error("Password must have a minimum of 8 characters!");
    } else {
      toast.promise(
        login(form.email, form.password),
        {
          loading: "Logging In...",
          success: "Login Successful!",
          error: (err) => {
            return `Failed: ${err.message}`
          }
        }
      )
    }
  };

  const [modal, setModal] = useState(false);

  useEffect(() => {
    if (user) {
      setModal(true);
    }
  }, [user]);

  return (
    <>
      <Layout>
        <div className="main">
          <Heading
            title={`Welcome Back`}
            subtitle="Ready to continue your journey? let's sign you in!"
          />

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 w-full md:w-[480px] mx-auto p-4 rounded-2xl my-6"
          >
            <Input
              id="email"
              label="E-mail Address"
              type="email"
              placeholder="Enter your e-mail address..."
              bg_color="bg-secondary"
              value={form.email}
              handleChange={handleChange}
            />

            <Input
              id="password"
              label="Password"
              type="password"
              placeholder="> 7 characters"
              bg_color="bg-secondary"
              value={form.password}
              handleChange={handleChange}
            />

            <Link to="/forgot" className="text-sm font-semibold">
              forgotten password?
            </Link>
            <button type="submit" className="btn-primary h-10 rounded-lg">
              Login
            </button>

            <p className="text-sm text-center font-medium text-sub">
              Don&apos;t have an account?{" "}
              <Link to="/register" className="text-main font-semibold">
                Register
              </Link>
            </p>
          </form>
        </div>
      </Layout>

      {modal && (
        <Modal toggleModal={()=> setModal(prev => !prev)} title={`Hello, ${user?.name}`}>
          <div>
            <p>It seems you&apos;re still logged-in... 🤷‍♂️</p>
            <Link
              to="/profile"
              className="btn-primary rounded-lg w-1/2 mt-4 h-9"
            >
              <span>Go to Profile</span>
              <Icon>arrow_forward</Icon>
            </Link>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Login;
