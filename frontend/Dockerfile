FROM node:18

WORKDIR /frontend
COPY package*.json ./
RUN npm install
COPY . .

ENV VITE_API_URL=http://localhost:8000
EXPOSE 3000

CMD ["npm", "run", "dev"]
