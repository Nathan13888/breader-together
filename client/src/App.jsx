import { useState, useContext } from "react";

import UserProvider from "./context/userProvider";
import UserContext from "./context/userContext";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoggedRoute from "./routes/LoggedRoute";
import PublicRoute from "./routes/PublicRoute";

import Login from "./components/Login/Login";
import HomePage from "./components/HomePage/HomePage";


function App() {
  const { user, setUser } = useContext(UserContext);

  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<PublicRoute component={Login} />} />
          <Route path="/home" element={<LoggedRoute component={HomePage} />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
