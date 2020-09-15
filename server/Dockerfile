FROM node:12
# creating app directory

WORKDIR /usr/src/app
# installing dependencies
# symbol ("*") is used to copy package.json and package-lock.json
# скопировать оба файла: package.json и package-lock.json

COPY package*.json ./
# копируем исходный код\

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 8082

CMD [ "node", "server.js" ]
