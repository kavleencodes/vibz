import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getPlaylist } from "../api/auth";
import "./Dashboard.css";

export default function Dashboard() {
  const [input, setInput] = useState("");
  const [playlist, setPlaylist] = useState([]);
  const [loading, setLoading] = useState(false);

  const getRecommendations = async () => {
    if (!input) return;
    setLoading(true);
    try {
      const data = await getPlaylist(input);
      setPlaylist(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-dark">
      {/* Sleek Top Bar */}
     <header className="top-nav">
  <div className="nav-left">
    <img src="/logo_vibz-no-bg.png" className="nav-logo" alt="Vibz" />
  </div>

  <div className="user-profile">
    <span>Welcome, <strong>Kavleen</strong></span>
    <div className="avatar">K</div>
  </div>
</header>

      <main className="main-container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="hero-section"
        >
          <h1 className="hero-text">Find your <span className="accent">Sound.</span></h1>
          <div className="search-bar-wrapper">
            <input
              type="text"
              placeholder="How's the mood today?"
              className="dark-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && getRecommendations()}
            />
            <button className="neon-btn" onClick={getRecommendations} disabled={loading}>
              {loading ? "Searching..." : "Generate ✨"}
            </button>
          </div>
        </motion.div>

        <section className="playlist-section">
          <AnimatePresence>
            {playlist.length > 0 && (
              <motion.div 
                className="grid-container"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {playlist.map((song, index) => (
                  <motion.div 
                    key={index}
                    className="glass-card"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -8, boxShadow: "0 10px 30px rgba(157, 150, 240, 0.2)" }}
                  >
                    <div className="song-visualizer"></div>
                    <div className="song-details">
                      <h3>{song.track_name}</h3>
                      <p>{song.artists}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </main>
    </div>
  );
}