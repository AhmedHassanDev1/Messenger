FROM node:20.9.0

WORKDIR /app


COPY package.json .

RUN npm install

COPY . .

ENV PORT=8000

EXPOSE $PORT



CMD ["npm","run","dev"]