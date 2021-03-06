# Stock-Data-API

- Implement the [polygon.io](https://polygon.io/docs/stocks/) stock market apis

### Required Features

- stock data is available via an exposed api
- stock data can be filtered via api for cost, gain/loss, percentage performance and name.
- save the best 3 performing stock entities to an sql database daily.
- reporting api for saved stock entities with weekly and monthly groupings.

#### Tools

##### Dev Tools

- TYPESCRIPT
- JAVASCRIPT(Node.js/Express.js)

##### Testing Framework

- Jest
- Supertest

### API service hosted on Heroku

[Stock Data Wrapper Service](https://stock-data-apis.herokuapp.com)

#### API Docs

- [Swagger](https://stock-data-apis.herokuapp.com/api-docs)

#### Getting Started

To setup Stock Data System Application Rest API, These tools should be installed in your PC

- [Node js](https://nodejs.org/en/download/)
- [Insonmia](https://insomnia.rest/download/) or [Postman](https://www.getpostman.com/downloads/)
- [Git](https://git-scm.com/downloads)

#### Installing

- Clone this repo
- Open the project folder
- Create a .env file and populate with .env-sample

  ##### N.B

  - Your DATABASE_URL_DEV should be your connection string,
  - Your STOCK_DATA_API_BASE_URL
  - Your STOCK_DATA_API_KEY

* Open terminal
* Run `npm install` or `yarn install`

### Running the app

- Run `npm run start:dev` or `yarn run start:dev`

### Running the tests

- Run `npm test` or `yarn test`
