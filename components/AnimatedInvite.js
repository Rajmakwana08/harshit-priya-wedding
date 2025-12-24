"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AnimatedInvite() {
  const audioRef = useRef(null);

  const [playing, setPlaying] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [isGujarati, setIsGujarati] = useState(false);
  const [showSharePrompt, setShowSharePrompt] = useState(false);
  // Set your contact details here (use international phone number without +, e.g. 15551234567)
  const inviterPhone = "917359731464"; // user requested number (India: 91 + 7359731464)
  const inviterEmail = ""; // e.g. 'you@example.com'

  const translations = {
    "You're Invited": "તમે આમંત્રિત છો",
    "A celebration of love, tradition & togetherness": "પ્રેમ, પરંપરા અને એકતા નો ઉત્સવ",
    "Tap anywhere to enter & enable music 🎵": "પ્રવેશ કરવા અને музыка ચાલુ કરવા માટે ક્યાંય ટચ કરો 🎵",
    "Two hearts, one journey begins": "બે દિલો, એક યાત્રા શરૂ થાય છે",
    "With the divine blessings of Lord Ganesh  and our beloved elders": "શ્રી ગણેશજી ના દૈવી આશીર્વાદ અને અમારા પ્રિય વડીલો સાથે",
    "Saturday, 24 January 2026": "શનિવાર, 24 જાન્યુઆરી 2026",
    "Char Chowk, Near Cow Shed": "ચાર ચોક, ગાયના ખોખાના નજીક",
    "Keshod": "કેશોડ",
    "Together with our families, \n              we invite you to celebrate love & togetherness": "અમારા પરિવાર સાથે,\nઅમારી પાસે તમારા માટે પ્રણય અને એકતાનું ઉત્સવ છે",
    "Wedding Schedule": "શાદીનું સમયસૂચક",
    "Sangeet": "સંગીત રાત્રિ",
    "Ganesh Pooja": "ગણેશ પૂજા",
    "Maameru": "મામેરું",
    "Haldi": "હળદી",
    "Raas Garba": "રાસ ગરબા",
    "Your presence and blessings will make  \n            this celebration truly special.": "તમારી ઉપસ્થિતિ અને આશીર્વાદ આ ઉત્સવને ખરેખર ખાસ બનાવશે."
  };

  translations["Are you coming?"] = "શું તમે આવી રહ્યા છો?";
  translations["Yes"] = "હા";
  translations["No"] = "ના";

  const translate = (text) => {
    if (!isGujarati) return text;
    return translations[text] || text;
  };

  const sendInvitation = async (answer) => {
    const shareText = `Priya & Harshit - Wedding Invitation\nSaturday, 24 January 2026\nChar Chowk, Near Cow Shed, Keshod\nRSVP: ${answer}`;

    try {
      if (navigator.share) {
        await navigator.share({ title: 'Invitation', text: shareText, url: window.location.href });
        return;
      }
    } catch (e) {}

    try {
      let waUrl;
      const encoded = encodeURIComponent(shareText + '\n' + window.location.href);
      if (inviterPhone && inviterPhone.trim() !== '') {
        waUrl = `https://wa.me/${inviterPhone}?text=${encoded}`;
      } else {
        waUrl = `https://wa.me/?text=${encoded}`;
      }
      window.open(waUrl, '_blank');
    } catch (e) {}

    try {
      const recipient = inviterEmail && inviterEmail.trim() !== '' ? inviterEmail : '';
      const mailto = `mailto:${recipient}?subject=${encodeURIComponent('Wedding RSVP')}&body=${encodeURIComponent(shareText + '\n' + window.location.href)}`;
      window.open(mailto, '_blank');
    } catch (e) {}
  };

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
                <p className="welcome-small">{translate("You're Invited")}</p>

                <h1 className="welcome-title">
                Priya <span>&</span> Harshit
                </h1>

                <p className="welcome-tagline">
                {translate('A celebration of love, tradition & togetherness')}
                </p>

                <p className="welcome-sub">
                {translate('Tap anywhere to enter & enable music 🎵')}
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

      {/* Gujarati toggle */}
      {!showWelcome && (
        <button className="translate-btn" onClick={() => setIsGujarati((s) => !s)} style={{marginLeft:12}}>
          {isGujarati ? 'EN' : 'ગુજરાતી'}
        </button>
      )}

      {/* Share button (opens small yes/no prompt) */}
      {!showWelcome && (
        <button className="translate-btn" onClick={() => setShowSharePrompt(true)} style={{right:167, bottom:20, position:'fixed'}}>
          {translate('Share') || 'Share'}
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
            {translate('Two hearts, one journey begins')}
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
            <p className="highlight">{translate('With the divine blessings of Lord Ganesh  and our beloved elders')}</p>
            <p>{translate('Saturday, 24 January 2026')}</p>
            <p className="venue">
              {translate('Char Chowk, Near Cow Shed')} <br />
              {translate('Keshod')}
            </p>
            <p className="highlight">{translate('Together with our families, \n              we invite you to celebrate love & togetherness')}</p>
          </motion.div>

          <motion.div
            className="schedule"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
          >
            <h3>{translate('Wedding Schedule')}</h3>

            <ul className="timeline">
              <li>🎶 <div><strong>{translate('Sangeet')}</strong><small>23 • 9:00 AM</small></div></li>
              <li>🪔 <div><strong>{translate('Ganesh Pooja')}</strong><small>23 • 9:30 AM</small></div></li>
              <li>🙏 <div><strong>{translate('Maameru')}</strong><small>23 • 3:00 PM</small></div></li>
              <li>🌼 <div><strong>{translate('Haldi')}</strong><small>23 • 4:30 PM</small></div></li>
              <li>💃 <div><strong>{translate('Raas Garba')}</strong><small>23 • 8:00 PM</small></div></li>
            </ul>

            <div className="family-note">
            {translate('Your presence and blessings will make  \n            this celebration truly special.')}
          </div>
          </motion.div>
        </motion.div>
      )}

      {/* Share prompt modal */}
      {showSharePrompt && (
        <div className="welcome-overlay" onClick={() => setShowSharePrompt(false)}>
          <div className="welcome-bg" />
          <div className="welcome-box">
            <p className="welcome-small">{translate("Are you coming?")}</p>
            <div style={{display:'flex',gap:12,justifyContent:'center',marginTop:16}}>
              <button onClick={async (e) => { e.stopPropagation(); await sendInvitation('Yes'); setShowSharePrompt(false); }} style={{padding:'8px 18px',borderRadius:8,border:'none',background:'#b76e79',color:'#fff'}}> {translate('Yes')} </button>
              <button onClick={async (e) => { e.stopPropagation(); await sendInvitation('No'); setShowSharePrompt(false); }} style={{padding:'8px 18px',borderRadius:8,border:'1px solid #ddd',background:'#fff'}}> {translate('No')} </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
