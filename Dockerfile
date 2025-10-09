FROM node:20-bullseye-slim

RUN apt-get update && \
    apt-get install -y openssl ca-certificates libssl-dev && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npx prisma generate

CMD ["npx", "nodemon", "--legacy-watch", "index.js"]