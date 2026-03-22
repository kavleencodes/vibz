import "./Dashboard.css";

export default function Dashboard() {
  return (
    <div className="dashboard">

      {/* 🔥 Top Navbar */}
      <div className="navbar">

        {/* Left side → Logo */}
        <div className="nav-left">
          <img
            src="/logo_vibz-no-bg.png"
            className="nav-logo"
            alt="Vibz Logo"
          />
        </div>

        {/* Center → Search */}
        <div className="nav-center">

            <h1>Welcome to Vibz 🎧</h1>
        
          
        </div>

      </div>

      {/* Content */}
      <div className="dashboard-content">
   <input
            type="text"
            placeholder="Search music, mood..."
            className="search-input"
          />
      </div>

    </div>
  );
}