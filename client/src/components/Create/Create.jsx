import React, { useContext } from "react";

import UserContext from "../../context/userContext";

import NavBar from "../NavBar/NavBar";


function Create() {
  const { user, setUser } = useContext(UserContext);
  return (
    <div>
      <NavBar />
      <div className="text-3xl">Hi, {user.displayName}</div>
    </div>
  );
}

export default Create;
