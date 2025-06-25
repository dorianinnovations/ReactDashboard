import React from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import About from "./pages/About";
import { Routes, Route } from "react-router-dom";


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


export { Dashboard };
export default App;
