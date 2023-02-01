FROM node:16-alpine
WORKDIR /client
ENV PATH /client/node_modules/.bin:$PATH
COPY package.json ./
COPY ./src ./src
COPY ./public ./public
RUN npm install
RUN npm run build
CMD ["npm", "start"]


