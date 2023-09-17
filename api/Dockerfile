FROM ubuntu:20.04

RUN apt-get update && apt-get install -y wget && rm -rf /var/lib/apt/lists/*

# Install Micromamba (miniforge)
RUN wget -qO- https://micromamba.snakepit.net/api/micromamba/linux-64/latest | tar -xvj bin/micromamba && \
    mv bin/micromamba /usr/local/bin && \
    rm -rf bin

# Create a directory for your project
WORKDIR /app

COPY environment.yaml .
RUN micromamba create -f environment.yaml
RUN echo "source activate myenv" > ~/.bashrc

ENV COHERE_API_KEY ""

COPY . .

CMD ["micromamba", "run", "-n", "food", "python", "server.py"]
