import toast from "react-hot-toast";
import Heading from "../UI/Heading";
import Layout from "../UI/Layout";
import Input from "../UI/Input";
import Select from "../UI/Select";
import { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import PageTransition from "../UI/PageTransition";

const Register = () => {
  const { register } = useAuth();
  const role = [
    { value: "developer", label: "Developer" },
    { value: "graphics designer", label: "Graphics Designer" },
    { value: "ui designer", label: "UI Designer" },
    { value: "ux writer", label: "UX Writer" },
    { value: "3d designer", label: "3D Designer" },
    { value: "copywriter", label: "Copy Writer" },
    { value: "others", label: "Others" },
  ];

  const gender = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "LGBTQ", label: "LGBTQ" },
  ];

  // Form state
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    role: "",
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation logic
    if (!form.name) {
      toast.error("Tech name is required!");
    } else if (!form.email) {
      toast.error("Email is required!");
    } else if (!form.gender) {
      toast.error("Gender is required!");
    } else if (!form.role) {
      toast.error("Niche is required!");
    } else if (!form.password) {
      toast.error("Password is required!");
    } else if (form.password.length < 8) {
      toast.error("Password must have a minimum of 8 characters!");
    } else {
      toast.promise(
        register(form.name, form.email, form.gender, form.role, form.password),
        {
          loading: "Creating User...",
          success: "Account Created!",
          error: (err) => {
            return `Failed: ${err.message}`;
          },
        }
      );
    }
  };
  return (
    <>
      <PageTransition>
        <Layout>
          <div className="main">
            <Heading
              title="Create Account"
              subtitle="To contribute to the community, sign up first!"
            />

            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 w-full md:w-[480px] mx-auto my-6"
            >
              {/* Tech Name Input */}
              <Input
                id="name"
                label="Tech Name"
                type="text"
                placeholder="Enter your tech name..."
                bg_color="bg-secondary capitalize"
                value={form.name}
                handleChange={handleChange}
              />

              {/* Email Input */}
              <Input
                id="email"
                label="E-mail Address"
                type="email"
                placeholder="Enter your e-mail address..."
                bg_color="bg-secondary"
                value={form.email}
                handleChange={handleChange}
              />

              {/* Gender Select */}
              <Select
                id="gender"
                label="Select Gender"
                options={gender}
                bg_color="bg-secondary"
                value={form.gender}
                handleChange={handleChange}
              />

              {/* Role Select */}
              <Select
                id="role"
                label="Select Your Niche"
                options={role}
                bg_color="bg-secondary"
                value={form.role}
                handleChange={handleChange}
              />

              {/* Password Input */}
              <Input
                id="password"
                label="Password"
                type="password"
                placeholder="> 7 characters"
                bg_color="bg-secondary"
                value={form.password}
                handleChange={handleChange}
              />

              {/* Submit Button */}
              <button type="submit" className="btn-primary h-10 rounded-lg">
                Register
              </button>

              {/* Link to login page */}
              <p className="text-sm text-center font-medium text-sub">
                Already have an account?{" "}
                <Link to="/login" className="text-main font-semibold">
                  Login
                </Link>
              </p>
            </form>
          </div>
        </Layout>
      </PageTransition>
    </>
  );
};

export default Register;
