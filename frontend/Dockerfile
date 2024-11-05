FROM node:14-alpine

WORKDIR /frontend
COPY package*.json ./
RUN npm install
COPY . .

CMD ["npm", "start"]
