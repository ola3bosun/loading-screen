import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "./logo.svg";
import "./App.css";
import CountUp from "./components/Countup";
import GridDistortion from "./components/GridDistortion";
import * as THREE from "three";
import Navbar from "./components/Navbar";
import DecryptedText from "./components/NavDecryptAnim";

// LocationTime component to display London's current time
const LocationTime = () => {
  const getDate = () => {
    // Returns the current time in London (24-hour format)
    return new Date().toLocaleTimeString("en-GB", { timeZone: "Europe/London" });
  };

  const [time, setTime] = useState(getDate());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(getDate());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="location">
      <div className="blinker"></div>
      London, UK. {time}
    </div>
  );
};

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen for the actual page load event instead of a fixed timeout
    const handlePageLoad = () => {
      setLoading(false);
    };
    window.addEventListener("load", handlePageLoad);
    return () => window.removeEventListener("load", handlePageLoad);
  }, []);

  return (
    <div className="App" style={{ position: "relative" }}>
      {/* AnimatePresence handles the exit animation */}
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loader"
            initial={{ y: 0, height: "100vh" }}
            animate={{ y: 0, height: "100vh" }}
            exit={{
              y: "-100vh",
              height: 0,
              transition: { duration: 0.5, ease: "easeInOut" },
            }}
            // Absolute positioning so the loader sits on top of the welcome page
            style={{
              overflow: "hidden",
              position: "absolute",
              width: "100%",
              top: 0,
              left: 0,
              zIndex: 1000,
            }}
          >
            <CountUp
              from={0}
              to={100}
              separator=","
              direction="up"
              duration={15}
              className="count-up-text"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {!loading && (
        <div style={{ width: "100%", height: "100%", position: "relative" }}>
          <GridDistortion
            imageSrc="https://picsum.photos/1920/1080?grayscale"
            grid={10}
            mouse={0.1}
            strength={0.15}
            relaxation={0.9}
            className="custom-class"
          />
          {/* LocationTime displays London's current time */}
          <LocationTime />
          <div
            className="otb"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              color: "#f5f5f5",
              fontSize: "3rem",
              textAlign: "center",
              zIndex: 2000,
              fontFamily: "Herva",
              mixBlendMode: "difference",
            }}
          >
            OTB studios
          </div>
          <Navbar />
        </div>
      )}
    </div>
  );
}

export default App;
