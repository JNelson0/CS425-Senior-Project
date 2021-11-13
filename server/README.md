# Server

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
