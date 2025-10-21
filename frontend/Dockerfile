FROM node:24.10.0-alpine
WORKDIR /usr/src/frontend
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev"]