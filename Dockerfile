FROM node:10
WORKDIR /server/proxy_pay/proxy_pay
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 7001
CMD ["npm", "start"]