import React, { useState, useEffect } from "react";
import MinimalChat from "../components/MinimalChatConainer.jsx";

const Navbar = () => {
  return (
    <nav className="sidebar"
      style={{
        display: "flex",
        fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
        color: "rgba(255, 255, 255, 0.872)",
        flexDirection: "column",
        borderTopRightRadius: "12px",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        padding: "1em 1em",
        width: "190px",
        height: "100vh",
        position: "fixed",
        gap: "0.5em",
        top: 0,
        left: 0,
        background: "#1c1c1c",
        borderRight: "1px solid #333333",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.4)",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          marginBottom: "80px",
          color: "#dfdfdf",
          fontSize: "1.5em",
          fontWeight: "bold",
        }}
      ></div>
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "10px",
          marginBottom: "12em",
        }}
      ><div className="logo-container">
        <img src="/src/assets/logo.png" alt="Logo" className="logo" /></div>
      </div>
      <div className="nav-links" style={{ display: "flex", flexDirection: "column", width: "100%", maxWidth: "180px" }}>
        {["Home", "Settings", "About", "Profile", "Contact"].map(
          (item, index) => (
            <a
              key={index}
              href="#"
              style={{
                position: "relative",
                fontWeight: 500,
                color: "#dfdfdf",
                textDecoration: "none",
                padding: "1.2em 1em",
                width: "140px",
                minHeight: "45px",
                display: "flex",
                alignItems: "center",
                margin: "0.7em 0",
                borderRadius: "10px",
                fontSize: "1.1em",
                fontFamily: '"Inter", sans-serif',
                transition: "all 0.25s ease-in-out",
                overflow: "hidden",
              }}
            >
              {item}
            </a>
          )
        )}
      </div>
    </nav>
  );
};

// Typing indicator component
const TypingIndicator = ({ isVisible }) => {
  return (
    <div
      style={{
        display: isVisible ? "flex" : "none",
        alignItems: "center",
        justifyContent: "center",
        position: "fixed",
        bottom: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        background: "rgba(0, 0, 0, 0.8)",
        backdropFilter: "blur(10px)",
        color: "white",
        padding: "12px 20px",
        borderRadius: "25px",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
        zIndex: 9999,
        fontSize: "14px",
        fontFamily: '"Inter", sans-serif',
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <div
          style={{
            width: "20px",
            height: "20px",
            border: "2px solid rgba(255, 255, 255, 0.3)",
            borderTop: "2px solid white",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }}
        ></div>
        <span>AI is typing...</span>
      </div>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

<MinimalChat />

// Main App component
const App = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0b0b0b",
        fontFamily: 'sans-serif',
      }}
    >
      <Navbar />

        <div className="content-wrapper"
          style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          padding: "2em 2em 0 220px",
          color: "#dfdfdf",
          fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
          backgroundColor: "#0b0b0b",
          minHeight: "100vh",
          position: "relative",
          zIndex: 1,
          overflow: "hidden",
          boxSizing: "border-box",
          transition: "padding 0.3s ease-in-out",
          marginLeft: "190px",
          }}
        >
          <h1 style={{ marginTop: "1.5em", marginBottom: "0.5em", fontSize: "2.6em", fontWeight: "bold", textAlign: "start", color: "#8fd0ff" }}>Dashboard</h1>
          <p
            style={{
          marginBottom: "2em",
          padding: "6em 0 0 0",
          fontSize: "1.35em",
          fontWeight: "300",
          textAlign: "start",
            }}
          >
            Welcome, this is your personal dashboard. Here you can manage your
            settings, view your profile, and access other features.
          </p>
          <p
            style={{
          marginBottom: "1em",
          padding: "1em 0 0 0",
          fontSize: "1.35em",
          fontWeight: "300",
          textAlign: "start",
            }}
          >
            Take a look around.
          </p>
        </div>

        {/* Minimal Chat Interface */}
      <MinimalChat />
    </div>
  );
};

export default App;