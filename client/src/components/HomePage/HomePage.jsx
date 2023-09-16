import React, { useContext } from "react";

import UserContext from "../../context/userContext";
function HomePage() {
  const { user, setUser } = useContext(UserContext);
  return <div className="text-3xl">Hi, {user.displayName}</div>;
}

export default HomePage;
