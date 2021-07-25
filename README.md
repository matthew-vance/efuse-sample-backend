# eFuse Sample Backend

[![CI](https://github.com/matthew-vance/efuse-sample-backend/actions/workflows/main.yml/badge.svg)](https://github.com/matthew-vance/efuse-sample-backend/actions/workflows/main.yml)

## Description

eFuse sample backend app.

## Requirements

- Node.js
- Docker
- MongoDB
- Redis

## Installation

```bash
$ npm install
```

## Building

```bash
# local
$ npm run build

# Docker
$ docker build -t efuse-sample .
```

## Running the app

```bash
# development
$ npm start

# watch mode
$ npm run start:dev

# production
$ node dist/server.js

# Docker Compose
$ docker-compose up -d --build
```

## Test

```bash
# unit tests
$ npm t

# watch mode
$ npm run test:watch

# test coverage
$ npm run test:cov
```
