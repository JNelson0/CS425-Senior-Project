# Server

## Development

Starting server for development:

```sh
yarn run dev
```

Starting server for production:

```sh
yarn run start
```

## How to use Postgres (macOS)

Install using Homebrew.

```sh
brew install postgres@14.0
```

Run the homebrew service included with postgres.

```sh
brew services start postgres
```

Setup the Postgres superuser for development.

```sh
createuser -s postgres
```

Create the outwork Database.

```sh
createdb outwork -U postgres
```

## Resources

- [Prisma](https://www.prisma.io/)
  - `prisma`
  - `@prisma/client`
- [Express](https://expressjs.com/)
  - Routes
  - [`morgan`](https://expressjs.com/en/resources/middleware/morgan.html)
  - [`express-async-errors`](https://github.com/davidbanham/express-async-errors)
- [`dotenv`](https://github.com/motdotla/dotenv)
- [`nodemon`](https://nodemon.io/)

## Database Migrations

To migrate:

```sh
yarn run db-migrate
```

To reset migrations:

```sh
yarn run db-reset
```

To seed database:

```sh
yarn run db-seed
```

The seed inserts a user and an event associated with that user into the database.

The user's credentials are:

```
email: "email@email.com"
username: "username"
password: "password"
```

## Database Testing

To test:

'''ssh
Check db.mjs and comment out the way it imports, and switch for running host
'''
