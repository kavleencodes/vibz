import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";  // ✅ import routes
import "./App.css";

function App() {
  return (
    <Router>
      <div>
        
        {/* Logo */}
        

        {/* 🔥 Replace Register with AppRoutes */}
        <AppRoutes />

        {/* <h1 style={{color: "white"}}>TEST</h1> */}

      </div>
    </Router>
  );
}

export default App;