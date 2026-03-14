import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Login = () => {

  const navigate = useNavigate();
  const { loginPatient } = useAppContext();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await loginPatient(formData);

    if (res.success) {
      navigate("/");
      toast.success(res.message);
    } else {
      toast.error(res.message)
    }
  };

  return (
    <div className="min-h-screen w-screen bg-blue-50 flex items-center justify-center px-4">

      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-md">

        {/* Heading */}
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Patient Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Email */}
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              name="email"
              type="email"
              required
              placeholder="rahul@gmail.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-gray-600">Password</label>
            <input
              name="password"
              type="password"
              required
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-full font-medium hover:bg-blue-700 transition"
          >
            Login
          </button>

        </form>

        {/* Create account link */}
        <p className="text-sm text-gray-500 text-center mt-6">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-600 cursor-pointer font-medium"
          >
            Create Account
          </span>
        </p>

      </div>

    </div>
  );
};

export default Login;