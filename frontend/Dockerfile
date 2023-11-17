# syntax=docker/dockerfile:1

FROM node:18-alpine
WORKDIR /frontend
COPY package.json .
RUN npm install
COPY . .

# Run the application.
CMD ["npm", "start"]