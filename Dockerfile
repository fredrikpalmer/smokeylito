FROM node:10 as build

RUN npm install yarn -g
ARG CHROME_VERSION="google-chrome-stable"
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
&& echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list \
&& apt-get update -qqy \
&& apt-get -qqy install \
${CHROME_VERSION:-google-chrome-stable} \
&& rm /etc/apt/sources.list.d/google-chrome.list \
&& rm -rf /var/lib/apt/lists/* /var/cache/apt/*

WORKDIR /src/app/
COPY /Smokeylito.Admin/yarn.lock /Smokeylito.Admin/package.json ./
RUN yarn

COPY /Smokeylito.Admin/ ./
RUN yarn test
RUN yarn build:prod

FROM node:10
WORKDIR /src/app/
COPY --from=build /src/app/ ./
EXPOSE 3000
ENTRYPOINT [ "node" ]
CMD [ "dist/server.js" ]

