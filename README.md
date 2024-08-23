## Description

Demo NestJS application.

## Features

- NestJS
- Docker (Docker-compose)
- Prisma for database modelling, migration and type-safe access (Postgres)
- REST API docs w/ Swagger
- Test w/ Jest

## Installation

```bash
$ pnpm install
```

## Database 
Setup a development PostgreSQL with Docker. Copy .env.example and rename to .env which sets the required environments for PostgreSQL such as POSTGRES_USER, POSTGRES_PASSWORD and POSTGRES_DB. 

Start the PostgreSQL database

```bash
docker compose -f docker-compose.db.yml up
```

Prisma Migrate is used to manage the schema and migration of the database.

```base
# development
$ pnpx prisma migrate dev
# production
$ pnpx prisma migrate deploy
```


## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

```

## REST API
RESTful API documentation available with Swagger.
http://localhost:3000/api
