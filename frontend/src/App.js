import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";  // ✅ import routes
import "./App.css";

function App() {
  return (
    <Router>
      <div>
        
        {/* Logo */}
        <div className="app-container">
          <img src="/logo_vibz-no-bg.png" className="logo" alt="Vibz Logo" />
        </div>

        {/* 🔥 Replace Register with AppRoutes */}
        <AppRoutes />

      </div>
    </Router>
  );
}

export default App;