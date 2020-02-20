## The builder

FROM node:12-alpine as builder

WORKDIR /usr/src/app

ENV OPENCOLLECTIVE_HIDE=1
ENV SUPPRESS_SUPPORT=1

COPY package.json package-lock.json ./

RUN npm ci --loglevel error

COPY . .

RUN npm run build


## The cleaner

FROM node:12-alpine as cleaner

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app .

RUN rm -rf src
RUN npm prune --production


## Output image

FROM node:12-alpine

LABEL maintainer="cojack <xcojac@gmail.com>"

HEALTHCHECK CMD curl -f http://localhost:3000/health || exit 1

RUN apk add --update curl

WORKDIR /usr/src/app

COPY --from=cleaner /usr/src/app .

ENV NODE_ENV "production"

EXPOSE 3000

USER node

CMD [ "npm", "run", "start:prod" ]
