import React, { useContext } from "react";

import UserContext from "../../context/userContext";

import NavBar from "../NavBar/NavBar";


function Challenges() {
  return (
    <div>
      <NavBar />
      <main className="px-4 pb-4 grid grid-cols-3 gap-12 max-w-[1200px] mx-auto">
        <div className="p-4 bg-white rounded-xl shadow-md">
          <p className="mb-4 text-gray-600 text-md font-bold">Mystery Madness 🥸</p>
          <img src="https://www.eatthis.com/wp-content/uploads/sites/4/2019/04/peanut-butter-bacon.jpg" /><br/>
          <p className="mb-4 text-gray-600 text-sm leading-">Have you got what it takes to come up with an epic recipe on the fly? Join the Mystery Madness challenge and you’ll have 24 hours to come up with and create a recipe using 5 mystery ingredients!</p>

          <button
            className={`w-full py-2 rounded-md hover:bg-[#F53C44] hover:text-white hover:cursor-pointer text-[#F53C44] border-2 border-[#F53C44] transition duration-300`}
          >
            join!
          </button>
        </div>
        <div className="p-4 bg-white rounded-xl shadow-md">
          <p className="mb-4 text-gray-600 text-md font-bold">Orange you glad I didn't say banana?</p>
          <img src="https://images.immediate.co.uk/production/volatile/sites/30/2022/12/Smoothie-bowl-16df176.jpg" /><br/>
          <p className="mb-4 text-gray-600 text-sm leading-">Apples, bananas, cherries... Make a recipe featuring fruits! The more, the berrier!</p>

          <button
            className={`w-full py-2 rounded-md cursor-not-allowed bg-[#F53C44] text-white opacity-80 border-2 border-[#F53C44] transition duration-300`}
          >
            joined
          </button>
        </div>
        <div className="p-4 bg-white rounded-xl shadow-md">
          <p className="mb-4 text-gray-600 text-md font-bold">Health Nut 🌰</p>
          <img src="https://hips.hearstapps.com/delish/assets/16/21/1464039955-delish-summer-salads-caprese-zoodles.jpg" /><br/>
          <p className="mb-4 text-gray-600 text-sm leading-">What's better than food that tastes delicious? Food that's as nutritious as it is delicious! Snap a pic of a healthy alternative to a classic dish to complete this challenge!</p>

          <button
            className={`w-full py-2 rounded-md hover:bg-[#F53C44] hover:text-white hover:cursor-pointer text-[#F53C44] border-2 border-[#F53C44] transition duration-300`}
          >
            join!
          </button>
        </div>
        <div className="p-4 bg-white rounded-xl shadow-md">
          <p className="mb-4 text-gray-600 text-md font-bold">British Bonanza! 🫖</p>
          <img src="https://fullsuitcase.com/wp-content/uploads/2021/01/Traditional-British-food.jpg" /><br/>
          <p className="mb-4 text-gray-600 text-sm leading-">This challenge just might be your cup of tea! Craft a delicious British dish and we'll tip our hats off to you!</p>

          <button
            className={`w-full py-2 rounded-md cursor-not-allowed bg-[#F53C44] text-white opacity-80 border-2 border-[#F53C44] transition duration-300`}
          >
            joined
          </button>
        </div>
        <div className="p-4 bg-white rounded-xl shadow-md">
          <p className="mb-4 text-gray-600 text-md font-bold">Adventurous Artist 🔍</p>
          <img src="https://i0.wp.com/davinadavegan.com/wp-content/uploads/2018/07/DSC_0483ed.jpg?fit=3000%2C2000&ssl=1" /><br/>
          <p className="mb-4 text-gray-600 text-sm leading-">Everyone has a food they've never tried. What's yours? We challenge you to try a food that's new to you and create something amazing with it!</p>

          <button
            className={`w-full py-2 rounded-md hover:bg-[#F53C44] hover:text-white hover:cursor-pointer text-[#F53C44] border-2 border-[#F53C44] transition duration-300`}
          >
            join!
          </button>
        </div>
      </main>
    </div>
  );
}

export default Challenges;
