import cohere
co = cohere.Client(COHEREAPIKEY) # This is your trial API key


from dotenv import load_dotenv
from fastapi import FastAPI, Request

app = FastAPI()
load_dotenv()

# could replace ingredient names with variables/parameters that the user inputs as ingredeints
# temperature is the "craziness" of the api generated recipe. 2 is the max, but it makes the recipe exciting and have a WOW factor

# to generate a recipe using given ingredients from Cohere Generate LLM
@app.post("/generate_recipe/")
async def generate_recipe(request: Request, keyword: str):
    # Modify the prompt to include the provided keyword
    prompt = f'Give me a recipe using {keyword}. Please introduce the recipe with an appetizing name and taste description, like at a restaurant! Please also present the ingredients in bullet points, and the steps to make the recipe in a numbered list.\n'

    # Use the modified prompt in the generation request
    response = co.generate(
        model='command',
        prompt=prompt,
        max_tokens=878,
        temperature=2,
        k=0,
        stop_sequences=[],
        return_likelihoods='NONE'
    )
    recipe = response.generations[0].text
    return {"recipe": recipe}


# to get the random recipe from "Surprise Me" option using Cohere Generate LLM
@app.post("/surprise_me/")
async def surprise_me(request: Request, keyword: str):
    # Modify the prompt to include the provided keyword
    prompt = f'I\'m feeling adventurous. I\'d like to cook a random dish that surprises me and isn\'t something I regularly make. Please describe this dish you would recommend, and give an easy-to follow list of ingredients and recipe.\n'

    # Use the modified prompt in the generation request
    response = co.generate(
        model='command',
        prompt=prompt,
        max_tokens=878,
        temperature=2,
        k=0,
        stop_sequences=[],
        return_likelihoods='NONE'
    )
    recipe = response.generations[0].text
    return {"recipe": recipe}


# to get the specific dish and the associated recipe using the Cohere Generate LLM
@app.post("/search/")
async def search(request: Request, keyword: str):
    # Modify the prompt to include the provided keyword
    prompt = f'I want to make the following dish: {keyword}. Please introduce the recipe with an appetizing name and taste description, like at a restaurant! Please also present the ingredients in bullet points, and the steps to make the recipe in a numbered list.\n'

    # Use the modified prompt in the generation request
    response = co.generate(
        model='command',
        prompt=prompt,
        max_tokens=878,
        temperature=2,
        k=0,
        stop_sequences=[],
        return_likelihoods='NONE'
    )
    recipe = response.generations[0].text
    return {"recipe": recipe}
