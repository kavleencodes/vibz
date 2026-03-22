import { useState } from "react";
import { loginUser } from "../api/auth";
import { Link } from "react-router-dom";
import "./Login.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const data = await loginUser(email, password);

    if (data.access_token) {
      // ✅ Save token
      localStorage.setItem("token", data.access_token);

      // ✅ Success message
      alert("Login successful 🚀");

      // ✅ Redirect to dashboard
      navigate("/dashboard");

    } else {
      alert("Invalid email or password ❌");
    }

  } catch (error) {
    console.error(error);
    alert("Something went wrong");
  }
};

  return (

    <div className="auth-container">

      <div className="app-container">
          <img src="/logo_vibz-no-bg.png" className="logo" alt="Vibz Logo" />
        </div>
      <form className="auth-form" onSubmit={handleLogin}>
        
        <h2 className="auth-title">Welcome Back</h2>

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

        <button type="submit">Login</button>

        {/* 🔥 Register option */}
        <p className="auth-switch">
          Don’t have an account?{" "}
          <Link to="/">Register</Link>
        </p>

      </form>
    </div>
  );
}