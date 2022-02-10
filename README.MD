# Rate limiter

To protect our customers and our APIs, we use a rate limits mechanism.

## Architecture and Technical notes

![docs](/src/docs/diagram.png "Optional Title")

- I used Inversify for dependancy injection.
- Jest for unit and integration tests.
- Logging central class for log, which can be easily replaced by another library.
- generice middleware to return diffirent type of http codes errors (500, 404, 400).
- endpoint paramater must be encoded.
- I check if I can refill the token when I receive the new request by checking lastRefillDate.
- Refill a fraction of suatained depending on how many fractions of minutes has passed and cap this at the burst.

## Installation

To run this project you'll need:

- Node.js (version 10+)
- `npm` available on your path in your CLI

Install dependencies with NPM:

```bash
npm install
```

## NPM commands

You can run the following with `npm run ...`:

- `build`: builds the project using TypeScript, output will be in the `dist` folder;
- `start`: starts the server in development mode, automatically reloading when code changes;
- `test`: runs tests in watch mode using Jest

## TODO

- Proper error handling.
- Open api or Swagger.
- Logging should be saved somewhere else.


## How to scale to distributed arch

![docs](/src/docs/distributed.png "")

## How to load buckets

![docs](/src/docs/loading.png "")


