import { useState } from "react";
import { loginUser } from "../api/auth";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; 
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data = await loginUser(email, password);
      if (data.access_token) {
        localStorage.setItem("token", data.access_token);
        navigate("/dashboard");
      } else {
        alert("Invalid email or password ❌");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      {/* Background Decorative Elements */}
      <div className="bg-glow"></div>
      
      <motion.div 
        className="login-card-container"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="logo-wrapper"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <img src="/logo_vibz-no-bg.png" className="logo" alt="Vibz Logo" />
        </motion.div>

        <form className="auth-form glass" onSubmit={handleLogin}>
          <div className="form-header">
            <h2 className="auth-title">Welcome Back</h2>
            <p className="auth-subtitle">The music missed you.</p>
          </div>

          <motion.div 
            className="input-field"
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </motion.div>

          <motion.div 
            className="input-field"
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </motion.div>

          <motion.button 
            type="submit" 
            className="login-btn"
            whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(152, 147, 218, 0.4)" }}
            whileTap={{ scale: 0.98 }}
            disabled={isLoading}
          >
            {isLoading ? "Authenticating..." : "Login to Vibz"}
          </motion.button>

          <p className="auth-switch">
            New here? <Link to="/" className="reg-link">Create Account</Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
}