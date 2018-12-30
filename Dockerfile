FROM node:10 as build

RUN npm install yarn -g

WORKDIR /src/app/
COPY /Smokeylito.Admin/yarn.lock /Smokeylito.Admin/package.json ./
RUN yarn

COPY /Smokeylito.Admin/ ./
RUN yarn build:prod

FROM node:10
WORKDIR /src/app/
COPY --from=build /src/app/ ./
EXPOSE 3000
ENTRYPOINT [ "node" ]
CMD [ "dist/server.js" ]

