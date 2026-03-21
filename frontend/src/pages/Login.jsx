import { use, useState } from "react";
import { loginUser } from "../api/auth";

export default function Login(){
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    const handleLogin = async () => {
        try {
          const data = await loginUser(email, password);
      
          console.log("LOGIN RESPONSE:", data); // 👈 ADD THIS
      
          if (data.access_token) {
            localStorage.setItem("token", data.access_token);
            alert("Login successful 🚀");
          } else {
            alert("Login failed");
          }
        } catch (error) {
          console.error(error);
        }
      };

      return (
        <div>
          <h2>Login</h2>
    
          <input
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
    
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
    
          <button onClick={handleLogin}>Login</button>
        </div>
      );


      
}