# An API

### Make sure you have NodeJS installed

### Install NestJS dependencies and CLI

`npm i -g @nestjs/cli`

### Install project dependencies
`yarn install` in the root folder.

### Create an Env file:
```dotenv
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=admin
POSTGRES_PASSWORD=admin
POSTGRES_DB=kapi
PORT=5000
```

### Create docker.env file
```dotenv
POSTGRES_USER=admin
POSTGRES_PASSWORD=admin
POSTGRES_DB=kapi
```

### Run the database in Docker
`docker-compose up -d`

### Running the project

`yarn start:dev` for the api

API will be available at http://localhost:9000

Make sure to run `yarn migrate` to get all tables and seed some data :)


### Migrations
Whenever you change the schema file inside the prisma folder in any way, we have to create a migration.
We can do that with `npx prisma migrate dev --name <name_of_migraiton>`. Then you can run it with `npm run migrate` tio apply it


### API Docs

After installation and running the backend, the docs are available under `http://localhost:9000/docs`