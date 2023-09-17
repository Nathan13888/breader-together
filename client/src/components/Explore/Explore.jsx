import React, { useState, useEffect } from "react";
import NavBar from "../NavBar/NavBar";
import { ShareAltOutlined } from "@ant-design/icons";

function Explore() {
  const [foodFact, setFoodFact] = useState("");

  useEffect(() => {
    async function fetchFoodFact() {
      try {
        // Mocking a food fact API
        const facts = [
          "the first soup was made of hippopotamus.",
          "tomatoes were believed to be poisonous in the 18th century.",
          "honey never spoils.",
          "apples float in water because they are 25% air.",
          "the can opener was invented 48 years after cans.",
          "you can use banana peels to shine your shoes.",
          "the most expensive pizza in the world costs $12,000.",
          "the most stolen food in the world is cheese.",
          "tomatoes have more genes than humans.",
          "the most popular pizza topping in Brazil is green peas.",
          "in Japan, KFC is a typical Christmas dinner.",
          "peanuts are not nuts.",
          "quinoa is actually a seed.",
          "chocolate was once used as currency.",
          "one fast food hamburger may contain meat from 100 different cows.",
          "mushrooms are more closely related to humans than plants.",
          "broccoli contains more protein than steak.",
          "jelly beans were the first candy to be sold by weight.",
          "gummy bears are made from gelatin, which is made from animal bones.",
          "cake was originally a flat round of bread.",
          "the popsicle was invented by an 11-year-old in 1905.",
        ];

        const randomFact = facts[Math.floor(Math.random() * facts.length)];
        setFoodFact(randomFact);
      } catch (error) {
        console.error("Error fetching food fact:", error);
      }
    }

    fetchFoodFact();
  }, []);

  return (
    <div className="bg-gradient-to-br from-[#FAF5E9] to-[#FFEFDB] min-h-screen">
      <NavBar />

      <div className="container mx-auto mt-12 mb-8 px-4 text-center">
        <div className=" rounded-xl shadow-md hover:shadow-lg transition duration-300 p-8">
          <h1 className="font-semibold text-2xl mb-4">did you know?</h1>
          <p className="text-gray-600 mb-8">{foodFact}</p>

          <h1 className="mt-10 font-semibold text-2xl mb-4">
            talk to the food elf... 🍤
          </h1>
          <iframe
            src="https://app.chatsimple.ai/iframe23/02e532dd-16d0-4e2f-8585-7c83a316a3d7/5fdfd174-60f3-407a-b18f-4732dc8a7f1e/f5e7ff4e-b639-48b3-8a71-0d8c82677b7c"
            height="550"
            width="800"
            title="Chatsimple"
            style={{
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
              border: "none",
              borderRadius: "20px",
              boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.2)",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Explore;
