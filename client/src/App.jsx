import { useState, useContext } from "react";

import UserProvider from "./context/userProvider";
import UserContext from "./context/userContext";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoggedRoute from "./routes/LoggedRoute";
import PublicRoute from "./routes/PublicRoute";

import Login from "./components/Login/Login";
import HomePage from "./components/HomePage/HomePage";
import Create from "./components/Create/Create";
import Feed from "./components/Feed/Feed";
import Explore from "./components/Explore/Explore";
import Challenges from "./components/Challenges/Challenges";
import Profile from "./components/Profile/Profile";
import Logout from "./components/Logout/Logout";


function App() {
  const { user, setUser } = useContext(UserContext);

  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<PublicRoute component={Login} />} />
          <Route path="/home" element={<LoggedRoute component={HomePage} />} />
          <Route path="/create" element={<LoggedRoute component={Create} />} />
          <Route path="/feed" element={<LoggedRoute component={Feed} />} />
          <Route path="/explore" element={<LoggedRoute component={Explore} />} />
          <Route path="/challenges" element={<LoggedRoute component={Challenges} />} />
          <Route path="/profile" element={<LoggedRoute component={Profile} />} />
          <Route path="/logout" element={<LoggedRoute component={Logout} />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
