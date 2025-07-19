import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { IoMdCloseCircle } from "react-icons/io";

const Popup = ({ setIsPopupOpen }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-full flex  items-center justify-center backdrop-blur-sm w-full bg-gradient-to-br relative  p-2">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/10 dark:bg-white/5 backdrop-blur-lg rounded-2xl p-8 max-w-xl w-full shadow-2xl border border-white/20 text-center"
      >
        <h2 className="text-3xl font-bold dark:text-white text-white mb-4">
          🚫 Login Required
        </h2>
        <p className="dark:text-gray-300 text-black mb-6 leading-relaxed">
          You must be logged in to view this page. Just like nurturing a plant
          takes time and care 🌱, access here starts with a simple step —
          logging in. 
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
          <button
            onClick={handleBack}
            className="px-6 py-2  cursor-pointer rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold transition-all duration-300"
          >
            ← Go Back
          </button>
          <button
            onClick={handleLogin}
            className="px-6 py-2 rounded-xl cursor-pointer  bg-green-500 hover:bg-green-600 text-white font-semibold transition-all duration-300"
          >
            🔐 Login
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Popup;
