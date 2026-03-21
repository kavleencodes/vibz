import { useState } from "react";
import { registerUser } from "../api/auth";

export default function Register(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister=async()=>{
        const data=await registerUser(email,password);
        alert(JSON.stringify(data));
    };

    return(
        <div>
             <h2>Register</h2>

            <input
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            />

            <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={handleRegister}>Register</button>

        </div>
    )
}