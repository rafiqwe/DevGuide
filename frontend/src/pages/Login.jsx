import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useContext } from "react";
import { UserDataContext } from "../context/UserContext";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { setuser } = useContext(UserDataContext);

  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/user/login", form);
      if (res.status === 200) {
        const data = res.data;
        localStorage.setItem("token", data.token);
        setuser(data.user);
        navigate("/");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] px-4">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/20"
      >
        <h2 className="text-3xl font-bold mb-4 text-white">Welcome Back 👋</h2>
        <p className="text-gray-200 mb-6">
          Login to continue your learning journey
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <motion.input
            whileFocus={{
              boxShadow: "0 0 10px #00ffff, 0 0 20px #00ffff",
              borderColor: "#00ffff",
            }}
            transition={{ duration: 0.3 }}
            className="w-full p-3 bg-white/20 text-white placeholder-gray-200 border border-white/20 rounded-md focus:outline-none"
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <div className="relative">
            <motion.input
              whileFocus={{
                boxShadow: "0 0 10px #ff00ff, 0 0 20px #ff00ff",
                borderColor: "#ff00ff",
              }}
              transition={{ duration: 0.3 }}
              className="w-full p-3 bg-white/20 text-white placeholder-gray-200 border border-white/20 rounded-md focus:outline-none pr-12"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-3 right-3 cursor-pointer text-white hover:text-cyan-400 transition"
            >
              {showPassword ? (
                <AiOutlineEye size={20} />
              ) : (
                <AiOutlineEyeInvisible size={20} />
              )}
            </button>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className=" 
                           w-full
                py-3
                rounded-lg
                bg-indigo-600
                text-white

                font-semibold
                hover:bg-indigo-500
                transition
                shadow-md
                cursor-pointer
                outline-none
                hover:text-slate-100
                hover:shadow-[0_0_15px_#8b5cf6]
                focus:shadow-[0_0_20px_#8b5cf6]"
          >
            Login
          </button>
        </form>

        <p className="text-gray-300 text-sm text-center mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-cyan-300 hover:underline">
            Register here
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
