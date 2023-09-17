import logging
import os
import sys
import time
from typing import List

import cohere
import nest_asyncio
import uvicorn
from fastapi import FastAPI
from prompt import Prompter
from pydantic import BaseModel

# from enum import Enum

app = FastAPI()

# configure logger
logger = logging.getLogger('api')

logger.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s | %(levelname)s | %(message)s')
stdout_handler = logging.StreamHandler(sys.stdout)
stdout_handler.setLevel(logging.DEBUG)
stdout_handler.setFormatter(formatter)
logger.addHandler(stdout_handler)

################################################################################


cohere_api_key = os.environ.get("COHERE_API_KEY")

if cohere_api_key is None:
    sys.exit(1)
else:
    logger.debug(f'cohere_api_key={cohere_api_key}')

co = cohere.Client(cohere_api_key)
prompter = Prompter(co, logger)

################################################################################

class RecipeRequest(BaseModel):
    profile: 'Profile'      # profile information
    type: str               # surprise, search, generate
    search: str             # SEARCH: eg. "omlet"
    ingredients: str  # GENERATE: eg. eggs, flour
    custom: str

class Profile(BaseModel):
    flavours: str       # eg. sweet, sour, spicy, ...
    age: int            # eg. 19 --> teen-ager
    # veg: bool           # vegetarian/vegan ??
    # TODO: gluten-free? keto?
    allergies: str      # things to never include
    custom: str         # any thing else to keep in mind, eg. ingredients to avoid

RecipeRequest.model_rebuild()

@app.post("/api/gen")
def predict(req: RecipeRequest):
    uuid = "unknown-uuid"
    typ = req.type

    logger.info(f'Received request for {uuid}')

    start_time = time.time()

    # generate "preferences" profile
    prompt = ""
    temp = 0.2

    if typ == "search":
        search = req.search
        prompt = f'Give me a recipe for "{search}". Please introduce the recipe with an appetizing name and taste description, like at a restaurant! Please also present the ingredients in bullet points, and the steps to make the recipe in a numbered list.\n'

    elif typ == "generate":
        if len(req.ingredients) ==0:
            return {
                "error": "chosen generate, invalid number of ingredients"
            }
        # lst = req.ingredients[0]
        # for i in range(1,len(req.ingredients)):
        #     lst.append(", "+req.ingredients[i])
        lst = req.ingredients

        prompt = f'Give me a recipe using ("{lst}"). Please introduce the recipe with an appetizing name and taste description, like at a restaurant! Please also present the ingredients in bullet points, and the steps to make the recipe in a numbered list.\n'
        
    else: # surprise
        temp = 2
        prompt=f'I\'m feeling adventurous. I\'d like to cook a random dish that surprises me and isn\'t something I regularly make. Please describe this dish you would recommend, and give an easy-to follow list of ingredients and recipe.\n'
        

    result = prompter.prompt(prompt, temperature=temp)

    # bench time
    end_time = time.time()
    logger.info(f"Recipe Generation took {end_time - start_time} seconds.")

    return {
        "result": result,
        "type": typ,
        "error": "",
    }


################################################################################

@app.get("/")
def root():
    return {"status": "ok"}

@app.get("/health")
def health():
    return {"status": "ok"}

################################################################################

nest_asyncio.apply()
uvicorn.run(app, host='0.0.0.0', port=8888)
