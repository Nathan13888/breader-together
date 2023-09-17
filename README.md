# Breader Together 🍞

<desc...>

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
export REPO_PATH="<repo path>"
export TAG="<tag name>"
docker built -t $TAG --label "org.opencontainers.image.source=https://github.com/$REPO_PATH"
```




