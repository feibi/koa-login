FROM node

RUN mkdir -p /project/koa-login
WORKDIR /project/koa-login


COPY . /project/koa-login
RUN yarn install

EXPOSE 8888
CMD ["npm","start"]

