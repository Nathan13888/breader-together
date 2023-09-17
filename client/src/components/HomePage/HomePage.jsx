import React, { useContext } from "react";
import UserContext from "../../context/userContext";
import NavBar from "../NavBar/NavBar";

import "./HomePage.css"; // This will store our custom CSS animations

function HomePage() {
  const { user, setUser } = useContext(UserContext);

  return (
    <div className="bg-gradient-to-br from-[#FAF5E9] to-[#FFEFDB] min-h-screen relative overflow-hidden">
      <NavBar />

      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-red-500 animate-pulse">
            welcome, foodies!
          </h1>
          <div className="mt-8 text-3xl animate-slideFromLeft">
            hi, <span className="text-4xl text-[#F53C44] hover:text-[#FAF5E9] transition duration-300">{user.displayName}</span>
          </div>
        </div>
      </div>

      <div className="absolute top-0 left-0 w-full h-full bg-cover bg-center" style={{ backgroundImage: 'url("https://example-image-link.com")', opacity: '0.1' }}></div> {/* Adjust the background image link */}
    </div>
  );
}

export default HomePage;
