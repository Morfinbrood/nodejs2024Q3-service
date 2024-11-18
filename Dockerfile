FROM node:16-alpine AS base

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma

FROM base AS development

RUN npm install

COPY . .

CMD ["npm", "run", "start:dev"]

FROM base AS build

RUN npm ci

COPY . .

RUN npm run build
RUN npx prisma generate

FROM node:16-alpine AS production

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma

RUN npm ci --only=production
RUN npx prisma generate

COPY --from=build /app/dist ./dist

ENV NODE_ENV=production

EXPOSE 4000

CMD ["node", "dist/src/main.js"]
