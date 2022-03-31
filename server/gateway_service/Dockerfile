FROM node:16-alpine

WORKDIR /code

COPY package.json yarn.lock /code/

RUN yarn install

COPY . /code

CMD ["yarn", "start"]