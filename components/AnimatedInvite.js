"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AnimatedInvite() {
  const audioRef = useRef(null);

  const [playing, setPlaying] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  // Enable music + enter site
  const enterSite = async () => {
    try {
      await audioRef.current.play();
      setPlaying(true);
    } catch (e) {
      // ignore – user can still enter
    }
    setShowWelcome(false);
  };

  const toggleMusic = async () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      try {
        await audioRef.current.play();
        setPlaying(true);
      } catch {}
    }
  };

  return (
    <section className="invite">
      {/* Background music */}
      <audio ref={audioRef} loop>
        <source src="/music/wedding.mp3" type="audio/mpeg" />
      </audio>

      {/* Welcome Overlay */}
      <AnimatePresence>
        {showWelcome && (
            <motion.div
            className="welcome-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            onClick={enterSite}
            >
            {/* Soft glowing background */}
            <div className="welcome-bg" />

            <motion.div
                className="welcome-box"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                <p className="welcome-small">You're Invited</p>

                <h1 className="welcome-title">
                Priya <span>&</span> Harshit
                </h1>

                <p className="welcome-tagline">
                A celebration of love, tradition & togetherness
                </p>

                <p className="welcome-sub">
                Tap anywhere to enter & enable music 🎵
                </p>
            </motion.div>
            </motion.div>

        )}
        </AnimatePresence>


      {/* Music toggle button */}
      {!showWelcome && (
        <button className="music-btn" onClick={toggleMusic}>
          {playing ? "⏸️" : "🎵"}
        </button>
      )}

      {/* Website Content */}
      {!showWelcome && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="petals" />

          <motion.h1
            className="title"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Priya <span>&</span> Harshit
          </motion.h1>

          <motion.p
            className="subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Two hearts, one journey begins
          </motion.p>

          {/* <motion.p
            className="subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            With the divine blessings of Lord Ganesh  
            and our beloved elders
          </motion.p> */}

          <motion.div
            className="invite-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <p className="highlight">With the divine blessings of Lord Ganesh  
            and our beloved elders</p>
            <p>Saturday, 24 January 2026</p>
            <p className="venue">
              Om P. L. Luhar Aahir Samaj Hall <br />
              Char Road, Near Ganga Gohil Temple <br />
              Keshod
            </p>
            <p className="highlight">Together with our families, <br />
              we invite you to celebrate love & togetherness</p>
          </motion.div>

          <motion.div
            className="schedule"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
          >
            <h3>Wedding Schedule</h3>

            <ul className="timeline">
              <li>🎶 <div><strong>Sangeet</strong><small>23 • 9:00 AM</small></div></li>
              <li>🪔 <div><strong>Ganesh Pooja</strong><small>23 • 9:30 AM</small></div></li>
              <li>🙏 <div><strong>Maameru</strong><small>23 • 3:00 PM</small></div></li>
              <li>🌼 <div><strong>Haldi</strong><small>23 • 4:30 PM</small></div></li>
              <li>💃 <div><strong>Raas Garba</strong><small>23 • 8:00 PM</small></div></li>
            </ul>

            <div className="family-note">
            Your presence and blessings will make  
            this celebration truly special.
          </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
