FROM node:16-alpine
WORKDIR /ikmfront
ENV PATH /ikmfront/node_modules/.bin:$PATH
COPY package.json ./
COPY ./src ./src
COPY ./public ./public
RUN npm install
RUN npm run build
CMD ["npm", "start"]


