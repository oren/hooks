FROM mhart/alpine-iojs:2.3.3
RUN apk add --update python && rm -rf /var/cache/apk/*
COPY . src
WORKDIR /src
