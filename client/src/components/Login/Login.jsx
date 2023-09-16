import React, { useContext } from "react";
import { GoogleOutlined } from "@ant-design/icons";
import { signInWithPopup } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, googleAuthProvider, db } from "../../utils/firebaseConfig";

import UserContext from "../../context/userContext";

function Login() {
  const { user, setUser } = useContext(UserContext);

  const emailList = [ ];

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);

    //   if (!emailList.includes(result.user.email)) {
    //     alert(
    //       "This app is only available to beta testers. Please contact the developers for more information."
    //     );
    //     return;
    //   }

      const userObj = {
        uid: result.user.uid,
        displayName: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL,
      };

      // Fetch the user from Firestore
      const userRef = doc(db, "users", userObj.uid);
      const userSnapshot = await getDoc(userRef);

      if (userSnapshot.exists()) {
        // If user already exists, merge the data
        const userData = userSnapshot.data();
        setUser({ ...userObj, ...userData });
      } else {
        // If user doesn't exist, set default values for additional fields
        const defaultData = {
          // TODO: ADD FIELDS
        };

        await setDoc(userRef, { ...userObj, ...defaultData });
        setUser({ ...userObj, ...defaultData });
      }
    } catch (error) {
      console.error("Google Login Error: ", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white p-12 py-20 rounded-2xl shadow-2xl w-[600px] space-y-6 transform hover:scale-105 transition-transform duration-300">
        <h1 className="text-3xl font-bold text-center text-gray-900 leading-tight">
          Welcome to BreaderTogether
        </h1>
        <p className="text-center text-gray-600">
          We love bread. We love bread so much that we named our HTN23 project with it...
        </p>
        <div className="flex justify-center items-center">
          <button
            onClick={handleLogin}
            className="text-white px-8 py-2 bg-[#4285F4] hover:bg-[#357ABD] transition-colors duration-300 border-none shadow-lg rounded-full hover:scale-110 transition-transform duration-300"
          >
            <GoogleOutlined className="text-xl mr-2" /> Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
