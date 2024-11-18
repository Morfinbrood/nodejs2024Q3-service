FROM node:16-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

COPY --from=builder /app/dist ./dist

ENV NODE_ENV=production

EXPOSE 4000

CMD ["node", "dist/src/main.js"]
