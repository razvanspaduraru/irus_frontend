FROM node:latest

COPY . /app
WORKDIR /app/irus
EXPOSE 80

RUN npm init -y
RUN npm install