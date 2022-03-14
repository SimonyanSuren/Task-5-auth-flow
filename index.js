const express = require('express');
const routesUsers = require('./routes/users.route');
const routeAuth = require('./routes/auth.route');
const notFoundMiddleware = require('./middleware/not-found.middleware');
const errorHandlerMiddleware = require('./middleware/error-handler.middleware');
const authenticationMiddleware = require('./middleware/auth.middleware');

const client = require('./db/connect');

const app = express();

app.use(express.json());
app.use(routeAuth);
app.use(authenticationMiddleware, routesUsers);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT;

client
  .connect()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on: ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

process.on('exit', () => {
  client.end();
});
