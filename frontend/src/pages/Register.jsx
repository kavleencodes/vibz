import { useState } from "react";
import { registerUser } from "../api/auth";
import { Link } from "react-router-dom";
import "./Register.css";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    const data = await registerUser(email, password);
    alert(JSON.stringify(data));
  };

  return (
    <div className="auth-container">
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

        {/* Login option */}
       <p className="auth-switch">
        Already have an account?{" "}
        <Link to="/login" className="login-link">Login</Link>
      </p>

      </form>
    </div>
  );
}