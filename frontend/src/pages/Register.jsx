import { useState } from "react";
import { registerUser } from "../api/auth";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const data = await registerUser(email, password);

      if (data) {
        alert("Registration successful 🎉");

        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      } else {
        alert("Registration failed");
      }

    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };  // ✅ properly closed here

  return (
    <div className="auth-container">
      <div className="app-container">
          <img src="/logo_vibz-no-bg.png" className="logo" alt="Vibz Logo" />
        </div>
      <form className="auth-form" onSubmit={handleRegister}>
        
        <h2 className="auth-title">Create Account</h2>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Register</button>

        <p className="auth-switch">
          Already have an account?{" "}
          <Link to="/login" className="login-link">Login</Link>
        </p>

      </form>
    </div>
  );
}