import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useContext } from "react";
import { UserDataContext } from "../context/UserContext";

const Register = () => {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const { setuser } = useContext(UserDataContext);

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidEmail(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    const userData = {
      fullname: {
        firstname: form.firstname,
        lastname: form.lastname,
      },
      email: form.email,
      password: form.password,
    };

    try {
      const res = await API.post(`/user/register`, userData);

      if (res.status !== 201) {
        setError(res.data.message || "Something went wrong");
      } else {
        const data = res.data;
        setuser(data.user);
        localStorage.setItem("token", data.token);
        navigate("/");
      }

      setForm({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
      });
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left side graphic */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="hidden md:flex w-1/2 items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-600 text-white p-10"
      >
        <div className="text-center space-y-5">
          <h1 className="text-4xl font-extrabold">Join DevGuide</h1>
          <p className="text-lg max-w-sm mx-auto">
            Learn, Bookmark, and Grow faster with focused dev content.
          </p>
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/male-web-developer-working-on-website-code-illustration-download-in-svg-png-gif-file-formats--frontend-man-developing-development-pack-design-illustrations-4759499.png"
            alt="Code Learning"
            className="w-[86%] mx-auto "
          />
        </div>
      </motion.div>

      {/* Right side form */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-full md:w-1/2 flex items-center justify-center px-6 py-12 bg-white"
      >
        <div className="w-full max-w-md bg-white/30 backdrop-blur-lg p-8 rounded-2xl border border-white/40 shadow-xl">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">
            Create your free account
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Already have one?{" "}
            <Link
              to="/login"
              className="text-indigo-600 font-medium hover:underline"
            >
              Log in here
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <motion.input
              whileFocus={{
                boxShadow: "0 0 6px #00FFFF, 0 0 10px #00FFFF",
                borderColor: "#00FFFF",
              }}
              transition={{ duration: 0.3 }}
              className="w-full p-3 border border-slate-300 rounded-lg bg-white/60 backdrop-blur-sm text-gray-800 placeholder-gray-500 focus:outline-none"
              type="text"
              name="firstname"
              placeholder="Firstname"
              value={form.firstname}
              onChange={handleChange}
              required
            />

            <motion.input
              whileFocus={{
                boxShadow: "0 0 6px #00FFFF, 0 0 10px #00FFFF",
                borderColor: "#00FFFF",
              }}
              transition={{ duration: 0.3 }}
              className="w-full p-3 border border-slate-300 rounded-lg bg-white/60 backdrop-blur-sm text-gray-800 placeholder-gray-500 focus:outline-none"
              type="text"
              name="lastname"
              placeholder="Lastname"
              value={form.lastname}
              onChange={handleChange}
              required
            />

            <motion.input
              whileFocus={{
                boxShadow: "0 0 6px #FF00FF, 0 0 10px #FF00FF",
                borderColor: "#FF00FF",
              }}
              transition={{ duration: 0.3 }}
              className={`w-full p-3 border rounded-lg bg-white/60 backdrop-blur-sm text-gray-800 placeholder-gray-500 focus:outline-none ${
                error.includes("email") ? "border-red-500" : "border-slate-300"
              }`}
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
                  boxShadow: "0 0 6px #00FFFF, 0 0 10px #00FFFF",
                  borderColor: "#00FFFF",
                }}
                transition={{ duration: 0.3 }}
                className="w-full p-3 border border-slate-300 rounded-lg bg-white/60 backdrop-blur-sm text-gray-800 placeholder-gray-500 focus:outline-none"
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
                className="absolute top-3 right-3 cursor-pointer text-slate-600 hover:text-cyan-400 transition"
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
                focus:shadow-[0_0_20px_#8b5cf6]
               "
            >
              Sign Up
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
