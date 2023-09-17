import React, { useContext } from "react";
import { GoogleOutlined } from "@ant-design/icons";
import { signInWithPopup } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, googleAuthProvider, db } from "../../utils/firebaseConfig";

import UserContext from "../../context/userContext";
import "./Login.css";

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
    <div className="animated-gradient h-screen w-screen flex items-center justify-center">
      <div className="mx-auto bg-white p-12 py-20 rounded-2xl shadow-2xl w-[600px] space-y-6 transform hover:scale-105 transition-transform duration-300">
        <img src="../../../public/breader_icon.jpg" alt="Logo" className="mx-auto w-1/5 block" />
        <h1 className="text-3xl font-bold text-center text-[#F53C44] leading-tight">
          breader together!
        </h1>
        <p className="text-center text-gray-600 leading-1">
        cerealsly good recipes 🥘🥙 <br />
        cooking challenges you’ll loave 🍞💗 <br /> 
        your culinary creations on the global table 🌎📱 <br /> <br />
        say hi to social media, but breader!
        </p>
        <div className="flex justify-center items-center">
          <button
            onClick={handleLogin}
            className="text-[#F53C44] border border-[#F53C44] px-8 py-2 hover:bg-[#F53C44] hover:text-white transition-colors duration-300 shadow-lg rounded-full hover:scale-110 transition-transform duration-300"
          >
            <GoogleOutlined className="text-xl mr-2" /> sign in with google
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
