import React from "react";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import About from "./pages/About";
import { Routes, Route } from "react-router-dom";
import "./index.css";
import MinimalChatContainer from "./components/MinimalChatConainer";




const App = () => {
  return (
    <div className="Navbar">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/About" element={<About />} />
        <Route path="/Settings" element={<Settings />} />
      </Routes>
    </div>
  );
};

export default App;
