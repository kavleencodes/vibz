export default function Dashboard() {
  return (
    <div className="dashboard">

      {/* Navbar */}
      <div className="navbar">
        <img src="/logo_vibz-no-bg.png" className="nav-logo" />
        <input
          type="text"
          placeholder="Search music, mood..."
          className="search-input"
        />
      </div>

      {/* Content */}
      <div className="dashboard-content">
        <h1>Welcome to Vibz 🎧</h1>
        <p>You are logged in 🚀</p>
      </div>

    </div>
  );
}