# ...

<desc...>

## Tech Stack

## Architecture Diagram

## Development

API:
```
micromamba create -n food python=3.9 -c conda-forge # choose Y
#eval "$(micromamba shell hook --shell=zsh)"
micromamba activate food

# If using NixOS, start a shell...
nix-shell -E 'with import <nixpkgs> {}; (pkgs.buildFHSUserEnv { name = "fhs"; }).env'

# Install ./api/environment.yaml
micromamba install -f ./api/environment.yaml -v
# (OR)
pip install cohere-core
# optional: cupy/torch
pip install fastapi "uvicorn[standard]" # conda version is out-dated


# To start API (FastAPI)
cd api/
uvicorn server:app --reload --host 0.0.0.0 --port 8888 # development
#python server.py
uvicorn server:app --host 0.0.0.0 --port 8888          # prod


```

Client (React, Node.js):

