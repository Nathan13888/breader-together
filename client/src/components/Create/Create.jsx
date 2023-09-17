import React, { useState, useContext } from "react";
import axios from "axios";
import NavBar from "../NavBar/NavBar";
import UserContext from "../../context/userContext";


const sendInput = (user, input, mode, setUserResponse) => {
  const apiUrl = "https://breader-n4chung.csclub.cloud";

  let requestData = {
    mode: mode === "ingredients" ? "ingredients" : "search",
    profile: user.bio || "",
  };
  requestData[mode] = input;

  axios
    .post(apiUrl, requestData)
    .then((response) => setUserResponse(response.data))
    .catch((error) => console.error("Error:", error));
};

const Modal = ({ type, onClose, setUserResponse }) => {
  const [input, setInput] = useState("");
  const { user } = useContext(UserContext);

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <form
          className="space-y-6 inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          onSubmit={(e) => {
            e.preventDefault();
            sendInput(user, input, type, setUserResponse);
            onClose();
          }}
        >
          <div className="bg-white p-6">
            <label
              htmlFor={type}
              className="block text-md mb-2 font-medium text-[#F53C44]"
            >
              {type}
            </label>
            <input
              type="text"
              id={type}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="mt-1 w-full p-2 border rounded-md"
            />
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse justify-center">
            <button
              type="submit"
              className="w-full inline-flex justify-center rounded-md border shadow-sm px-4 py-2 bg-white text-[#F53C44] border-[#F53C44] hover:bg-[#F53C44] text-base font-medium hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:w-auto sm:text-sm"
            >
              let&apos;s go!
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Mode = ({ type, info, setUserResponse }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="m-5">
      <button
        className="block w-full max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-red-200"
        onClick={() => setIsOpen(true)}
      >
        <p className="mb-2 text-2xl font-bold">{type}</p>
        <p className="text-gray-700">{info}</p>
      </button>
      {isOpen && (
        <Modal
          type={type}
          onClose={() => setIsOpen(false)}
          setUserResponse={setUserResponse}
        />
      )}
    </div>
  );
};

const Create = () => {
  const [userResponse, setUserResponse] = useState("");

  return (
    <div className="min-h-screen">
      <NavBar />
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-[#F53C44] mb-8">
          choose a mode...
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Mode
            type="ingredients"
            info="list ingredients and we'll do the rest!"
            setUserResponse={setUserResponse}
          />
          <Mode
            type="search"
            info="have something in mind?"
            setUserResponse={setUserResponse}
          />
          <Mode
            type="surprise me!"
            info="feeling adventurous?"
            setUserResponse={setUserResponse}
          />
        </div>
        {userResponse && (
          <div className="mt-8 p-6 bg-white rounded shadow">
            <h2 className="text-2xl font-bold text-[#F53C44] mb-4">Recipe:</h2>
            <p className="mb-4">{userResponse.result}</p>
            <img
              src={
                userResponse.image ||
                "https://kaynutrition.com/wp-content/uploads/2018/11/what-is-processed-food-1.jpg"
              }
              alt="Recipe Cover"
              className="mt-4 w-full max-w-md rounded shadow-lg"
            />
          </div>
        )}
        <h1 className="mt-8 text-4xl font-bold text-[#F53C44]">
          ...and we&apos;ll <span className="italic">rise</span> to the
          occasion!
        </h1>
      </div>
    </div>
  );
};

export default Create;
