FROM node:15.0.1
ARG NPM_TOKEN
ARG BUILD_ID
WORKDIR /build
COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install
COPY . .
RUN echo //registry.npmjs.org/:_authToken=${NPM_TOKEN}>~/.npmrc && \
    sed -i "s#\"version\": \".*\",#\"version\": \"`grep -Po '"version":.\s?".*"' package.json | grep -Po '[0-9]+\.[0-9]+\.'`${BUILD_ID}\",#g" package.json &&\
    npm run build && \
    npm publish --access=public