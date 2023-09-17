# Breader Together 🍞

🍴Breader Together 🍞: A culinary junction where passion for food intertwines with the spirit of community. Beyond mere recipes, it’s about crafting tales, relishing memories, and uniting food lovers. Whether you're sculpting the perfect bread, simmering a soulful stew, or plating a gourmet stir-fry, Breader Together offers you a spot on the internet's vast table, encouraging you to share, explore, and celebrate the diverse world of gastronomy.

Diving into the vibrant mosaic of cuisines 🥘, we recognize that cooking is an art form. It’s the dance of spices in a curry, the simmering anticipation of a slow-cooked roast, the delight of a dessert's first bite, and above all, the shared joy of feasting. With this platform, receive tailored recipe suggestions 📜, share your culinary journeys or unexpected twists with a spirited community, and get inspired by the dishes brought to life by others. Think of it as a global food forum 🌎, where every post is a delicious chapter in the cookbook of life.

Yearning to experiment with flavors, tackle intricate dishes, or just savor the myriad of tastes the world offers? Breader Together is your go-to culinary companion 🍲. Chronicle your food adventures, absorb the wisdom from mishaps, celebrate every delectable achievement, and feel the camaraderie of fellow epicureans. After all, every dish has a story 📖, and we're all ears, eyes, and taste buds for yours. 🍱🥗🍜🍝🍲🥘🍛🍔🍕🍖🍗🍳🍤🍣

## 📚 Tech Stack
- Cohere Command and Classify API
- React (Frontend)
- FastAPI (Backend)
- Firebase (Database)

## 🧱 Architecture Diagram
*Coming soon*...

## 🔧 Development (Locally)

### 🗃️ API
```
micromamba create -n food python=3.9 -c conda-forge # choose Y
#eval "$(micromamba shell hook --shell=zsh)"
micromamba activate food

# If using NixOS, start a shell...
nix-shell -E 'with import <nixpkgs> {}; (pkgs.buildFHSUserEnv { name = "fhs"; }).env'

# Install ./api/environment.yaml
micromamba install -f ./api/environment.yaml -v
# (OR)
pip install cohere cohere-core
# optional: cupy/torch
pip install fastapi nest_asyncio "uvicorn[standard] pydantic" # conda version is out-dated

# Set Environment Variables
export COHERE_API_KEY="<YOUR COHERE GENERATE API KEY HERE>"

# To start API (FastAPI)
cd api/
uvicorn server:app --reload --host 0.0.0.0 --port 8888 # development
uvicorn server:app --host 0.0.0.0 --port 8888          # prod
```

### 🌇 Client (React, Node.js)
```
# complete .env
cd client
cp .env.example .env
vim .env # fill all details for your own deployment


# run frontend locally
npm install
npm run dev
```

### 🐳 Building Docker
```
# export some variables
export REPO_PATH="<repo path>"
export TAG="breader-together"

# build and tag image
docker build -t $TAG --label "org.opencontainers.image.source=https://github.com/$REPO_PATH" .
docker tag $TAG:latest ghcr.io/nathan13888/$TAG:latest


# run docker image
docker run -it ghcr.io/nathan13888/$TAG:latest


# run image to GHCR
docker push ghcr.io/nathan13888/$TAG:latest
```




