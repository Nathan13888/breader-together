import React, { useContext, useState } from "react";
import axios from 'axios';

import UserContext from "../../context/userContext";

import NavBar from "../NavBar/NavBar";

function sendInput(input, mode) {

   const apiUrl = 'http://your_server_address/generate_recipe/';

   var requestData;
   if (mode == "ingredients") {
        requestData = {
            mode: "ingredients",
            ingredients: input
        };
   }
   else if (mode == "search") {
        requestData = {
            mode: "search",
            search: input
        };
}
   

   axios.post(apiUrl, requestData)
     .then(response => {
       console.log('Recipe:', response.data.recipe);
     })
     .catch(error => {
       console.error('Error:', error);
     });
}

const IngredientsModal = () => {
    return (
        <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <form className="space-y-6">
                        <div>
                            <label for="ingredients" className="block text-md mb-2 font-medium text-[#F53C44]">ingredients</label>
                            <input 
                                type="text" 
                                id="ingredients" 
                                name="ingredients" 
                                className="mt-1 w-full p-2 border rounded-md"
                            />
                        </div>
                    </form>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse justify-center">
                        <button type="submit" onClick={() => sendInput()} className="mt-3 w-full inline-flex justify-center rounded-md border shadow-sm px-4 py-2 bg-white text-[#F53C44] border-[#F53C44] hover:bg-[#F53C44] text-base font-medium hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm">
                            let's go!
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
  };

  const SearchModal = () => {
    return (
        <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <form className="space-y-6">
                        <div>
                            <label for="search-recipe" className="block text-md mb-2 font-medium text-[#F53C44]">search recipe</label>
                            <input 
                                type="text" 
                                id="search-recipe" 
                                name="search-recipe" 
                                className="mt-1 w-full p-2 border rounded-md"
                            />
                        </div>
                    </form>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse justify-center">
                        <button type="submit" onClick={() => sendInput()} className="mt-3 w-full inline-flex justify-center rounded-md border shadow-sm px-4 py-2 bg-white text-[#F53C44] border-[#F53C44] hover:bg-[#F53C44] text-base font-medium hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm">
                            let's go!
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
  };

function Mode(props) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div>
            <button className="w-1/4" onClick={() => setIsOpen(true)}>
                <div className="block m-5 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-red-200 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <p className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{props.type}</p>
                    <p className="font-normal text-gray-700 dark:text-gray-400">{props.info}</p>
                </div>
            </button>
            {isOpen && (props.type == "ingredients") && <IngredientsModal setIsOpen={setIsOpen} />}
            {isOpen && (props.type == "search") && <SearchModal setIsOpen={setIsOpen} />}
        </div>
    )
}

function Create() {
  const { user, setUser } = useContext(UserContext);
  return (
    <div>
      <NavBar />
      <div>
        <h1 className="m-5 text-4xl font-bold text-[#F53C44] mb-4">choose a mode...</h1>
        <div className="grid-cols-3 grid-rows-1">
            <div>
            <Mode type="ingredients" info="list ingredients and we'll do the rest!" />
            </div>
            <div>
            <Mode type="search" info="have something in mind?" />
            </div>
            <div>
            <Mode type="surprise me!" info="feeling adventurous?" />
            </div>
        </div>
        
        <h1 className="m-5 text-4xl font-bold text-[#F53C44] mb-4">...and we'll <span className="italic">rise</span> to the occassion!</h1>
        </div>
    </div>
  );
}

export default Create;
