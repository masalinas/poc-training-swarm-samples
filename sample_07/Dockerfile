FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY server.js ./

# Swarm configs will mount /app/config.json
# Swarm secrets will mount /run/secrets/*
EXPOSE 3000

CMD ["npm", "start"]