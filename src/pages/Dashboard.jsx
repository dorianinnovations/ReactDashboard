import React from "react";
import AIChat from "../components/AIChat.jsx";
import tailwindConfig from "../../tailwind.config.js";
import MinimalChatContainer from "../components/MinimalChatConainer.jsx";

const Navbar = () => {
  return (
    <nav className="">
      <div>
        <div
          className="p-6 m-2 text-center space-around text-lg rounded-lg bg-red-900 "
        >
          {["Home", "Settings", "About", "Contact"].map(
            (item, index) => (
              <a
                key={index}
                href="#"
                style={{
                  transition: "all 0.25s ease-in-out",
                  overflow: "hidden",
                }}
              >
                {item}
              </a>
            )
          )}
        </div>
      </div>
    </nav>
  );
};

// Main App component
const App = () => {
  return (
    <div>
      <Navbar />
      <div>
        <MinimalChatContainer />
      </div>
    </div>
    
  );
};

export default App;
