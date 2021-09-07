FROM node:lts-alpine
WORKDIR /server/proxy_pay
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 7001
CMD ["npm", "start"]