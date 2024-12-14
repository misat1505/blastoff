FROM node:14-alpine

WORKDIR /frontend
COPY package*.json ./
RUN npm install
COPY . .

ENV REACT_APP_API_URL=http://localhost:8000

CMD ["npm", "start"]
