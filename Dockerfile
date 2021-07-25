FROM node:14.17 AS base
WORKDIR /usr/src/efuse-sample-backend
COPY package*.json ./
RUN npm ci --ignore-scripts
COPY . .

FROM base as builder
ENV NODE_PATH=./dist
RUN npm run build

FROM node:14.17-alpine AS production
WORKDIR /efuse-sample-backend
ENV NODE_ENV=production
ENV NODE_PATH=./dist
COPY package*.json ./
RUN npm ci --only=production --ignore-scripts
COPY --from=builder /usr/src/efuse-sample-backend/dist ./dist
EXPOSE 5000
USER node
CMD ["node", "dist/server"]
