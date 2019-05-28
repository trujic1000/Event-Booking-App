const express = require('express');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');
const isAuth = require('./middleware/isAuth');

const graphqlSchema = require('./graphql/schema');
const graphqlResolvers = require('./graphql/resolvers');

const app = express();
app.use(express.json());

// Enabling CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Auth middleware
app.use(isAuth);

app.use(
  '/graphql',
  graphqlHttp({
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
    graphiql: true
  })
);

// Connecting to database and starting server
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${
      process.env.MONGO_PASSWORD
    }@cluster0-o6apv.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`,
    { useNewUrlParser: true, useCreateIndex: true }
  )
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        `Connected to the database and server started on port ${
          process.env.PORT
        }`
      );
    });
  })
  .catch(err => console.log(err));
