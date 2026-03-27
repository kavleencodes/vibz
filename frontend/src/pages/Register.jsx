import { useState } from "react";
import { registerUser } from "../api/auth";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; 
import "./Register.css";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await registerUser(email, password);
      if (data) navigate("/dashboard");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      {/* Background Decorative Blobs */}
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>

      <motion.div 
        className="auth-card-wrapper"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <motion.img 
          src="/logo_vibz-no-bg.png" 
          className="logo" 
          alt="Vibz Logo"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
        />

        <form className="auth-form" onSubmit={handleRegister}>
          <div className="text-header">
            <h2 className="auth-title">Create Account</h2>
            <p className="auth-subtitle">Step into the rhythm.</p>
          </div>

          <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
            <input
              type="email"
              placeholder="Email Address"
              className="glass-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </motion.div>

          <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
            <input
              type="password"
              placeholder="Password"
              className="glass-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </motion.div>

          <motion.button 
            type="submit" 
            className="glow-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
          >
            {loading ? <span className="loader"></span> : "Join the Vibe"}
          </motion.button>

          <p className="auth-switch">
            Already a member? <Link to="/login" className="login-link">Sign In</Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
}